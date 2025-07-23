import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Flame, 
  Target, 
  Calendar,
  TrendingUp,
  Plus,
  Edit3,
  Trash2,
  Clock,
  Zap,
  Star,
  Award,
  BarChart3
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Habit } from '../utils/storage';

const HabitTracker = () => {
  const { state, dispatch } = useDashboard();
  const { habits } = state;
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    category: 'DEVELOPMENT',
    target: 1,
    unit: 'hour',
    color: 'from-cyan-400 to-blue-500'
  });

  const categories = ['ALL', 'DEVELOPMENT', 'EDUCATION', 'HEALTH', 'WELLNESS', 'CREATIVITY', 'SOCIAL'];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const colorOptions = [
    'from-cyan-400 to-blue-500',
    'from-purple-400 to-pink-500',
    'from-green-400 to-emerald-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-orange-500',
    'from-indigo-400 to-purple-500',
    'from-pink-400 to-rose-500',
    'from-teal-400 to-cyan-500'
  ];

  const toggleHabit = (habitId: string) => {
    dispatch({ type: 'TOGGLE_HABIT', payload: habitId });
    
    // Add notification
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      const isCompleting = !habit.completedToday;
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: isCompleting ? 'HABIT_COMPLETED' : 'HABIT_UNDONE',
          message: `${habit.name} ${isCompleting ? 'marked complete' : 'unmarked'}`,
          type: isCompleting ? 'success' : 'info'
        }
      });
    }
  };

  const addHabit = () => {
    if (!newHabit.name.trim()) return;
    
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name.toUpperCase().replace(/\s+/g, '_'),
      description: newHabit.description,
      category: newHabit.category,
      streak: 0,
      completedToday: false,
      completionHistory: {},
      weeklyProgress: Array(7).fill(false),
      color: newHabit.color,
      target: newHabit.target,
      unit: newHabit.unit,
      createdAt: new Date(),
      bestStreak: 0,
      totalCompletions: 0
    };

    dispatch({ type: 'ADD_HABIT', payload: habit });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'NEW_HABIT_ADDED',
        message: `${habit.name} protocol initialized`,
        type: 'success'
      }
    });

    setNewHabit({
      name: '',
      description: '',
      category: 'DEVELOPMENT',
      target: 1,
      unit: 'hour',
      color: 'from-cyan-400 to-blue-500'
    });
    setShowAddForm(false);
  };

  const deleteHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    dispatch({ type: 'DELETE_HABIT', payload: habitId });
    
    if (habit) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: 'HABIT_DELETED',
          message: `${habit.name} protocol terminated`,
          type: 'info'
        }
      });
    }
  };

  const filteredHabits = selectedCategory === 'ALL' 
    ? habits 
    : habits.filter(habit => habit.category === selectedCategory);

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedToday).length;
  const averageStreak = totalHabits > 0 
    ? Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / totalHabits)
    : 0;
  const bestStreak = Math.max(...habits.map(h => h.bestStreak), 0);
  const totalCompletions = habits.reduce((sum, h) => sum + h.totalCompletions, 0);

  return (
    <div className="space-y-6">
      {/* Enhanced Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                TODAY_PROGRESS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {completedToday}/{totalHabits}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center cyber-glow">
              <Target className="w-6 h-6 text-black" />
            </div>
          </div>
          <div className="mt-4 w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="cyber-progress h-2 rounded-full" 
              style={{width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%`}}
            ></div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                AVG_STREAK
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {averageStreak}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cyber-glow">
              <Flame className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                BEST_STREAK
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {bestStreak}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cyber-glow">
              <Award className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                TOTAL_DONE
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {totalCompletions}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
              <BarChart3 className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2">
                COMPLETION_RATE
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cyber-glow">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="cyber-font text-2xl font-bold text-white cyber-text-glow mb-2">
            HABIT_MATRIX
          </h2>
          <p className="cyber-font text-sm text-cyan-400/70">Neural pattern optimization protocols</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-sm text-cyan-400 focus:outline-none focus:border-cyan-400"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <button 
            onClick={() => setShowAddForm(true)}
            className="cyber-button px-6 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>ADD_HABIT</span>
          </button>
        </div>
      </div>

      {/* Add Habit Form */}
      {showAddForm && (
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between mb-6">
            <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow">
              NEW_HABIT_PROTOCOL
            </h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                HABIT_NAME
              </label>
              <input
                type="text"
                value={newHabit.name}
                onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                placeholder="Enter habit name..."
              />
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                CATEGORY
              </label>
              <select
                value={newHabit.category}
                onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
              >
                {categories.filter(cat => cat !== 'ALL').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                DESCRIPTION
              </label>
              <input
                type="text"
                value={newHabit.description}
                onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                placeholder="Describe your habit..."
              />
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                TARGET
              </label>
              <input
                type="number"
                value={newHabit.target}
                onChange={(e) => setNewHabit({...newHabit, target: parseInt(e.target.value) || 1})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                min="1"
              />
            </div>

            <div>
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                UNIT
              </label>
              <select
                value={newHabit.unit}
                onChange={(e) => setNewHabit({...newHabit, unit: e.target.value})}
                className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
              >
                <option value="minutes">minutes</option>
                <option value="hour">hour</option>
                <option value="hours">hours</option>
                <option value="pages">pages</option>
                <option value="reps">reps</option>
                <option value="times">times</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                COLOR_THEME
              </label>
              <div className="flex space-x-2">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setNewHabit({...newHabit, color})}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} border-2 ${
                      newHabit.color === color ? 'border-white' : 'border-transparent'
                    } cyber-glow`}
                  />
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
              onClick={addHabit}
              className="cyber-button px-6 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors"
            >
              CREATE_HABIT
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHabits.map((habit, index) => (
          <div 
            key={habit.id}
            className="cyber-card rounded-xl p-6 cyber-border group hover:border-cyan-400 hover:cyber-glow transition-all duration-500 cyber-hologram relative"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Delete button */}
            <button
              onClick={() => deleteHabit(habit.id)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${habit.color} flex items-center justify-center cyber-glow`}>
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="cyber-font font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {habit.name}
                  </h3>
                  <p className="text-sm text-gray-300">{habit.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="cyber-font text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400">
                      {habit.category}
                    </span>
                    <span className="cyber-font text-xs text-gray-400">
                      {habit.target} {habit.unit}/day
                    </span>
                    {habit.bestStreak > 0 && (
                      <span className="cyber-font text-xs text-yellow-400 flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Best: {habit.bestStreak}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  habit.completedToday 
                    ? 'bg-green-500 border-green-500 cyber-glow' 
                    : 'border-gray-500 hover:border-cyan-400 hover:cyber-glow'
                }`}
              >
                {habit.completedToday ? (
                  <CheckCircle className="w-6 h-6 text-black" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>

            {/* Enhanced Stats Row */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-orange-400">
                  <Flame className="w-4 h-4" />
                  <span className="cyber-font">{habit.streak}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-400">
                  <BarChart3 className="w-4 h-4" />
                  <span className="cyber-font">{habit.totalCompletions}</span>
                </div>
                <div className="flex items-center space-x-1 text-purple-400">
                  <Calendar className="w-4 h-4" />
                  <span className="cyber-font">
                    {Math.round((habit.weeklyProgress.filter(Boolean).length / 7) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Weekly Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="cyber-font text-xs text-cyan-400/70">WEEKLY_PATTERN</span>
              </div>
              <div className="flex space-x-1">
                {habit.weeklyProgress.map((completed, dayIndex) => (
                  <div key={dayIndex} className="flex-1 text-center">
                    <div className={`w-full h-8 rounded cyber-border flex items-center justify-center text-xs cyber-font transition-all duration-300 ${
                      completed 
                        ? 'bg-green-500/20 border-green-400 text-green-400 cyber-glow' 
                        : 'bg-gray-800 border-gray-600 text-gray-500'
                    }`}>
                      {weekDays[dayIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
              <div 
                className="cyber-progress h-2 rounded-full transition-all duration-500" 
                style={{width: `${(habit.weeklyProgress.filter(Boolean).length / 7) * 100}%`}}
              ></div>
            </div>

            <div className="cyber-scan-line mt-4"></div>
          </div>
        ))}

        {/* Add Habit Card */}
        {!showAddForm && (
          <div 
            className="cyber-card rounded-xl p-6 cyber-border border-dashed border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 cursor-pointer group"
            onClick={() => setShowAddForm(true)}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center group-hover:cyber-glow transition-all duration-300">
                <Plus className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-center">
                <h3 className="cyber-font font-bold text-cyan-400 group-hover:text-white transition-colors mb-2">
                  ADD_NEW_HABIT
                </h3>
                <p className="text-sm text-gray-400 cyber-font">
                  Initialize new neural pattern
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitTracker;