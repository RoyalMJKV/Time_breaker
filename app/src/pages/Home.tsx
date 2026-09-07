import { useTimer } from '../context/TimerContext';
import { Play, Pause, Square } from 'lucide-react';

export default function Home() {
  const { status, mode, remainingSeconds, startSession, pauseSession, resumeSession, stopSession } = useTimer();

  const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center relative">
      {/* Background decoration */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-1000 ${mode === 'BREAK' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'}`} />
      
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Timer Dashboard</h1>
        <p className="text-white/70 mb-12">
          {status === 'IDLE' ? 'Ready to focus' : mode === 'WORK' ? 'Focus Time' : 'Take a Break!'}
        </p>
        
        <div className={`w-64 h-64 rounded-full border-4 flex flex-col items-center justify-center glass-panel mb-8 relative overflow-hidden transition-colors duration-500 ${mode === 'BREAK' ? 'border-emerald-400 bg-emerald-500/10' : 'border-white/20'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <span className="text-5xl font-mono font-light tracking-wider">{mins}:{secs}</span>
          <span className="text-sm text-white/50 mt-2 uppercase tracking-widest">{mode}</span>
        </div>

        <div className="flex gap-4">
          {status === 'IDLE' ? (
            <button onClick={startSession} className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-95 font-medium flex items-center gap-2">
              <Play size={20} /> Start Session
            </button>
          ) : (
            <>
              {status === 'RUNNING' ? (
                <button onClick={pauseSession} className="px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-100 transition-all active:scale-95 font-medium flex items-center gap-2">
                  <Pause size={20} /> Pause
                </button>
              ) : (
                <button onClick={resumeSession} className="px-6 py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-100 transition-all active:scale-95 font-medium flex items-center gap-2">
                  <Play size={20} /> Resume
                </button>
              )}
              <button onClick={stopSession} className="px-6 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-100 transition-all active:scale-95 font-medium flex items-center gap-2">
                <Square size={20} /> Stop
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
