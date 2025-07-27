import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Camera, 
  Scan, 
  Layers,
  MapPin,
  QrCode,
  Image,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Settings,
  Download,
  Share,
  Brain,
  Target,
  Lightbulb,
  Sparkles,
  Eye,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const ARContentOverlays = ({ currentLesson, currentSection }) => {
  const [isARMode, setIsARMode] = useState(false);
  const [currentOverlay, setCurrentOverlay] = useState('concept-markers');
  const [scanningMode, setScanningMode] = useState('object');
  const [overlayProgress, setOverlayProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const videoRef = useRef(null);
  const { user } = useAuth();
  const { addXP } = useGamification();

  const overlayTypes = {
    'concept-markers': {
      title: 'Concept Markers',
      description: 'Visual markers that explain AI concepts in real-world context',
      difficulty: 'beginner',
      estimatedTime: 8,
      type: 'educational'
    },
    'formula-overlay': {
      title: 'Formula Overlays',
      description: 'Mathematical formulas displayed over relevant objects',
      difficulty: 'intermediate',
      estimatedTime: 12,
      type: 'mathematical'
    },
    'data-flow-viz': {
      title: 'Data Flow Visualization',
      description: 'See how data flows through AI systems in real-time',
      difficulty: 'advanced',
      estimatedTime: 15,
      type: 'technical'
    },
    'interactive-models': {
      title: 'Interactive 3D Models',
      description: 'Manipulate 3D models of neural networks and algorithms',
      difficulty: 'intermediate',
      estimatedTime: 10,
      type: 'interactive'
    }
  };

  useEffect(() => {
    if (isARMode) {
      initializeARCamera();
    } else {
      stopARCamera();
    }
  }, [isARMode]);

  const initializeARCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startObjectDetection();
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to demo mode
      setIsARMode(false);
    }
  };

  const stopARCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const startObjectDetection = () => {
    setIsScanning(true);
    
    // Simulate object detection
    const detectionInterval = setInterval(() => {
      const mockObjects = [
        { id: 1, type: 'book', confidence: 0.85, position: { x: 150, y: 200 } },
        { id: 2, type: 'laptop', confidence: 0.92, position: { x: 300, y: 150 } },
        { id: 3, type: 'paper', confidence: 0.78, position: { x: 200, y: 350 } }
      ];
      
      setDetectedObjects(mockObjects);
      setOverlayProgress(prev => Math.min(100, prev + 5));
      
      if (overlayProgress >= 100) {
        clearInterval(detectionInterval);
        setIsScanning(false);
        addXP(15, 'AR Object Detection Complete');
      }
    }, 500);

    setTimeout(() => {
      clearInterval(detectionInterval);
      setIsScanning(false);
    }, 10000);
  };

  const startARExperience = () => {
    setIsARMode(true);
    addXP(20, 'Started AR Learning Experience');
  };

  const exitARExperience = () => {
    setIsARMode(false);
    stopARCamera();
    setDetectedObjects([]);
    setOverlayProgress(0);
  };

  const handleOverlayChange = (overlayId) => {
    setCurrentOverlay(overlayId);
    setOverlayProgress(0);
    if (isARMode) {
      startObjectDetection();
    }
  };

  const handleInteraction = (objectId) => {
    addXP(10, 'AR Object Interaction');
    // Simulate object interaction
    console.log(`Interacting with object ${objectId}`);
  };

  const getOverlayIcon = (type) => {
    switch (type) {
      case 'educational': return <Brain className="w-4 h-4" />;
      case 'mathematical': return <Target className="w-4 h-4" />;
      case 'technical': return <Layers className="w-4 h-4" />;
      case 'interactive': return <Sparkles className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
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

  if (isARMode) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        {/* AR Interface */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-green-600 text-white">
              <Camera className="w-3 h-3 mr-1" />
              AR Mode
            </Badge>
            <span className="text-white text-sm">
              {overlayTypes[currentOverlay]?.title}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={exitARExperience}
              className="bg-red-600 text-white border-red-600 hover:bg-red-700"
            >
              Exit AR
            </Button>
          </div>
        </div>

        {/* AR Camera View */}
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          
          {/* AR Overlays */}
          {detectedObjects.map((obj) => (
            <div
              key={obj.id}
              className="absolute border-2 border-blue-500 bg-blue-500/20 rounded-lg p-2"
              style={{
                left: obj.position.x,
                top: obj.position.y,
                width: '120px',
                height: '80px'
              }}
              onClick={() => handleInteraction(obj.id)}
            >
              <div className="text-white text-xs">
                <div className="font-bold">{obj.type}</div>
                <div>Confidence: {Math.round(obj.confidence * 100)}%</div>
                {currentOverlay === 'concept-markers' && (
                  <div className="mt-1 text-yellow-300">
                    <Lightbulb className="w-3 h-3 inline mr-1" />
                    AI Concept
                  </div>
                )}
                {currentOverlay === 'formula-overlay' && (
                  <div className="mt-1 text-green-300">
                    ƒ(x) = σ(wx + b)
                  </div>
                )}
              </div>
            </div>
          ))}

          {isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 text-white p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Scan className="w-5 h-5 animate-pulse" />
                  <span>Scanning environment...</span>
                </div>
                <Progress value={overlayProgress} className="h-2" />
              </div>
            </div>
          )}
        </div>

        {/* AR Controls */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={startObjectDetection}
                  className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  disabled={isScanning}
                >
                  <Scan className="w-4 h-4 mr-1" />
                  {isScanning ? 'Scanning...' : 'Scan'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                >
                  <QrCode className="w-4 h-4 mr-1" />
                  QR Code
                </Button>
              </div>
              
              <div className="text-white text-sm">
                Objects detected: {detectedObjects.length}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white">
                <span>Detection Progress</span>
                <span>{overlayProgress}%</span>
              </div>
              <Progress value={overlayProgress} className="h-2" />
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
          <Camera className="w-5 h-5 text-green-600" />
          AR Content Overlays
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            Augmented
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overlay Selection */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Available AR Overlays</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(overlayTypes).map(([overlayId, overlay]) => (
              <div
                key={overlayId}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  currentOverlay === overlayId
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => handleOverlayChange(overlayId)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getOverlayIcon(overlay.type)}
                    <h5 className="font-medium text-sm">{overlay.title}</h5>
                  </div>
                  <Badge className={`text-xs ${getDifficultyColor(overlay.difficulty)}`}>
                    {overlay.difficulty}
                  </Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {overlay.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{overlay.estimatedTime} min</span>
                  <span className="capitalize">{overlay.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Overlay Info */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Selected Overlay</h4>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h5 className="font-medium">{overlayTypes[currentOverlay]?.title}</h5>
                <p className="text-sm text-muted-foreground">
                  {overlayTypes[currentOverlay]?.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${getDifficultyColor(overlayTypes[currentOverlay]?.difficulty)}`}>
                  {overlayTypes[currentOverlay]?.difficulty}
                </Badge>
                {getOverlayIcon(overlayTypes[currentOverlay]?.type)}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Estimated Time: {overlayTypes[currentOverlay]?.estimatedTime} minutes</span>
              <span className="capitalize">Type: {overlayTypes[currentOverlay]?.type}</span>
            </div>
          </div>
        </div>

        {/* AR Controls */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">AR Settings</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Scanning Mode</label>
              <Select value={scanningMode} onValueChange={setScanningMode}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="object">Object Detection</SelectItem>
                  <SelectItem value="surface">Surface Tracking</SelectItem>
                  <SelectItem value="marker">Marker Tracking</SelectItem>
                  <SelectItem value="face">Face Tracking</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Display Mode</label>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Smartphone className="w-3 h-3 mr-1" />
                  Mobile
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Monitor className="w-3 h-3 mr-1" />
                  Web
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={startARExperience}
            className="flex-1"
            disabled={isScanning}
          >
            <Camera className="w-4 h-4 mr-2" />
            Start AR Experience
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* AR Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-green-600" />
            AR Learning Tips
          </h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Point your camera at objects to see AI concept overlays</li>
            <li>• Move slowly for better object recognition</li>
            <li>• Tap on detected objects to interact with them</li>
            <li>• Good lighting improves detection accuracy</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ARContentOverlays; 