import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Target, CheckCircle, Circle, Play, Brain, Code, Zap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { roadmapData } from '../data/roadmapData';

const RoadmapPage = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    // Convert roadmap ID back to proper format (e.g., "ai-engineer" -> "AI Engineer")
    const roadmapKey = roadmapId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    const roadmapContent = roadmapData[roadmapKey];
    if (roadmapContent) {
      setRoadmap(roadmapContent);
      // Set first category as default
      if (roadmapContent.categories && roadmapContent.categories.length > 0) {
        setSelectedCategory(roadmapContent.categories[0]);
        if (roadmapContent.categories[0].topics && roadmapContent.categories[0].topics.length > 0) {
          setSelectedTopic(roadmapContent.categories[0].topics[0]);
        }
      }
    }
  }, [roadmapId]);

  // Icon mapping for roadmap categories
  const getIcon = (iconName) => {
    const icons = {
      '🤖': Brain,
      '📊': BookOpen,
      '🔬': Code,
      '🛡️': Zap,
      '🤝': Users,
      'default': BookOpen
    };
    return icons[iconName] || icons.default;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'beginner': 'bg-green-100 text-green-800',
      'intermediate': 'bg-yellow-100 text-yellow-800',
      'advanced': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors.beginner;
  };

  const handleLessonClick = (lesson) => {
    navigate(`/lesson/${roadmapId}/${selectedCategory.id}/${selectedTopic.id}/${lesson.id}`);
  };

  if (!roadmap) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-muted-foreground">Roadmap not found</h1>
            <p className="text-muted-foreground mt-2">The requested roadmap could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Roadmap Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl`}>
              {roadmap.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{roadmap.title}</h1>
              <p className="text-lg text-muted-foreground">{roadmap.description}</p>
            </div>
          </div>
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Total Categories</span>
                </div>
                <p className="text-2xl font-bold mt-1">{roadmap.categories?.length || 0}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Total Topics</span>
                </div>
                <p className="text-2xl font-bold mt-1">
                  {roadmap.categories?.reduce((total, cat) => total + (cat.topics?.length || 0), 0) || 0}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Estimated Time</span>
                </div>
                <p className="text-2xl font-bold mt-1">12-16 weeks</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categories and Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {roadmap.categories?.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category);
                      if (category.topics && category.topics.length > 0) {
                        setSelectedTopic(category.topics[0]);
                      }
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory?.id === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}</span>
                      <div>
                        <p className="font-medium">{category.title}</p>
                        <p className="text-xs opacity-80">{category.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Topics and Lessons */}
          <div className="lg:col-span-3 space-y-6">
            {selectedCategory && (
              <>
                {/* Category Header */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">{selectedCategory.title}</h2>
                  <p className="text-muted-foreground">{selectedCategory.description}</p>
                </div>

                {/* Topics */}
                <div className="space-y-6">
                  {selectedCategory.topics?.map((topic) => (
                    <Card key={topic.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{topic.title}</CardTitle>
                          <Badge variant="secondary">{topic.lessons?.length || 0} lessons</Badge>
                        </div>
                        <CardDescription>{topic.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {topic.lessons?.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                              onClick={() => handleLessonClick(lesson)}
                            >
                              <div className="flex items-center gap-3">
                                <Circle className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">{lesson.title}</p>
                                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={getDifficultyColor(lesson.difficulty)}>
                                      {lesson.difficulty}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <Clock className="w-3 h-3" />
                                      {lesson.duration} min
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Play className="w-4 h-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage; 