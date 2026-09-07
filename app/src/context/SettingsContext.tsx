import React, { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storage';

export interface AppSettings {
  workDurationMinutes: number;
  breakDurationSeconds: number;
  startOnBoot: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  workDurationMinutes: 20,
  breakDurationSeconds: 25,
  startOnBoot: false,
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const stored = await getItem<AppSettings>('preferences', 'settings.json');
      if (stored) {
        setSettings({ ...DEFAULT_SETTINGS, ...stored });
      }
      setIsLoading(false);
    }
    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await setItem('preferences', updated, 'settings.json');

    if (newSettings.startOnBoot !== undefined) {
      import('../utils/autostart').then(({ setAutostart }) => setAutostart(newSettings.startOnBoot!));
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within SettingsProvider");
  return context;
}
