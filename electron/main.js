import { app, BrowserWindow, ipcMain, screen, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store({
  defaults: {
    favorites: [],
    history: [],
    streak: {
      consecutiveDays: 0,
      lastActiveDate: null,
      topicsExplored: 0,
    },
    settings: {
      categories: ['Astrophysics', 'Philosophy', 'Artificial Intelligence', 'Mathematics', 'Biology'],
      apiKey: '',
      theme: 'dark',
      notificationTime: '09:00',
      aiProvider: 'gemini'
    }
  }
});

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 350,
    height: 500,
    x: width - 370,
    y: 50,
    transparent: true,
    frame: false,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Setup IPC Handlers
  ipcMain.handle('get-setting', (event, key) => store.get(`settings.${key}`));
  ipcMain.handle('save-setting', (event, key, value) => {
    store.set(`settings.${key}`, value);
    return true;
  });

  ipcMain.handle('get-streak', () => store.get('streak'));
  ipcMain.handle('update-streak', (event, data) => {
    store.set('streak', data);
    return true;
  });

  ipcMain.handle('get-favorites', () => store.get('favorites'));
  ipcMain.handle('save-favorite', (event, topic) => {
    const favs = store.get('favorites') || [];
    if (!favs.find(f => f.title === topic.title)) {
      favs.push(topic);
      store.set('favorites', favs);
    }
    return true;
  });
  ipcMain.handle('remove-favorite', (event, id) => {
    const favs = store.get('favorites') || [];
    store.set('favorites', favs.filter(f => f.title !== id)); // Using title as id for simplicity
    return true;
  });

  ipcMain.handle('get-history', () => store.get('history'));
  ipcMain.handle('save-history', (event, topic) => {
    const hist = store.get('history') || [];
    hist.push(topic);
    store.set('history', hist);
    return true;
  });

  ipcMain.handle('open-external', (event, url) => {
    shell.openExternal(url);
    return true;
  });
}

app.whenReady().then(() => {
  // Set app to launch at login
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
