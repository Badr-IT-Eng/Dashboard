import React, { useState, useEffect, useRef } from 'react';
import { 
  Play,
  Pause,
  Square,
  RotateCcw,
  Timer,
  Coffee,
  Target,
  BarChart3,
  Settings,
  Clock,
  Zap,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { TimeSession } from '../utils/storage';

type TimerMode = 'focus' | 'short_break' | 'long_break';
type TimerStatus = 'idle' | 'running' | 'paused';

const PomodoroTimer = () => {
  const { state, dispatch } = useDashboard();
  const { settings, timeSessions } = state;
  
  const [mode, setMode] = useState<TimerMode>('focus');
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro.workDuration * 60);
  const [currentSession, setCurrentSession] = useState<Partial<TimeSession> | null>(null);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const [pomodoroSettings, setPomodoroSettings] = useState(settings.pomodoro);

  const durations = {
    focus: pomodoroSettings.workDuration * 60,
    short_break: pomodoroSettings.shortBreak * 60,
    long_break: pomodoroSettings.longBreak * 60
  };

  useEffect(() => {
    setTimeLeft(durations[mode]);
  }, [mode, pomodoroSettings]);

  useEffect(() => {
    if (status === 'running') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  const startTimer = () => {
    if (status === 'idle') {
      const session: Partial<TimeSession> = {
        id: Date.now().toString(),
        type: mode === 'focus' ? 'pomodoro' : 'break',
        startTime: new Date(),
        category: mode === 'focus' ? 'PRODUCTIVITY' : 'BREAK',
        interruptions: 0
      };
      setCurrentSession(session);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: 'TIMER_STARTED',
          message: `${mode.replace('_', ' ')} session initiated`,
          type: 'info'
        }
      });
    }
    setStatus('running');
  };

  const pauseTimer = () => {
    setStatus('paused');
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'TIMER_PAUSED',
        message: 'Neural focus protocol paused',
        type: 'info'
      }
    });
  };

  const stopTimer = () => {
    setStatus('idle');
    setTimeLeft(durations[mode]);
    
    if (currentSession) {
      // Save incomplete session
      const session: TimeSession = {
        ...currentSession as TimeSession,
        endTime: new Date(),
        duration: Math.round((durations[mode] - timeLeft) / 60),
        productivity: 2 // Default for incomplete sessions
      };
      dispatch({ type: 'ADD_TIME_SESSION', payload: session });
    }
    
    setCurrentSession(null);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'TIMER_STOPPED',
        message: 'Session terminated',
        type: 'info'
      }
    });
  };

  const resetTimer = () => {
    setStatus('idle');
    setTimeLeft(durations[mode]);
    setCurrentSession(null);
  };

  const completeSession = () => {
    setStatus('idle');
    
    if (currentSession) {
      const session: TimeSession = {
        ...currentSession as TimeSession,
        endTime: new Date(),
        duration: Math.round(durations[mode] / 60),
        productivity: mode === 'focus' ? 4 : 3 // Higher productivity for completed sessions
      };
      dispatch({ type: 'ADD_TIME_SESSION', payload: session });
    }

    if (mode === 'focus') {
      const newSessionsCompleted = sessionsCompleted + 1;
      setSessionsCompleted(newSessionsCompleted);
      
      // Auto-switch to break
      if (newSessionsCompleted % pomodoroSettings.sessionsUntilLongBreak === 0) {
        setMode('long_break');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            title: 'LONG_BREAK_TIME',
            message: 'Neural systems require extended recovery',
            type: 'success'
          }
        });
      } else {
        setMode('short_break');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            title: 'BREAK_TIME',
            message: 'Neural recovery protocol activated',
            type: 'success'
          }
        });
      }
    } else {
      setMode('focus');
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          title: 'FOCUS_TIME',
          message: 'Neural optimization protocol ready',
          type: 'success'
        }
      });
    }
    
    setCurrentSession(null);
  };

  const switchMode = (newMode: TimerMode) => {
    if (status !== 'idle') {
      stopTimer();
    }
    setMode(newMode);
  };

  const saveSettings = () => {
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        pomodoro: pomodoroSettings
      }
    });
    setShowSettings(false);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        title: 'SETTINGS_UPDATED',
        message: 'Pomodoro configuration saved',
        type: 'success'
      }
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((durations[mode] - timeLeft) / durations[mode]) * 100;
  };

  // Statistics
  const todaySessions = timeSessions.filter(session => {
    const today = new Date().toDateString();
    return session.startTime.toDateString() === today;
  });

  const todayFocusTime = todaySessions
    .filter(s => s.type === 'pomodoro')
    .reduce((sum, s) => sum + s.duration, 0);

  const todayBreakTime = todaySessions
    .filter(s => s.type === 'break')
    .reduce((sum, s) => sum + s.duration, 0);

  const averageProductivity = todaySessions.length > 0
    ? Math.round(todaySessions.reduce((sum, s) => sum + s.productivity, 0) / todaySessions.length)
    : 0;

  const totalInterruptions = todaySessions.reduce((sum, s) => sum + s.interruptions, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                TODAY_FOCUS
              </p>
              <p className="text-xl font-bold cyber-font text-white cyber-text-glow">
                {Math.round(todayFocusTime)}m
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center cyber-glow">
              <Timer className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                SESSIONS
              </p>
              <p className="text-xl font-bold cyber-font text-white cyber-text-glow">
                {todaySessions.filter(s => s.type === 'pomodoro').length}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center cyber-glow">
              <Target className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                BREAKS
              </p>
              <p className="text-xl font-bold cyber-font text-white cyber-text-glow">
                {Math.round(todayBreakTime)}m
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center cyber-glow">
              <Coffee className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                PRODUCTIVITY
              </p>
              <p className="text-xl font-bold cyber-font text-white cyber-text-glow">
                {averageProductivity}/5
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center cyber-glow">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>

        <div className="cyber-card rounded-xl p-4 cyber-border cyber-hologram">
          <div className="flex items-center justify-between">
            <div>
              <p className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-1">
                INTERRUPTIONS
              </p>
              <p className="text-xl font-bold cyber-font text-white cyber-text-glow">
                {totalInterruptions}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center cyber-glow">
              <Zap className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Display */}
        <div className="cyber-card rounded-xl p-8 cyber-border cyber-hologram text-center">
          <div className="mb-6">
            <h2 className="cyber-font text-2xl font-bold text-white cyber-text-glow mb-2">
              NEURAL_TIMER
            </h2>
            <p className="cyber-font text-sm text-cyan-400/70">
              {mode === 'focus' ? 'Deep Focus Protocol' : 
               mode === 'short_break' ? 'Recovery Phase' : 'Extended Recovery'}
            </p>
          </div>

          {/* Mode Switches */}
          <div className="flex justify-center space-x-2 mb-8">
            {(['focus', 'short_break', 'long_break'] as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`px-4 py-2 rounded-lg cyber-font text-xs transition-all duration-300 ${
                  mode === m 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400' 
                    : 'text-gray-400 hover:text-cyan-400 border border-transparent hover:border-cyan-400/30'
                }`}
              >
                {m.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          {/* Timer Circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgress() / 100)}`}
                className={`transition-all duration-1000 ${
                  mode === 'focus' ? 'text-cyan-400' : 'text-orange-400'
                } cyber-glow`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="cyber-font text-4xl font-bold text-white cyber-text-glow mb-1">
                  {formatTime(timeLeft)}
                </div>
                <div className="cyber-font text-xs text-cyan-400/70">
                  {status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex justify-center space-x-4">
            {status === 'idle' && (
              <button
                onClick={startTimer}
                className="cyber-button px-6 py-3 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>START</span>
              </button>
            )}
            
            {status === 'running' && (
              <button
                onClick={pauseTimer}
                className="cyber-button px-6 py-3 rounded-lg cyber-font font-medium text-orange-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <Pause className="w-5 h-5" />
                <span>PAUSE</span>
              </button>
            )}
            
            {status === 'paused' && (
              <>
                <button
                  onClick={startTimer}
                  className="cyber-button px-6 py-3 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>RESUME</span>
                </button>
                <button
                  onClick={stopTimer}
                  className="cyber-button px-6 py-3 rounded-lg cyber-font font-medium text-red-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <Square className="w-5 h-5" />
                  <span>STOP</span>
                </button>
              </>
            )}
            
            {status !== 'running' && (
              <button
                onClick={resetTimer}
                className="cyber-button px-4 py-3 rounded-lg cyber-font font-medium text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>

          {sessionsCompleted > 0 && (
            <div className="mt-6 cyber-font text-sm text-cyan-400/70">
              Sessions completed today: {sessionsCompleted}
            </div>
          )}
        </div>

        {/* Session Info & Settings */}
        <div className="space-y-6">
          {/* Current Session */}
          {currentSession && (
            <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
              <h3 className="cyber-font text-lg font-bold text-white cyber-text-glow mb-4">
                CURRENT_SESSION
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="cyber-font text-sm text-cyan-400/70">Type:</span>
                  <span className="cyber-font text-sm text-white">
                    {currentSession.type?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-font text-sm text-cyan-400/70">Started:</span>
                  <span className="cyber-font text-sm text-white">
                    {currentSession.startTime?.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-font text-sm text-cyan-400/70">Duration:</span>
                  <span className="cyber-font text-sm text-white">
                    {Math.round((durations[mode] - timeLeft) / 60)}m
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="cyber-progress h-2 rounded-full transition-all duration-300" 
                    style={{width: `${getProgress()}%`}}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
            <div className="flex items-center justify-between mb-4">
              <h3 className="cyber-font text-lg font-bold text-white cyber-text-glow">
                TIMER_CONFIG
              </h3>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-cyan-400 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {showSettings ? (
              <div className="space-y-4">
                <div>
                  <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                    FOCUS_DURATION (minutes)
                  </label>
                  <input
                    type="number"
                    value={pomodoroSettings.workDuration}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings,
                      workDuration: parseInt(e.target.value) || 25
                    })}
                    className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                    SHORT_BREAK (minutes)
                  </label>
                  <input
                    type="number"
                    value={pomodoroSettings.shortBreak}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings,
                      shortBreak: parseInt(e.target.value) || 5
                    })}
                    className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                    min="1"
                    max="30"
                  />
                </div>

                <div>
                  <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                    LONG_BREAK (minutes)
                  </label>
                  <input
                    type="number"
                    value={pomodoroSettings.longBreak}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings,
                      longBreak: parseInt(e.target.value) || 15
                    })}
                    className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="cyber-font text-xs text-cyan-400/70 tracking-wider mb-2 block">
                    SESSIONS_UNTIL_LONG_BREAK
                  </label>
                  <input
                    type="number"
                    value={pomodoroSettings.sessionsUntilLongBreak}
                    onChange={(e) => setPomodoroSettings({
                      ...pomodoroSettings,
                      sessionsUntilLongBreak: parseInt(e.target.value) || 4
                    })}
                    className="w-full cyber-terminal border border-cyan-400/30 rounded-lg px-4 py-2 cyber-font text-cyan-400 focus:outline-none focus:border-cyan-400"
                    min="2"
                    max="10"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={saveSettings}
                    className="cyber-button px-4 py-2 rounded-lg cyber-font font-medium text-cyan-400 hover:text-white transition-colors flex-1"
                  >
                    SAVE
                  </button>
                  <button
                    onClick={() => {
                      setPomodoroSettings(settings.pomodoro);
                      setShowSettings(false);
                    }}
                    className="px-4 py-2 cyber-font text-gray-400 hover:text-white transition-colors flex-1"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="cyber-font text-cyan-400/70">Focus:</span>
                  <span className="cyber-font text-white">{pomodoroSettings.workDuration}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-font text-cyan-400/70">Short Break:</span>
                  <span className="cyber-font text-white">{pomodoroSettings.shortBreak}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-font text-cyan-400/70">Long Break:</span>
                  <span className="cyber-font text-white">{pomodoroSettings.longBreak}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="cyber-font text-cyan-400/70">Long Break After:</span>
                  <span className="cyber-font text-white">{pomodoroSettings.sessionsUntilLongBreak} sessions</span>
                </div>
              </div>
            )}
          </div>

          {/* Today's Progress */}
          <div className="cyber-card rounded-xl p-6 cyber-border cyber-hologram">
            <h3 className="cyber-font text-lg font-bold text-white cyber-text-glow mb-4">
              TODAY_PROGRESS
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="cyber-font text-sm text-cyan-400/70">Focus Time</span>
                  <span className="cyber-font text-sm text-white">{Math.round(todayFocusTime)}m</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="cyber-progress h-2 rounded-full" 
                    style={{width: `${Math.min((todayFocusTime / 240) * 100, 100)}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="cyber-font text-lg font-bold text-white">
                    {todaySessions.filter(s => s.type === 'pomodoro').length}
                  </div>
                  <div className="cyber-font text-xs text-cyan-400/70">
                    SESSIONS
                  </div>
                </div>
                <div>
                  <div className="cyber-font text-lg font-bold text-white">
                    {averageProductivity}
                  </div>
                  <div className="cyber-font text-xs text-cyan-400/70">
                    AVG_SCORE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;