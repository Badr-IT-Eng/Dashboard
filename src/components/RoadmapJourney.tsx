import React, { useState } from 'react';
import { 
  MapPin, 
  CheckCircle, 
  Clock, 
  Target, 
  Plus,
  Calendar,
  TrendingUp,
  Flag,
  Zap,
  Star,
  ArrowRight,
  Edit3
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  progress: number;
  dueDate: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  estimatedHours: number;
}

const RoadmapJourney = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: '1',
      title: 'FRONTEND_MASTERY',
      description: 'Complete advanced React and TypeScript mastery',
      status: 'in-progress',
      progress: 75,
      dueDate: '2025-02-15',
      category: 'DEVELOPMENT',
      priority: 'high',
      tasks: [
        { id: '1a', title: 'Advanced React Patterns', completed: true, estimatedHours: 20 },
        { id: '1b', title: 'TypeScript Deep Dive', completed: true, estimatedHours: 15 },
        { id: '1c', title: 'State Management Mastery', completed: false, estimatedHours: 25 },
        { id: '1d', title: 'Performance Optimization', completed: false, estimatedHours: 18 }
      ]
    },
    {
      id: '2',
      title: 'BACKEND_ARCHITECTURE',
      description: 'Build scalable backend systems with Node.js',
      status: 'pending',
      progress: 0,
      dueDate: '2025-03-30',
      category: 'DEVELOPMENT',
      priority: 'high',
      tasks: [
        { id: '2a', title: 'Node.js Advanced Concepts', completed: false, estimatedHours: 30 },
        { id: '2b', title: 'Database Design Patterns', completed: false, estimatedHours: 25 },
        { id: '2c', title: 'API Architecture', completed: false, estimatedHours: 20 },
        { id: '2d', title: 'Microservices Implementation', completed: false, estimatedHours: 35 }
      ]
    },
    {
      id: '3',
      title: 'DEVOPS_MASTERY',
      description: 'Master containerization and cloud deployment',
      status: 'pending',
      progress: 0,
      dueDate: '2025-05-15',
      category: 'INFRASTRUCTURE',
      priority: 'medium',
      tasks: [
        { id: '3a', title: 'Docker & Kubernetes', completed: false, estimatedHours: 40 },
        { id: '3b', title: 'CI/CD Pipelines', completed: false, estimatedHours: 25 },
        { id: '3c', title: 'Cloud Platforms (AWS/GCP)', completed: false, estimatedHours: 45 },
        { id: '3d', title: 'Monitoring & Logging', completed: false, estimatedHours: 20 }
      ]
    },
    {
      id: '4',
      title: 'AI_INTEGRATION',
      description: 'Integrate AI/ML capabilities into applications',
      status: 'pending',
      progress: 0,
      dueDate: '2025-07-01',
      category: 'AI/ML',
      priority: 'medium',
      tasks: [
        { id: '4a', title: 'Machine Learning Fundamentals', completed: false, estimatedHours: 50 },
        { id: '4b', title: 'TensorFlow.js Integration', completed: false, estimatedHours: 30 },
        { id: '4c', title: 'OpenAI API Integration', completed: false, estimatedHours: 20 },
        { id: '4d', title: 'AI-Powered Features', completed: false, estimatedHours: 40 }
      ]
    }
  ]);

  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-400 to-emerald-500';
      case 'in-progress': return 'from-cyan-400 to-blue-500';
      case 'pending': return 'from-gray-400 to-gray-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const toggleTask = (milestoneId: string, taskId: string) => {
    setMilestones(prev => prev.map(milestone => 
      milestone.id === milestoneId 
        ? {
            ...milestone,
            tasks: milestone.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : milestone
    ));
  };

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const totalProgress = Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length);

  return (
    <div className="space-y-6">
      {/* Journey Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                JOURNEY_PROGRESS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {totalProgress}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center cyber-glow">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="cyber-progress h-2 rounded-full" 
              style={{width: `${totalProgress}%`}}
            ></div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                MILESTONES
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {completedMilestones}/{milestones.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cyber-glow">
              <Flag className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                ACTIVE_TASKS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {milestones.reduce((sum, m) => sum + m.tasks.filter(t => !t.completed).length, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cyber-glow">
              <Target className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                EST_HOURS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {milestones.reduce((sum, m) => sum + m.tasks.reduce((taskSum, t) => taskSum + t.estimatedHours, 0), 0)}h
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
              <Clock className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="cyber-font text-2xl font-bold text-white cyber-text-glow mb-2">
            ROADMAP_JOURNEY
          </h2>
          <p className="cyber-font text-sm text-cyan-400/70">Neural pathway development matrix</p>
        </div>
        
        <button className="cyber-button px-6 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>ADD_MILESTONE</span>
        </button>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} className="relative">
            {/* Timeline Line */}
            {index < milestones.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-purple-400 cyber-glow"></div>
            )}
            
            <div className="flex items-start space-x-6">
              {/* Timeline Node */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getStatusColor(milestone.status)} flex items-center justify-center cyber-glow relative z-10`}>
                {milestone.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-black" />
                ) : milestone.status === 'in-progress' ? (
                  <Zap className="w-6 h-6 text-black" />
                ) : (
                  <Clock className="w-6 h-6 text-black" />
                )}
              </div>
              
              {/* Milestone Card */}
              <div className="flex-1 cyber-card rounded-xl p-6 cyber-border group hover:border-cyan-400 hover:cyber-glow transition-all duration-500 cyber-hologram">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="cyber-font text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300 mt-1">{milestone.description}</p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`cyber-font text-xs px-2 py-1 rounded ${getPriorityColor(milestone.priority)}`}>
                          {milestone.priority.toUpperCase()}
                        </span>
                        <span className="cyber-font text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                          {milestone.category}
                        </span>
                        <span className="cyber-font text-xs text-gray-400">
                          Due: {new Date(milestone.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                      {milestone.progress}%
                    </div>
                    <div className="cyber-font text-xs text-cyan-400/70">COMPLETE</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className="cyber-progress h-3 rounded-full transition-all duration-1000" 
                      style={{width: `${milestone.progress}%`}}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="cyber-font text-sm text-cyan-400/70">NEURAL_TASKS</span>
                    <button
                      onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                      className="cyber-font text-xs text-cyan-400 hover:text-white transition-colors"
                    >
                      {selectedMilestone === milestone.id ? 'COLLAPSE' : 'EXPAND'}
                    </button>
                  </div>
                  
                  {selectedMilestone === milestone.id && (
                    <div className="space-y-2 mt-3">
                      {milestone.tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 cyber-terminal rounded-lg border border-cyan-400/20">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleTask(milestone.id, task.id)}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                task.completed 
                                  ? 'bg-green-500 border-green-500' 
                                  : 'border-gray-500 hover:border-cyan-400'
                              }`}
                            >
                              {task.completed && <CheckCircle className="w-3 h-3 text-black" />}
                            </button>
                            <span className={`cyber-font text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="cyber-font text-xs text-cyan-400/70">
                            {task.estimatedHours}h
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="cyber-scan-line mt-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapJourney;