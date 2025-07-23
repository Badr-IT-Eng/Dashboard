import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import MatrixBackground from './effects/MatrixBackground';
import { DashboardProvider } from '../context/DashboardContext';
import { setupElectronNavigation, cleanupElectronListeners, isElectron, showElectronNotification } from '../utils/electron';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeView, setActiveView] = useState('habits');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Setup Electron navigation if running in Electron
    if (isElectron()) {
      setupElectronNavigation((view: string) => {
        setActiveView(view);
      });

      // Show welcome notification in Electron
      showElectronNotification(
        'NEXUS OS Desktop',
        'Neural Productivity Suite is now running as a desktop application!'
      );
    }

    return () => {
      clearInterval(timer);
      if (isElectron()) {
        cleanupElectronListeners();
      }
    };
  }, []);

  return (
    <DashboardProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        <MatrixBackground />
        
        {/* Cyber Grid Overlay */}
        <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none"></div>
        
        {/* Main Dashboard Container */}
        <div className="relative z-10 flex h-screen text-white overflow-hidden">
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            activeView={activeView}
            onViewChange={setActiveView}
          />
          <MainContent sidebarCollapsed={sidebarCollapsed} activeView={activeView} />
        </div>

        {/* System Status Indicator */}
        <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 cyber-font text-xs">
          <div className="w-2 h-2 rounded-full cyber-status-online cyber-pulse"></div>
          <span className="text-cyan-400">SYSTEM ONLINE</span>
          <span className="text-gray-400">|</span>
          <span className="text-cyan-400">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default Dashboard;