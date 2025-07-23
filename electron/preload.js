const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Navigation
  onNavigate: (callback) => {
    ipcRenderer.on('navigate-to', callback);
  },
  
  // Notifications
  showNotification: (notification) => {
    return ipcRenderer.invoke('show-notification', notification);
  },
  
  // App info
  getAppVersion: () => {
    return ipcRenderer.invoke('get-app-version');
  },
  
  getAppPath: () => {
    return ipcRenderer.invoke('get-app-path');
  },
  
  // Platform info
  platform: process.platform,
  
  // Environment
  isDev: process.env.NODE_ENV === 'development',
  
  // Remove listeners (cleanup)
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel);
  }
});

// Security: Remove node integration
delete window.require;
delete window.exports;
delete window.module;

// Console override for better debugging
if (process.env.NODE_ENV === 'development') {
  window.electronLog = {
    info: (...args) => console.log('[Electron]', ...args),
    warn: (...args) => console.warn('[Electron]', ...args),
    error: (...args) => console.error('[Electron]', ...args)
  };
}