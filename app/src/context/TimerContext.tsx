import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { playChime } from '../utils/audio';
import { sendDesktopNotification } from '../utils/notifications';
import { useSettings } from './SettingsContext';

export type TimerStatus = 'IDLE' | 'RUNNING' | 'PAUSED';
export type TimerMode = 'WORK' | 'BREAK';

interface TimerContextType {
  status: TimerStatus;
  mode: TimerMode;
  remainingSeconds: number;
  startSession: () => void;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useSettings();
  const WORK_DURATION = settings.workDurationMinutes * 60;
  const BREAK_DURATION = settings.breakDurationSeconds;

  const [status, setStatus] = useState<TimerStatus>('IDLE');
  const [mode, setMode] = useState<TimerMode>('WORK');
  
  const [endTime, setEndTime] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(WORK_DURATION);

  useEffect(() => {
    if (status === 'IDLE') {
      setRemainingSeconds(WORK_DURATION);
    }
  }, [WORK_DURATION, status]);

  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [breaksCompleted, setBreaksCompleted] = useState<number>(0);

  const startSession = useCallback(() => {
    setStatus('RUNNING');
    setMode('WORK');
    setEndTime(Date.now() + WORK_DURATION * 1000);
    setRemainingSeconds(WORK_DURATION);
    setSessionStartTime(Date.now());
    setBreaksCompleted(0);
  }, [WORK_DURATION]);

  const pauseSession = useCallback(() => {
    if (status === 'RUNNING') {
      setStatus('PAUSED');
      setEndTime(null);
    }
  }, [status]);

  const resumeSession = useCallback(() => {
    if (status === 'PAUSED') {
      setStatus('RUNNING');
      setEndTime(Date.now() + remainingSeconds * 1000);
    }
  }, [status, remainingSeconds]);

  const stopSession = useCallback(() => {
    if (sessionStartTime > 0) {
      import('../utils/history').then(({ logSessionRecord }) => {
        logSessionRecord({
          startTime: sessionStartTime,
          endTime: Date.now(),
          activeDurationSeconds: Math.floor((Date.now() - sessionStartTime) / 1000),
          breaksCompleted
        });
      });
    }

    setStatus('IDLE');
    setMode('WORK');
    setEndTime(null);
    setRemainingSeconds(WORK_DURATION);
    setSessionStartTime(0);
    setBreaksCompleted(0);
  }, [WORK_DURATION, sessionStartTime, breaksCompleted]);

  // Timestamp-based timer logic
  useEffect(() => {
    if (status !== 'RUNNING' || !endTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      
      setRemainingSeconds(remaining);

      if (remaining <= 0) {
        if (mode === 'WORK') {
          setMode('BREAK');
          setEndTime(Date.now() + BREAK_DURATION * 1000);
          setRemainingSeconds(BREAK_DURATION);
          playChime();
          sendDesktopNotification("Break Time!", "Look 20 feet away for 20 seconds.");
        } else {
          setMode('WORK');
          setEndTime(Date.now() + WORK_DURATION * 1000);
          setRemainingSeconds(WORK_DURATION);
          setBreaksCompleted(prev => prev + 1);
          playChime();
          sendDesktopNotification("Focus Time!", "Your eye rest is complete.");
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [status, mode, endTime]);

  return (
    <TimerContext.Provider value={{ status, mode, remainingSeconds, startSession, pauseSession, resumeSession, stopSession }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be used within a TimerProvider");
  return context;
}
