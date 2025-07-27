import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Circle, Play, Pause, RotateCcw, Share, Download, ChevronRight, Target, Brain, Trophy, Star, Volume2, StickyNote, Plus, Edit3, Save, X, Bot, Sparkles, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useGamification } from '../contexts/GamificationContext';
import { lessonData, getDefaultLesson } from '../data/lessonData';
import aiService from '../services/aiService';
import ConceptGraph from './ConceptGraph';
import AITutor from './AITutor';
import IntelligentRecommendations from './IntelligentRecommendations';
import AutomatedQuizGenerator from './AutomatedQuizGenerator';
import VRLearningEnvironment from './VRLearningEnvironment';
import ARContentOverlays from './ARContentOverlays';
import BlockchainCredentials from './BlockchainCredentials';

function LessonPage() {
  const { categoryId, subCategoryId, lessonId } = useParams();
  const navigate = useNavigate();
  const { recordAction } = useGamification();
  
  // State management
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([0]);
  // eslint-disable-next-line no-unused-vars
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState('');
  
  // Section summaries state
  const [sectionSummaries, setSectionSummaries] = useState({});
  const [showSectionSummary, setShowSectionSummary] = useState(false);
  const [isEditingSectionSummary, setIsEditingSectionSummary] = useState(false);
  const [tempSectionSummary, setTempSectionSummary] = useState('');

  // AI content generation state
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [conceptGraphData, setConceptGraphData] = useState(null);
  const [showConceptGraph, setShowConceptGraph] = useState(false);

  // Get current lesson and section data
  const currentLesson = lessonData[subCategoryId]?.[lessonId || 'intro-lesson'] || 
                       getDefaultLesson(categoryId, subCategoryId);
  const currentSectionData = currentLesson?.sections[currentSection];

  // Load notes and section summaries from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${categoryId}_${subCategoryId}_${lessonId || 'intro-lesson'}`);
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const savedSummaries = localStorage.getItem(`summaries_${categoryId}_${subCategoryId}_${lessonId || 'intro-lesson'}`);
    if (savedSummaries) {
      setSectionSummaries(JSON.parse(savedSummaries));
    }
  }, [categoryId, subCategoryId, lessonId]);

  // Update temp summary when switching sections
  useEffect(() => {
    const currentSectionId = currentLesson?.sections[currentSection]?.id;
    if (currentSectionId && showSectionSummary) {
      setTempSectionSummary(sectionSummaries[currentSectionId] || '');
    }
  }, [currentSection, sectionSummaries, showSectionSummary, currentLesson?.sections]);

  // Save notes to localStorage
  const saveNote = () => {
    const noteKey = `notes_${categoryId}_${subCategoryId}_${lessonId || 'intro-lesson'}`;
    localStorage.setItem(noteKey, tempNote);
    setNotes(tempNote);
    setIsEditingNote(false);
    
    if (tempNote.trim().length > 0) {
      recordAction('write_note');
    }
  };

  // Save section summary to localStorage
  const saveSectionSummary = () => {
    const currentSectionId = currentLesson?.sections[currentSection]?.id;
    if (!currentSectionId) return;
    
    const updatedSummaries = {
      ...sectionSummaries,
      [currentSectionId]: tempSectionSummary
    };
    
    setSectionSummaries(updatedSummaries);
    
    const summaryKey = `summaries_${categoryId}_${subCategoryId}_${lessonId || 'intro-lesson'}`;
    localStorage.setItem(summaryKey, JSON.stringify(updatedSummaries));
    
    setIsEditingSectionSummary(false);
    
    if (tempSectionSummary.trim().length > 0) {
      recordAction('write_summary');
    }
  };

  // Handle section summary toggle
  const handleSectionSummaryToggle = () => {
    const currentSectionId = currentLesson?.sections[currentSection]?.id;
    if (!currentSectionId) return;
    
    setShowSectionSummary(!showSectionSummary);
    if (!showSectionSummary && !isEditingSectionSummary) {
      setTempSectionSummary(sectionSummaries[currentSectionId] || '');
      setIsEditingSectionSummary(true);
    }
  };

  // AI content generation
  const generateAiContent = async (topic, type = 'explanation') => {
    setIsGeneratingContent(true);
    
    try {
      // Use AI service for content generation
      const content = await aiService.generateLessonContent(topic, currentLesson.difficulty, type);
      setAiGeneratedContent(content);
      
      // Save generated content
      aiService.saveGeneratedContent(topic, content);
      
      setShowAiDialog(true);
    } catch (error) {
      console.error('Failed to generate AI content:', error);
      // Fallback to pre-generated content
      const fallbackContent = aiService.getFallbackContent(topic, currentLesson.difficulty, type);
      setAiGeneratedContent(fallbackContent);
      setShowAiDialog(true);
    } finally {
      setIsGeneratingContent(false);
    }
  };

  // Generate concept graph
  const generateConceptGraph = async () => {
    try {
      const graphData = await aiService.generateConceptGraph(currentLesson.title);
      setConceptGraphData(graphData);
      setShowConceptGraph(true);
    } catch (error) {
      console.error('Failed to generate concept graph:', error);
      // Use fallback graph
      const fallbackGraph = aiService.getFallbackConceptGraph(currentLesson.title);
      setConceptGraphData(fallbackGraph);
      setShowConceptGraph(true);
    }
  };

  // Handle section completion
  const handleSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    
    const newCompletedSections = completedSections.includes(currentSection) 
      ? completedSections 
      : [...completedSections, currentSection];
    
    if (newCompletedSections.length === currentLesson.sections.length) {
      recordAction('complete_lesson');
    }
    
    if (currentSection < currentLesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  // Handle quiz answers
  const handleQuizAnswer = (questionId, answerIndex) => {
    const updatedAnswers = {
      ...quizAnswers,
      [questionId]: answerIndex
    };
    setQuizAnswers(updatedAnswers);
    
    const currentQuiz = currentSectionData?.quiz;
    if (currentQuiz && currentQuiz.questions) {
      const totalQuestions = currentQuiz.questions.length;
      const answeredQuestions = Object.keys(updatedAnswers).length;
      
      if (answeredQuestions === totalQuestions) {
        recordAction('complete_quiz');
        
        const correctAnswers = currentQuiz.questions.filter((question) => 
          updatedAnswers[question.id] === question.correct
        ).length;
        
        if (correctAnswers === totalQuestions) {
          recordAction('perfect_quiz');
        }
      }
    }
  };

  // Handle notes toggle
  const handleNotesToggle = () => {
    setShowNotes(!showNotes);
    if (!showNotes && !isEditingNote) {
      setTempNote(notes);
      setIsEditingNote(true);
    }
  };

  // Render section content
  const renderSectionContent = () => {
    if (!currentSectionData) return null;

    switch (currentSectionData.type) {
      case 'content':
        return (
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {/* Main Content */}
            <div className="prose prose-sm lg:prose-lg max-w-none">
              <div className="whitespace-pre-line text-sm lg:text-base leading-relaxed text-foreground">
                {currentSectionData.content.text}
              </div>
            </div>

            {/* Key Points */}
            {currentSectionData.content.keyPoints && (
              <Card className="border-blue-200 bg-blue-50 card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base lg:text-lg text-blue-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Key Points
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentSectionData.content.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-blue-700">{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Real World Examples */}
            {currentSectionData.content.realWorldExamples && (
              <Card className="border-green-200 bg-green-50 card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base lg:text-lg text-green-800 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" />
                    Real-World Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {currentSectionData.content.realWorldExamples.map((example, index) => (
                    <div key={index} className="space-y-2 animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">{example.industry}</Badge>
                        <h4 className="font-semibold text-green-800">{example.title}</h4>
                      </div>
                      <p className="text-sm text-green-700">{example.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* AI Content Generation */}
            <Card className="border-purple-200 bg-purple-50 card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg text-purple-800 flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  AI-Enhanced Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-purple-700">
                  Get personalized AI-generated content to enhance your understanding of this topic.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateAiContent(currentSectionData.title, 'explanation')}
                    disabled={isGeneratingContent}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGeneratingContent ? 'Generating...' : 'Enhanced Explanation'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateAiContent(currentSectionData.title, 'examples')}
                    disabled={isGeneratingContent}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    More Examples
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateAiContent(currentSectionData.title, 'practice')}
                    disabled={isGeneratingContent}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Practice Problems
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={generateConceptGraph}
                    disabled={isGeneratingContent}
                    className="border-purple-300 text-purple-700 hover:bg-purple-100"
                  >
                    <Network className="w-4 h-4 mr-2" />
                    Concept Graph
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            {/* Interactive Content */}
            <div className="prose prose-sm lg:prose-lg max-w-none">
              <div className="whitespace-pre-line text-sm lg:text-base leading-relaxed text-foreground">
                {currentSectionData.content.text}
              </div>
            </div>

            {/* Interactive Elements */}
            {currentSectionData.content.comparison && (
              <Card className="border-orange-200 bg-orange-50 card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base lg:text-lg text-orange-800 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Comparison & Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Aspect</th>
                          <th className="text-left p-2">Option A</th>
                          <th className="text-left p-2">Option B</th>
                          <th className="text-left p-2">Key Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSectionData.content.comparison.map((item, index) => (
                          <tr key={index} className="border-b animate-slide-in-left" style={{animationDelay: `${index * 0.1}s`}}>
                            <td className="p-2 font-medium">{item.aspect}</td>
                            <td className="p-2">{item.matrix || item.optionA}</td>
                            <td className="p-2">{item.vector || item.optionB}</td>
                            <td className="p-2 text-muted-foreground">{item.difference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Takeaways */}
            {currentSectionData.content.keyTakeaways && (
              <Card className="border-indigo-200 bg-indigo-50 card-hover">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base lg:text-lg text-indigo-800 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Key Takeaways
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {currentSectionData.content.keyTakeaways.map((takeaway, index) => (
                    <div key={index} className="flex items-start space-x-2 animate-slide-in-right" style={{animationDelay: `${index * 0.1}s`}}>
                      <Star className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm lg:text-base text-indigo-700">{takeaway}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6 lg:space-y-8 animate-fade-in">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg text-yellow-800 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Knowledge Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentSectionData.quiz.questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-3 p-4 bg-white rounded-lg border">
                    <h4 className="font-semibold text-foreground">
                      {qIndex + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, oIndex) => (
                        <label key={oIndex} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="radio"
                            name={question.id}
                            value={oIndex}
                            checked={quizAnswers[question.id] === oIndex}
                            onChange={() => handleQuizAnswer(question.id, oIndex)}
                            className="text-primary"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div className="text-center text-muted-foreground">Content type not supported</div>;
    }
  };

  if (!currentLesson) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Lesson not found</h1>
                      <Button onClick={() => navigate(`/category/${categoryId}/${subCategoryId}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Category
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentSection + 1) / currentLesson.sections.length) * 100;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/category/${categoryId}/${subCategoryId}`)} className="self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Home / {categoryId} / {subCategoryId} / {currentLesson.title}
            </div>
          </div>

          {/* Lesson Header */}
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground animate-fade-in">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="space-y-3">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{currentLesson.title}</h1>
                    <p className="text-primary-foreground/90 text-sm lg:text-base">{currentLesson.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{currentLesson.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>{currentLesson.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{currentLesson.sections.length} sections</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <div className="text-2xl lg:text-3xl font-bold">{Math.round(progressPercentage)}%</div>
                    <div className="text-primary-foreground/90 text-sm">Progress</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Section {currentSection + 1} of {currentLesson.sections.length}</span>
                    <span>{completedSections.length} completed</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-primary-foreground/20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Objectives */}
        {currentLesson.learningObjectives && currentSection === 0 && (
          <Card className="border-blue-200 bg-blue-50 animate-slide-in-left">
            <CardHeader className="pb-3">
              <CardTitle className="text-base lg:text-lg text-blue-800 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Learning Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {currentLesson.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm lg:text-base text-blue-700">{objective}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg lg:text-xl">
                    {currentSectionData?.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{currentSectionData?.duration}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderSectionContent()}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Section Navigation */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm lg:text-base">Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {currentLesson.sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                      currentSection === index
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      {completedSections.includes(index) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Circle className="w-4 h-4" />
                      )}
                      <span className="truncate">{section.title}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm lg:text-base flex items-center justify-between">
                  <span>My Notes</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNotesToggle}
                    className="h-6 w-6 p-0"
                    aria-label="Toggle Notes"
                  >
                    <StickyNote className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showNotes ? (
                  <div className="space-y-2">
                    {isEditingNote ? (
                      <div className="space-y-2">
                        <Textarea
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Write your notes here..."
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={saveNote}>
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingNote(false)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {notes || 'No notes yet. Click the note icon to add some!'}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setTempNote(notes);
                            setIsEditingNote(true);
                          }}
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground text-sm">
                    Click the note icon to add notes
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Section Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm lg:text-base flex items-center justify-between">
                  <span>Section Summary</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSectionSummaryToggle}
                    className="h-6 w-6 p-0"
                    aria-label="Toggle Section Summary"
                  >
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showSectionSummary ? (
                  <div className="space-y-2">
                    {isEditingSectionSummary ? (
                      <div className="space-y-2">
                        <Textarea
                          value={tempSectionSummary}
                          onChange={(e) => setTempSectionSummary(e.target.value)}
                          placeholder="Write a summary of this section..."
                          className="min-h-[100px]"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={saveSectionSummary}>
                            <Save className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditingSectionSummary(false)}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {sectionSummaries[currentLesson?.sections[currentSection]?.id] || 
                           'No summary yet. Click the book icon to add one!'}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentSectionId = currentLesson?.sections[currentSection]?.id;
                            setTempSectionSummary(sectionSummaries[currentSectionId] || '');
                            setIsEditingSectionSummary(true);
                          }}
                        >
                          <Edit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground text-sm">
                    Click the book icon to add summary
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Tutor */}
            <AITutor 
              currentLesson={currentLesson}
              currentSection={currentSection}
            />

            {/* AI Quiz Generator */}
            <AutomatedQuizGenerator 
              currentLesson={currentLesson}
              currentSection={currentSection}
              userPerformance={{
                averageScore: 75,
                weakTopics: ['statistics'],
                strongTopics: ['programming']
              }}
              onQuizGenerated={(questions) => {
                console.log('Generated quiz questions:', questions);
                // Could integrate with existing quiz system
              }}
            />

            {/* VR Learning Environment */}
            <VRLearningEnvironment />

            {/* AR Content Overlays */}
            <ARContentOverlays />

            {/* Blockchain Credentials */}
            <BlockchainCredentials />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleSectionComplete}
            disabled={currentSection === currentLesson.sections.length - 1 && completedSections.includes(currentSection)}
          >
            {currentSection === currentLesson.sections.length - 1 ? 'Complete Lesson' : 'Next Section'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* AI Content Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Bot className="w-5 h-5 mr-2" />
              {aiGeneratedContent?.title}
            </DialogTitle>
            <DialogDescription>
              AI-generated content to enhance your learning experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {aiGeneratedContent?.content}
              </div>
            </div>
            {aiGeneratedContent?.keyPoints && (
              <div className="space-y-2">
                <h4 className="font-semibold">Key Points:</h4>
                <ul className="space-y-1">
                  {aiGeneratedContent.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Concept Graph Dialog */}
      <Dialog open={showConceptGraph} onOpenChange={setShowConceptGraph}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Network className="w-5 h-5 mr-2" />
              Concept Graph - {currentLesson?.title}
            </DialogTitle>
            <DialogDescription>
              Visual representation of concepts and their relationships
            </DialogDescription>
          </DialogHeader>
          {conceptGraphData && (
            <ConceptGraph 
              topic={currentLesson?.title}
              data={conceptGraphData}
              onNodeClick={(node) => {
                console.log('Clicked node:', node);
                // Could navigate to related content or show details
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LessonPage;