// Electron integration utilities
declare global {
  interface Window {
    electronAPI?: {
      onNavigate: (callback: (event: any, view: string) => void) => void;
      showNotification: (notification: {
        title: string;
        body: string;
        urgency?: 'normal' | 'critical' | 'low';
      }) => Promise<boolean>;
      getAppVersion: () => Promise<string>;
      getAppPath: () => Promise<string>;
      platform: string;
      isDev: boolean;
      removeAllListeners: (channel: string) => void;
    };
  }
}

export const isElectron = () => {
  return window.electronAPI !== undefined;
};

export const showElectronNotification = async (
  title: string,
  body: string,
  urgency: 'normal' | 'critical' | 'low' = 'normal'
): Promise<boolean> => {
  if (isElectron() && window.electronAPI) {
    try {
      return await window.electronAPI.showNotification({ title, body, urgency });
    } catch (error) {
      console.error('Failed to show electron notification:', error);
      return false;
    }
  }
  return false;
};

export const getAppVersion = async (): Promise<string> => {
  if (isElectron() && window.electronAPI) {
    try {
      return await window.electronAPI.getAppVersion();
    } catch (error) {
      console.error('Failed to get app version:', error);
      return '1.0.0';
    }
  }
  return '1.0.0';
};

export const getPlatform = (): string => {
  if (isElectron() && window.electronAPI) {
    return window.electronAPI.platform;
  }
  return 'web';
};

export const isDevelopment = (): boolean => {
  if (isElectron() && window.electronAPI) {
    return window.electronAPI.isDev;
  }
  return false;
};

export const setupElectronNavigation = (onNavigate: (view: string) => void) => {
  if (isElectron() && window.electronAPI) {
    window.electronAPI.onNavigate((event: any, view: string) => {
      onNavigate(view);
    });
  }
};

export const cleanupElectronListeners = () => {
  if (isElectron() && window.electronAPI) {
    window.electronAPI.removeAllListeners('navigate-to');
  }
};