import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, TrendingDown, Clock, Target, Award, 
  BarChart3, Calendar, BookOpen, Brain, Zap, Star,
  Activity, Users, Trophy, Lightbulb, CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const LearningAnalytics = ({ lessonId, onExport }) => {
  const { user } = useAuth();
  const { userStats } = useGamification();
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [analyticsData, setAnalyticsData] = useState({
    studyTime: [],
    quizScores: [],
    lessonProgress: [],
    spacedRepetition: [],
    achievements: [],
    streaks: []
  });

  // Load analytics data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`analytics_${lessonId}_${user?.id}`);
    if (savedData) {
      setAnalyticsData(JSON.parse(savedData));
    }
  }, [lessonId, user?.id]);

  // Generate mock data for demonstration
  useEffect(() => {
    if (analyticsData.studyTime.length === 0) {
      const mockData = generateMockAnalyticsData();
      setAnalyticsData(mockData);
      localStorage.setItem(`analytics_${lessonId}_${user?.id}`, JSON.stringify(mockData));
    }
  }, [analyticsData.studyTime.length, lessonId, user?.id]);

  const generateMockAnalyticsData = () => {
    const now = new Date();
    const data = {
      studyTime: [],
      quizScores: [],
      lessonProgress: [],
      spacedRepetition: [],
      achievements: [],
      streaks: []
    };

    // Generate study time data for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      data.studyTime.push({
        date: date.toISOString().split('T')[0],
        minutes: Math.floor(Math.random() * 120) + 30,
        lessons: Math.floor(Math.random() * 5) + 1
      });
    }

    // Generate quiz scores
    for (let i = 0; i < 20; i++) {
      data.quizScores.push({
        date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        score: Math.floor(Math.random() * 40) + 60,
        questions: Math.floor(Math.random() * 10) + 5,
        timeSpent: Math.floor(Math.random() * 600) + 300
      });
    }

    // Generate lesson progress
    data.lessonProgress = [
      { lesson: 'Linear Algebra', progress: 85, completed: 17, total: 20 },
      { lesson: 'Calculus', progress: 60, completed: 12, total: 20 },
      { lesson: 'Python Fundamentals', progress: 95, completed: 19, total: 20 },
      { lesson: 'Machine Learning', progress: 40, completed: 8, total: 20 },
      { lesson: 'Statistics', progress: 75, completed: 15, total: 20 }
    ];

    // Generate spaced repetition data
    for (let i = 0; i < 14; i++) {
      data.spacedRepetition.push({
        date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        cardsReviewed: Math.floor(Math.random() * 50) + 10,
        accuracy: Math.floor(Math.random() * 30) + 70,
        newCards: Math.floor(Math.random() * 10) + 2
      });
    }

    // Generate achievements
    data.achievements = [
      { name: 'First Lesson', description: 'Completed your first lesson', earned: '2024-01-15', icon: '🎯' },
      { name: 'Quiz Master', description: 'Scored 100% on a quiz', earned: '2024-01-20', icon: '🏆' },
      { name: 'Study Streak', description: 'Studied for 7 days in a row', earned: '2024-01-25', icon: '🔥' },
      { name: 'Memory Champion', description: 'Reviewed 100 flashcards', earned: '2024-01-28', icon: '🧠' },
      { name: 'Speed Learner', description: 'Completed 5 lessons in one day', earned: '2024-01-30', icon: '⚡' }
    ];

    // Generate streaks
    data.streaks = [
      { type: 'Study Days', current: 12, longest: 15, icon: '📚' },
      { type: 'Quiz Accuracy', current: 85, longest: 92, icon: '🎯' },
      { type: 'Flashcard Reviews', current: 8, longest: 14, icon: '🔄' },
      { type: 'Perfect Scores', current: 3, longest: 5, icon: '⭐' }
    ];

    return data;
  };

  // Calculate statistics based on time range
  const getFilteredData = () => {
    const now = new Date();
    let daysToFilter = 7;
    
    switch (timeRange) {
      case 'week':
        daysToFilter = 7;
        break;
      case 'month':
        daysToFilter = 30;
        break;
      case 'quarter':
        daysToFilter = 90;
        break;
      default:
        daysToFilter = 7;
    }

    const cutoffDate = new Date(now.getTime() - daysToFilter * 24 * 60 * 60 * 1000);
    
    return {
      studyTime: analyticsData.studyTime.filter(item => new Date(item.date) >= cutoffDate),
      quizScores: analyticsData.quizScores.filter(item => new Date(item.date) >= cutoffDate),
      spacedRepetition: analyticsData.spacedRepetition.filter(item => new Date(item.date) >= cutoffDate)
    };
  };

  const filteredData = getFilteredData();

  // Calculate key metrics
  const calculateMetrics = () => {
    const studyTime = filteredData.studyTime;
    const quizScores = filteredData.quizScores;
    const spacedRepetition = filteredData.spacedRepetition;

    const totalStudyTime = studyTime.reduce((sum, item) => sum + item.minutes, 0);
    const averageStudyTime = studyTime.length > 0 ? totalStudyTime / studyTime.length : 0;
    const totalLessons = studyTime.reduce((sum, item) => sum + item.lessons, 0);
    
    const averageQuizScore = quizScores.length > 0 
      ? quizScores.reduce((sum, item) => sum + item.score, 0) / quizScores.length 
      : 0;
    
    const totalCardsReviewed = spacedRepetition.reduce((sum, item) => sum + item.cardsReviewed, 0);
    const averageAccuracy = spacedRepetition.length > 0 
      ? spacedRepetition.reduce((sum, item) => sum + item.accuracy, 0) / spacedRepetition.length 
      : 0;

    const overallProgress = analyticsData.lessonProgress.reduce((sum, lesson) => sum + lesson.progress, 0) / analyticsData.lessonProgress.length;

    return {
      totalStudyTime,
      averageStudyTime,
      totalLessons,
      averageQuizScore,
      totalCardsReviewed,
      averageAccuracy,
      overallProgress
    };
  };

  const metrics = calculateMetrics();

  // Get trend indicators
  const getTrendIndicator = (current, previous) => {
    if (current > previous) {
      return { direction: 'up', color: 'text-green-600', icon: TrendingUp };
    } else if (current < previous) {
      return { direction: 'down', color: 'text-red-600', icon: TrendingDown };
    } else {
      return { direction: 'stable', color: 'text-gray-600', icon: Activity };
    }
  };

  // Export analytics data
  const handleExport = () => {
    const dataToExport = {
      lessonId,
      userId: user?.id,
      timestamp: new Date().toISOString(),
      analytics: analyticsData,
      metrics: metrics
    };
    
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learning-analytics-${lessonId}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    onExport?.(dataToExport);
  };

  return (
    <div className="learning-analytics">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              Learning Analytics
            </span>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export Data
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Study Time</p>
                        <p className="text-2xl font-bold">{Math.round(metrics.totalStudyTime / 60)}h</p>
                      </div>
                      <Clock className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(metrics.averageStudyTime)} min/day avg
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Quiz Score</p>
                        <p className="text-2xl font-bold">{Math.round(metrics.averageQuizScore)}%</p>
                      </div>
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {filteredData.quizScores.length} quizzes taken
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                        <p className="text-2xl font-bold">{Math.round(metrics.overallProgress)}%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {metrics.totalLessons} lessons completed
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Flashcards</p>
                        <p className="text-2xl font-bold">{metrics.totalCardsReviewed}</p>
                      </div>
                      <Brain className="h-8 w-8 text-orange-600" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(metrics.averageAccuracy)}% accuracy
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Lesson Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lesson Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.lessonProgress.map((lesson, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{lesson.lesson}</span>
                          <span className="text-sm text-muted-foreground">
                            {lesson.completed}/{lesson.total} lessons
                          </span>
                        </div>
                        <Progress value={lesson.progress} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{lesson.progress}% complete</span>
                          <span>{lesson.total - lesson.completed} remaining</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Study Streaks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Streaks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {analyticsData.streaks.map((streak, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="text-2xl mb-2">{streak.icon}</div>
                        <div className="font-bold text-lg">{streak.current}</div>
                        <div className="text-sm text-muted-foreground">{streak.type}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Best: {streak.longest}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              {/* Study Time Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Study Time Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-1">
                    {filteredData.studyTime.slice(-7).map((day, index) => {
                      const maxMinutes = Math.max(...filteredData.studyTime.map(d => d.minutes));
                      const height = (day.minutes / maxMinutes) * 100;
                      
                      return (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="bg-blue-500 rounded-t w-full transition-all hover:bg-blue-600"
                            style={{ height: `${height}%` }}
                          />
                          <div className="text-xs text-muted-foreground mt-2">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-xs font-medium">
                            {day.minutes}m
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quiz Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quiz Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredData.quizScores.slice(-5).map((quiz, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            quiz.score >= 80 ? 'bg-green-500' : 
                            quiz.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`} />
                          <div>
                            <div className="font-medium">Quiz #{filteredData.quizScores.length - index}</div>
                            <div className="text-sm text-muted-foreground">
                              {quiz.questions} questions • {Math.round(quiz.timeSpent / 60)}m
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{quiz.score}%</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(quiz.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Flashcard Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredData.spacedRepetition.slice(-7).map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-sm">
                              {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{day.cardsReviewed} cards</div>
                            <div className="text-xs text-muted-foreground">{day.accuracy}% accuracy</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Efficiency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Study Time Efficiency</span>
                        <Badge variant="outline">85%</Badge>
                      </div>
                      <Progress value={85} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Retention Rate</span>
                        <Badge variant="outline">78%</Badge>
                      </div>
                      <Progress value={78} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Quiz Improvement</span>
                        <Badge variant="outline">+12%</Badge>
                      </div>
                      <Progress value={72} className="h-2" />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consistency Score</span>
                        <Badge variant="outline">92%</Badge>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analyticsData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Earned {new Date(achievement.earned).toLocaleDateString()}
                          </div>
                        </div>
                        <Award className="h-5 w-5 text-yellow-500" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-blue-900">Focus on Weak Areas</div>
                        <div className="text-sm text-blue-700">
                          Your quiz scores in Machine Learning are lower than average. Consider reviewing the fundamentals.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-green-900">Great Progress!</div>
                        <div className="text-sm text-green-700">
                          You're maintaining a strong study streak. Keep up the consistent daily practice.
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Target className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-purple-900">Ready for Advanced Topics</div>
                        <div className="text-sm text-purple-700">
                          Your foundation is solid. Consider moving to more advanced machine learning concepts.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningAnalytics; 