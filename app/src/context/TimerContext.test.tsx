import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TimerProvider, useTimer } from './TimerContext';
import { SettingsProvider } from './SettingsContext';
import React from 'react';

// Mock storage so it doesn't try to access localStorage/Tauri
vi.mock('../utils/storage', () => ({
  getItem: vi.fn().mockResolvedValue({
    workDurationMinutes: 20,
    breakDurationSeconds: 25,
    startOnBoot: false,
  }),
  setItem: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SettingsProvider>
    <TimerProvider>
      {children}
    </TimerProvider>
  </SettingsProvider>
);

describe('TimerContext State Machine', () => {
  it('should initialize with IDLE state', async () => {
    const { result } = renderHook(() => useTimer(), { wrapper });
    
    expect(result.current.status).toBe('IDLE');
    expect(result.current.mode).toBe('WORK');
  });

  it('should transition to RUNNING when startSession is called', () => {
    const { result } = renderHook(() => useTimer(), { wrapper });
    
    act(() => {
      result.current.startSession();
    });
    
    expect(result.current.status).toBe('RUNNING');
    expect(result.current.mode).toBe('WORK');
  });

  it('should transition to PAUSED when pauseSession is called', () => {
    const { result } = renderHook(() => useTimer(), { wrapper });
    
    act(() => {
      result.current.startSession();
    });
    
    act(() => {
      result.current.pauseSession();
    });
    
    expect(result.current.status).toBe('PAUSED');
  });

  it('should transition back to RUNNING when resumeSession is called', () => {
    const { result } = renderHook(() => useTimer(), { wrapper });
    
    act(() => {
      result.current.startSession();
    });
    
    act(() => {
      result.current.pauseSession();
    });
    
    act(() => {
      result.current.resumeSession();
    });
    
    expect(result.current.status).toBe('RUNNING');
  });

  it('should transition to IDLE when stopSession is called', () => {
    const { result } = renderHook(() => useTimer(), { wrapper });
    
    act(() => {
      result.current.startSession();
    });
    
    act(() => {
      result.current.stopSession();
    });
    
    expect(result.current.status).toBe('IDLE');
  });
});
