import { BrowserWindow, shell,session,app } from 'electron';
import { join } from 'path';
import path from 'path'
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset'; 
export async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    backgroundColor: '#0c101b',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      session: session,
      preload: join(__dirname, '/../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
    frame: false,
  });

  // Show the window when it's ready
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Prevent external URLs from opening inside the app
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
  const isDev = !app.isPackaged;
  // Load the appropriate content (remote URL in dev or local file in production)
  if (isDev) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../out/renderer/index.html'));
  }


  return mainWindow;
}