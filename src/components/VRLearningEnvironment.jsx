import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Eye, 
  Move, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause, 
  Maximize2,
  Minimize2,
  Settings,
  Download,
  Share,
  Brain,
  Network,
  Cube,
  Globe,
  Atom,
  Sparkles,
  Target,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const VRLearningEnvironment = ({ currentLesson, currentSection }) => {
  const [isVRMode, setIsVRMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentScene, setCurrentScene] = useState('neural-network');
  const [interactionMode, setInteractionMode] = useState('explore');
  const [sceneProgress, setSceneProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const { user } = useAuth();
  const { addXP } = useGamification();

  const scenes = {
    'neural-network': {
      title: 'Neural Network Visualization',
      description: 'Explore the structure and flow of neural networks in 3D space',
      difficulty: 'intermediate',
      estimatedTime: 15,
      type: 'interactive'
    },
    'data-flow': {
      title: 'Data Flow Pipeline',
      description: 'Visualize how data moves through AI systems',
      difficulty: 'beginner',
      estimatedTime: 10,
      type: 'guided'
    },
    'algorithm-space': {
      title: 'Algorithm Space',
      description: 'Navigate through different machine learning algorithms',
      difficulty: 'advanced',
      estimatedTime: 20,
      type: 'exploratory'
    },
    'concept-mapping': {
      title: 'Concept Mapping',
      description: 'Build and explore knowledge graphs in 3D',
      difficulty: 'intermediate',
      estimatedTime: 12,
      type: 'constructive'
    }
  };

  useEffect(() => {
    if (isVRMode) {
      initializeVRScene();
    }
  }, [isVRMode, currentScene]);

  const initializeVRScene = async () => {
    setIsLoading(true);
    
    // Simulate VR scene loading
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Initialize 3D scene based on current scene
    const canvas = canvasRef.current;
    if (canvas) {
      // In a real implementation, this would initialize WebGL/Three.js
      console.log(`Initializing VR scene: ${currentScene}`);
      
      // Simulate scene setup
      setTimeout(() => {
        setIsLoading(false);
        setSceneProgress(0);
      }, 1000);
    }
  };

  const startVRExperience = () => {
    setIsVRMode(true);
    addXP(20, 'Started VR Learning Experience');
  };

  const exitVRExperience = () => {
    setIsVRMode(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleSceneChange = (sceneId) => {
    setCurrentScene(sceneId);
    setSceneProgress(0);
  };

  const handleInteraction = (interactionType) => {
    // Simulate VR interactions
    switch (interactionType) {
      case 'explore':
        setSceneProgress(prev => Math.min(100, prev + 10));
        addXP(5, 'VR Exploration');
        break;
      case 'interact':
        setSceneProgress(prev => Math.min(100, prev + 15));
        addXP(10, 'VR Interaction');
        break;
      case 'construct':
        setSceneProgress(prev => Math.min(100, prev + 20));
        addXP(15, 'VR Construction');
        break;
      default:
        break;
    }
  };

  const getSceneIcon = (sceneType) => {
    switch (sceneType) {
      case 'interactive': return <Target className="w-4 h-4" />;
      case 'guided': return <Lightbulb className="w-4 h-4" />;
      case 'exploratory': return <Globe className="w-4 h-4" />;
      case 'constructive': return <Cube className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
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

  if (isVRMode) {
    return (
      <div className={`fixed inset-0 z-50 bg-black ${isFullscreen ? '' : 'm-4 rounded-lg'}`}>
        {/* VR Interface */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-blue-600 text-white">
              <Eye className="w-3 h-3 mr-1" />
              VR Mode
            </Badge>
            <span className="text-white text-sm">
              {scenes[currentScene]?.title}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleFullscreen}
              className="bg-black/50 text-white border-white/20 hover:bg-black/70"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exitVRExperience}
              className="bg-red-600 text-white border-red-600 hover:bg-red-700"
            >
              Exit VR
            </Button>
          </div>
        </div>

        {/* VR Canvas */}
        <div className="w-full h-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading VR Environment...</p>
              </div>
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900"
            />
          )}
        </div>

        {/* VR Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInteraction('explore')}
                  className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                >
                  <Move className="w-4 h-4 mr-1" />
                  Explore
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInteraction('interact')}
                  className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Interact
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleInteraction('construct')}
                  className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
                >
                  <Cube className="w-4 h-4 mr-1" />
                  Construct
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" className="bg-black/50 text-white border-white/20">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-black/50 text-white border-white/20">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="bg-black/50 text-white border-white/20">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white">
                <span>Progress</span>
                <span>{sceneProgress}%</span>
              </div>
              <Progress value={sceneProgress} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-purple-600" />
          VR Learning Environment
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Immersive
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Scene Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Available VR Scenes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(scenes).map(([sceneId, scene]) => (
              <div
                key={sceneId}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  currentScene === sceneId
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleSceneChange(sceneId)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getSceneIcon(scene.type)}
                    <h5 className="font-medium text-sm">{scene.title}</h5>
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(scene.difficulty)}`}>
                    {scene.difficulty}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {scene.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{scene.estimatedTime} min</span>
                  <span className="capitalize">{scene.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Scene Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Selected Scene</h4>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-medium">{scenes[currentScene]?.title}</h5>
                <p className="text-sm text-muted-foreground">
                  {scenes[currentScene]?.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getDifficultyColor(scenes[currentScene]?.difficulty)}`}>
                  {scenes[currentScene]?.difficulty}
                </Badge>
                {getSceneIcon(scenes[currentScene]?.type)}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Estimated Time: {scenes[currentScene]?.estimatedTime} minutes</span>
              <span className="capitalize">Type: {scenes[currentScene]?.type}</span>
            </div>
          </div>
        </div>

        {/* VR Controls */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">VR Controls</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Interaction Mode</label>
              <Select value={interactionMode} onValueChange={setInteractionMode}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explore">Explore</SelectItem>
                  <SelectItem value="interact">Interact</SelectItem>
                  <SelectItem value="construct">Construct</SelectItem>
                  <SelectItem value="guided">Guided Tour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Display Mode</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  VR
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Maximize2 className="w-3 h-3 mr-1" />
                  Full
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={startVRExperience}
            className="flex-1"
            disabled={isLoading}
          >
            <Eye className="w-4 h-4 mr-2" />
            Start VR Experience
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* VR Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-blue-600" />
            VR Learning Tips
          </h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use mouse to look around and explore the environment</li>
            <li>• Click on objects to interact with them</li>
            <li>• Use keyboard arrows to move through the space</li>
            <li>• Take your time to absorb the 3D concepts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VRLearningEnvironment; 