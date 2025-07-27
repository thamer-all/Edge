import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Eye, EyeOff } from 'lucide-react';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const MathRenderer = ({ 
  equations = [], 
  showSteps = true, 
  interactive = true,
  onStepClick 
}) => {
  const [visibleSteps, setVisibleSteps] = React.useState({});
  const [copiedEquation, setCopiedEquation] = React.useState(null);

  // Sample equations for demonstration
  const sampleEquations = [
    {
      id: 1,
      title: 'Neural Network Forward Pass',
      description: 'The forward propagation through a neural network layer',
      equation: 'z^{(l+1)} = W^{(l)}a^{(l)} + b^{(l)}',
      steps: [
        {
          id: 1,
          description: 'Compute weighted sum',
          equation: 'z^{(l+1)} = W^{(l)}a^{(l)} + b^{(l)}',
          explanation: 'Multiply input activations by weights and add bias'
        },
        {
          id: 2,
          description: 'Apply activation function',
          equation: 'a^{(l+1)} = \\sigma(z^{(l+1)})',
          explanation: 'Apply non-linear activation function (e.g., ReLU, sigmoid)'
        }
      ],
      category: 'Neural Networks',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Gradient Descent Update Rule',
      description: 'Parameter update in gradient descent optimization',
      equation: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla J(\\theta_t)',
      steps: [
        {
          id: 1,
          description: 'Calculate gradient',
          equation: '\\nabla J(\\theta_t) = \\frac{\\partial J}{\\partial \\theta}',
          explanation: 'Compute partial derivatives of cost function with respect to parameters'
        },
        {
          id: 2,
          description: 'Update parameters',
          equation: '\\theta_{t+1} = \\theta_t - \\alpha \\nabla J(\\theta_t)',
          explanation: 'Move in the opposite direction of the gradient scaled by learning rate'
        }
      ],
      category: 'Optimization',
      difficulty: 'beginner'
    },
    {
      id: 3,
      title: 'Bayes\' Theorem',
      description: 'Fundamental theorem of probability theory',
      equation: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}',
      steps: [
        {
          id: 1,
          description: 'Joint probability',
          equation: 'P(A,B) = P(B|A)P(A)',
          explanation: 'Probability of both events occurring'
        },
        {
          id: 2,
          description: 'Conditional probability',
          equation: 'P(A|B) = \\frac{P(A,B)}{P(B)}',
          explanation: 'Probability of A given B has occurred'
        },
        {
          id: 3,
          description: 'Bayes\' theorem',
          equation: 'P(A|B) = \\frac{P(B|A)P(A)}{P(B)}',
          explanation: 'Combine the above to get the final form'
        }
      ],
      category: 'Probability',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'Cross-Entropy Loss',
      description: 'Loss function for classification problems',
      equation: 'L = -\\sum_{i=1}^{n} y_i \\log(\\hat{y}_i)',
      steps: [
        {
          id: 1,
          description: 'Log likelihood',
          equation: '\\log P(y|\\hat{y}) = \\sum_{i=1}^{n} y_i \\log(\\hat{y}_i)',
          explanation: 'Logarithm of the probability of true labels given predictions'
        },
        {
          id: 2,
          description: 'Negative log likelihood',
          equation: 'L = -\\log P(y|\\hat{y}) = -\\sum_{i=1}^{n} y_i \\log(\\hat{y}_i)',
          explanation: 'Take negative to convert maximization to minimization problem'
        }
      ],
      category: 'Loss Functions',
      difficulty: 'advanced'
    }
  ];

  const equationsToRender = equations.length > 0 ? equations : sampleEquations;

  const toggleStepVisibility = (equationId, stepId) => {
    setVisibleSteps(prev => ({
      ...prev,
      [`${equationId}-${stepId}`]: !prev[`${equationId}-${stepId}`]
    }));
  };

  const copyEquation = async (equation, title) => {
    try {
      await navigator.clipboard.writeText(equation);
      setCopiedEquation(title);
      setTimeout(() => setCopiedEquation(null), 2000);
    } catch (err) {
      console.error('Failed to copy equation:', err);
    }
  };

  const downloadEquation = (equation, title) => {
    const element = document.createElement('a');
    const file = new Blob([equation], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.replace(/\s+/g, '_')}.tex`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderMathEquation = (equation) => {
    try {
      return (
        <div className="bg-muted/50 p-4 rounded-lg text-center">
          <BlockMath math={equation} />
        </div>
      );
    } catch {
      // Fallback to plain text if KaTeX fails
      return (
        <div className="bg-muted/50 p-4 rounded-lg font-mono text-center text-lg">
          {equation}
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      {equationsToRender.map((eq) => (
        <Card key={eq.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2">
                  {eq.title}
                  <Badge variant="outline">{eq.category}</Badge>
                  <Badge className={getDifficultyColor(eq.difficulty)}>
                    {eq.difficulty}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {eq.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyEquation(eq.equation, eq.title)}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copiedEquation === eq.title ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadEquation(eq.equation, eq.title)}
                  className="flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Main Equation */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground">Main Equation:</h4>
              {renderMathEquation(eq.equation)}
            </div>

            {/* Interactive Steps */}
            {showSteps && eq.steps && (
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground">Step-by-Step Derivation:</h4>
                <div className="space-y-3">
                  {eq.steps.map((step) => {
                    const isVisible = visibleSteps[`${eq.id}-${step.id}`];
                    return (
                      <div key={step.id} className="border rounded-lg overflow-hidden">
                        <div 
                          className="p-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors flex items-center justify-between"
                          onClick={() => toggleStepVisibility(eq.id, step.id)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">Step {step.id}:</span>
                            <span className="text-sm">{step.description}</span>
                          </div>
                          {isVisible ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        
                        {isVisible && (
                          <div className="p-4 space-y-3">
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Equation:</h5>
                              {renderMathEquation(step.equation)}
                            </div>
                            <div className="space-y-2">
                              <h5 className="font-medium text-sm">Explanation:</h5>
                              <p className="text-sm text-muted-foreground">
                                {step.explanation}
                              </p>
                            </div>
                            {interactive && onStepClick && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStepClick(eq.id, step.id)}
                              >
                                Practice This Step
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Interactive Practice Section */}
            {interactive && (
              <div className="border-t pt-4">
                <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                  Interactive Practice:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    Solve Step-by-Step
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Similar Problems
                  </Button>
                  <Button variant="outline" size="sm">
                    Visualize Concept
                  </Button>
                  <Button variant="outline" size="sm">
                    Take Quiz
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      {/* Quick Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Common Mathematical Symbols</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="font-medium">Greek Letters</h5>
              <div className="space-y-1 text-muted-foreground">
                <div>α (alpha)</div>
                <div>β (beta)</div>
                <div>θ (theta)</div>
                <div>λ (lambda)</div>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium">Operators</h5>
              <div className="space-y-1 text-muted-foreground">
                <div>∑ (sum)</div>
                <div>∏ (product)</div>
                <div>∫ (integral)</div>
                <div>∇ (gradient)</div>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium">Functions</h5>
              <div className="space-y-1 text-muted-foreground">
                <div>log (logarithm)</div>
                <div>exp (exponential)</div>
                <div>sin, cos, tan</div>
                <div>σ (sigma)</div>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium">Sets</h5>
              <div className="space-y-1 text-muted-foreground">
                <div>∈ (element of)</div>
                <div>⊂ (subset)</div>
                <div>∪ (union)</div>
                <div>∩ (intersection)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathRenderer; 