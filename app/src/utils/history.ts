import { getItem, setItem } from './storage';

export interface SessionRecord {
  id: string;
  startTime: number;
  endTime: number;
  activeDurationSeconds: number;
  breaksCompleted: number;
}

export async function logSessionRecord(record: Omit<SessionRecord, 'id'>) {
  try {
    const history = await getItem<SessionRecord[]>('records', 'history.json') || [];
    const newRecord: SessionRecord = {
      ...record,
      id: crypto.randomUUID(),
    };
    history.unshift(newRecord); // Add to beginning
    // Keep only last 100 sessions
    if (history.length > 100) history.pop();
    await setItem('records', history, 'history.json');
  } catch (e) {
    console.error("Failed to save history", e);
  }
}

export async function getHistory(): Promise<SessionRecord[]> {
  try {
    return await getItem<SessionRecord[]>('records', 'history.json') || [];
  } catch {
    return [];
  }
}
