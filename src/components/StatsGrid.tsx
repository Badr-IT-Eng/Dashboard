import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Target, Shield, Database, Cpu, Activity, Brain, Layers } from 'lucide-react';

const StatsGrid = () => {
  const [stats, setStats] = useState([
    {
      title: 'NEURAL_EFFICIENCY',
      value: '97.3%',
      change: '+12.7%',
      trend: 'up',
      icon: Brain,
      color: 'from-cyan-400 via-blue-500 to-cyan-600',
      glowColor: 'cyan',
      description: 'Cognitive processing optimization'
    },
    {
      title: 'MISSION_PROGRESS',
      value: '847',
      change: '+23',
      trend: 'up',
      icon: Target,
      color: 'from-purple-400 via-pink-500 to-purple-600',
      glowColor: 'purple',
      description: 'Active objectives completed'
    },
    {
      title: 'QUANTUM_SYNC',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      color: 'from-green-400 via-emerald-500 to-green-600',
      glowColor: 'green',
      description: 'System synchronization status'
    },
    {
      title: 'SECURITY_LEVEL',
      value: 'OMEGA',
      change: 'STABLE',
      trend: 'up',
      icon: Shield,
      color: 'from-red-400 via-orange-500 to-red-600',
      glowColor: 'red',
      description: 'Maximum protection protocol'
    },
    {
      title: 'DATA_STREAMS',
      value: '2.4TB',
      change: '+156GB',
      trend: 'up',
      icon: Database,
      color: 'from-yellow-400 via-orange-500 to-yellow-600',
      glowColor: 'yellow',
      description: 'Information flow metrics'
    },
    {
      title: 'NEURAL_CORES',
      value: '16x',
      change: 'OPTIMAL',
      trend: 'up',
      icon: Cpu,
      color: 'from-indigo-400 via-purple-500 to-indigo-600',
      glowColor: 'indigo',
      description: 'Processing unit status'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.title === 'NEURAL_EFFICIENCY' 
            ? `${(Math.random() * 5 + 95).toFixed(1)}%`
            : stat.title === 'QUANTUM_SYNC'
            ? `${(Math.random() * 0.2 + 99.8).toFixed(1)}%`
            : stat.value
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="cyber-card rounded-2xl p-8 cyber-border group hover:cyber-glow-intense transition-all duration-700 cyber-float cyber-hologram relative overflow-hidden"
          style={{ animationDelay: `${index * 0.15}s` }}
        >
          {/* Background gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
          
          {/* Corner decorations */}
          <div className="absolute top-4 right-4 w-3 h-3 cyber-diamond bg-cyan-400 cyber-pulse opacity-60"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 cyber-hexagon bg-purple-400 cyber-pulse opacity-40"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Layers className="w-4 h-4 text-cyan-400/70" />
                <p className="cyber-font text-xs text-cyan-400/80 tracking-wider font-semibold">
                  {stat.title}
                </p>
              </div>
              
              <p className="text-4xl font-bold cyber-font text-white cyber-text-glow-intense mb-4 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </p>
              
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {stat.description}
              </p>
              
              <div className="flex items-center space-x-3">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-5 h-5 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
                <span className={`cyber-font text-sm font-bold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="cyber-font text-gray-500 text-xs tracking-wider">DELTA_24H</span>
              </div>
            </div>
            
            <div className="relative ml-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center cyber-glow group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative`}>
                <stat.icon className="w-10 h-10 text-black" />
                
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-300" 
                     style={{ 
                       animation: 'spin 8s linear infinite',
                       animationPlayState: 'paused'
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                     onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                ></div>
              </div>
              
              {/* Status indicators */}
              <div className="absolute -top-2 -right-2 w-4 h-4 cyber-diamond bg-cyan-400 cyber-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 cyber-hexagon bg-purple-400 cyber-pulse"></div>
            </div>
          </div>
          
          {/* Enhanced Progress Indicator */}
          <div className="mt-6 space-y-2 relative z-10">
            <div className="flex justify-between items-center">
              <span className="cyber-font text-xs text-cyan-400/70">PERFORMANCE_INDEX</span>
              <span className="cyber-font text-xs text-white">{Math.random() * 40 + 60 | 0}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-2 overflow-hidden cyber-border">
              <div 
                className="cyber-progress h-2 rounded-full transition-all duration-1000" 
                style={{width: `${Math.random() * 40 + 60}%`}}
              ></div>
            </div>
          </div>
          
          {/* Enhanced Scan Line Effect */}
          <div className="cyber-scan-line mt-4"></div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;