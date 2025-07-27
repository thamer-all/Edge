import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  RotateCcw, Eye, EyeOff, CheckCircle, XCircle, Clock, 
  Calendar, TrendingUp, BarChart3, Plus, Edit, Trash2,
  BookOpen, Brain, Target, Zap, Star
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const SpacedRepetition = ({ lessonId, cards = [], onComplete }) => {
  const { user } = useAuth();
  const { addXP, addAchievement } = useGamification();
  const [userCards, setUserCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewSession, setReviewSession] = useState(false);
  const [sessionCards, setSessionCards] = useState([]);
  const [sessionProgress, setSessionProgress] = useState({
    total: 0,
    completed: 0,
    correct: 0,
    incorrect: 0
  });
  const [showStats, setShowStats] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', tags: [] });
  const [showAddCard, setShowAddCard] = useState(false);
  const [filterTag, setFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('due');
  const [searchTerm, setSearchTerm] = useState('');

  // Load user cards from localStorage
  useEffect(() => {
    const savedCards = localStorage.getItem(`spaced_repetition_${lessonId}_${user?.id}`);
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    } else if (cards.length > 0) {
      // Initialize cards from lesson data
      const initializedCards = cards.map(card => ({
        id: card.id || `card-${Date.now()}-${Math.random()}`,
        front: card.front || card.question,
        back: card.back || card.answer,
        tags: card.tags || [],
        difficulty: card.difficulty || 'medium',
        interval: 1, // Days until next review
        repetitions: 0, // Number of successful reviews
        easeFactor: 2.5, // Multiplier for interval
        nextReview: new Date().toISOString(), // Due for review today
        lastReviewed: null,
        reviewHistory: []
      }));
      setUserCards(initializedCards);
      localStorage.setItem(`spaced_repetition_${lessonId}_${user?.id}`, JSON.stringify(initializedCards));
    }
  }, [lessonId, user?.id, cards]);

  // Save cards to localStorage
  useEffect(() => {
    if (userCards.length > 0) {
      localStorage.setItem(`spaced_repetition_${lessonId}_${user?.id}`, JSON.stringify(userCards));
    }
  }, [userCards, lessonId, user?.id]);

  // Get cards due for review
  const getDueCards = () => {
    const now = new Date();
    return userCards.filter(card => {
      const nextReview = new Date(card.nextReview);
      return nextReview <= now;
    });
  };

  // Get all unique tags
  const getAllTags = () => {
    const tags = new Set();
    userCards.forEach(card => {
      card.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  // Filter and sort cards
  const getFilteredCards = () => {
    let filtered = userCards;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(card =>
        card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.back.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by tag
    if (filterTag !== 'all') {
      filtered = filtered.filter(card => card.tags.includes(filterTag));
    }

    // Sort cards
    switch (sortBy) {
      case 'due':
        filtered.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
        break;
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'repetitions':
        filtered.sort((a, b) => b.repetitions - a.repetitions);
        break;
      case 'lastReviewed':
        filtered.sort((a, b) => {
          if (!a.lastReviewed && !b.lastReviewed) return 0;
          if (!a.lastReviewed) return 1;
          if (!b.lastReviewed) return -1;
          return new Date(b.lastReviewed) - new Date(a.lastReviewed);
        });
        break;
      default:
        break;
    }

    return filtered;
  };

  // Start review session
  const startReviewSession = () => {
    const dueCards = getDueCards();
    if (dueCards.length === 0) {
      alert('No cards due for review!');
      return;
    }

    setSessionCards(dueCards);
    setSessionProgress({
      total: dueCards.length,
      completed: 0,
      correct: 0,
      incorrect: 0
    });
    setCurrentCardIndex(0);
    setShowAnswer(false);
    setReviewSession(true);
  };

  // Handle card review
  const handleReview = (quality) => {
    const currentCard = sessionCards[currentCardIndex];
    const now = new Date();
    
    // Update card based on SuperMemo 2 algorithm
    const updatedCard = updateCardWithSM2(currentCard, quality);
    
    // Update user cards
    setUserCards(prev => prev.map(card => 
      card.id === currentCard.id ? updatedCard : card
    ));

    // Update session progress
    setSessionProgress(prev => ({
      ...prev,
      completed: prev.completed + 1,
      correct: prev.correct + (quality >= 3 ? 1 : 0),
      incorrect: prev.incorrect + (quality < 3 ? 1 : 0)
    }));

    // Award XP
    const baseXP = 5;
    const qualityBonus = quality * 2;
    const streakBonus = updatedCard.repetitions * 3;
    const totalXP = baseXP + qualityBonus + streakBonus;
    
    addXP(totalXP, `Card review (quality: ${quality})`);

    // Check for achievements
    if (updatedCard.repetitions >= 10) {
      addAchievement('Memory Master', 'Reviewed a card 10+ times successfully');
    }
    if (sessionProgress.completed + 1 >= 20) {
      addAchievement('Review Champion', 'Completed a 20+ card review session');
    }

    // Move to next card or end session
    if (currentCardIndex < sessionCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      endReviewSession();
    }
  };

  // SuperMemo 2 algorithm implementation
  const updateCardWithSM2 = (card, quality) => {
    const now = new Date();
    let { interval, repetitions, easeFactor } = card;

    if (quality >= 3) {
      // Successful recall
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      // Failed recall
      repetitions = 0;
      interval = 1;
    }

    // Update ease factor
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);

    // Calculate next review date
    const nextReview = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

    return {
      ...card,
      interval,
      repetitions,
      easeFactor,
      nextReview: nextReview.toISOString(),
      lastReviewed: now.toISOString(),
      reviewHistory: [
        ...card.reviewHistory,
        {
          date: now.toISOString(),
          quality,
          interval
        }
      ]
    };
  };

  const endReviewSession = () => {
    setReviewSession(false);
    setSessionCards([]);
    setCurrentCardIndex(0);
    setShowAnswer(false);
    
    const accuracy = (sessionProgress.correct / sessionProgress.total) * 100;
    addXP(Math.floor(accuracy), `Review session completed (${Math.round(accuracy)}% accuracy)`);
    
    onComplete?.(sessionProgress);
  };

  // Add new card
  const addCard = () => {
    if (!newCard.front.trim() || !newCard.back.trim()) return;

    const card = {
      id: `card-${Date.now()}-${Math.random()}`,
      front: newCard.front.trim(),
      back: newCard.back.trim(),
      tags: newCard.tags,
      difficulty: 'medium',
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReview: new Date().toISOString(),
      lastReviewed: null,
      reviewHistory: []
    };

    setUserCards(prev => [...prev, card]);
    setNewCard({ front: '', back: '', tags: [] });
    setShowAddCard(false);
    addXP(10, 'Created new flashcard');
  };

  // Delete card
  const deleteCard = (cardId) => {
    setUserCards(prev => prev.filter(card => card.id !== cardId));
  };

  // Get card statistics
  const getCardStats = () => {
    const total = userCards.length;
    const due = getDueCards().length;
    const completed = userCards.filter(card => card.repetitions > 0).length;
    const averageRepetitions = userCards.length > 0 
      ? userCards.reduce((sum, card) => sum + card.repetitions, 0) / userCards.length 
      : 0;

    return { total, due, completed, averageRepetitions };
  };

  const stats = getCardStats();
  const filteredCards = getFilteredCards();
  const currentCard = sessionCards[currentCardIndex];

  if (reviewSession && currentCard) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Review Session</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {sessionProgress.completed + 1} / {sessionProgress.total}
              </span>
              <Progress 
                value={(sessionProgress.completed + 1) / sessionProgress.total * 100} 
                className="w-24"
              />
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            {/* Card */}
            <div className="min-h-64 border rounded-lg p-6 flex flex-col justify-center">
              <div className="text-center space-y-4">
                <div className="text-xl font-medium">
                  {currentCard.front}
                </div>
                
                {showAnswer && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <div className="text-lg">{currentCard.back}</div>
                    {currentCard.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 justify-center">
                        {currentCard.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!showAnswer ? (
                <Button 
                  onClick={() => setShowAnswer(true)} 
                  className="w-full"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Show Answer
                </Button>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground text-center mb-4">
                    How well did you know this?
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleReview(1)}
                      className="h-16 text-sm"
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Again
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReview(2)}
                      className="h-16 text-sm"
                    >
                      Hard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReview(3)}
                      className="h-16 text-sm"
                    >
                      Good
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReview(4)}
                      className="h-16 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Easy
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Session Progress */}
            <div className="flex items-center justify-between text-sm">
              <span>Correct: {sessionProgress.correct}</span>
              <span>Incorrect: {sessionProgress.incorrect}</span>
              <span>Accuracy: {sessionProgress.total > 0 ? Math.round((sessionProgress.correct / sessionProgress.total) * 100) : 0}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="spaced-repetition">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Brain className="h-6 w-6" />
              Spaced Repetition
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStats(!showStats)}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddCard(!showAddCard)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>

          {/* Statistics */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{stats.total}</div>
                <div className="text-sm text-muted-foreground">Total Cards</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{stats.due}</div>
                <div className="text-sm text-muted-foreground">Due Today</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                <div className="text-sm text-muted-foreground">Reviewed</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.round(stats.averageRepetitions)}</div>
                <div className="text-sm text-muted-foreground">Avg Reviews</div>
              </div>
            </div>
          )}

          {/* Add Card Form */}
          {showAddCard && (
            <div className="mt-4 p-4 border rounded-lg space-y-4">
              <h4 className="font-medium">Add New Card</h4>
              <div className="space-y-3">
                <Textarea
                  placeholder="Front of card (question/concept)..."
                  value={newCard.front}
                  onChange={(e) => setNewCard(prev => ({ ...prev, front: e.target.value }))}
                />
                <Textarea
                  placeholder="Back of card (answer/explanation)..."
                  value={newCard.back}
                  onChange={(e) => setNewCard(prev => ({ ...prev, back: e.target.value }))}
                />
                <Input
                  placeholder="Tags (comma-separated)"
                  value={newCard.tags.join(', ')}
                  onChange={(e) => setNewCard(prev => ({ 
                    ...prev, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  }))}
                />
                <div className="flex gap-2">
                  <Button onClick={addCard} disabled={!newCard.front.trim() || !newCard.back.trim()}>
                    Add Card
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddCard(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filterTag} onValueChange={setFilterTag}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {getAllTags().map(tag => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="due">Due Date</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="repetitions">Repetitions</SelectItem>
                <SelectItem value="lastReviewed">Last Reviewed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Review Button */}
          {stats.due > 0 && (
            <div className="mb-6">
              <Button onClick={startReviewSession} size="lg" className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                Start Review Session ({stats.due} cards due)
              </Button>
            </div>
          )}

          {/* Cards List */}
          <div className="space-y-4">
            <h4 className="font-medium">Cards ({filteredCards.length})</h4>
            
            {filteredCards.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No cards found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCards.map(card => {
                  const isDue = new Date(card.nextReview) <= new Date();
                  const daysUntilReview = Math.ceil((new Date(card.nextReview) - new Date()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={card.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-medium truncate">{card.front}</h5>
                            <Badge variant={isDue ? "destructive" : "secondary"} className="text-xs">
                              {isDue ? 'Due' : `${daysUntilReview}d`}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {card.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {card.back}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Reviews: {card.repetitions}</span>
                            <span>Interval: {card.interval}d</span>
                            {card.lastReviewed && (
                              <span>Last: {new Date(card.lastReviewed).toLocaleDateString()}</span>
                            )}
                          </div>
                          
                          {card.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {card.tags.map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCard(card.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpacedRepetition; 