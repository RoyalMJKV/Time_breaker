import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

const WORK_DURATION = 20 * 60; // 20 minutes
const BREAK_DURATION = 25; // 25 seconds

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<TimerStatus>('IDLE');
  const [mode, setMode] = useState<TimerMode>('WORK');
  
  const [endTime, setEndTime] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(WORK_DURATION);

  const startSession = useCallback(() => {
    setStatus('RUNNING');
    setMode('WORK');
    setEndTime(Date.now() + WORK_DURATION * 1000);
    setRemainingSeconds(WORK_DURATION);
  }, []);

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
    setStatus('IDLE');
    setMode('WORK');
    setEndTime(null);
    setRemainingSeconds(WORK_DURATION);
  }, []);

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
        } else {
          setMode('WORK');
          setEndTime(Date.now() + WORK_DURATION * 1000);
          setRemainingSeconds(WORK_DURATION);
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
