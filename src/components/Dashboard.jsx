import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Brain, Zap, Code, Play, Clock, Users, RotateCcw, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGamification } from '../contexts/GamificationContext';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import IntelligentRecommendations from './IntelligentRecommendations';

const Dashboard = () => {
  const navigate = useNavigate();
  const { resetAllProgress } = useGamification();
  const categories = [
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      description: 'Build and deploy AI systems at scale with comprehensive ML/DL knowledge',
      progress: 45,
      completed: '8/18',
      icon: Brain,
      gradient: 'gradient-bg-ai-engineer',
      roadmap: 'AI Engineer'
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      description: 'Transform data into actionable insights and business intelligence',
      progress: 62,
      completed: '12/19',
      icon: BookOpen,
      gradient: 'gradient-bg-data-analyst',
      roadmap: 'Data Analyst'
    },
    {
      id: 'ai-data-scientist',
      title: 'AI Data Scientist',
      description: 'Advanced analytics, ML modeling, and data-driven decision making',
      progress: 38,
      completed: '6/16',
      icon: Code,
      gradient: 'gradient-bg-ai-data-scientist',
      roadmap: 'AI Data Scientist'
    },
    {
      id: 'ai-red-teaming',
      title: 'AI Red Teaming',
      description: 'Security testing, adversarial attacks, and AI system vulnerabilities',
      progress: 28,
      completed: '4/14',
      icon: Zap,
      gradient: 'gradient-bg-ai-red-teaming',
      roadmap: 'AI Red Teaming'
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      description: 'Autonomous systems, multi-agent systems, and intelligent automation',
      progress: 22,
      completed: '3/13',
      icon: Users,
      gradient: 'gradient-bg-ai-agents',
      roadmap: 'AI Agents'
    }
  ];

  const featuredLessons = [
    {
      id: 'intro-machine-learning',
      title: 'Introduction to Machine Learning',
      category: 'Machine Learning',
      duration: '45 min',
      difficulty: 'Beginner',
      thumbnail: '/api/placeholder/300/200',
      description: 'Learn the fundamental concepts of machine learning and its applications in AI systems.'
    },
    {
      id: 'linear-algebra-foundations',
      title: 'Linear Algebra Foundations',
      category: 'Mathematics',
      duration: '60 min',
      difficulty: 'Intermediate',
      thumbnail: '/api/placeholder/300/200',
      description: 'Master vectors, matrices, and linear transformations essential for AI.'
    },
    {
      id: 'deep-learning-python',
      title: 'Deep Learning with Python',
      category: 'Programming',
      duration: '90 min',
      difficulty: 'Advanced',
      thumbnail: '/api/placeholder/300/200',
      description: 'Build and train neural networks using Python and TensorFlow.'
    },
    {
      id: 'neural-networks-intro',
      title: 'Neural Networks Fundamentals',
      category: 'Deep Learning',
      duration: '50 min',
      difficulty: 'Beginner',
      thumbnail: '/api/placeholder/300/200',
      description: 'Understand how artificial neural networks mimic the human brain.'
    },
    {
      id: 'nlp-transformers',
      title: 'Transformers and Attention',
      category: 'NLP',
      duration: '75 min',
      difficulty: 'Advanced',
      thumbnail: '/api/placeholder/300/200',
      description: 'Explore the revolutionary transformer architecture powering modern AI.'
    },
    {
      id: 'computer-vision-cnn',
      title: 'CNNs for Computer Vision',
      category: 'Computer Vision',
      duration: '65 min',
      difficulty: 'Intermediate',
      thumbnail: '/api/placeholder/300/200',
      description: 'Learn how convolutional neural networks process visual information.'
    }
  ];

  const learningPaths = [
    {
      title: 'Mathematical Foundations for AI',
      progress: 75,
      lessons: 12,
      estimatedTime: '8 weeks',
      description: 'Master the essential mathematics behind artificial intelligence'
    },
    {
      title: 'Deep Learning Mastery Track',
      progress: 50,
      lessons: 15,
      estimatedTime: '10 weeks',
      description: 'Comprehensive journey through neural networks and deep learning'
    },
    {
      title: 'Natural Language Processing',
      progress: 25,
      lessons: 18,
      estimatedTime: '12 weeks',
      description: 'From text processing to large language models like GPT'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category && category.roadmap) {
      navigate(`/roadmap/${category.roadmap.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigate(`/category/${categoryId}/overview`);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Welcome back, John!</h1>
              <p className="text-sm sm:text-base text-muted-foreground">Continue your journey to master Artificial General Intelligence</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset Progress
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reset All Progress</DialogTitle>
                    <DialogDescription>
                      This will permanently delete all your progress, including:
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>XP and level progress</li>
                        <li>Completed lessons</li>
                        <li>Notes and summaries</li>
                        <li>Quiz scores</li>
                        <li>Achievements</li>
                        <li>Study time tracking</li>
                      </ul>
                      <p className="mt-4 font-medium text-destructive">This action cannot be undone!</p>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => {
                        resetAllProgress();
                        window.location.reload();
                      }}
                    >
                      Reset All Progress
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <section className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Category Overview</h2>
            <Button variant="outline" size="sm" className="self-start sm:self-auto">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="card-hover cursor-pointer group transition-all duration-200 hover:shadow-lg"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-full h-20 lg:h-24 rounded-lg ${category.gradient} flex items-center justify-center mb-3 lg:mb-4`}>
                      <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-base lg:text-lg group-hover:text-primary transition-colors leading-tight">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-xs lg:text-sm line-clamp-2">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs lg:text-sm text-muted-foreground">
                      <span>{category.completed} Completed</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Featured Lessons */}
        <section className="space-y-4 lg:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Featured Lessons</h2>
            <Button variant="outline" size="sm" className="self-start sm:self-auto">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {featuredLessons.slice(0, 4).map((lesson) => (
              <Card key={lesson.id} className="card-hover cursor-pointer group transition-all duration-200 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="w-full h-28 lg:h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-3">
                    <Play className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-primary font-medium uppercase tracking-wide">
                      {lesson.category}
                    </p>
                    <CardTitle className="text-sm lg:text-base group-hover:text-primary transition-colors leading-tight">
                      {lesson.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.duration}</span>
                    </div>
                    <span className="px-2 py-1 bg-muted rounded-full text-xs">
                      {lesson.difficulty}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Show more lessons on larger screens */}
          <div className="hidden xl:grid grid-cols-2 gap-4 lg:gap-6">
            {featuredLessons.slice(4).map((lesson) => (
              <Card key={lesson.id} className="card-hover cursor-pointer group transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Play className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-xs text-primary font-medium uppercase tracking-wide">
                        {lesson.category}
                      </p>
                      <h3 className="text-sm lg:text-base font-semibold group-hover:text-primary transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
                        </div>
                        <span className="px-2 py-1 bg-muted rounded-full">
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Path Recommendations */}
        <section className="space-y-4 lg:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Learning Path Recommendations</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="card-hover cursor-pointer transition-all duration-200 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg leading-tight">{path.title}</CardTitle>
                  <CardDescription className="text-xs lg:text-sm">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-primary">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs lg:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{path.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{path.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline" size="sm">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* AI-Powered Recommendations */}
        <section className="space-y-4 lg:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">AI-Powered Recommendations</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <IntelligentRecommendations 
              currentLesson={null}
              userProgress={{
                completedLessons: ['intro-machine-learning', 'linear-algebra-foundations'],
                totalLessons: 50,
                quizScores: [
                  { topic: 'mathematics', score: 85 },
                  { topic: 'programming', score: 92 },
                  { topic: 'statistics', score: 65 },
                  { topic: 'machine-learning', score: 78 }
                ],
                studyTime: 284,
                averageScore: 80
              }}
              onNavigateToLesson={(lessonId) => {
                console.log('Navigate to lesson:', lessonId);
                // Navigate to the recommended lesson
              }}
            />
            
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg leading-tight">AI Learning Assistant</CardTitle>
                <CardDescription className="text-xs lg:text-sm">
                  Get personalized help and insights from our AI tutor
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Smart Study Planning</p>
                      <p className="text-xs text-muted-foreground">AI optimizes your learning schedule</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Adaptive Quizzes</p>
                      <p className="text-xs text-muted-foreground">Questions tailored to your level</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <div className="w-8 h-8 bg-chart-3/10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-chart-3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Content Summaries</p>
                      <p className="text-xs text-muted-foreground">AI-generated key insights</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline" size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  Start AI Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-foreground">127</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Lessons Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-foreground">284h</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-chart-5/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 lg:w-6 lg:h-6 text-chart-5" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-foreground">42</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Study Streak (days)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

