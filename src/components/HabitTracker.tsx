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
  Zap
} from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  streak: number;
  completedToday: boolean;
  weeklyProgress: boolean[];
  color: string;
  target: number;
  unit: string;
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      name: 'NEURAL_CODING',
      description: 'Daily programming practice',
      category: 'DEVELOPMENT',
      streak: 15,
      completedToday: true,
      weeklyProgress: [true, true, false, true, true, true, false],
      color: 'from-cyan-400 to-blue-500',
      target: 2,
      unit: 'hours'
    },
    {
      id: '2',
      name: 'QUANTUM_LEARNING',
      description: 'Study new technologies',
      category: 'EDUCATION',
      streak: 8,
      completedToday: false,
      weeklyProgress: [true, false, true, true, false, true, true],
      color: 'from-purple-400 to-pink-500',
      target: 1,
      unit: 'hour'
    },
    {
      id: '3',
      name: 'CYBER_FITNESS',
      description: 'Physical optimization protocol',
      category: 'HEALTH',
      streak: 22,
      completedToday: true,
      weeklyProgress: [true, true, true, false, true, true, true],
      color: 'from-green-400 to-emerald-500',
      target: 30,
      unit: 'minutes'
    },
    {
      id: '4',
      name: 'MEDITATION_SYNC',
      description: 'Mental clarity enhancement',
      category: 'WELLNESS',
      streak: 12,
      completedToday: false,
      weeklyProgress: [false, true, true, true, false, true, false],
      color: 'from-orange-400 to-red-500',
      target: 15,
      unit: 'minutes'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'DEVELOPMENT', 'EDUCATION', 'HEALTH', 'WELLNESS'];
  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1)
          }
        : habit
    ));
  };

  const filteredHabits = selectedCategory === 'ALL' 
    ? habits 
    : habits.filter(habit => habit.category === selectedCategory);

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completedToday).length;
  const averageStreak = Math.round(habits.reduce((sum, h) => sum + h.streak, 0) / totalHabits);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              style={{width: `${(completedToday / totalHabits) * 100}%`}}
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
                TOTAL_HABITS
              </p>
              <p className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {totalHabits}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cyber-glow">
              <Calendar className="w-6 h-6 text-black" />
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
                {Math.round((completedToday / totalHabits) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
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

      {/* Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHabits.map((habit, index) => (
          <div 
            key={habit.id}
            className="cyber-card rounded-xl p-6 cyber-border group hover:border-cyan-400 hover:cyber-glow transition-all duration-500 cyber-hologram"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
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
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  habit.completedToday 
                    ? 'bg-green-500 border-green-500 cyber-glow' 
                    : 'border-gray-500 hover:border-cyan-400'
                }`}
              >
                {habit.completedToday && <CheckCircle className="w-5 h-5 text-black" />}
              </button>
            </div>

            {/* Weekly Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="cyber-font text-xs text-cyan-400/70">WEEKLY_PATTERN</span>
                <div className="flex items-center space-x-1">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="cyber-font text-sm text-orange-400">{habit.streak} days</span>
                </div>
              </div>
              <div className="flex space-x-1">
                {habit.weeklyProgress.map((completed, dayIndex) => (
                  <div key={dayIndex} className="flex-1 text-center">
                    <div className={`w-full h-8 rounded cyber-border flex items-center justify-center text-xs cyber-font ${
                      completed 
                        ? 'bg-green-500/20 border-green-400 text-green-400' 
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
                className="cyber-progress h-2 rounded-full" 
                style={{width: `${(habit.weeklyProgress.filter(Boolean).length / 7) * 100}%`}}
              ></div>
            </div>

            <div className="cyber-scan-line mt-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HabitTracker;