import { useTimer } from '../context/TimerContext';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff } from 'lucide-react';

export default function Overlay() {
  const { mode, remainingSeconds } = useTimer();

  const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');

  return (
    <AnimatePresence>
      {mode === 'BREAK' && (
        <motion.div 
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pointer-events-auto"
        >
          <div className="glass-panel p-16 flex flex-col items-center justify-center rounded-3xl w-[90%] max-w-4xl min-h-[60vh] border-emerald-500/30 bg-emerald-900/20">
             <EyeOff size={64} className="text-emerald-400 mb-8 opacity-80" />
             <h2 className="text-5xl font-bold mb-4 text-white text-center">Look 20 Feet Away</h2>
             <div className="text-9xl font-mono font-light tracking-wider text-emerald-400 mb-12 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
               {mins}:{secs}
             </div>
             <p className="text-2xl text-white/80 text-center max-w-2xl font-light">
               Focus on an object in the distance to relax your eye muscles and prevent digital eye strain.
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
