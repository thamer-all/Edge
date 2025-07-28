import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, ZoomIn, ZoomOut, RotateCcw, Plus, Minus, Filter, Info } from 'lucide-react';
import { useGamification } from '../contexts/GamificationContext';

const ConceptGraph = ({ concepts = [], onConceptClick }) => {
  const { addXP } = useGamification();
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [_isDragging, setIsDragging] = useState(false);
  const [_dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showInfo, setShowInfo] = useState(false);

  // Initialize graph from concepts
  useEffect(() => {
    if (concepts.length > 0) {
      const graphNodes = concepts.map((concept, index) => ({
        id: concept.id || `concept-${index}`,
        label: concept.title,
        description: concept.description,
        type: concept.type || 'concept',
        difficulty: concept.difficulty || 'beginner',
        completed: concept.completed || false,
        x: Math.random() * 800 + 100,
        y: Math.random() * 600 + 100,
        radius: 30,
        color: getNodeColor(concept.type || 'concept', concept.completed || false)
      }));

      const graphEdges = generateEdges(graphNodes);
      
      setNodes(graphNodes);
      setEdges(graphEdges);
    }
  }, [concepts]);

  const getNodeColor = (type, completed) => {
    if (completed) return '#10b981'; // Green for completed
    
    switch (type) {
      case 'fundamental': return '#3b82f6'; // Blue
      case 'advanced': return '#8b5cf6'; // Purple
      case 'prerequisite': return '#f59e0b'; // Orange
      case 'application': return '#ef4444'; // Red
      default: return '#6b7280'; // Gray
    }
  };

  const generateEdges = (nodes) => {
    const edges = [];

    nodes.forEach((node, index) => {
      // Connect to next concept in sequence
      if (index < nodes.length - 1) {
        edges.push({
          id: `edge-${node.id}-${nodes[index + 1].id}`,
          source: node.id,
          target: nodes[index + 1].id,
          type: 'sequence'
        });
      }

      // Connect related concepts (same type or difficulty)
      nodes.forEach((otherNode, otherIndex) => {
        if (index !== otherIndex && 
            (node.type === otherNode.type || node.difficulty === otherNode.difficulty)) {
          const edgeId = `edge-${node.id}-${otherNode.id}`;
          const reverseEdgeId = `edge-${otherNode.id}-${node.id}`;
          
          if (!edges.find(e => e.id === edgeId || e.id === reverseEdgeId)) {
            edges.push({
              id: edgeId,
              source: node.id,
              target: otherNode.id,
              type: 'related'
            });
          }
        }
      });
    });

    return edges;
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and pan
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw edges
    edges.forEach(edge => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        
        // Edge styling based on type
        if (edge.type === 'sequence') {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#d1d5db';
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();

        // Draw arrow for sequence edges
        if (edge.type === 'sequence') {
          const angle = Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x);
          const arrowLength = 10;
          const arrowAngle = Math.PI / 6;

          ctx.beginPath();
          ctx.moveTo(targetNode.x, targetNode.y);
          ctx.lineTo(
            targetNode.x - arrowLength * Math.cos(angle - arrowAngle),
            targetNode.y - arrowLength * Math.sin(angle - arrowAngle)
          );
          ctx.moveTo(targetNode.x, targetNode.y);
          ctx.lineTo(
            targetNode.x - arrowLength * Math.cos(angle + arrowAngle),
            targetNode.y - arrowLength * Math.sin(angle + arrowAngle)
          );
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.strokeStyle = selectedNode?.id === node.id ? '#000' : '#fff';
      ctx.lineWidth = selectedNode?.id === node.id ? 3 : 2;
      ctx.stroke();

      // Node label
      ctx.fillStyle = '#fff';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Truncate label if too long
      const maxLength = 15;
      const label = node.label.length > maxLength 
        ? node.label.substring(0, maxLength) + '...' 
        : node.label;
      
      ctx.fillText(label, node.x, node.y);

      // Completion indicator
      if (node.completed) {
        ctx.beginPath();
        ctx.arc(node.x + node.radius - 8, node.y - node.radius + 8, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Checkmark
        ctx.beginPath();
        ctx.moveTo(node.x + node.radius - 11, node.y - node.radius + 8);
        ctx.lineTo(node.x + node.radius - 8, node.y - node.radius + 11);
        ctx.lineTo(node.x + node.radius - 5, node.y - node.radius + 5);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Hover effect
      if (hoveredNode?.id === node.id) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 5, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

    ctx.restore();
  };

  useEffect(() => {
    drawGraph();
  }, [nodes, edges, selectedNode, hoveredNode, zoom, pan]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;

    // Check if clicked on a node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.radius;
    });

    if (clickedNode) {
      setSelectedNode(clickedNode);
      onConceptClick?.(clickedNode);
      addXP(5, 'Explored concept in graph');
    } else {
      setSelectedNode(null);
    }
  };

  const handleCanvasMouseMove = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;

    // Check for hover
    const hovered = nodes.find(node => {
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= node.radius;
    });

    setHoveredNode(hovered);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  };

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStart({ x: event.clientX - pan.x, y: event.clientY - pan.y });
  };


  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || node.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getNodeTypeCount = (type) => {
    return nodes.filter(node => node.type === type).length;
  };

  const getCompletionRate = () => {
    const completed = nodes.filter(node => node.completed).length;
    return nodes.length > 0 ? Math.round((completed / nodes.length) * 100) : 0;
  };

  return (
    <div className="concept-graph">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Concept Graph</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search concepts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fundamental">Fundamental</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="prerequisite">Prerequisite</SelectItem>
                <SelectItem value="application">Application</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Graph Statistics */}
          {showInfo && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{nodes.length}</div>
                <div className="text-sm text-muted-foreground">Total Concepts</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{getCompletionRate()}%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{getNodeTypeCount('fundamental')}</div>
                <div className="text-sm text-muted-foreground">Fundamentals</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{getNodeTypeCount('advanced')}</div>
                <div className="text-sm text-muted-foreground">Advanced</div>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div className="relative">
            {/* Canvas */}
            <canvas
              ref={canvasRef}
              className="w-full h-96 border rounded-lg cursor-grab active:cursor-grabbing"
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            
            {/* Legend */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
              <h4 className="font-medium mb-2">Legend</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Fundamental</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Advanced</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>Prerequisite</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Application</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
              </div>
            </div>

            {/* Selected Node Info */}
            {selectedNode && (
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-lg border max-w-sm">
                <h4 className="font-medium mb-2">{selectedNode.label}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedNode.description}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{selectedNode.type}</Badge>
                  <Badge variant="outline">{selectedNode.difficulty}</Badge>
                  {selectedNode.completed && (
                    <Badge variant="default" className="bg-green-600">Completed</Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Filtered Nodes List */}
          {searchTerm && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Search Results ({filteredNodes.length})</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredNodes.map(node => (
                  <div
                    key={node.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => {
                      setSelectedNode(node);
                      onConceptClick?.(node);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: node.color }}
                      ></div>
                      <span className="font-medium">{node.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {node.description}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <Badge variant="secondary" className="text-xs">{node.type}</Badge>
                      {node.completed && (
                        <Badge variant="default" className="bg-green-600 text-xs">✓</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptGraph; 