import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';
import { isTauri } from '@tauri-apps/api/core';

export async function setAutostart(enableAutostart: boolean) {
  if (!isTauri()) {
    console.log("Autostart toggled (Web Mock):", enableAutostart);
    return;
  }
  try {
    if (enableAutostart) {
      await enable();
    } else {
      await disable();
    }
  } catch (e) {
    console.error("Failed to set autostart", e);
  }
}

export async function checkAutostart(): Promise<boolean> {
  if (!isTauri()) return false;
  try {
    return await isEnabled();
  } catch {
    return false;
  }
}
