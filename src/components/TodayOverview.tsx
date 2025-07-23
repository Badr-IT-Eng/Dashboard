import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Target, 
  Plus, 
  Calendar,
  Flame,
  TrendingUp,
  BookOpen,
  Dumbbell,
  Code,
  Coffee
} from 'lucide-react';

const TodayOverview = () => {
  const [todayHabits, setTodayHabits] = useState([
    { id: 1, name: 'Morning Coding', icon: Code, completed: true, time: '07:00', streak: 15 },
    { id: 2, name: 'Workout', icon: Dumbbell, completed: true, time: '08:30', streak: 12 },
    { id: 3, name: 'Reading', icon: BookOpen, completed: false, time: '20:00', streak: 8 },
    { id: 4, name: 'Learning', icon: TrendingUp, completed: false, time: '21:00', streak: 10 },
    { id: 5, name: 'Meditation', icon: Coffee, completed: false, time: '22:00', streak: 5 }
  ]);

  const [todayGoals, setTodayGoals] = useState([
    { id: 1, title: 'Complete React Dashboard', completed: false, priority: 'high' },
    { id: 2, title: 'Review TypeScript Concepts', completed: true, priority: 'medium' },
    { id: 3, title: 'Plan Next Week Roadmap', completed: false, priority: 'medium' },
    { id: 4, title: 'Update Portfolio', completed: false, priority: 'low' }
  ]);

  const toggleHabit = (id: number) => {
    setTodayHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const toggleGoal = (id: number) => {
    setTodayGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const completedHabits = todayHabits.filter(h => h.completed).length;
  const completedGoals = todayGoals.filter(g => g.completed).length;

  return (
    <div className="space-y-8">
      {/* Today's Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Habits Section */}
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-2">
                TODAY'S HABITS
              </h3>
              <p className="text-sm text-cyan-400/70">
                {completedHabits}/{todayHabits.length} completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {Math.round((completedHabits / todayHabits.length) * 100)}%
              </div>
              <div className="text-xs text-cyan-400/70">COMPLETION</div>
            </div>
          </div>

          <div className="space-y-3">
            {todayHabits.map(habit => (
              <div 
                key={habit.id}
                className="flex items-center justify-between p-4 cyber-terminal rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      habit.completed 
                        ? 'bg-green-500 border-green-500 cyber-glow' 
                        : 'border-gray-500 hover:border-cyan-400'
                    }`}
                  >
                    {habit.completed && <CheckCircle className="w-4 h-4 text-black" />}
                  </button>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                      <habit.icon className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className={`font-medium ${habit.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                        {habit.name}
                      </p>
                      <p className="text-xs text-gray-500">{habit.time}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-orange-400 cyber-font">{habit.streak}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 cyber-button py-3 px-4 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>ADD HABIT</span>
          </button>
        </div>

        {/* Goals Section */}
        <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-2">
                TODAY'S GOALS
              </h3>
              <p className="text-sm text-cyan-400/70">
                {completedGoals}/{todayGoals.length} completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold cyber-font text-white cyber-text-glow">
                {Math.round((completedGoals / todayGoals.length) * 100)}%
              </div>
              <div className="text-xs text-cyan-400/70">PROGRESS</div>
            </div>
          </div>

          <div className="space-y-3">
            {todayGoals.map(goal => (
              <div 
                key={goal.id}
                className="flex items-center justify-between p-4 cyber-terminal rounded-lg border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      goal.completed 
                        ? 'bg-green-500 border-green-500 cyber-glow' 
                        : 'border-gray-500 hover:border-cyan-400'
                    }`}
                  >
                    {goal.completed && <CheckCircle className="w-4 h-4 text-black" />}
                  </button>
                  
                  <div>
                    <p className={`font-medium ${goal.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                      {goal.title}
                    </p>
                  </div>
                </div>
                
                <span className={`cyber-font text-xs px-2 py-1 rounded ${
                  goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  goal.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {goal.priority.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 cyber-button py-3 px-4 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center justify-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>ADD GOAL</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
        <h3 className="cyber-font text-xl font-bold text-white cyber-text-glow mb-6">
          QUICK ACTIONS
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="cyber-button p-6 rounded-xl group cyber-ripple hover:scale-105 transition-all duration-300">
            <Calendar className="w-8 h-8 mx-auto text-cyan-400 group-hover:text-white mb-3" />
            <div className="cyber-font text-sm text-cyan-400 group-hover:text-white">PLAN DAY</div>
          </button>
          
          <button className="cyber-button p-6 rounded-xl group cyber-ripple hover:scale-105 transition-all duration-300">
            <Target className="w-8 h-8 mx-auto text-cyan-400 group-hover:text-white mb-3" />
            <div className="cyber-font text-sm text-cyan-400 group-hover:text-white">SET GOAL</div>
          </button>
          
          <button className="cyber-button p-6 rounded-xl group cyber-ripple hover:scale-105 transition-all duration-300">
            <BookOpen className="w-8 h-8 mx-auto text-cyan-400 group-hover:text-white mb-3" />
            <div className="cyber-font text-sm text-cyan-400 group-hover:text-white">TAKE NOTES</div>
          </button>
          
          <button className="cyber-button p-6 rounded-xl group cyber-ripple hover:scale-105 transition-all duration-300">
            <TrendingUp className="w-8 h-8 mx-auto text-cyan-400 group-hover:text-white mb-3" />
            <div className="cyber-font text-sm text-cyan-400 group-hover:text-white">REVIEW</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayOverview;