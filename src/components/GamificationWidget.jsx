import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Gift, Crown, Medal, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGamification } from '../contexts/GamificationContext';

const GamificationWidget = ({ isMinimized = false }) => {
  const { 
    userStats, 
    unlockedAchievements, 
    dailyChallenges, 
    challengeProgress, 
    achievements,
    getXpForNextLevel 
  } = useGamification();

  const [showDetails, setShowDetails] = useState(false);
  const [recentUnlocks, setRecentUnlocks] = useState([]);
  const [showUnlockNotification, setShowUnlockNotification] = useState(null);

  // Watch for new achievements
           useEffect(() => {
           const recent = unlockedAchievements
             .filter(a => {
               const unlockedDate = new Date(a.unlockedAt);
               const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
               return unlockedDate > oneDayAgo;
             })
             .sort((a, b) => new Date(b.unlockedAt) - new Date(a.unlockedAt));
           
           setRecentUnlocks(recent);
       
           // Show notification for very recent unlocks (last 10 seconds)
           const veryRecent = recent.find(a => {
             const unlockedDate = new Date(a.unlockedAt);
             const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
             return unlockedDate > tenSecondsAgo;
           });
       
           if (veryRecent && !showUnlockNotification) {
             setShowUnlockNotification(veryRecent);
             setTimeout(() => setShowUnlockNotification(null), 5000);
           }
         }, [unlockedAchievements, showUnlockNotification]);

  const getCurrentLevelProgress = () => {
    const currentLevelXp = userStats.level > 1 ? getXpForNextLevel(userStats.level - 1) : 0;
    const nextLevelXp = getXpForNextLevel(userStats.level);
    const progressXp = userStats.xp - currentLevelXp;
    const totalXpNeeded = nextLevelXp - currentLevelXp;
    
    return Math.min((progressXp / totalXpNeeded) * 100, 100);
  };

  const getXpToNextLevel = () => {
    const nextLevelXp = getXpForNextLevel(userStats.level);
    return nextLevelXp - userStats.xp;
  };

  const getTodaysCompletedChallenges = () => {
    return dailyChallenges.filter(challenge => 
      (challengeProgress[challenge.id] || 0) >= 1
    );
  };

  const getLevelIcon = (level) => {
    if (level >= 50) return '✨';
    if (level >= 25) return '🌟';
    if (level >= 10) return '⭐';
    if (level >= 5) return '🔥';
    return '🌱';
  };

  const getLevelTitle = (level) => {
    if (level >= 50) return 'Learning Legend';
    if (level >= 25) return 'Expert Learner';
    if (level >= 10) return 'Rising Star';
    if (level >= 5) return 'Dedicated Student';
    return 'Beginner';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        {/* Achievement Unlock Notification */}
        {showUnlockNotification && (
          <Card className="mb-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white animate-bounce-gentle shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{showUnlockNotification.icon}</div>
                <div>
                  <div className="font-bold">Achievement Unlocked!</div>
                  <div className="text-sm">{showUnlockNotification.name}</div>
                </div>
                <Badge className="bg-white text-yellow-600">
                  +{showUnlockNotification.xp} XP
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Minimized Widget */}
        <Card 
          className="bg-gradient-to-br from-purple-500 to-blue-600 text-white cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg"
          onClick={() => setShowDetails(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{getLevelIcon(userStats.level)}</div>
              <div>
                <div className="font-bold">Level {userStats.level}</div>
                <Progress 
                  value={getCurrentLevelProgress()} 
                  className="h-2 w-20 bg-white/20" 
                />
              </div>
              <Badge className="bg-white text-purple-600 font-bold">
                {userStats.xp} XP
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Achievement Unlock Notification */}
      {showUnlockNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <Card className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-6 h-6" />
                <div>
                  <div className="font-bold">Achievement Unlocked!</div>
                  <div className="text-sm">{showUnlockNotification.name}</div>
                </div>
                <Badge className="bg-white text-yellow-600">
                  +{showUnlockNotification.xp} XP
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Widget Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Crown className="w-6 h-6 mr-2 text-yellow-500" />
              Your Learning Journey
            </DialogTitle>
            <DialogDescription>
              Track your progress, achievements, and daily challenges
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Level and XP Display */}
              <Card className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{getLevelIcon(userStats.level)}</div>
                      <div>
                        <div className="text-3xl font-bold">Level {userStats.level}</div>
                        <div className="text-lg opacity-90">{getLevelTitle(userStats.level)}</div>
                      </div>
                    </div>
                    <Badge className="bg-white text-purple-600 text-lg font-bold px-4 py-2">
                      {userStats.xp.toLocaleString()} XP
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Level {userStats.level + 1}</span>
                      <span>{getXpToNextLevel()} XP to go</span>
                    </div>
                    <Progress 
                      value={getCurrentLevelProgress()} 
                      className="h-3 bg-white/20"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">{userStats.lessonsCompleted}</div>
                    <div className="text-sm text-green-600">Lessons Completed</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">{userStats.notesWritten}</div>
                    <div className="text-sm text-blue-600">Notes Written</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">{userStats.currentStreak}</div>
                    <div className="text-sm text-purple-600">Day Streak</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-700">{unlockedAchievements.length}</div>
                    <div className="text-sm text-orange-600">Achievements</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Achievements */}
              {recentUnlocks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {recentUnlocks.slice(0, 4).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium text-yellow-800">{achievement.name}</div>
                            <div className="text-sm text-yellow-600">{achievement.description}</div>
                          </div>
                          <Badge className="bg-yellow-500 text-white">
                            +{achievement.xp} XP
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const isUnlocked = unlockedAchievements.find(a => a.id === achievement.id);
                  return (
                    <Card 
                      key={achievement.id} 
                      className={`transition-all duration-200 ${
                        isUnlocked 
                          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg' 
                          : 'opacity-60 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <CardContent className="p-4 text-center space-y-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                        </div>
                        <div className="flex justify-center space-x-2">
                          <Badge variant={isUnlocked ? 'default' : 'outline'} className={isUnlocked ? 'bg-yellow-500' : ''}>
                            {achievement.xp} XP
                          </Badge>
                          {isUnlocked && (
                            <Badge className="bg-green-500">
                              Unlocked!
                            </Badge>
                          )}
                        </div>
                        {isUnlocked && (
                          <div className="text-xs text-muted-foreground">
                            Unlocked: {new Date(isUnlocked.unlockedAt).toLocaleDateString()}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Today's Challenges
                    </div>
                    <Badge>{getTodaysCompletedChallenges().length}/{dailyChallenges.length} Complete</Badge>
                  </CardTitle>
                  <CardDescription>
                    Complete daily challenges to earn bonus XP and maintain your streak
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyChallenges.map((challenge) => {
                    const progress = challengeProgress[challenge.id] || 0;
                    const isCompleted = progress >= 1;
                    
                    return (
                      <div key={challenge.id} className={`p-4 rounded-lg border ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{challenge.name}</h4>
                          <div className="flex items-center space-x-2">
                            {isCompleted && <Medal className="w-4 h-4 text-green-600" />}
                            <Badge variant={isCompleted ? 'default' : 'outline'} className={isCompleted ? 'bg-green-500' : ''}>
                              {challenge.xp} XP
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>
                        <Progress value={Math.min(progress * 100, 100)} className="h-2" />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total XP Earned:</span>
                      <span className="font-bold">{userStats.xp.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lessons Completed:</span>
                      <span className="font-bold">{userStats.lessonsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Notes Written:</span>
                      <span className="font-bold">{userStats.notesWritten}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Summaries Created:</span>
                      <span className="font-bold">{userStats.summariesWritten}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Perfect Quizzes:</span>
                      <span className="font-bold">{userStats.perfectQuizzes}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Achievements Unlocked:</span>
                      <span className="font-bold">{unlockedAchievements.length}/{achievements.length}</span>
                    </div>
                    <Progress 
                      value={(unlockedAchievements.length / achievements.length) * 100} 
                      className="h-3" 
                    />
                    <div className="flex justify-between">
                      <span>Current Streak:</span>
                      <span className="font-bold">{userStats.currentStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Longest Streak:</span>
                      <span className="font-bold">{userStats.longestStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Study Time:</span>
                      <span className="font-bold">{Math.floor(userStats.studyTimeTotal / 60)}h {userStats.studyTimeTotal % 60}m</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GamificationWidget; 