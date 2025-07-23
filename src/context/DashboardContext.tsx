import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { 
  storage, 
  STORAGE_KEYS, 
  Habit, 
  Task, 
  UserProfile, 
  Statistics, 
  MoodEntry, 
  TimeSession, 
  AppSettings,
  generateDefaultUserProfile,
  generateDefaultSettings,
  generateDefaultStatistics,
  formatDate
} from '../utils/storage';
import { showElectronNotification, isElectron } from '../utils/electron';

interface DashboardState {
  user: UserProfile;
  habits: Habit[];
  tasks: Task[];
  statistics: Statistics;
  moodEntries: MoodEntry[];
  timeSessions: TimeSession[];
  settings: AppSettings;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    timestamp: Date;
  }>;
  loading: boolean;
}

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

type DashboardAction = 
  // Habits
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'UPDATE_HABIT'; payload: { id: string; updates: Partial<Habit> } }
  | { type: 'DELETE_HABIT'; payload: string }
  | { type: 'TOGGLE_HABIT'; payload: string }
  | { type: 'SET_HABITS'; payload: Habit[] }
  
  // Tasks
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_TASKS'; payload: Task[] }
  
  // User & Settings
  | { type: 'UPDATE_USER'; payload: Partial<UserProfile> }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<AppSettings> }
  
  // Statistics
  | { type: 'UPDATE_STATISTICS'; payload: Partial<Statistics> }
  
  // Mood & Time
  | { type: 'ADD_MOOD_ENTRY'; payload: MoodEntry }
  | { type: 'ADD_TIME_SESSION'; payload: TimeSession }
  | { type: 'SET_MOOD_ENTRIES'; payload: MoodEntry[] }
  | { type: 'SET_TIME_SESSIONS'; payload: TimeSession[] }
  
  // Notifications
  | { type: 'ADD_NOTIFICATION'; payload: { title: string; message: string; type: 'info' | 'warning' | 'success' | 'error' } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  
  // System
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_DATA'; payload: Partial<DashboardState> };

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const generateInitialHabits = (): Habit[] => [
  {
    id: '1',
    name: 'NEURAL_CODING',
    description: 'Daily programming practice',
    category: 'DEVELOPMENT',
    streak: 0,
    completedToday: false,
    completionHistory: {},
    weeklyProgress: [false, false, false, false, false, false, false],
    color: 'from-cyan-400 to-blue-500',
    target: 2,
    unit: 'hours',
    createdAt: new Date(),
    bestStreak: 0,
    totalCompletions: 0
  },
  {
    id: '2',
    name: 'QUANTUM_LEARNING',
    description: 'Study new technologies',
    category: 'EDUCATION',
    streak: 0,
    completedToday: false,
    completionHistory: {},
    weeklyProgress: [false, false, false, false, false, false, false],
    color: 'from-purple-400 to-pink-500',
    target: 1,
    unit: 'hour',
    createdAt: new Date(),
    bestStreak: 0,
    totalCompletions: 0
  },
  {
    id: '3',
    name: 'CYBER_FITNESS',
    description: 'Physical optimization protocol',
    category: 'HEALTH',
    streak: 0,
    completedToday: false,
    completionHistory: {},
    weeklyProgress: [false, false, false, false, false, false, false],
    color: 'from-green-400 to-emerald-500',
    target: 30,
    unit: 'minutes',
    createdAt: new Date(),
    bestStreak: 0,
    totalCompletions: 0
  },
  {
    id: '4',
    name: 'MEDITATION_SYNC',
    description: 'Mental clarity enhancement',
    category: 'WELLNESS',
    streak: 0,
    completedToday: false,
    completionHistory: {},
    weeklyProgress: [false, false, false, false, false, false, false],
    color: 'from-orange-400 to-red-500',
    target: 15,
    unit: 'minutes',
    createdAt: new Date(),
    bestStreak: 0,
    totalCompletions: 0
  }
];

const loadInitialState = (): DashboardState => {
  const habits = storage.load(STORAGE_KEYS.HABITS) || generateInitialHabits();
  const tasks = storage.load(STORAGE_KEYS.TASKS) || [];
  const user = storage.load(STORAGE_KEYS.USER_PROFILE) || generateDefaultUserProfile();
  const statistics = storage.load(STORAGE_KEYS.STATISTICS) || generateDefaultStatistics();
  const moodEntries = storage.load(STORAGE_KEYS.MOOD_ENTRIES) || [];
  const timeSessions = storage.load(STORAGE_KEYS.TIME_SESSIONS) || [];
  const settings = storage.load(STORAGE_KEYS.SETTINGS) || generateDefaultSettings();

  return {
    user,
    habits,
    tasks,
    statistics,
    moodEntries,
    timeSessions,
    settings,
    notifications: [
      {
        id: '1',
        title: 'NEXUS OS INITIALIZED',
        message: 'Neural productivity suite is now online',
        type: 'success',
        timestamp: new Date()
      }
    ],
    loading: false
  };
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  const newState = { ...state };
  
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
      
    case 'LOAD_DATA':
      return { ...state, ...action.payload, loading: false };

    // Habits
    case 'ADD_HABIT':
      newState.habits = [...state.habits, action.payload];
      storage.save(STORAGE_KEYS.HABITS, newState.habits);
      return newState;
      
    case 'UPDATE_HABIT':
      newState.habits = state.habits.map(habit => 
        habit.id === action.payload.id 
          ? { ...habit, ...action.payload.updates }
          : habit
      );
      storage.save(STORAGE_KEYS.HABITS, newState.habits);
      return newState;
      
    case 'DELETE_HABIT':
      newState.habits = state.habits.filter(habit => habit.id !== action.payload);
      storage.save(STORAGE_KEYS.HABITS, newState.habits);
      return newState;
      
    case 'TOGGLE_HABIT': {
      const today = formatDate(new Date());
      newState.habits = state.habits.map(habit => {
        if (habit.id === action.payload) {
          const wasCompleted = habit.completionHistory[today] || false;
          const newCompletedStatus = !wasCompleted;
          
          // Update completion history
          const newHistory = { ...habit.completionHistory, [today]: newCompletedStatus };
          
          // Calculate new streak
          let newStreak = habit.streak;
          if (newCompletedStatus) {
            newStreak = habit.streak + 1;
          } else {
            newStreak = Math.max(0, habit.streak - 1);
          }
          
          // Update best streak
          const newBestStreak = Math.max(habit.bestStreak, newStreak);
          
          // Update total completions
          const newTotalCompletions = newCompletedStatus 
            ? habit.totalCompletions + 1
            : Math.max(0, habit.totalCompletions - 1);
          
          return {
            ...habit,
            streak: newStreak,
            completedToday: newCompletedStatus,
            completionHistory: newHistory,
            bestStreak: newBestStreak,
            totalCompletions: newTotalCompletions
          };
        }
        return habit;
      });
      storage.save(STORAGE_KEYS.HABITS, newState.habits);
      return newState;
    }
      
    case 'SET_HABITS':
      newState.habits = action.payload;
      storage.save(STORAGE_KEYS.HABITS, newState.habits);
      return newState;

    // Tasks
    case 'ADD_TASK':
      newState.tasks = [...state.tasks, action.payload];
      storage.save(STORAGE_KEYS.TASKS, newState.tasks);
      return newState;
      
    case 'UPDATE_TASK':
      newState.tasks = state.tasks.map(task => 
        task.id === action.payload.id 
          ? { ...task, ...action.payload.updates }
          : task
      );
      storage.save(STORAGE_KEYS.TASKS, newState.tasks);
      return newState;
      
    case 'DELETE_TASK':
      newState.tasks = state.tasks.filter(task => task.id !== action.payload);
      storage.save(STORAGE_KEYS.TASKS, newState.tasks);
      return newState;
      
    case 'SET_TASKS':
      newState.tasks = action.payload;
      storage.save(STORAGE_KEYS.TASKS, newState.tasks);
      return newState;

    // User & Settings
    case 'UPDATE_USER':
      newState.user = { ...state.user, ...action.payload };
      storage.save(STORAGE_KEYS.USER_PROFILE, newState.user);
      return newState;
      
    case 'UPDATE_SETTINGS':
      newState.settings = { ...state.settings, ...action.payload };
      storage.save(STORAGE_KEYS.SETTINGS, newState.settings);
      return newState;

    // Statistics
    case 'UPDATE_STATISTICS':
      newState.statistics = { ...state.statistics, ...action.payload };
      storage.save(STORAGE_KEYS.STATISTICS, newState.statistics);
      return newState;

    // Mood & Time
    case 'ADD_MOOD_ENTRY':
      newState.moodEntries = [...state.moodEntries, action.payload];
      storage.save(STORAGE_KEYS.MOOD_ENTRIES, newState.moodEntries);
      return newState;
      
    case 'ADD_TIME_SESSION':
      newState.timeSessions = [...state.timeSessions, action.payload];
      storage.save(STORAGE_KEYS.TIME_SESSIONS, newState.timeSessions);
      return newState;
      
    case 'SET_MOOD_ENTRIES':
      newState.moodEntries = action.payload;
      storage.save(STORAGE_KEYS.MOOD_ENTRIES, newState.moodEntries);
      return newState;
      
    case 'SET_TIME_SESSIONS':
      newState.timeSessions = action.payload;
      storage.save(STORAGE_KEYS.TIME_SESSIONS, newState.timeSessions);
      return newState;

    // Notifications
    case 'ADD_NOTIFICATION':
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: new Date()
      };
      
      newState.notifications = [notification, ...state.notifications.slice(0, 9)]; // Keep only 10 notifications
      
      // Show native notification if in Electron
      if (isElectron()) {
        showElectronNotification(
          notification.title,
          notification.message,
          notification.type === 'error' ? 'critical' : 'normal'
        );
      }
      
      return newState;
      
    case 'REMOVE_NOTIFICATION':
      newState.notifications = state.notifications.filter(n => n.id !== action.payload);
      return newState;

    default:
      return state;
  }
}

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, loadInitialState());

  useEffect(() => {
    // Update habits' completedToday status based on current date
    const today = formatDate(new Date());
    const updatedHabits = state.habits.map(habit => ({
      ...habit,
      completedToday: habit.completionHistory[today] || false
    }));
    
    // Update weekly progress for all habits
    const habitsWithUpdatedWeekly = updatedHabits.map(habit => {
      const weeklyProgress = [];
      const now = new Date();
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = formatDate(date);
        weeklyProgress.push(habit.completionHistory[dateKey] || false);
      }
      return { ...habit, weeklyProgress };
    });

    if (JSON.stringify(habitsWithUpdatedWeekly) !== JSON.stringify(state.habits)) {
      dispatch({ type: 'SET_HABITS', payload: habitsWithUpdatedWeekly });
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (state.settings.autoSave) {
      const autoSaveInterval = setInterval(() => {
        // Automatically save all data every 30 seconds
        storage.save(STORAGE_KEYS.HABITS, state.habits);
        storage.save(STORAGE_KEYS.TASKS, state.tasks);
        storage.save(STORAGE_KEYS.USER_PROFILE, state.user);
        storage.save(STORAGE_KEYS.STATISTICS, state.statistics);
        storage.save(STORAGE_KEYS.MOOD_ENTRIES, state.moodEntries);
        storage.save(STORAGE_KEYS.TIME_SESSIONS, state.timeSessions);
        storage.save(STORAGE_KEYS.SETTINGS, state.settings);
      }, 30000);

      return () => clearInterval(autoSaveInterval);
    }
  }, [state, state.settings.autoSave]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};