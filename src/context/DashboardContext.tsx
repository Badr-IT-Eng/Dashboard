import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface DashboardState {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  stats: {
    totalProgress: number;
    activeGoals: number;
    completedTasks: number;
    timeSaved: number;
  };
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error';
    timestamp: Date;
  }>;
}

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<any>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialState: DashboardState = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: ''
  },
  stats: {
    totalProgress: 87,
    activeGoals: 24,
    completedTasks: 156,
    timeSaved: 2.4
  },
  notifications: [
    {
      id: '1',
      title: 'Goal Completed',
      message: 'Frontend development milestone reached',
      type: 'success',
      timestamp: new Date()
    }
  ]
};

function dashboardReducer(state: DashboardState, action: any): DashboardState {
  switch (action.type) {
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    default:
      return state;
  }
}

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

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