import React from 'react';
import { 
  Plus, 
  Target, 
  Calendar, 
  FileText, 
  Settings, 
  Download,
  Zap,
  Shield,
  Database,
  Terminal,
  Cpu,
  Wifi,
  Brain,
  Activity,
  Layers,
  GitBranch
} from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'INIT_NEW_MISSION',
      description: 'Deploy advanced neural learning protocol',
      color: 'from-cyan-400 via-blue-500 to-cyan-600',
      action: 'primary',
      status: 'READY',
      category: 'CREATION'
    },
    {
      icon: Calendar,
      title: 'SCHEDULE_SYNC',
      description: 'Quantum timeline optimization matrix',
      color: 'from-green-400 via-emerald-500 to-green-600',
      action: 'secondary',
      status: 'ACTIVE',
      category: 'PLANNING'
    },
    {
      icon: FileText,
      title: 'GENERATE_REPORT',
      description: 'Neural pathway analysis export system',
      color: 'from-purple-400 via-pink-500 to-purple-600',
      action: 'secondary',
      status: 'READY',
      category: 'ANALYSIS'
    },
    {
      icon: Target,
      title: 'TRACK_MILESTONE',
      description: 'Achievement matrix update protocol',
      color: 'from-orange-400 via-red-500 to-orange-600',
      action: 'secondary',
      status: 'PENDING',
      category: 'TRACKING'
    },
    {
      icon: Database,
      title: 'BACKUP_NEURAL_DATA',
      description: 'Quantum storage synchronization system',
      color: 'from-indigo-400 via-purple-500 to-indigo-600',
      action: 'secondary',
      status: 'READY',
      category: 'STORAGE'
    },
    {
      icon: Shield,
      title: 'SECURITY_SCAN',
      description: 'Advanced firewall integrity verification',
      color: 'from-red-400 via-pink-500 to-red-600',
      action: 'secondary',
      status: 'ACTIVE',
      category: 'SECURITY'
    },
    {
      icon: Zap,
      title: 'BOOST_PERFORMANCE',
      description: 'Neural acceleration enhancement protocol',
      color: 'from-yellow-400 via-orange-500 to-yellow-600',
      action: 'secondary',
      status: 'READY',
      category: 'OPTIMIZATION'
    },
    {
      icon: Terminal,
      title: 'ACCESS_CONSOLE',
      description: 'Direct neural interface command line',
      color: 'from-gray-400 via-gray-600 to-gray-500',
      action: 'secondary',
      status: 'READY',
      category: 'SYSTEM'
    },
    {
      icon: Brain,
      title: 'AI_ENHANCEMENT',
      description: 'Cognitive processing amplification',
      color: 'from-pink-400 via-purple-500 to-pink-600',
      action: 'secondary',
      status: 'BETA',
      category: 'AI'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="cyber-font text-2xl font-bold cyber-gradient-text cyber-text-glow-intense mb-2">
            QUANTUM_OPERATIONS_MATRIX
          </h3>
          <p className="cyber-font text-sm text-cyan-400/80">Advanced neural interface command center</p>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-green-400" />
            <span className="cyber-font text-sm text-green-400 font-semibold">NEURAL_LINK_ACTIVE</span>
            <div className="w-2 h-2 rounded-full cyber-status-online cyber-pulse"></div>
          </div>
          <button className="cyber-button px-6 py-3 rounded-xl cyber-font text-sm text-cyan-400 hover:text-white transition-colors">
            CUSTOMIZE_MATRIX
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`
              group cyber-card cyber-border rounded-2xl p-8 text-left relative overflow-hidden
              hover:border-cyan-400 hover:cyber-glow-intense transition-all duration-700
              transform hover:-translate-y-3 hover:scale-105
              ${action.action === 'primary' ? 'ring-2 ring-cyan-400/50 cyber-glow' : ''}
              cyber-hologram cyber-float cyber-ripple
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
            
            {/* Corner decorations */}
            <div className="absolute top-4 right-4 w-3 h-3 cyber-diamond bg-cyan-400 cyber-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 cyber-hexagon bg-purple-400 cyber-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`
                w-16 h-16 rounded-2xl bg-gradient-to-br ${action.color}
                flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                cyber-glow relative
              `}>
                <action.icon className="w-8 h-8 text-black" />
                
                {/* Rotating border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-300"
                     style={{ 
                       animation: 'spin 12s linear infinite',
                       animationPlayState: 'paused'
                     }}
                     onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'running'}
                     onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                ></div>
              </div>
              
              <div className="text-right">
                <div className={`cyber-font text-xs px-3 py-2 rounded-lg font-semibold ${
                  action.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                  action.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30' :
                  action.status === 'BETA' ? 'bg-purple-500/20 text-purple-400 border border-purple-400/30' :
                  'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                }`}>
                  {action.status}
                </div>
                <div className="cyber-font text-xs text-gray-500 mt-2">
                  {action.category}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              <h4 className="cyber-font font-bold text-white group-hover:cyber-gradient-text transition-all duration-300 text-lg">
                {action.title}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                {action.description}
              </p>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="mt-6 space-y-2 relative z-10">
              <div className="flex justify-between items-center">
                <span className="cyber-font text-xs text-cyan-400/70">READINESS_LEVEL</span>
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
            <div className="cyber-scan-line mt-6"></div>
            
            {/* Hover effect particles */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="cyber-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;