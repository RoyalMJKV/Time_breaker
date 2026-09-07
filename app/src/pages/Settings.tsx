import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const { settings, updateSettings, isLoading } = useSettings();

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="flex-1 glass-panel bg-black/10 p-8 rounded-xl border-none space-y-8 overflow-y-auto">
        <div>
          <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-2">Timer Configuration</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">Focus Interval (Minutes)</p>
                <p className="text-sm text-white/50">Time before you take a break.</p>
              </div>
              <input 
                type="number" 
                min="1" max="120"
                value={settings.workDurationMinutes}
                onChange={(e) => updateSettings({ workDurationMinutes: parseInt(e.target.value) || 20 })}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 w-24 text-right text-lg outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-lg">Break Duration (Seconds)</p>
                <p className="text-sm text-white/50">How long you should look away.</p>
              </div>
              <input 
                type="number" 
                min="5" max="300"
                value={settings.breakDurationSeconds}
                onChange={(e) => updateSettings({ breakDurationSeconds: parseInt(e.target.value) || 25 })}
                className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 w-24 text-right text-lg outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-2">System Integrations</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-lg">Start on Boot</p>
              <p className="text-sm text-white/50">Launch silently in system tray.</p>
            </div>
            <button 
              onClick={() => updateSettings({ startOnBoot: !settings.startOnBoot })}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${settings.startOnBoot ? 'bg-emerald-500' : 'bg-white/20'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${settings.startOnBoot ? 'left-6' : 'left-0.5'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
