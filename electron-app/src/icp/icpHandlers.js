import { ipcMain,BrowserWindow,session,app } from 'electron'; 

//import keytar from 'keytar';

export async function initializeIpcHandlers() { 
  const mainsession = session.defaultSession;
    //WINDOWS HANDLER
    ipcMain.on('window-minimize', (event) => {
        const win = BrowserWindow.getFocusedWindow();
        if (win) {
            win.minimize();
          } else {
            console.warn('No focused window to minimize.');
          }
    });
    ipcMain.on('window-maximize', (event) => {
      const win = BrowserWindow.getFocusedWindow();
      if (win) {
        if (win.isMaximized()) {
          win.restore();
        } else {
          win.maximize();
        }
      }
    }); 
    ipcMain.on('window-close', (event) => {
      const win = BrowserWindow.getFocusedWindow();
      if (win) win.close();
    });
    ipcMain.handle('log-in-frontend', (event, message) => {
      console.log(`Main Process Log: ${message}`);
      return message;
    })
    //COOKIE HANDLER
    ipcMain.handle('check-cookie', async (event, { cookieName }) => {
      const isDev = !app.isPackaged;
      const url = isDev
        ? 'http://localhost:5173'
        : `file://${path.join(app.getAppPath()+'/')}`;
         
      try {
        const cookies = await mainsession.cookies.get({ name: cookieName }); 
        return cookies.length ? cookies[0] : null;
      } catch (error) {
        return false;
      }
    });
    ipcMain.handle('set-cookie', async (event, { cookie }) => {
      const isDev = !app.isPackaged;
      const url = isDev
      ? 'http://localhost'
      : `file://${path.join(app.getAppPath()+'/')}`;
      let c= {
        url: url,
        secure:true,
        name: cookie.name,
        value: cookie.value,
        expirationDate: cookie.expirationDate,
      }; 
      try {
        await mainsession.cookies.set(c)
        return true
      } catch (error) {
        return false;
      }
    });
    ipcMain.handle('remove-cookie', async (event, { cookieName }) => {
      const isDev = !app.isPackaged;
      const url = isDev
      ? 'http://localhost'
      : `file://${path.join(app.getAppPath()+'/')}`;
      try {
        await mainsession.cookies.remove(url,cookieName)
        return true
      } catch (error) {
        return false;
      }
    });
    ipcMain.handle('get-cookies', async (event, { cookieName }) => {
      const isDev = !app.isPackaged;
      const url = isDev
      ? 'http://localhost'
      : `file://${path.join(app.getAppPath()+'/')}`;
      try {
        const cookies = await mainsession.cookies.get({url:url, name: cookieName })
        console.log(cookies)
        return cookies.length ? cookies[0] : null;
      } catch (error) {
        return false;
      }
    });
     

  /*  
   
  // Keytar handlers
  ipcMain.handle('keytar-set', async (event, service, account, password) => {
    try {
      await keytar.setPassword(service, account, password);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('keytar-get', async (event, service, account) => {
    try {
      const password = await keytar.getPassword(service, account);
      return { success: true, password };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle('keytar-delete', async (event, service, account) => {
    try {
      const result = await keytar.deletePassword(service, account);
      return { success: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Cookie handlers
  

  ;*/
}