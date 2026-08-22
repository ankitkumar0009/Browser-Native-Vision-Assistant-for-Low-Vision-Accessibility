export interface HistoryItem {
  id: string;
  type: 'analysis' | 'ocr';
  date: string;
  content: string;
}

export const getHistory = (): HistoryItem[] => {
  try {
    const data = localStorage.getItem('vision_history');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveHistory = (item: Omit<HistoryItem, 'id' | 'date'>) => {
  if (localStorage.getItem('privacy_storeHistory') !== 'true') return;
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: Math.random().toString(36).substring(2, 9),
    date: new Date().toISOString()
  };
  localStorage.setItem('vision_history', JSON.stringify([newItem, ...history].slice(0, 50)));
};

export const clearHistory = () => {
  localStorage.removeItem('vision_history');
};
