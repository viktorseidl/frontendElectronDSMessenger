import { BrowserWindow, shell,session,app } from 'electron';
import { join } from 'path';
import path from 'path'
import { is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.ico';
export async function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    //icon: path.join(__dirname,'/../renderer/src/assets/icon.ico'),
    backgroundColor: '#0c101b',
    autoHideMenuBar: true,
    titleBarStyle: 'hidden',
    //...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: {
      session: session,
      preload: join(__dirname, '/../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: true,
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
    const args = process.argv.slice(1);
    let route = "/";
    if (args.length > 0) {
      // shell commando --->   electron path/to/main.js "user=johndoe" "token=abcd1234"
      // Convert arguments into a query string format
      const queryString = 'user='+args[0]+'&token='+args[1];
      route = `/extlogin?${queryString}`; // Open login page with query params
      mainWindow.loadFile(path.join(__dirname, '../../out/renderer/index.html'), {
        hash: route, // Uses hash routing to navigate inside React
      });
    }else{
    mainWindow.loadFile(path.join(__dirname, '../../out/renderer/index.html'));
    }
  }


  return mainWindow;
}