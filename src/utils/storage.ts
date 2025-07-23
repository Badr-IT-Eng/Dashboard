// Local Storage Utilities for NEXUS OS
export const STORAGE_KEYS = {
  HABITS: 'nexus_habits',
  TASKS: 'nexus_tasks',
  USER_PROFILE: 'nexus_user',
  STATISTICS: 'nexus_stats',
  MOOD_ENTRIES: 'nexus_mood',
  TIME_SESSIONS: 'nexus_time_sessions',
  SETTINGS: 'nexus_settings'
} as const;

export interface StorageData {
  [STORAGE_KEYS.HABITS]: Habit[];
  [STORAGE_KEYS.TASKS]: Task[];
  [STORAGE_KEYS.USER_PROFILE]: UserProfile;
  [STORAGE_KEYS.STATISTICS]: Statistics;
  [STORAGE_KEYS.MOOD_ENTRIES]: MoodEntry[];
  [STORAGE_KEYS.TIME_SESSIONS]: TimeSession[];
  [STORAGE_KEYS.SETTINGS]: AppSettings;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  streak: number;
  completedToday: boolean;
  completionHistory: Record<string, boolean>; // date -> completed
  weeklyProgress: boolean[];
  color: string;
  target: number;
  unit: string;
  createdAt: Date;
  bestStreak: number;
  totalCompletions: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  estimatedMinutes?: number;
  actualMinutes?: number;
  tags: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  timezone: string;
  joinedAt: Date;
  preferences: {
    theme: 'cyber' | 'matrix' | 'neon';
    notifications: boolean;
    soundEffects: boolean;
    autoBackup: boolean;
  };
}

export interface Statistics {
  totalHabitsCompleted: number;
  totalTasksCompleted: number;
  totalTimeTracked: number; // in minutes
  longestStreak: number;
  productiveHours: number[];
  weeklyStats: {
    week: string;
    habitsCompleted: number;
    tasksCompleted: number;
    timeTracked: number;
  }[];
  monthlyGoals: {
    month: string;
    habitsTarget: number;
    tasksTarget: number;
    timeTarget: number;
    achieved: boolean;
  }[];
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: 1 | 2 | 3 | 4 | 5; // 1 = very bad, 5 = excellent
  energy: 1 | 2 | 3 | 4 | 5;
  focus: 1 | 2 | 3 | 4 | 5;
  notes: string;
  tags: string[];
  activities: string[];
}

export interface TimeSession {
  id: string;
  type: 'focus' | 'break' | 'pomodoro' | 'deep_work';
  duration: number; // in minutes
  startTime: Date;
  endTime: Date;
  task?: string;
  category: string;
  productivity: 1 | 2 | 3 | 4 | 5;
  interruptions: number;
}

export interface AppSettings {
  theme: 'cyber' | 'matrix' | 'neon';
  language: string;
  timezone: string;
  notifications: {
    habits: boolean;
    tasks: boolean;
    timeTracking: boolean;
    achievements: boolean;
  };
  pomodoro: {
    workDuration: number;
    shortBreak: number;
    longBreak: number;
    sessionsUntilLongBreak: number;
  };
  autoSave: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

class StorageManager {
  private static instance: StorageManager;

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  save<K extends keyof StorageData>(key: K, data: StorageData[K]): void {
    try {
      const serialized = JSON.stringify(data, (key, value) => {
        if (value instanceof Date) {
          return { __type: 'Date', value: value.toISOString() };
        }
        return value;
      });
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Failed to save to localStorage for key ${key}:`, error);
    }
  }

  load<K extends keyof StorageData>(key: K): StorageData[K] | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
      
      return JSON.parse(item, (key, value) => {
        if (value && typeof value === 'object' && value.__type === 'Date') {
          return new Date(value.value);
        }
        return value;
      });
    } catch (error) {
      console.error(`Failed to load from localStorage for key ${key}:`, error);
      return null;
    }
  }

  remove(key: keyof StorageData): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove from localStorage for key ${key}:`, error);
    }
  }

  clear(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  export(): string {
    const data: Partial<StorageData> = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = this.load(key as keyof StorageData);
      if (item) {
        data[key as keyof StorageData] = item as any;
      }
    });
    return JSON.stringify(data, null, 2);
  }

  import(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      Object.entries(data).forEach(([key, value]) => {
        if (Object.values(STORAGE_KEYS).includes(key as any)) {
          this.save(key as keyof StorageData, value as any);
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  getStorageSize(): { used: number; remaining: number } {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    
    // Approximate localStorage limit (5MB)
    const limit = 5 * 1024 * 1024;
    return {
      used: totalSize,
      remaining: limit - totalSize
    };
  }
}

export const storage = StorageManager.getInstance();

// Default data generators
export const generateDefaultUserProfile = (): UserProfile => ({
  name: 'Neural Agent',
  email: 'agent@nexusos.dev',
  avatar: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  joinedAt: new Date(),
  preferences: {
    theme: 'cyber',
    notifications: true,
    soundEffects: true,
    autoBackup: true
  }
});

export const generateDefaultSettings = (): AppSettings => ({
  theme: 'cyber',
  language: 'en',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  notifications: {
    habits: true,
    tasks: true,
    timeTracking: true,
    achievements: true
  },
  pomodoro: {
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4
  },
  autoSave: true,
  backupFrequency: 'daily'
});

export const generateDefaultStatistics = (): Statistics => ({
  totalHabitsCompleted: 0,
  totalTasksCompleted: 0,
  totalTimeTracked: 0,
  longestStreak: 0,
  productiveHours: Array(24).fill(0),
  weeklyStats: [],
  monthlyGoals: []
});

// Utility functions
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getWeekKey = (date: Date): string => {
  const year = date.getFullYear();
  const week = Math.ceil((date.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${year}-W${week.toString().padStart(2, '0')}`;
};

export const getMonthKey = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};