import React from 'react';
import { 
  Home, 
  BarChart3, 
  Target, 
  Calendar, 
  Settings, 
  User, 
  Menu,
  Bell,
  Search,
  TrendingUp,
  Bookmark,
  Zap,
  Shield,
  Database,
  Terminal,
  Cpu,
  Activity,
  Brain,
  Layers,
  GitBranch,
  CheckSquare,
  Timer,
  Heart,
  FileText,
  Archive,
  Import
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ collapsed, onToggle, activeView, onViewChange }: SidebarProps) => {
  const menuItems = [
    { 
      icon: Calendar, 
      label: 'Today Overview', 
      view: 'overview', 
      color: 'text-cyan-400',
      description: 'Daily insights & progress'
    },
    { 
      icon: Target, 
      label: 'Habit Matrix', 
      view: 'habits', 
      color: 'text-green-400',
      description: 'Neural pattern optimization'
    },
    { 
      icon: CheckSquare, 
      label: 'Task Manager', 
      view: 'tasks', 
      color: 'text-blue-400',
      description: 'Neural task queue system'
    },
    { 
      icon: Timer, 
      label: 'Focus Timer', 
      view: 'timer', 
      color: 'text-orange-400',
      description: 'Pomodoro & time tracking'
    },
    { 
      icon: Heart, 
      label: 'Mood Tracker', 
      view: 'mood', 
      color: 'text-pink-400',
      description: 'Emotional analytics'
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      view: 'analytics', 
      color: 'text-purple-400',
      description: 'Performance insights'
    },
    { 
      icon: GitBranch, 
      label: 'Roadmap Journey', 
      view: 'roadmap', 
      color: 'text-indigo-400',
      description: 'Goal progression tracking'
    },
    { 
      icon: Shield, 
      label: 'Cloud Security Path', 
      view: 'cloud-security', 
      color: 'text-emerald-400',
      description: 'DevSecOps learning roadmap'
    },
    { 
      icon: Brain, 
      label: 'Neural Workspace', 
      view: 'workspace', 
      color: 'text-violet-400',
      description: 'Advanced productivity hub'
    },
    { 
      icon: Settings, 
      label: 'System Config', 
      view: 'settings', 
      color: 'text-gray-400',
      description: 'Core system parameters'
    }
  ];

  return (
    <div className={`
      relative h-full transition-all duration-700 ease-in-out cyber-terminal cyber-border
      ${collapsed ? 'w-24' : 'w-96'}
      cyber-hologram
    `}>
      {/* Enhanced Cyber Header */}
      <div className="p-6 border-b border-gray-600 relative">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">
                Productivity Hub
              </h1>
              <div className="text-sm text-gray-400">Your personal workspace</div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-green-400">Online</span>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="cyber-button p-3 rounded-lg text-gray-400 hover:text-white group"
          >
            <Menu className="w-5 h-5 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Enhanced User Profile Section */}
      <div className="p-6 border-b border-gray-600">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center hover:scale-105 transition-transform">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <div className="font-semibold text-lg text-white mb-1">Welcome back!</div>
              <div className="text-sm text-gray-400 mb-1">Ready to be productive?</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-green-400">Active</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Quick Access Panel */}
      {!collapsed && (
        <div className="p-6 border-b border-gray-600">
          <div className="text-sm text-gray-400 mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-blue-400" />
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="cyber-button p-3 rounded-lg group">
              <Search className="w-5 h-5 mx-auto text-gray-400 group-hover:text-white mb-2" />
              <div className="text-xs">Search</div>
            </button>
            <button className="cyber-button p-3 rounded-lg group relative">
              <Bell className="w-5 h-5 mx-auto text-gray-400 group-hover:text-white mb-2" />
              <div className="text-xs">Alerts</div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">3</span>
              </div>
            </button>
            <button className="cyber-button p-3 rounded-lg group">
              <Zap className="w-5 h-5 mx-auto text-gray-400 group-hover:text-white mb-2" />
              <div className="text-xs">Focus</div>
            </button>
            <button className="cyber-button p-3 rounded-lg group">
              <Shield className="w-5 h-5 mx-auto text-gray-400 group-hover:text-white mb-2" />
              <div className="text-xs">Settings</div>
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Navigation Menu */}
      <nav className="flex-1 p-6 cyber-scrollbar overflow-y-auto">
        <div className="text-sm text-gray-400 mb-4 flex items-center">
          <Layers className="w-4 h-4 mr-2 text-blue-400" />
          Navigation
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button className={`
                w-full flex items-center space-x-3 p-4 rounded-lg transition-all duration-300 cyber-border group
                ${activeView === item.view
                  ? 'bg-blue-500/20 border-blue-400' 
                  : 'hover:bg-gray-700/50 hover:border-gray-500'
                }
              `}
              onClick={() => onViewChange(item.view)}>
                <div className={`
                  w-10 h-10 rounded-lg ${
                    activeView === item.view 
                      ? 'bg-blue-500' 
                      : 'bg-gray-700'
                  } flex items-center justify-center transition-colors
                `}>
                  <item.icon className={`w-5 h-5 ${
                    activeView === item.view 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-white'
                  } transition-colors`} />
                </div>
                
                {!collapsed && (
                  <div className="text-left flex-1">
                    <span className={`font-medium ${
                      activeView === item.view 
                        ? 'text-white' 
                        : 'text-gray-300'
                    } group-hover:text-white transition-colors`}>
                      {item.label}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Enhanced System Status */}
      {!collapsed && (
        <div className="p-6 border-t border-gray-600">
          <div className="text-sm text-gray-400 mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2 text-blue-400" />
            System Status
          </div>
          <div className="space-y-3">
            <div className="cyber-card p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-blue-400" />
                  CPU Usage
                </span>
                <span className="text-sm text-blue-400 font-medium">23%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{width: '23%'}}></div>
              </div>
            </div>
            
            <div className="cyber-card p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-300 flex items-center">
                  <Database className="w-4 h-4 mr-2 text-purple-400" />
                  Memory
                </span>
                <span className="text-sm text-purple-400 font-medium">67%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>

            <div className="cyber-card p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  Security
                </span>
                <span className="text-sm text-green-400 font-medium">Secure</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;