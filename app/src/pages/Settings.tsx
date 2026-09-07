export default function Settings() {
  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="flex-1 glass-panel bg-black/10 p-6 rounded-xl border-none space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">Reminder</h2>
          <div className="flex items-center justify-between py-2">
            <span>Interval (Minutes)</span>
            <span className="text-white/70">20</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span>Break Duration (Seconds)</span>
            <span className="text-white/70">25</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2">System</h2>
          <div className="flex items-center justify-between py-2">
            <span>Start on Boot</span>
            <div className="w-12 h-6 bg-white/20 rounded-full"></div>
          </div>
        </div>
        
        <p className="text-center text-white/40 text-sm mt-8">
          Functional settings will be implemented in Phase 4.
        </p>
      </div>
    </div>
  );
}
