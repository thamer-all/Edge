import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Clock, 
  Star, 
  Sparkles,
  ArrowRight,
  Brain,
  Lightbulb,
  Zap,
  CheckCircle,
  Play
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const IntelligentRecommendations = ({ currentLesson, userProgress, onNavigateToLesson }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [learningPatterns, setLearningPatterns] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { addXP } = useGamification();

  useEffect(() => {
    generateRecommendations();
  }, [currentLesson, userProgress]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Analyze user learning patterns
    const patterns = analyzeLearningPatterns(userProgress);
    setLearningPatterns(patterns);
    
    // Generate personalized recommendations
    const recs = await generatePersonalizedRecommendations(patterns, currentLesson);
    setRecommendations(recs);
    
    setIsLoading(false);
  };

  const analyzeLearningPatterns = (progress) => {
    const patterns = {
      preferredTopics: [],
      learningSpeed: 'medium',
      studyTime: 'evening',
      difficultyPreference: 'medium',
      completionRate: 0,
      strengths: [],
      weaknesses: []
    };

    // Analyze completion rates
    if (progress && progress.completedLessons) {
      patterns.completionRate = (progress.completedLessons.length / progress.totalLessons) * 100;
    }

    // Analyze preferred topics based on quiz performance
    if (progress && progress.quizScores) {
      const topicScores = {};
      progress.quizScores.forEach(score => {
        if (!topicScores[score.topic]) {
          topicScores[score.topic] = [];
        }
        topicScores[score.topic].push(score.score);
      });

      // Find strengths and weaknesses
      Object.entries(topicScores).forEach(([topic, scores]) => {
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        if (avgScore >= 80) {
          patterns.strengths.push(topic);
        } else if (avgScore <= 60) {
          patterns.weaknesses.push(topic);
        }
      });

      // Find preferred topics (highest scores)
      const sortedTopics = Object.entries(topicScores)
        .map(([topic, scores]) => ({
          topic,
          avgScore: scores.reduce((a, b) => a + b, 0) / scores.length
        }))
        .sort((a, b) => b.avgScore - a.avgScore)
        .slice(0, 3)
        .map(item => item.topic);
      
      patterns.preferredTopics = sortedTopics;
    }

    // Analyze learning speed based on time spent
    if (progress && progress.studyTime) {
      const avgTimePerLesson = progress.studyTime / progress.completedLessons?.length || 1;
      if (avgTimePerLesson < 15) patterns.learningSpeed = 'fast';
      else if (avgTimePerLesson > 30) patterns.learningSpeed = 'slow';
    }

    return patterns;
  };

  const generatePersonalizedRecommendations = async (patterns, currentLesson) => {
    const allLessons = [
      // AI Engineer Roadmap
      { id: 'ai-engineer-linear-algebra', title: 'Linear Algebra Fundamentals', difficulty: 'beginner', topic: 'mathematics', estimatedTime: 45, type: 'foundational' },
      { id: 'ai-engineer-calculus', title: 'Calculus for AI', difficulty: 'intermediate', topic: 'mathematics', estimatedTime: 60, type: 'foundational' },
      { id: 'ai-engineer-python-basics', title: 'Python Programming Basics', difficulty: 'beginner', topic: 'programming', estimatedTime: 90, type: 'practical' },
      { id: 'ai-engineer-numpy', title: 'NumPy and Array Operations', difficulty: 'intermediate', topic: 'programming', estimatedTime: 75, type: 'practical' },
      
      // Data Analyst Roadmap
      { id: 'data-analyst-descriptive-stats', title: 'Descriptive Statistics', difficulty: 'beginner', topic: 'statistics', estimatedTime: 60, type: 'foundational' },
      { id: 'data-analyst-probability', title: 'Probability Fundamentals', difficulty: 'intermediate', topic: 'statistics', estimatedTime: 90, type: 'foundational' },
      { id: 'data-analyst-sql-basics', title: 'SQL Fundamentals', difficulty: 'beginner', topic: 'data', estimatedTime: 120, type: 'practical' },
      { id: 'data-analyst-visualization', title: 'Data Visualization', difficulty: 'intermediate', topic: 'data', estimatedTime: 90, type: 'practical' },
      
      // AI Data Scientist Roadmap
      { id: 'ai-scientist-inferential-stats', title: 'Inferential Statistics', difficulty: 'intermediate', topic: 'statistics', estimatedTime: 120, type: 'advanced' },
      { id: 'ai-scientist-ml-algorithms', title: 'Machine Learning Algorithms', difficulty: 'advanced', topic: 'machine-learning', estimatedTime: 180, type: 'advanced' },
      { id: 'ai-scientist-feature-engineering', title: 'Feature Engineering', difficulty: 'advanced', topic: 'machine-learning', estimatedTime: 150, type: 'advanced' },
      
      // AI Red Teaming Roadmap
      { id: 'red-team-threat-modeling', title: 'Threat Modeling', difficulty: 'intermediate', topic: 'security', estimatedTime: 90, type: 'specialized' },
      { id: 'red-team-adversarial-attacks', title: 'Adversarial Attacks', difficulty: 'advanced', topic: 'security', estimatedTime: 120, type: 'specialized' },
      { id: 'red-team-defense', title: 'AI Defense Strategies', difficulty: 'advanced', topic: 'security', estimatedTime: 150, type: 'specialized' }
    ];

    // Filter out current lesson
    const availableLessons = allLessons.filter(lesson => lesson.id !== currentLesson?.id);

    // Score each lesson based on patterns
    const scoredLessons = availableLessons.map(lesson => {
      let score = 0;
      
      // Topic preference scoring
      if (patterns.preferredTopics.includes(lesson.topic)) {
        score += 30;
      }
      
      // Difficulty preference scoring
      if (patterns.learningSpeed === 'fast' && lesson.difficulty === 'advanced') {
        score += 20;
      } else if (patterns.learningSpeed === 'slow' && lesson.difficulty === 'beginner') {
        score += 20;
      } else if (patterns.learningSpeed === 'medium' && lesson.difficulty === 'intermediate') {
        score += 20;
      }
      
      // Time preference scoring
      if (lesson.estimatedTime <= 60) {
        score += 15;
      }
      
      // Strengths/weaknesses scoring
      if (patterns.strengths.includes(lesson.topic)) {
        score += 10; // Build on strengths
      }
      if (patterns.weaknesses.includes(lesson.topic)) {
        score += 25; // Focus on weaknesses
      }
      
      // Type preference scoring
      if (patterns.completionRate > 80) {
        score += 15; // Prefer advanced content for high performers
      } else if (patterns.completionRate < 50) {
        score += 15; // Prefer foundational content for struggling learners
      }
      
      return { ...lesson, score };
    });

    // Sort by score and return top recommendations
    return scoredLessons
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((lesson, index) => ({
        ...lesson,
        confidence: Math.min(95, 60 + (index * 5)), // Higher confidence for top recommendations
        reason: generateRecommendationReason(lesson, patterns)
      }));
  };

  const generateRecommendationReason = (lesson, patterns) => {
    const reasons = [];
    
    if (patterns.preferredTopics.includes(lesson.topic)) {
      reasons.push('Matches your interests');
    }
    
    if (patterns.weaknesses.includes(lesson.topic)) {
      reasons.push('Addresses your learning gaps');
    }
    
    if (patterns.strengths.includes(lesson.topic)) {
      reasons.push('Builds on your strengths');
    }
    
    if (lesson.difficulty === 'beginner' && patterns.completionRate < 50) {
      reasons.push('Perfect for your current level');
    }
    
    if (lesson.difficulty === 'advanced' && patterns.completionRate > 80) {
      reasons.push('Challenges you appropriately');
    }
    
    if (lesson.estimatedTime <= 60) {
      reasons.push('Fits your study schedule');
    }
    
    return reasons.length > 0 ? reasons.join(', ') : 'Recommended based on your learning patterns';
  };

  const handleStartLesson = (lesson) => {
    addXP(10, 'Started Recommended Lesson');
    if (onNavigateToLesson) {
      onNavigateToLesson(lesson.id);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTopicIcon = (topic) => {
    switch (topic) {
      case 'mathematics': return <Brain className="w-4 h-4" />;
      case 'programming': return <Zap className="w-4 h-4" />;
      case 'statistics': return <TrendingUp className="w-4 h-4" />;
      case 'data': return <Target className="w-4 h-4" />;
      case 'machine-learning': return <Sparkles className="w-4 h-4" />;
      case 'security': return <CheckCircle className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-sm text-muted-foreground">Analyzing your learning patterns...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Recommendations
          <Badge variant="secondary" className="ml-auto">
            <Lightbulb className="w-3 h-3 mr-1" />
            Personalized
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Learning Patterns Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Your Learning Profile</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>Speed: {learningPatterns.learningSpeed}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3" />
              <span>Completion: {Math.round(learningPatterns.completionRate)}%</span>
            </div>
            {learningPatterns.strengths.length > 0 && (
              <div className="col-span-2">
                <span className="text-green-600">Strengths: {learningPatterns.strengths.join(', ')}</span>
              </div>
            )}
            {learningPatterns.weaknesses.length > 0 && (
              <div className="col-span-2">
                <span className="text-orange-600">Focus Areas: {learningPatterns.weaknesses.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Recommended Next Steps</h4>
          <div className="space-y-3">
            {recommendations.map((lesson, index) => (
              <div key={lesson.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTopicIcon(lesson.topic)}
                      <h5 className="font-medium text-sm">{lesson.title}</h5>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {lesson.estimatedTime} min
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{lesson.confidence}% match</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {lesson.reason}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Progress value={lesson.confidence} className="h-1 flex-1" />
                      <Button
                        size="sm"
                        onClick={() => handleStartLesson(lesson)}
                        className="h-6 px-2 text-xs"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-3 border-t">
          <h4 className="font-semibold text-sm mb-2">Quick Actions</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={generateRecommendations}
              className="text-xs"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              View Progress
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligentRecommendations; 