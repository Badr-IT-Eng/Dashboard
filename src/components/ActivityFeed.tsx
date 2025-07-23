import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Star, 
  TrendingUp, 
  Shield, 
  Zap, 
  Database,
  Terminal,
  Wifi
} from 'lucide-react';

const ActivityFeed = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'success',
      icon: CheckCircle,
      title: 'NEURAL_LINK_ESTABLISHED',
      description: 'Quantum synchronization protocol activated',
      time: '00:02:47',
      color: 'text-green-400',
      priority: 'HIGH'
    },
    {
      id: 2,
      type: 'info',
      icon: TrendingUp,
      title: 'SYSTEM_OPTIMIZATION',
      description: 'Performance boost: +23% efficiency gained',
      time: '00:15:32',
      color: 'text-cyan-400',
      priority: 'MEDIUM'
    },
    {
      id: 3,
      type: 'warning',
      icon: AlertTriangle,
      title: 'SECURITY_SCAN_ALERT',
      description: 'Anomalous pattern detected in sector 7',
      time: '01:23:15',
      color: 'text-yellow-400',
      priority: 'HIGH'
    },
    {
      id: 4,
      type: 'achievement',
      icon: Star,
      title: 'MILESTONE_ACHIEVED',
      description: 'Neural pathway optimization: Level 10 reached',
      time: '02:45:08',
      color: 'text-purple-400',
      priority: 'LOW'
    },
    {
      id: 5,
      type: 'system',
      icon: Shield,
      title: 'FIREWALL_UPDATE',
      description: 'Quantum encryption protocols updated',
      time: '03:12:44',
      color: 'text-blue-400',
      priority: 'MEDIUM'
    },
    {
      id: 6,
      type: 'data',
      icon: Database,
      title: 'DATA_STREAM_SYNC',
      description: 'Neural matrix backup completed successfully',
      time: '04:33:21',
      color: 'text-indigo-400',
      priority: 'LOW'
    }
  ]);

  const [newActivity, setNewActivity] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewActivity(true);
      setTimeout(() => setNewActivity(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cyber-card rounded-xl p-6 cyber-border h-full cyber-hologram">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="cyber-font text-lg font-bold text-white cyber-text-glow">
            NEURAL_ACTIVITY_LOG
          </h3>
          <p className="cyber-font text-xs text-cyan-400/70">Real-time system events</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full ${newActivity ? 'cyber-status-warning' : 'cyber-status-online'} cyber-pulse`}></div>
          <button className="cyber-button px-3 py-1 rounded cyber-font text-xs text-cyan-400 hover:text-white">
            FILTER
          </button>
        </div>
      </div>
      
      <div className="space-y-3 cyber-scrollbar overflow-y-auto max-h-96">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="cyber-border rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300 group cursor-pointer cyber-noise"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-2 rounded-lg cyber-terminal ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
                <activity.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="cyber-font font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`cyber-font text-xs px-2 py-1 rounded ${
                      activity.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                      activity.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="cyber-font text-cyan-400/70 text-xs">
                    T-{activity.time}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Wifi className="w-3 h-3 text-cyan-400" />
                    <Terminal className="w-3 h-3 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scan Line Effect */}
            <div className="cyber-scan-line mt-2"></div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 cyber-button py-3 px-4 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors">
        LOAD_MORE_ENTRIES
      </button>
    </div>
  );
};

export default ActivityFeed;