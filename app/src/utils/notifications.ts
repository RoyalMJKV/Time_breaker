import { isTauri } from '@tauri-apps/api/core';
import { sendNotification, isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';

export async function sendDesktopNotification(title: string, body: string) {
  try {
    if (isTauri()) {
       let permissionGranted = await isPermissionGranted();
       if (!permissionGranted) {
         const permission = await requestPermission();
         permissionGranted = permission === 'granted';
       }
       
       if (permissionGranted) {
         sendNotification({ title, body });
       }
    } else {
       // Web browser fallback
       if (Notification.permission === 'granted') {
         new Notification(title, { body });
       } else if (Notification.permission !== 'denied') {
         const permission = await Notification.requestPermission();
         if (permission === 'granted') {
           new Notification(title, { body });
         }
       }
    }
  } catch (e) {
    console.error("Failed to send notification", e);
  }
}
