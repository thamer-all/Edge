import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  CheckCircle, XCircle, Clock, Brain, Target, TrendingUp, 
  BarChart3, RotateCcw, Play, Pause, SkipForward, Lightbulb,
  BookOpen, Code, Calculator, Type
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const QuizEngine = ({ lessonId, questions = [], onComplete }) => {
  const { user } = useAuth();
  const { addXP, addAchievement } = useGamification();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [userPerformance, setUserPerformance] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    totalTime: 0,
    averageTime: 0,
    streak: 0,
    maxStreak: 0
  });
  const [questionHistory, setQuestionHistory] = useState([]);
  const [adaptiveQuestions, setAdaptiveQuestions] = useState([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Load user performance from localStorage
  useEffect(() => {
    const savedPerformance = localStorage.getItem(`quiz_performance_${lessonId}_${user?.id}`);
    if (savedPerformance) {
      setUserPerformance(JSON.parse(savedPerformance));
    }

    const savedHistory = localStorage.getItem(`question_history_${lessonId}_${user?.id}`);
    if (savedHistory) {
      setQuestionHistory(JSON.parse(savedHistory));
    }
  }, [lessonId, user?.id]);

  // Save performance to localStorage
  useEffect(() => {
    if (userPerformance.correct > 0 || userPerformance.incorrect > 0) {
      localStorage.setItem(`quiz_performance_${lessonId}_${user?.id}`, JSON.stringify(userPerformance));
    }
  }, [userPerformance, lessonId, user?.id]);

  // Generate adaptive questions based on performance
  useEffect(() => {
    if (questions.length > 0) {
      const adaptive = generateAdaptiveQuestions(questions, questionHistory, difficulty);
      setAdaptiveQuestions(adaptive);
    }
  }, [questions, questionHistory, difficulty]);

  const generateAdaptiveQuestions = (allQuestions, history, currentDifficulty) => {
    // Analyze user performance patterns
    const performanceByType = {};
    const performanceByDifficulty = {};
    
    history.forEach(record => {
      const type = record.questionType;
      const diff = record.difficulty;
      const correct = record.isCorrect;
      
      if (!performanceByType[type]) performanceByType[type] = { correct: 0, total: 0 };
      if (!performanceByDifficulty[diff]) performanceByDifficulty[diff] = { correct: 0, total: 0 };
      
      performanceByType[type].total++;
      performanceByDifficulty[diff].total++;
      
      if (correct) {
        performanceByType[type].correct++;
        performanceByDifficulty[diff].correct++;
      }
    });

    // Calculate success rates
    const typeSuccessRates = Object.keys(performanceByType).map(type => ({
      type,
      rate: performanceByType[type].total > 0 ? performanceByType[type].correct / performanceByType[type].total : 0.5
    }));

    const difficultySuccessRates = Object.keys(performanceByDifficulty).map(diff => ({
      difficulty: diff,
      rate: performanceByDifficulty[diff].total > 0 ? performanceByDifficulty[diff].correct / performanceByDifficulty[diff].total : 0.5
    }));

    // Select questions based on performance
    let selectedQuestions = [];
    const targetCount = Math.min(10, allQuestions.length);

    // Prioritize weak areas
    const weakTypes = typeSuccessRates.filter(t => t.rate < 0.6).map(t => t.type);
    const weakDifficulties = difficultySuccessRates.filter(d => d.rate < 0.6).map(d => d.difficulty);

    // Add questions from weak areas
    weakTypes.forEach(type => {
      const typeQuestions = allQuestions.filter(q => q.type === type && !selectedQuestions.includes(q));
      if (typeQuestions.length > 0) {
        selectedQuestions.push(typeQuestions[Math.floor(Math.random() * typeQuestions.length)]);
      }
    });

    weakDifficulties.forEach(diff => {
      const diffQuestions = allQuestions.filter(q => q.difficulty === diff && !selectedQuestions.includes(q));
      if (diffQuestions.length > 0) {
        selectedQuestions.push(diffQuestions[Math.floor(Math.random() * diffQuestions.length)]);
      }
    });

    // Fill remaining slots with random questions
    while (selectedQuestions.length < targetCount) {
      const remainingQuestions = allQuestions.filter(q => !selectedQuestions.includes(q));
      if (remainingQuestions.length === 0) break;
      
      selectedQuestions.push(remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]);
    }

    return selectedQuestions.slice(0, targetCount);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswered(false);
    setIsCorrect(null);
    setShowExplanation(false);
    setQuizCompleted(false);
    setUserPerformance(prev => ({
      ...prev,
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0
    }));
    startTimeRef.current = Date.now();
    startTimer();
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimeLeft(60); // 60 seconds per question
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTimeout = () => {
    stopTimer();
    handleAnswer(null, false); // Timeout counts as incorrect
  };

  const handleAnswer = (answer, correct) => {
    stopTimer();
    setIsAnswered(true);
    setIsCorrect(correct);
    
    const currentQuestion = adaptiveQuestions[currentQuestionIndex];
    const timeSpent = 60 - timeLeft;
    
    // Update user answers
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        answer,
        correct,
        timeSpent,
        timestamp: Date.now()
      }
    }));

    // Update performance
    setUserPerformance(prev => {
      const newPerformance = { ...prev };
      
      if (correct) {
        newPerformance.correct++;
        newPerformance.streak++;
        newPerformance.maxStreak = Math.max(newPerformance.maxStreak, newPerformance.streak);
      } else {
        newPerformance.incorrect++;
        newPerformance.streak = 0;
      }
      
      newPerformance.totalTime += timeSpent;
      newPerformance.averageTime = newPerformance.totalTime / (newPerformance.correct + newPerformance.incorrect);
      
      return newPerformance;
    });

    // Update question history
    const historyEntry = {
      questionId: currentQuestion.id,
      questionType: currentQuestion.type,
      difficulty: currentQuestion.difficulty,
      isCorrect: correct,
      timeSpent,
      timestamp: Date.now()
    };
    
    setQuestionHistory(prev => [...prev, historyEntry]);
    localStorage.setItem(`question_history_${lessonId}_${user?.id}`, JSON.stringify([...questionHistory, historyEntry]));

    // Award XP
    if (correct) {
      const baseXP = 10;
      const timeBonus = timeSpent < 30 ? 5 : 0;
      const streakBonus = userPerformance.streak * 2;
      const totalXP = baseXP + timeBonus + streakBonus;
      
      addXP(totalXP, `Correct answer${timeBonus > 0 ? ' (fast)' : ''}${streakBonus > 0 ? ` (streak: ${userPerformance.streak + 1})` : ''}`);
      
      // Check for achievements
      if (userPerformance.streak + 1 >= 5) {
        addAchievement('Streak Master', 'Answered 5 questions correctly in a row');
      }
      if (userPerformance.correct + 1 >= 10) {
        addAchievement('Quiz Champion', 'Answered 10 questions correctly');
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < adaptiveQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setIsAnswered(false);
      setIsCorrect(null);
      setShowExplanation(false);
      setTimeLeft(60);
      startTimer();
    } else {
      completeQuiz();
    }
  };

  const skipQuestion = () => {
    setUserPerformance(prev => ({
      ...prev,
      skipped: prev.skipped + 1
    }));
    nextQuestion();
  };

  const completeQuiz = () => {
    stopTimer();
    setQuizCompleted(true);
    
    const totalTime = Date.now() - startTimeRef.current;
    const accuracy = (userPerformance.correct / (userPerformance.correct + userPerformance.incorrect)) * 100;
    
    // Final XP calculation
    const accuracyBonus = Math.floor(accuracy / 10) * 5;
    const timeBonus = totalTime < 300000 ? 20 : 0; // Bonus for completing under 5 minutes
    const finalXP = userPerformance.correct * 10 + accuracyBonus + timeBonus;
    
    addXP(finalXP, `Quiz completed (${Math.round(accuracy)}% accuracy)`);
    
    onComplete?.({
      totalQuestions: adaptiveQuestions.length,
      correct: userPerformance.correct,
      incorrect: userPerformance.incorrect,
      skipped: userPerformance.skipped,
      accuracy: Math.round(accuracy),
      totalTime: Math.round(totalTime / 1000),
      averageTime: Math.round(userPerformance.averageTime),
      maxStreak: userPerformance.maxStreak
    });
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={isAnswered ? 
                  (userAnswers[currentQuestionIndex]?.answer === option ? 
                    (isCorrect ? 'default' : 'destructive') : 
                    (option === question.correctAnswer ? 'default' : 'outline')
                  ) : 'outline'
                }
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => !isAnswered && handleAnswer(option, option === question.correctAnswer)}
                disabled={isAnswered}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="flex gap-4">
            <Button
              variant={isAnswered ? 
                (userAnswers[currentQuestionIndex]?.answer === true ? 
                  (isCorrect ? 'default' : 'destructive') : 
                  (question.correctAnswer === true ? 'default' : 'outline')
                ) : 'outline'
              }
              className="flex-1 h-16 text-lg"
              onClick={() => !isAnswered && handleAnswer(true, question.correctAnswer === true)}
              disabled={isAnswered}
            >
              True
            </Button>
            <Button
              variant={isAnswered ? 
                (userAnswers[currentQuestionIndex]?.answer === false ? 
                  (isCorrect ? 'default' : 'destructive') : 
                  (question.correctAnswer === false ? 'default' : 'outline')
                ) : 'outline'
              }
              className="flex-1 h-16 text-lg"
              onClick={() => !isAnswered && handleAnswer(false, question.correctAnswer === false)}
              disabled={isAnswered}
            >
              False
            </Button>
          </div>
        );

      case 'fill_blank':
        return (
          <div className="space-y-4">
            <Input
              placeholder="Type your answer..."
              className="text-lg"
              disabled={isAnswered}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isAnswered) {
                  const answer = e.target.value.trim();
                  handleAnswer(answer, answer.toLowerCase() === question.correctAnswer.toLowerCase());
                }
              }}
            />
            {isAnswered && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium">Correct answer:</div>
                <div className="text-primary">{question.correctAnswer}</div>
              </div>
            )}
          </div>
        );

      case 'coding':
        return (
          <div className="space-y-4">
            <Textarea
              placeholder="Write your code here..."
              className="min-h-32 font-mono"
              disabled={isAnswered}
            />
            {isAnswered && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium">Sample solution:</div>
                <pre className="text-sm bg-background p-2 rounded border">
                  {question.solution}
                </pre>
              </div>
            )}
          </div>
        );

      default:
        return <div>Unsupported question type</div>;
    }
  };

  const getQuestionIcon = (type) => {
    switch (type) {
      case 'multiple_choice': return <Target className="h-5 w-5" />;
      case 'true_false': return <CheckCircle className="h-5 w-5" />;
      case 'fill_blank': return <Type className="h-5 w-5" />;
      case 'coding': return <Code className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!quizStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Adaptive Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Ready to test your knowledge?</h3>
              <p className="text-muted-foreground">
                This adaptive quiz will adjust difficulty based on your performance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{adaptiveQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Questions</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round((userPerformance.correct / Math.max(userPerformance.correct + userPerformance.incorrect, 1)) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Average Accuracy</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{userPerformance.maxStreak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={startQuiz} size="lg">
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const accuracy = (userPerformance.correct / (userPerformance.correct + userPerformance.incorrect)) * 100;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {Math.round(accuracy)}%
              </div>
              <div className="text-lg text-muted-foreground">
                {accuracy >= 80 ? 'Excellent!' : accuracy >= 60 ? 'Good job!' : 'Keep practicing!'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{userPerformance.correct}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{userPerformance.incorrect}</div>
                <div className="text-sm text-muted-foreground">Incorrect</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userPerformance.maxStreak}</div>
                <div className="text-sm text-muted-foreground">Best Streak</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round(userPerformance.averageTime)}s</div>
                <div className="text-sm text-muted-foreground">Avg Time</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setShowAnalytics(!showAnalytics)} variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </Button>
              <Button onClick={startQuiz} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>

            {showAnalytics && (
              <div className="space-y-4">
                <h4 className="font-semibold">Performance Analytics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Question Type Performance</h5>
                    {/* Add question type breakdown */}
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h5 className="font-medium mb-2">Time Analysis</h5>
                    {/* Add time analysis */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = adaptiveQuestions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Question {currentQuestionIndex + 1} of {adaptiveQuestions.length}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              {getQuestionIcon(currentQuestion.type)}
              {currentQuestion.type.replace('_', ' ')}
            </Badge>
          </div>
        </div>
        
        {/* Progress and Timer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / adaptiveQuestions.length) * 100)}%</span>
          </div>
          <Progress value={(currentQuestionIndex + 1) / adaptiveQuestions.length * 100} />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {userPerformance.correct}
              </span>
              <span className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-red-600" />
                {userPerformance.incorrect}
              </span>
              <span className="flex items-center gap-1">
                <SkipForward className="h-4 w-4 text-yellow-600" />
                {userPerformance.skipped}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className={`font-mono ${timeLeft <= 10 ? 'text-red-600' : ''}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <div className="text-lg font-medium">
              {currentQuestion.question}
            </div>
            
            {currentQuestion.code && (
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{currentQuestion.code}</code>
              </pre>
            )}
            
            {renderQuestion(currentQuestion)}
          </div>

          {/* Explanation */}
          {isAnswered && currentQuestion.explanation && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Explanation</span>
              </div>
              <p className="text-sm text-blue-800">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              onClick={skipQuestion}
              disabled={isAnswered}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Skip
            </Button>
            
            <div className="flex gap-2">
              {isAnswered ? (
                <Button onClick={nextQuestion}>
                  {currentQuestionIndex < adaptiveQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              ) : (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Select an answer
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizEngine; 