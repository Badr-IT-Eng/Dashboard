import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, CheckCircle, Zap, Brain } from 'lucide-react';

const WelcomeHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, []);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <header className="cyber-terminal border-b border-cyan-400/30 p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5 opacity-50"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {greeting}!
            </h1>
            <p className="text-gray-400 text-lg">
              Ready to be productive today?
            </p>
          </div>
          
          <div className="cyber-card p-6 rounded-xl">
            <div className="text-right">
              <div className="text-2xl font-bold text-white mb-1">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm text-gray-400">
                {dayName}, {monthDay}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="cyber-card p-4 rounded-lg cyber-border group hover:border-blue-400 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Today's Focus</p>
                <p className="text-white font-semibold">3 Active Goals</p>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4 rounded-lg cyber-border group hover:border-green-400 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Completed</p>
                <p className="text-white font-semibold">2 of 5 Habits</p>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4 rounded-lg cyber-border group hover:border-purple-400 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Streak</p>
                <p className="text-white font-semibold">15 Days</p>
              </div>
            </div>
          </div>

          <div className="cyber-card p-4 rounded-lg cyber-border group hover:border-orange-400 transition-all duration-300">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Energy</p>
                <p className="text-white font-semibold">High Level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WelcomeHeader;