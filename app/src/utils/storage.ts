import { isTauri } from '@tauri-apps/api/core';
import { Store } from '@tauri-apps/plugin-store';

const stores: Record<string, any> = {};

async function getStore(filename: string) {
  if (!stores[filename]) {
    stores[filename] = new Store(filename);
  }
  return stores[filename];
}

export async function setItem(key: string, value: any, filename: string = 'settings.json') {
  if (isTauri()) {
    try {
      const s = await getStore(filename);
      await s.set(key, value);
      await s.save();
      return;
    } catch (e) {
      console.warn("Store error, falling back to localStorage", e);
    }
  }
  localStorage.setItem(`${filename}_${key}`, JSON.stringify(value));
}

export async function getItem<T>(key: string, filename: string = 'settings.json'): Promise<T | null> {
  if (isTauri()) {
    try {
      const s = await getStore(filename);
      const val = await s.get<T>(key);
      if (val !== null && val !== undefined) return val;
    } catch (e) {
      console.warn("Store error, falling back to localStorage", e);
    }
  }
  const val = localStorage.getItem(`${filename}_${key}`);
  return val ? JSON.parse(val) : null;
}
