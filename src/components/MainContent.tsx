import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import TodayOverview from './TodayOverview';
import HabitTracker from './HabitTracker';
import TaskManager from './TaskManager';
import PomodoroTimer from './PomodoroTimer';
import RoadmapJourney from './RoadmapJourney';
import CloudSecurityRoadmap from './CloudSecurityRoadmap';
import NeuralWorkspace from './NeuralWorkspace';

interface MainContentProps {
  sidebarCollapsed: boolean;
  activeView: string;
}

const MainContent = ({ sidebarCollapsed, activeView }: MainContentProps) => {
  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <TodayOverview />;
      case 'habits':
        return <HabitTracker />;
      case 'tasks':
        return <TaskManager />;
      case 'timer':
        return <PomodoroTimer />;
      case 'mood':
        return (
          <div className="cyber-card rounded-xl p-12 cyber-border cyber-hologram text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-pink-400/20 to-rose-500/20 flex items-center justify-center">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-2">
              MOOD_TRACKER
            </h3>
            <p className="text-gray-400 cyber-font mb-4">
              Emotional analytics system coming soon...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="cyber-progress h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
            <p className="text-xs text-cyan-400/70 cyber-font mt-2">Development Progress: 75%</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="cyber-card rounded-xl p-12 cyber-border cyber-hologram text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-2">
              ANALYTICS_ENGINE
            </h3>
            <p className="text-gray-400 cyber-font mb-4">
              Advanced performance metrics coming soon...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="cyber-progress h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
            <p className="text-xs text-cyan-400/70 cyber-font mt-2">Development Progress: 60%</p>
          </div>
        );
      case 'roadmap':
        return <RoadmapJourney />;
      case 'cloud-security':
        return <CloudSecurityRoadmap />;
      case 'workspace':
        return <NeuralWorkspace />;
      case 'settings':
        return (
          <div className="cyber-card rounded-xl p-12 cyber-border cyber-hologram text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-400/20 to-gray-600/20 flex items-center justify-center">
              <span className="text-4xl">⚙️</span>
            </div>
            <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-2">
              SYSTEM_CONFIG
            </h3>
            <p className="text-gray-400 cyber-font mb-4">
              Advanced settings panel coming soon...
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="cyber-progress h-2 rounded-full" style={{width: '40%'}}></div>
            </div>
            <p className="text-xs text-cyan-400/70 cyber-font mt-2">Development Progress: 40%</p>
          </div>
        );
      default:
        return <TodayOverview />;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <WelcomeHeader />
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainContent;