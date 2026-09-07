export default function Home() {
  return (
    <div className="p-8 h-full flex flex-col items-center justify-center relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Timer Dashboard</h1>
        <p className="text-white/70 mb-12">20-20-20 Eye Care</p>
        
        {/* Placeholder for Timer UI */}
        <div className="w-64 h-64 rounded-full border-4 border-white/20 flex flex-col items-center justify-center glass-panel mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <span className="text-5xl font-mono font-light tracking-wider">20:00</span>
          <span className="text-sm text-white/50 mt-2 uppercase tracking-widest">Remaining</span>
        </div>

        <div className="flex gap-4">
          <button className="px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all active:scale-95 font-medium">
            Start Session
          </button>
        </div>
      </div>
    </div>
  );
}
