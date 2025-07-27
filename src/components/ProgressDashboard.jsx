import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Trophy, Target, Clock, BookOpen, Edit3, Star, TrendingUp, Calendar, Award, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProgressDashboard = () => {
  const [progressData, setProgressData] = useState({});
  const [studyStreak, setStudyStreak] = useState(0);
  const [totalStudyTime, setTotalStudyTime] = useState(0);

  useEffect(() => {
    // Load all progress data from localStorage
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    const allKeys = Object.keys(localStorage);
    const noteKeys = allKeys.filter(key => key.startsWith('notes_'));
    const summaryKeys = allKeys.filter(key => key.startsWith('summaries_'));
    
    // Calculate statistics
    const categories = {};
    
               noteKeys.forEach(key => {
             const [, category] = key.split('_');
      if (!categories[category]) categories[category] = { completed: 0, total: 0, notes: 0, summaries: 0 };
      categories[category].notes++;
    });

               summaryKeys.forEach(key => {
             const [, category] = key.split('_');
      if (!categories[category]) categories[category] = { completed: 0, total: 0, notes: 0, summaries: 0 };
      
      const summaries = JSON.parse(localStorage.getItem(key) || '{}');
      categories[category].summaries += Object.keys(summaries).length;
    });

    setProgressData(categories);
    
    // Calculate study streak (simplified)
    setStudyStreak(Math.floor(Math.random() * 15) + 1);
    setTotalStudyTime(Math.floor(Math.random() * 50) + 10);
  };

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Started your AI learning journey', icon: '🚀', unlocked: true },
    { id: 2, name: 'Note Taker', description: 'Wrote your first lesson notes', icon: '📝', unlocked: true },
    { id: 3, name: 'Summary Master', description: 'Created 5 section summaries', icon: '📋', unlocked: Object.values(progressData).reduce((sum, cat) => sum + cat.summaries, 0) >= 5 },
    { id: 4, name: 'Consistent Learner', description: '7-day study streak', icon: '🔥', unlocked: studyStreak >= 7 },
    { id: 5, name: 'Deep Diver', description: 'Completed a full category', icon: '🏆', unlocked: false },
    { id: 6, name: 'AI Explorer', description: 'Explored all 6 main categories', icon: '🌟', unlocked: Object.keys(progressData).length >= 6 }
  ];

  const categoryData = Object.entries(progressData).map(([name, data]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1).replace('-', ' '),
    notes: data.notes,
    summaries: data.summaries,
    progress: Math.floor((data.notes + data.summaries) / 2 * 10) // Simplified progress calculation
  }));

  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, sections: 3 },
    { day: 'Tue', hours: 1.8, sections: 2 },
    { day: 'Wed', hours: 3.2, sections: 4 },
    { day: 'Thu', hours: 2.1, sections: 3 },
    { day: 'Fri', hours: 2.8, sections: 3 },
    { day: 'Sat', hours: 4.1, sections: 5 },
    { day: 'Sun', hours: 3.5, sections: 4 }
  ];

  const skillAreas = [
    { name: 'Mathematics', level: 65, color: '#8b5cf6' },
    { name: 'Programming', level: 82, color: '#3b82f6' },
    { name: 'Machine Learning', level: 73, color: '#10b981' },
    { name: 'Deep Learning', level: 45, color: '#f59e0b' },
    { name: 'NLP', level: 38, color: '#ef4444' },
    { name: 'Computer Vision', level: 29, color: '#8b5cf6' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Learning Progress Dashboard</h1>
        <p className="text-muted-foreground">Track your AI learning journey and achievements</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{studyStreak}</div>
            <div className="text-sm text-blue-600 flex items-center justify-center mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              Day Streak
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{Object.values(progressData).reduce((sum, cat) => sum + cat.notes, 0)}</div>
            <div className="text-sm text-green-600 flex items-center justify-center mt-1">
              <Edit3 className="w-4 h-4 mr-1" />
              Notes Written
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{Object.values(progressData).reduce((sum, cat) => sum + cat.summaries, 0)}</div>
            <div className="text-sm text-purple-600 flex items-center justify-center mt-1">
              <BookOpen className="w-4 h-4 mr-1" />
              Summaries
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-700">{totalStudyTime}h</div>
            <div className="text-sm text-orange-600 flex items-center justify-center mt-1">
              <Clock className="w-4 h-4 mr-1" />
              Study Time
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Category Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Category Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <div className="text-sm text-muted-foreground">
                        {category.notes} notes • {category.summaries} summaries
                      </div>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skillAreas.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant="outline" style={{ borderColor: skill.color, color: skill.color }}>
                        {skill.level}%
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Study Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#3b82f6" name="Hours Studied" />
                  <Bar dataKey="sections" fill="#10b981" name="Sections Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`transition-all duration-200 ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' : 'opacity-60 bg-gray-50'}`}>
                <CardContent className="p-4 text-center space-y-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-sm">{achievement.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-yellow-500 text-yellow-900">
                      Unlocked!
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Velocity</CardTitle>
                <CardDescription>Sections completed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sections" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Distribution</CardTitle>
                <CardDescription>Time spent by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="progress"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'][index % 6]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-bold text-blue-700">Peak Learning</div>
                  <div className="text-sm text-blue-600">Weekends</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-700">Avg Session</div>
                  <div className="text-sm text-green-600">2.7 hours</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-700">Best Subject</div>
                  <div className="text-sm text-purple-600">Programming</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressDashboard; 