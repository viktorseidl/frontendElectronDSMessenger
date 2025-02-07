import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  logToFrontend: (message)=>ipcRenderer.invoke('log-in-frontend',message),
  windowControls:{
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
  }, 
  keytarAPI:{
    setPassword: (service, account, password) =>
      ipcRenderer.invoke('keytar-set', service, account, password),
    getPassword: (service, account) =>
      ipcRenderer.invoke('keytar-get', service, account),
    deletePassword: (service, account) =>
      ipcRenderer.invoke('keytar-delete', service, account),
  },
  electronCookies: {
    setCookie: async (cookie) => ipcRenderer.invoke('set-cookie', {cookie}),
    getCookies: async (cookieName) => ipcRenderer.invoke('get-cookies', { cookieName }),
    removeCookie: async (cookieName) => ipcRenderer.invoke('remove-cookie', { cookieName }),
    checkCookie: async (cookieName) => 
      ipcRenderer.invoke('check-cookie', { cookieName }), 
  }, 
  electronFiles: {
    saveFile: async (pdfBase64,filename) => ipcRenderer.invoke('save-file', {pdfBase64,filename}), 
  },
}
 
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', { electronAPI });
    contextBridge.exposeInMainWorld('api', api);
  } catch (error) {
    console.error('Error exposing APIs:', error);
  } 
} else {
  window.electron = electronAPI
  window.api = api
}
