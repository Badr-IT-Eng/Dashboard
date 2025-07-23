import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, User, Wifi, Battery, Signal, Cpu, Activity, Shield } from 'lucide-react';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemLoad, setSystemLoad] = useState(23);
  const [networkStatus, setNetworkStatus] = useState(98);
  const [securityLevel, setSecurityLevel] = useState('MAXIMUM');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemLoad(Math.floor(Math.random() * 40) + 20);
      setNetworkStatus(Math.floor(Math.random() * 10) + 90);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="cyber-terminal border-b border-cyan-400/30 p-8 cyber-scan-line relative">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="cyber-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between relative z-10">
        {/* System Info */}
        <div className="flex items-center space-x-12">
          <div className="relative">
            <h2 className="text-3xl font-bold cyber-font text-white">
              Dashboard
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Your personal productivity center
            </p>
          </div>
          
          {/* Advanced Real-time Stats */}
          <div className="hidden xl:flex items-center space-x-6 text-sm">
            <div className="cyber-card p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <div>
                  <span className="text-green-400 font-medium">Online</span>
                </div>
              </div>
            </div>
            
            <div className="cyber-card p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <Signal className="w-4 h-4 text-blue-400" />
                <div>
                  <span className="text-blue-400 font-medium">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Control Panel */}
        <div className="flex items-center space-x-8">
          {/* Advanced Neural Search */}
          <div className="relative group">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="cyber-input text-sm placeholder-gray-400 pl-10 pr-4 py-3 w-80 rounded-lg border border-gray-600 bg-gray-800/50 text-white focus:border-blue-400 focus:outline-none"
              />
            </div>
          </div>
          
          {/* Enhanced System Controls */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="cyber-button p-3 rounded-lg">
                <Bell className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              </button>
            </div>
            
            <div className="relative">
              <button className="cyber-button p-3 rounded-lg">
                <Settings className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
            
            {/* User Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Time Display */}
          <div className="cyber-card p-4 rounded-lg">
            <div className="text-right">
              <div className="text-xl font-bold text-white mb-1">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;