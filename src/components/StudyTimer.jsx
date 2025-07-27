import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Clock, Target, Coffee, Brain, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useGamification } from '../contexts/GamificationContext';

const StudyTimer = ({ isOpen, onClose }) => {
  const { recordAction } = useGamification();
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('focus'); // 'focus', 'short-break', 'long-break'
  const [cycleCount, setCycleCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  
  // Settings
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    soundEnabled: true,
    notificationsEnabled: true
  });

  // Session tracking
  const [currentSession, setCurrentSession] = useState({
    startTime: null,
    totalFocusTime: 0,
    completedPomodoros: 0,
    breaks: 0
  });

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Load settings and session data
  useEffect(() => {
    const savedSettings = localStorage.getItem('study_timer_settings');
    const savedSession = localStorage.getItem('study_timer_session');
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    if (savedSession) {
      const session = JSON.parse(savedSession);
      setCurrentSession(session);
      setTotalStudyTime(session.totalFocusTime);
    }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem('study_timer_settings', JSON.stringify(settings));
  }, [settings]);

  // Save session data
  useEffect(() => {
    localStorage.setItem('study_timer_session', JSON.stringify(currentSession));
  }, [currentSession]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    playNotificationSound();
    showNotification();

    if (timerMode === 'focus') {
      setCycleCount(prev => prev + 1);
      setCurrentSession(prev => ({
        ...prev,
        completedPomodoros: prev.completedPomodoros + 1
      }));

      // Determine next break type
      const isLongBreak = (cycleCount + 1) % settings.longBreakInterval === 0;
      const nextMode = isLongBreak ? 'long-break' : 'short-break';
      const nextTime = isLongBreak ? settings.longBreakTime : settings.shortBreakTime;
      
      setTimerMode(nextMode);
      setTimeLeft(nextTime * 60);

      if (settings.autoStartBreaks) {
        setIsRunning(true);
      }
    } else {
      // Break completed, return to focus
      setTimerMode('focus');
      setTimeLeft(settings.focusTime * 60);
      setCurrentSession(prev => ({
        ...prev,
        breaks: prev.breaks + 1
      }));

      if (settings.autoStartPomodoros) {
        setIsRunning(true);
      }
    }
  }, [timerMode, cycleCount, settings, recordAction]);

  // Timer logic
  useEffect(() => {
    const handleTimerTick = () => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    };

    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(handleTimerTick, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, handleTimerComplete]);

  // Track study time for gamification
  useEffect(() => {
    if (isRunning && timerMode === 'focus') {
      const trackingInterval = setInterval(() => {
        recordAction('study_time', { minutes: 1 });
        setCurrentSession(prev => ({
          ...prev,
          totalFocusTime: prev.totalFocusTime + 1
        }));
        setTotalStudyTime(prev => prev + 1);
      }, 60000); // Every minute

      return () => clearInterval(trackingInterval);
    }
  }, [isRunning, timerMode, recordAction]);

  const playNotificationSound = () => {
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const showNotification = () => {
    if (settings.notificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        const title = timerMode === 'focus' ? 'Focus Session Complete!' : 'Break Time Over!';
        const body = timerMode === 'focus' 
          ? 'Great work! Time for a break.' 
          : 'Break time is over. Ready to focus?';
        
        new Notification(title, { body, icon: '/favicon.ico' });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }
  };

  const toggleTimer = () => {
    if (!isRunning && !sessionStartTime) {
      setSessionStartTime(new Date());
      setCurrentSession(prev => ({
        ...prev,
        startTime: new Date().toISOString()
      }));
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getTimeForMode(timerMode) * 60);
  };

  const resetSession = () => {
    setIsRunning(false);
    setCycleCount(0);
    setTimerMode('focus');
    setTimeLeft(settings.focusTime * 60);
    setSessionStartTime(null);
    setCurrentSession({
      startTime: null,
      totalFocusTime: 0,
      completedPomodoros: 0,
      breaks: 0
    });
    setTotalStudyTime(0);
  };

  const getTimeForMode = (mode) => {
    switch (mode) {
      case 'focus': return settings.focusTime;
      case 'short-break': return settings.shortBreakTime;
      case 'long-break': return settings.longBreakTime;
      default: return settings.focusTime;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getTimerProgress = () => {
    const totalTime = getTimeForMode(timerMode) * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeConfig = () => {
    switch (timerMode) {
      case 'focus':
        return { 
          icon: Brain, 
          label: 'Focus Time', 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
      case 'short-break':
        return { 
          icon: Coffee, 
          label: 'Short Break', 
          color: 'text-green-600', 
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200'
        };
      case 'long-break':
        return { 
          icon: Coffee, 
          label: 'Long Break', 
          color: 'text-purple-600', 
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200'
        };
      default:
        return { 
          icon: Brain, 
          label: 'Focus Time', 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200'
        };
    }
  };

  const modeConfig = getModeConfig();
  const Icon = modeConfig.icon;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Study Timer
          </DialogTitle>
          <DialogDescription>
            Use the Pomodoro Technique to boost your focus and productivity
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Timer Display */}
          <Card className={`${modeConfig.bgColor} ${modeConfig.borderColor} border-2`}>
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Icon className={`w-8 h-8 mr-3 ${modeConfig.color}`} />
                <Badge variant="outline" className={`${modeConfig.color} font-medium`}>
                  {modeConfig.label}
                </Badge>
              </div>
              
              <div className={`text-6xl font-mono font-bold mb-4 ${modeConfig.color}`}>
                {formatTime(timeLeft)}
              </div>
              
              <Progress value={getTimerProgress()} className="h-3 mb-6" />
              
              <div className="flex justify-center space-x-3">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className={`${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </Button>
                
                <Button onClick={resetTimer} variant="outline" size="lg">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Session Stats & Settings Tabs */}
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats">Session Stats</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-4">
              {/* Cycle Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Today's Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{currentSession.completedPomodoros}</div>
                      <div className="text-sm text-muted-foreground">Pomodoros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{currentSession.breaks}</div>
                      <div className="text-sm text-muted-foreground">Breaks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{formatDuration(currentSession.totalFocusTime)}</div>
                      <div className="text-sm text-muted-foreground">Focus Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{cycleCount % settings.longBreakInterval}</div>
                      <div className="text-sm text-muted-foreground">Until Long Break</div>
                    </div>
                  </div>

                  {sessionStartTime && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        Session started: {new Date(sessionStartTime).toLocaleTimeString()}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button onClick={resetSession} variant="outline" size="sm">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timer Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Time Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Focus Time</label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[settings.focusTime]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, focusTime: value }))}
                          max={60}
                          min={10}
                          step={5}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{settings.focusTime}m</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Short Break</label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[settings.shortBreakTime]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, shortBreakTime: value }))}
                          max={15}
                          min={3}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{settings.shortBreakTime}m</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Long Break</label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          value={[settings.longBreakTime]}
                          onValueChange={([value]) => setSettings(prev => ({ ...prev, longBreakTime: value }))}
                          max={30}
                          min={10}
                          step={5}
                          className="flex-1"
                        />
                        <span className="text-sm w-12">{settings.longBreakTime}m</span>
                      </div>
                    </div>
                  </div>

                  {/* Automation Settings */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Automation</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.autoStartBreaks}
                          onChange={(e) => setSettings(prev => ({ ...prev, autoStartBreaks: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm">Auto-start breaks</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.autoStartPomodoros}
                          onChange={(e) => setSettings(prev => ({ ...prev, autoStartPomodoros: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm">Auto-start pomodoros</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.soundEnabled}
                          onChange={(e) => setSettings(prev => ({ ...prev, soundEnabled: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm">Sound notifications</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={settings.notificationsEnabled}
                          onChange={(e) => setSettings(prev => ({ ...prev, notificationsEnabled: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm">Browser notifications</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Tips */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-medium text-blue-800 mb-2">💡 Pomodoro Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Eliminate distractions during focus sessions</li>
                <li>• Use breaks to rest your eyes and move your body</li>
                <li>• Stay hydrated and maintain good posture</li>
                <li>• Review your progress at the end of each session</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Audio element for notifications */}
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmcfBjiR2e/CdSgFKXfK8N2QQAoUXrPq66hVFAlEnt7yvmcfBjuQ2OvCciYFLIHS7tiJOQcZZLjr66pVFAlGmu/XzGUcBz2M1vjFeSgsOa7m7bNUFAZZoNjYxHAjBSF+0+/SkjsOL8/cNczO3T" type="audio/wav" />
        </audio>
      </DialogContent>
    </Dialog>
  );
};

export default StudyTimer; 