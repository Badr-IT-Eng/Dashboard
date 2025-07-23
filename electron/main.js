const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain, shell, dialog, Notification } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Keep a global reference of the window object
let mainWindow;
let tray;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    titleBarStyle: 'hiddenInset',
    frame: true,
    show: false,
    icon: path.join(__dirname, '../assets/icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:5173' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on the window
    if (isDev) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Prevent navigation away from the app
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'http://localhost:5173' && parsedUrl.origin !== 'file://') {
      event.preventDefault();
      shell.openExternal(navigationUrl);
    }
  });
}

function createTray() {
  // Create tray icon
  const trayIcon = nativeImage.createFromPath(path.join(__dirname, '../assets/tray-icon.png'));
  tray = new Tray(trayIcon.resize({ width: 16, height: 16 }));
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'NEXUS OS - Neural Productivity Suite',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Show App',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          createWindow();
        }
      }
    },
    {
      label: 'Hide App',
      click: () => {
        if (mainWindow) {
          mainWindow.hide();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Quick Actions',
      submenu: [
        {
          label: 'Add Habit',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
              mainWindow.webContents.send('navigate-to', 'habits');
            }
          }
        },
        {
          label: 'Add Task',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
              mainWindow.webContents.send('navigate-to', 'tasks');
            }
          }
        },
        {
          label: 'Start Pomodoro',
          click: () => {
            if (mainWindow) {
              mainWindow.show();
              mainWindow.focus();
              mainWindow.webContents.send('navigate-to', 'timer');
            }
          }
        }
      ]
    },
    { type: 'separator' },
    {
      label: 'Quit NEXUS OS',
      click: () => {
        app.quit();
      }
    }
  ]);
  
  tray.setToolTip('NEXUS OS - Neural Productivity Suite');
  tray.setContextMenu(contextMenu);
  
  // Double click to show/hide
  tray.on('double-click', () => {
    if (mainWindow) {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    } else {
      createWindow();
    }
  });
}

function createMenu() {
  const template = [
    {
      label: 'NEXUS OS',
      submenu: [
        {
          label: 'About NEXUS OS',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About NEXUS OS',
              message: 'NEXUS OS - Neural Productivity Suite',
              detail: 'A comprehensive productivity dashboard for habits, tasks, time tracking, and learning.\n\nVersion: 1.0.0\nBuilt with Electron & React'
            });
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('navigate-to', 'settings');
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Hide NEXUS OS',
          accelerator: 'CmdOrCtrl+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'CmdOrCtrl+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Today Overview',
          accelerator: 'CmdOrCtrl+1',
          click: () => mainWindow?.webContents.send('navigate-to', 'overview')
        },
        {
          label: 'Habit Matrix',
          accelerator: 'CmdOrCtrl+2',
          click: () => mainWindow?.webContents.send('navigate-to', 'habits')
        },
        {
          label: 'Task Manager',
          accelerator: 'CmdOrCtrl+3',
          click: () => mainWindow?.webContents.send('navigate-to', 'tasks')
        },
        {
          label: 'Focus Timer',
          accelerator: 'CmdOrCtrl+4',
          click: () => mainWindow?.webContents.send('navigate-to', 'timer')
        },
        {
          label: 'Cloud Security Path',
          accelerator: 'CmdOrCtrl+5',
          click: () => mainWindow?.webContents.send('navigate-to', 'cloud-security')
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow?.reload()
        },
        {
          label: 'Force Reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => mainWindow?.webContents.reloadIgnoringCache()
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          click: () => mainWindow?.webContents.toggleDevTools()
        },
        { type: 'separator' },
        {
          label: 'Actual Size',
          accelerator: 'CmdOrCtrl+0',
          role: 'resetzoom'
        },
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          role: 'zoomin'
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          role: 'zoomout'
        },
        { type: 'separator' },
        {
          label: 'Toggle Fullscreen',
          accelerator: 'F11',
          role: 'togglefullscreen'
        }
      ]
    },
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// App event handlers
app.whenReady().then(() => {
  createWindow();
  createTray();
  createMenu();
  
  // Show welcome notification
  if (Notification.isSupported()) {
    new Notification({
      title: 'NEXUS OS Initialized',
      body: 'Neural Productivity Suite is now online',
      icon: path.join(__dirname, '../assets/icon.png')
    }).show();
  }
});

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS, re-create window when dock icon is clicked
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  // Perform cleanup before quitting
  if (mainWindow) {
    mainWindow.removeAllListeners('close');
  }
});

// IPC handlers
ipcMain.handle('show-notification', async (event, { title, body, urgency = 'normal' }) => {
  if (Notification.isSupported()) {
    const notification = new Notification({
      title,
      body,
      icon: path.join(__dirname, '../assets/icon.png'),
      urgency
    });
    
    notification.show();
    return true;
  }
  return false;
});

ipcMain.handle('get-app-version', async () => {
  return app.getVersion();
});

ipcMain.handle('get-app-path', async () => {
  return app.getAppPath();
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

// Handle certificate errors
app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  if (isDev) {
    // In development, ignore certificate errors
    event.preventDefault();
    callback(true);
  } else {
    // In production, use default behavior
    callback(false);
  }
});

// Auto-updater (for future use)
if (!isDev) {
  // Auto-updater logic can be added here
  console.log('Production mode - auto-updater ready');
}