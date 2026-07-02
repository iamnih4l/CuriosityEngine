const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveSetting: (key, value) => ipcRenderer.invoke('save-setting', key, value),
  getSetting: (key) => ipcRenderer.invoke('get-setting', key),
  getQueue: () => ipcRenderer.invoke('get-queue'),
  setQueue: (queue) => ipcRenderer.invoke('save-queue', queue),
  getStreak: () => ipcRenderer.invoke('get-streak'),
  updateStreak: (data) => ipcRenderer.invoke('update-streak', data),
  saveFavorite: (topic) => ipcRenderer.invoke('save-favorite', topic),
  getFavorites: () => ipcRenderer.invoke('get-favorites'),
  removeFavorite: (id) => ipcRenderer.invoke('remove-favorite', id),
  getHistory: () => ipcRenderer.invoke('get-history'),
  saveToHistory: (topic) => ipcRenderer.invoke('save-history', topic),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
});
