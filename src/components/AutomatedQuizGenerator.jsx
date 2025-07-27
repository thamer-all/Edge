import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Brain, 
  Target, 
  Clock, 
  Star, 
  Sparkles,
  Play,
  Settings,
  Zap,
  CheckCircle,
  XCircle,
  RotateCcw,
  Download,
  Share,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const AutomatedQuizGenerator = ({ currentLesson, currentSection, userPerformance, onQuizGenerated }) => {
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizSettings, setQuizSettings] = useState({
    difficulty: 'adaptive',
    questionCount: 5,
    questionTypes: ['multiple-choice', 'true-false', 'fill-blank'],
    focusAreas: 'auto'
  });
  const [generationProgress, setGenerationProgress] = useState(0);
  const [quizStats, setQuizStats] = useState({});
  const { user } = useAuth();
  const { addXP } = useGamification();

  useEffect(() => {
    if (currentLesson && currentSection !== undefined) {
      analyzeUserPerformance();
    }
  }, [currentLesson, currentSection, userPerformance]);

  const analyzeUserPerformance = () => {
    // Analyze user's performance patterns to determine optimal quiz settings
    const performance = userPerformance || {};
    const avgScore = performance.averageScore || 70;
    const weakTopics = performance.weakTopics || [];
    const strongTopics = performance.strongTopics || [];

    // Adjust difficulty based on performance
    let adaptiveDifficulty = 'medium';
    if (avgScore >= 85) adaptiveDifficulty = 'hard';
    else if (avgScore <= 60) adaptiveDifficulty = 'easy';

    setQuizSettings(prev => ({
      ...prev,
      difficulty: adaptiveDifficulty,
      focusAreas: weakTopics.length > 0 ? weakTopics.join(',') : 'auto'
    }));
  };

  const generateQuiz = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedQuestions([]);

    try {
      // Simulate AI generation process with progress updates
      const steps = [
        'Analyzing lesson content...',
        'Identifying key concepts...',
        'Generating questions...',
        'Creating answer options...',
        'Validating difficulty levels...',
        'Finalizing quiz...'
      ];

      for (let i = 0; i < steps.length; i++) {
        setGenerationProgress((i / steps.length) * 100);
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      }

      // Generate questions based on lesson content and settings
      const questions = await generateQuestionsFromContent();
      setGeneratedQuestions(questions);

      // Award XP for generating quiz
      addXP(15, 'Generated AI Quiz');

      // Calculate quiz statistics
      const stats = calculateQuizStats(questions);
      setQuizStats(stats);

      // Notify parent component
      if (onQuizGenerated) {
        onQuizGenerated(questions);
      }

    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsGenerating(false);
      setGenerationProgress(100);
    }
  };

  const generateQuestionsFromContent = async () => {
    const lessonContent = currentLesson?.sections[currentSection]?.content || '';
    const lessonTitle = currentLesson?.sections[currentSection]?.title || '';
    
    // Extract key concepts from content
    const concepts = extractKeyConcepts(lessonContent);
    
    // Generate questions based on concepts and settings
    const questions = [];
    
    for (let i = 0; i < quizSettings.questionCount; i++) {
      const questionType = quizSettings.questionTypes[i % quizSettings.questionTypes.length];
      const concept = concepts[i % concepts.length];
      
      const question = await generateQuestion(concept, questionType, lessonContent);
      questions.push(question);
    }

    return questions;
  };

  const extractKeyConcepts = (content) => {
    // Simple concept extraction (in a real implementation, this would use NLP)
    const concepts = [];
    
    if (content.toLowerCase().includes('linear algebra')) {
      concepts.push('Linear Algebra');
    }
    if (content.toLowerCase().includes('statistics')) {
      concepts.push('Statistics');
    }
    if (content.toLowerCase().includes('python')) {
      concepts.push('Python Programming');
    }
    if (content.toLowerCase().includes('machine learning')) {
      concepts.push('Machine Learning');
    }
    if (content.toLowerCase().includes('neural networks')) {
      concepts.push('Neural Networks');
    }
    if (content.toLowerCase().includes('data analysis')) {
      concepts.push('Data Analysis');
    }
    
    // Add generic concepts if none found
    if (concepts.length === 0) {
      concepts.push('Core Concepts', 'Fundamental Principles', 'Key Applications');
    }
    
    return concepts;
  };

  const generateQuestion = async (concept, type, content) => {
    const questionId = `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    switch (type) {
      case 'multiple-choice':
        return generateMultipleChoiceQuestion(concept, content, questionId);
      case 'true-false':
        return generateTrueFalseQuestion(concept, content, questionId);
      case 'fill-blank':
        return generateFillBlankQuestion(concept, content, questionId);
      default:
        return generateMultipleChoiceQuestion(concept, content, questionId);
    }
  };

  const generateMultipleChoiceQuestion = (concept, content, questionId) => {
    const questions = {
      'Linear Algebra': {
        question: 'What is the primary purpose of linear algebra in machine learning?',
        options: [
          'To perform complex calculations',
          'To represent and manipulate data as vectors and matrices',
          'To create visualizations',
          'To write algorithms'
        ],
        correctAnswer: 1,
        explanation: 'Linear algebra provides the mathematical foundation for representing data as vectors and matrices, which is essential for machine learning algorithms.'
      },
      'Statistics': {
        question: 'Which statistical measure indicates the spread of data around the mean?',
        options: [
          'Mean',
          'Median',
          'Standard deviation',
          'Mode'
        ],
        correctAnswer: 2,
        explanation: 'Standard deviation measures how spread out the data is from the mean, indicating the variability in the dataset.'
      },
      'Python Programming': {
        question: 'What is the correct way to import NumPy in Python?',
        options: [
          'import numpy',
          'import numpy as np',
          'from numpy import *',
          'include numpy'
        ],
        correctAnswer: 1,
        explanation: 'The conventional way to import NumPy is "import numpy as np", which allows you to use "np" as a shorthand for numpy.'
      },
      'Machine Learning': {
        question: 'What is the main goal of supervised learning?',
        options: [
          'To find patterns in unlabeled data',
          'To learn from labeled examples to make predictions',
          'To optimize algorithms',
          'To visualize data'
        ],
        correctAnswer: 1,
        explanation: 'Supervised learning uses labeled training data to learn a mapping from inputs to outputs, enabling predictions on new data.'
      }
    };

    const questionData = questions[concept] || {
      question: `What is a key concept in ${concept}?`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 0,
      explanation: 'This question tests understanding of fundamental concepts in this area.'
    };

    return {
      id: questionId,
      type: 'multiple-choice',
      concept: concept,
      question: questionData.question,
      options: questionData.options,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      difficulty: quizSettings.difficulty,
      estimatedTime: 60
    };
  };

  const generateTrueFalseQuestion = (concept, content, questionId) => {
    const questions = {
      'Linear Algebra': {
        question: 'Vectors can only have two dimensions.',
        correctAnswer: false,
        explanation: 'Vectors can have any number of dimensions. In machine learning, we often work with high-dimensional vectors.'
      },
      'Statistics': {
        question: 'The mean is always equal to the median in a normal distribution.',
        correctAnswer: true,
        explanation: 'In a perfectly normal distribution, the mean, median, and mode are all equal.'
      },
      'Python Programming': {
        question: 'NumPy arrays are more memory efficient than Python lists.',
        correctAnswer: true,
        explanation: 'NumPy arrays are more memory efficient and faster than Python lists for numerical operations.'
      }
    };

    const questionData = questions[concept] || {
      question: `${concept} is important in AI and machine learning.`,
      correctAnswer: true,
      explanation: 'This statement is generally true for most concepts in AI and machine learning.'
    };

    return {
      id: questionId,
      type: 'true-false',
      concept: concept,
      question: questionData.question,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      difficulty: quizSettings.difficulty,
      estimatedTime: 30
    };
  };

  const generateFillBlankQuestion = (concept, content, questionId) => {
    const questions = {
      'Linear Algebra': {
        question: 'The dot product of two vectors results in a _____ value.',
        answer: 'scalar',
        explanation: 'The dot product of two vectors produces a scalar (single number) value, not a vector.'
      },
      'Statistics': {
        question: 'The _____ measures the central tendency of a dataset.',
        answer: 'mean',
        explanation: 'The mean is one of the primary measures of central tendency, along with median and mode.'
      },
      'Python Programming': {
        question: 'NumPy is commonly used for _____ operations in Python.',
        answer: 'numerical',
        explanation: 'NumPy is specifically designed for efficient numerical and mathematical operations.'
      }
    };

    const questionData = questions[concept] || {
      question: `${concept} is used for _____ in AI applications.`,
      answer: 'analysis',
      explanation: 'Most concepts in AI are used for some form of analysis or processing.'
    };

    return {
      id: questionId,
      type: 'fill-blank',
      concept: concept,
      question: questionData.question,
      answer: questionData.answer,
      explanation: questionData.explanation,
      difficulty: quizSettings.difficulty,
      estimatedTime: 45
    };
  };

  const calculateQuizStats = (questions) => {
    const totalTime = questions.reduce((sum, q) => sum + q.estimatedTime, 0);
    const difficultyDistribution = questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {});
    
    const conceptDistribution = questions.reduce((acc, q) => {
      acc[q.concept] = (acc[q.concept] || 0) + 1;
      return acc;
    }, {});

    return {
      totalQuestions: questions.length,
      estimatedTime: totalTime,
      difficultyDistribution,
      conceptDistribution,
      questionTypes: questions.map(q => q.type)
    };
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getQuestionTypeIcon = (type) => {
    switch (type) {
      case 'multiple-choice': return <Target className="w-4 h-4" />;
      case 'true-false': return <CheckCircle className="w-4 h-4" />;
      case 'fill-blank': return <Brain className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI Quiz Generator
          <Badge variant="secondary" className="ml-auto">
            <Brain className="w-3 h-3 mr-1" />
            Smart
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quiz Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm">Quiz Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Difficulty</label>
              <Select 
                value={quizSettings.difficulty} 
                onValueChange={(value) => setQuizSettings(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adaptive">Adaptive</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Questions</label>
              <Select 
                value={quizSettings.questionCount.toString()} 
                onValueChange={(value) => setQuizSettings(prev => ({ ...prev, questionCount: parseInt(value) }))}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Questions</SelectItem>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="space-y-3">
          <Button 
            onClick={generateQuiz} 
            disabled={isGenerating || !currentLesson}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Quiz
              </>
            )}
          </Button>
          
          {isGenerating && (
            <div className="space-y-2">
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                {generationProgress < 100 ? 'AI is analyzing content and generating questions...' : 'Quiz generated successfully!'}
              </p>
            </div>
          )}
        </div>

        {/* Generated Questions Preview */}
        {generatedQuestions.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm">Generated Questions</h4>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {quizStats.estimatedTime} min
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Target className="w-3 h-3 mr-1" />
                  {quizStats.totalQuestions} questions
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getQuestionTypeIcon(question.type)}
                      <span className="text-sm font-medium">Question {index + 1}</span>
                    </div>
                    <Badge className={`text-xs ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-2">{question.question}</p>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-1">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="text-xs text-muted-foreground">
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {question.concept}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {question.estimatedTime}s
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Start Quiz
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Quiz Statistics */}
        {Object.keys(quizStats).length > 0 && (
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-sm mb-3">Quiz Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">Difficulty Distribution:</p>
                {Object.entries(quizStats.difficultyDistribution || {}).map(([diff, count]) => (
                  <div key={diff} className="flex justify-between">
                    <span className="capitalize">{diff}:</span>
                    <span>{count} questions</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-muted-foreground">Concepts Covered:</p>
                {Object.entries(quizStats.conceptDistribution || {}).map(([concept, count]) => (
                  <div key={concept} className="flex justify-between">
                    <span>{concept}:</span>
                    <span>{count} questions</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutomatedQuizGenerator; 