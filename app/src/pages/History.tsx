import { useState, useEffect } from 'react';
import { getHistory, SessionRecord } from '../utils/history';

export default function History() {
  const [history, setHistory] = useState<SessionRecord[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-6">Session History</h1>
      
      <div className="flex-1 glass-panel bg-black/10 p-6 rounded-xl overflow-y-auto border-none space-y-4">
        {history.length === 0 ? (
          <div className="text-center text-white/50 mt-10">
            <p>No history yet. Start a session!</p>
          </div>
        ) : (
          history.map(record => (
            <div key={record.id} className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
              <div>
                <p className="font-medium text-lg">
                  {new Date(record.startTime).toLocaleDateString()} at {new Date(record.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm text-white/50">
                  {Math.round(record.activeDurationSeconds / 60)} minutes active
                </p>
              </div>
              <div className="text-right">
                <p className="text-emerald-400 font-bold">{record.breaksCompleted} breaks</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
