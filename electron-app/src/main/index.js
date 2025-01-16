import { app, BrowserWindow,session } from 'electron' 
import { electronApp, optimizer } from '@electron-toolkit/utils' 
import { createMainWindow } from '../windows/mainWindow' 
import {initializeIpcHandlers} from './../icp/icpHandlers' 

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit(); // Quit if another instance is already running
} else {
  app.on('second-instance', (event, argv, workingDirectory) => {
    // Handle a second instance request (e.g., bring window to focus)
    const mainWindow = BrowserWindow.getAllWindows()[0];
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
// When the app is ready
// Some APIs can only be used after this event occurs.
app.whenReady().then(async() => {
  try {
        // Set app user model id for windows
        electronApp.setAppUserModelId('com.electron')
        // Watch window shortcuts (e.g., F12 for devtools)
        // and ignore CommandOrControl + R in production. 
        app.on('browser-window-created', (_, window) => {
          optimizer.watchWindowShortcuts(window)
        }) 
        
        // Initialize all IPC handlers
          await initializeIpcHandlers()

        // Create the main application window
        const mainWindow = createMainWindow()

        // Re-create a window on macOS if none are open
        app.on('activate', ()=> { 
          if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
        })
  } catch (error) {
    console.error('Error during app initialization:', error);
    app.quit(); // Exit if there's a critical error
  }
})
// Quit the app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// Minimize the window
}