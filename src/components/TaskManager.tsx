import React, { useState, useEffect } from 'react';
import { 
  Plus,
  Search,
  Filter,
  CheckSquare,
  Square,
  Clock,
  Calendar,
  AlertCircle,
  Star,
  Trash2,
  Edit3,
  MoreVertical,
  Tag,
  Timer,
  Play,
  Pause,
  Stop,
  Target,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Task } from '../utils/storage';

const TaskManager = () => {
  const { state, dispatch } = useDashboard();
  const { tasks } = state;
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [editingTask, setEditingTask] = useState<string | null>(null);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    category: 'GENERAL',
    dueDate: '',
    estimatedMinutes: 30,
    tags: [] as string[],
    tagInput: ''
  });

  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];
  const statuses = ['all', 'pending', 'in_progress', 'completed', 'cancelled'];
  const categories = ['all', 'GENERAL', 'WORK', 'PERSONAL', 'HEALTH', 'LEARNING', 'CREATIVE'];
  const sortOptions = ['created', 'due', 'priority', 'title'];

  const priorityColors = {
    low: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500',
    high: 'from-orange-400 to-red-500',
    urgent: 'from-red-500 to-pink-500'
  };

  const statusColors = {
    pending: 'text-gray-400',
    in_progress: 'text-blue-400',
    completed: 'text-green-400',
    cancelled: 'text-red-400'
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'pending',
      category: newTask.category,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      createdAt: new Date(),
      estimatedMinutes: newTask.estimatedMinutes,
      tags: newTask.tags
    };

    dispatch({ type: 'ADD_TASK', payload: task });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'TASK_CREATED',
        message: `${task.title} added to neural queue`,
        type: 'success'
      }
    });

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'GENERAL',
      dueDate: '',
      estimatedMinutes: 30,
      tags: [],
      tagInput: ''
    });
    setShowAddForm(false);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    const updates: Partial<Task> = { status };
    if (status === 'completed') {
      updates.completedAt = new Date();
    }
    
    dispatch({ 
      type: 'UPDATE_TASK', 
      payload: { id: taskId, updates }
    });

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: 'TASK_UPDATED',
          message: `${task.title} marked as ${status.replace('_', ' ')}`,
          type: status === 'completed' ? 'success' : 'info'
        }
      });
    }
  };

  const deleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    
    if (task) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: 'TASK_DELETED',
          message: `${task.title} removed from neural queue`,
          type: 'info'
        }
      });
    }
  };

  const addTag = () => {
    if (newTask.tagInput.trim() && !newTask.tags.includes(newTask.tagInput.trim())) {
      setNewTask({
        ...newTask,
        tags: [...newTask.tags, newTask.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
      const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
      
      return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'due':
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  // Statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length;
  const overdueTasks = tasks.filter(t => 
    t.dueDate && 
    t.dueDate < new Date() && 
    t.status !== 'completed'
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                TOTAL_TASKS
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {totalTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center cyber-glow">
              <BarChart3 className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                COMPLETED
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {completedTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
              <CheckSquare className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                IN_PROGRESS
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {inProgressTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center cyber-glow">
              <Timer className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                PENDING
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {pendingTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cyber-glow">
              <Clock className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                URGENT
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {urgentTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center cyber-glow">
              <AlertCircle className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                OVERDUE
              </p>
              <p className="text-2xl font-bold cyber-font text-white cyber-text-glow">
                {overdueTasks}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center cyber-glow">
              <Calendar className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h2 className="cyber-font text-2xl font-bold text-white cyber-text-glow mb-2">
            TASK_NEURAL_QUEUE
          </h2>
          <p className="cyber-font text-sm text-cyan-400/70">Neural task optimization matrix</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowAddForm(true)}
            className="cyber-button px-6 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD_TASK</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-cyan-400/50" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All Priorities' : priority.toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            {sortOptions.map(option => (
              <option key={option} value={option}>
                Sort by {option.toUpperCase()}
              </option>
            ))}
          </select>

          <div className="flex items-center justify-center">
            <span className="cyber-font text-xs text-cyan-400/70">
              {filteredTasks.length} / {totalTasks} tasks
            </span>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between mb-6">
            <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow">
              NEW_TASK_PROTOCOL
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                TASK_TITLE
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                placeholder="Enter task title..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                DESCRIPTION
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400 h-20 resize-none"
                placeholder="Describe the task..."
              />
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                PRIORITY
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as any})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
              >
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="high">HIGH</option>
                <option value="urgent">URGENT</option>
              </select>
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                CATEGORY
              </label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
              >
                {categories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                DUE_DATE
              </label>
              <input
                type="datetime-local"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                ESTIMATED_TIME (minutes)
              </label>
              <input
                type="number"
                value={newTask.estimatedMinutes}
                onChange={(e) => setNewTask({...newTask, estimatedMinutes: parseInt(e.target.value) || 30})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                min="5"
                step="5"
              />
            </div>

            <div className="md:col-span-2">
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                TAGS
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={newTask.tagInput}
                  onChange={(e) => setNewTask({...newTask, tagInput: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                  placeholder="Add tag and press Enter..."
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 cyber-button rounded-lg cyber-font text-cyan-400 hover:text-white transition-colors"
                >
                  <Tag className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newTask.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs cyber-font bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-400 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-2 cyber-font text-gray-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={addTask}
              className="cyber-button px-6 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors"
            >
              CREATE_TASK
            </button>
          </div>
        </div>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="cyber-card rounded-xl p-12 cyber-border cyber-hologram text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
              <CheckSquare className="w-8 h-8 text-cyan-400/50" />
            </div>
            <h3 className="cyber-font text-xl font-bold text-gray-400 mb-2">
              NO_TASKS_FOUND
            </h3>
            <p className="text-gray-500 cyber-font">
              {tasks.length === 0 
                ? 'Neural queue is empty. Create your first task.'
                : 'No tasks match your current filters.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={`cyber-card rounded-xl p-6 cyber-border group hover:border-cyan-400 hover:cyber-glow transition-all duration-300 cyber-hologram ${
                task.status === 'completed' ? 'opacity-75' : ''
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <button
                    onClick={() => updateTaskStatus(
                      task.id, 
                      task.status === 'completed' ? 'pending' : 'completed'
                    )}
                    className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                      task.status === 'completed'
                        ? 'bg-green-500 border-green-500 cyber-glow'
                        : 'border-gray-500 hover:border-cyan-400'
                    }`}
                  >
                    {task.status === 'completed' && (
                      <CheckSquare className="w-4 h-4 text-black" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className={`cyber-font font-bold text-white group-hover:text-cyan-400 transition-colors ${
                        task.status === 'completed' ? 'line-through opacity-60' : ''
                      }`}>
                        {task.title}
                      </h3>
                      
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${priorityColors[task.priority]} cyber-glow`}></div>
                      
                      <span className={`cyber-font text-xs px-2 py-1 rounded ${statusColors[task.status]} bg-gray-800`}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-sm text-gray-300 mb-3">{task.description}</p>
                    )}

                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span className="cyber-font px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                        {task.category}
                      </span>
                      
                      {task.estimatedMinutes && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.estimatedMinutes}m</span>
                        </div>
                      )}
                      
                      {task.dueDate && (
                        <div className={`flex items-center space-x-1 ${
                          task.dueDate < new Date() && task.status !== 'completed' ? 'text-red-400' : ''
                        }`}>
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate.toLocaleDateString()}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <span>Created {task.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs cyber-font bg-purple-500/20 text-purple-400 border border-purple-400/30"
                          >
                            <Tag className="w-2 h-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {task.status !== 'completed' && (
                    <>
                      <button
                        onClick={() => updateTaskStatus(
                          task.id,
                          task.status === 'in_progress' ? 'pending' : 'in_progress'
                        )}
                        className="p-2 text-blue-400 hover:text-white transition-colors"
                        title={task.status === 'in_progress' ? 'Pause' : 'Start'}
                      >
                        {task.status === 'in_progress' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="cyber-scan-line mt-4"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;