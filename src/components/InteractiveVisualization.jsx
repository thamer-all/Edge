import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const InteractiveVisualization = ({ type = 'gradient-descent', title, description }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [parameters, setParameters] = useState({
    learningRate: 0.1,
    iterations: 50,
    enableTrace: true,
    speed: 1
  });
  const [currentIteration, setCurrentIteration] = useState(0);

  // Gradient descent visualization data
  // eslint-disable-next-line no-unused-vars
  const [points, setPoints] = useState([]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    initializeVisualization();
  }, [type, initializeVisualization]);

  useEffect(() => {
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return () => stopAnimation();
  }, [isPlaying, parameters]);

  const initializeVisualization = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (type === 'gradient-descent') {
      drawGradientDescentSurface(ctx);
    } else if (type === 'neural-network') {
      drawNeuralNetwork(ctx);
    }
  }, [type]);

  const drawGradientDescentSurface = useCallback((ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Create gradient background representing the cost function
    const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.min(width, height)/2);
    gradient.addColorStop(0, '#00d4aa');
    gradient.addColorStop(0.5, '#4a90e2');
    gradient.addColorStop(1, '#6c5ce7');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw contour lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(width/2, height/2, (i * Math.min(width, height)) / 10, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw current position if path exists
    if (path.length > 0) {
      // Draw path
      if (parameters.enableTrace && path.length > 1) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      }

      // Draw current position
      const current = path[path.length - 1];
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.arc(current.x, current.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw white border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [path, parameters]);

  const drawNeuralNetwork = useCallback((ctx) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Clear background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);

    // Define network structure
    const layers = [3, 4, 4, 2]; // Input, hidden1, hidden2, output
    const layerSpacing = width / (layers.length + 1);
    const nodeRadius = 15;

    // Draw connections
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNodes = layers[l];
      const nextLayerNodes = layers[l + 1];
      const currentX = (l + 1) * layerSpacing;
      const nextX = (l + 2) * layerSpacing;

      for (let i = 0; i < currentLayerNodes; i++) {
        const currentY = (height / (currentLayerNodes + 1)) * (i + 1);
        
        for (let j = 0; j < nextLayerNodes; j++) {
          const nextY = (height / (nextLayerNodes + 1)) * (j + 1);
          
          ctx.beginPath();
          ctx.moveTo(currentX, currentY);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    layers.forEach((nodeCount, layerIndex) => {
      const x = (layerIndex + 1) * layerSpacing;
      
      for (let i = 0; i < nodeCount; i++) {
        const y = (height / (nodeCount + 1)) * (i + 1);
        
        // Node circle
        ctx.fillStyle = layerIndex === 0 ? '#00d4aa' : 
                       layerIndex === layers.length - 1 ? '#ff6b35' : '#4a90e2';
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Node border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Input', layerSpacing, height - 20);
    ctx.fillText('Hidden', 2 * layerSpacing, height - 20);
    ctx.fillText('Hidden', 3 * layerSpacing, height - 20);
    ctx.fillText('Output', 4 * layerSpacing, height - 20);
  }, []);

  const startAnimation = useCallback(() => {
    if (type === 'gradient-descent') {
      animateGradientDescent();
    }
  }, [type, animateGradientDescent]);

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const animateGradientDescent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Initialize starting position if path is empty
    if (path.length === 0) {
      const startX = width * 0.8;
      const startY = height * 0.2;
      setPath([{ x: startX, y: startY }]);
      setCurrentIteration(0);
    }

    if (currentIteration < parameters.iterations && path.length > 0) {
      const current = path[path.length - 1];
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate gradient (direction toward center)
      const dx = centerX - current.x;
      const dy = centerY - current.y;
      
      // Apply learning rate
      const newX = current.x + dx * parameters.learningRate;
      const newY = current.y + dy * parameters.learningRate;
      
      setPath(prev => [...prev, { x: newX, y: newY }]);
      setCurrentIteration(prev => prev + 1);
      
      // Redraw
      const ctx = canvas.getContext('2d');
      drawGradientDescentSurface(ctx);
      
      // Continue animation
      animationRef.current = setTimeout(() => {
        animateGradientDescent();
      }, 100 / parameters.speed);
    } else {
      setIsPlaying(false);
    }
  }, [path, currentIteration, parameters, drawGradientDescentSurface]);

  const resetVisualization = () => {
    setIsPlaying(false);
    setPath([]);
    setCurrentIteration(0);
    initializeVisualization();
  };

  const handleParameterChange = (param, value) => {
    setParameters(prev => ({
      ...prev,
      [param]: Array.isArray(value) ? value[0] : value
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{title || 'Interactive Visualization'}</span>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visualization Canvas */}
          <div className="lg:col-span-2">
            <div className="border rounded-lg p-4 bg-white">
              <canvas
                ref={canvasRef}
                className="w-full h-auto border rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              
              {/* Controls */}
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={currentIteration >= parameters.iterations}
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button onClick={resetVisualization} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {/* Progress */}
              {type === 'gradient-descent' && (
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Iteration: {currentIteration} / {parameters.iterations}
                </div>
              )}
            </div>
          </div>

          {/* Parameters Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Parameters</h3>
              
              <div className="space-y-4">
                {type === 'gradient-descent' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="learning-rate">Learning Rate</Label>
                      <Slider
                        id="learning-rate"
                        min={0.01}
                        max={1.0}
                        step={0.01}
                        value={[parameters.learningRate]}
                        onValueChange={(value) => handleParameterChange('learningRate', value)}
                      />
                      <div className="text-sm text-muted-foreground text-right">
                        {parameters.learningRate.toFixed(2)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="iterations">Number of Iterations</Label>
                      <Slider
                        id="iterations"
                        min={1}
                        max={100}
                        step={1}
                        value={[parameters.iterations]}
                        onValueChange={(value) => handleParameterChange('iterations', value)}
                      />
                      <div className="text-sm text-muted-foreground text-right">
                        {parameters.iterations}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="enable-trace"
                        checked={parameters.enableTrace}
                        onCheckedChange={(checked) => handleParameterChange('enableTrace', checked)}
                      />
                      <Label htmlFor="enable-trace">Enable Trace</Label>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="speed">Animation Speed</Label>
                  <Slider
                    id="speed"
                    min={0.1}
                    max={3.0}
                    step={0.1}
                    value={[parameters.speed]}
                    onValueChange={(value) => handleParameterChange('speed', value)}
                  />
                  <div className="text-sm text-muted-foreground text-right">
                    {parameters.speed.toFixed(1)}x
                  </div>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <h4 className="font-medium">How it works:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                {type === 'gradient-descent' ? (
                  <>
                    <p>• The colored surface represents a cost function</p>
                    <p>• The orange dot shows the current position</p>
                    <p>• The algorithm moves toward the minimum (center)</p>
                    <p>• Learning rate controls step size</p>
                  </>
                ) : (
                  <>
                    <p>• Input layer receives data</p>
                    <p>• Hidden layers process information</p>
                    <p>• Output layer produces results</p>
                    <p>• Connections show data flow</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveVisualization;

