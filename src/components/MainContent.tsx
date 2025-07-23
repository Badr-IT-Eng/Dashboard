import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import TodayOverview from './TodayOverview';
import HabitTracker from './HabitTracker';
import RoadmapJourney from './RoadmapJourney';
import NeuralWorkspace from './NeuralWorkspace';

interface MainContentProps {
  sidebarCollapsed: boolean;
  activeView: string;
}

const MainContent = ({ sidebarCollapsed, activeView }: MainContentProps) => {
  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <>
            <TodayOverview />
          </>
        );
      case 'habits':
        return <HabitTracker />;
      case 'roadmap':
        return <RoadmapJourney />;
      case 'workspace':
        return <NeuralWorkspace />;
      default:
        return (
          <>
            <TodayOverview />
          </>
        );
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