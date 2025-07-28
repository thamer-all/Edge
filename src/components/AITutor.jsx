import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const AITutor = ({ currentLesson, currentSection }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationContext, setConversationContext] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();
  const { addXP } = useGamification();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize conversation context when lesson/section changes
  useEffect(() => {
    if (currentLesson && currentSection !== undefined) {
      const context = `Current Lesson: ${currentLesson.title}\nCurrent Section: ${currentLesson.sections[currentSection]?.title || 'Introduction'}\nContent: ${currentLesson.sections[currentSection]?.content?.substring(0, 500) || ''}`;
      setConversationContext(context);
      
      // Add welcome message
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Hello! I'm your AI tutor. I'm here to help you with "${currentLesson.title}" - specifically the section on "${currentLesson.sections[currentSection]?.title || 'Introduction'}". What would you like to know?`,
        timestamp: new Date(),
        context: 'welcome'
      };
      
      setMessages([welcomeMessage]);
      
      // Generate contextual suggestions
      generateSuggestions();
    }
  }, [currentLesson, currentSection]);

  const generateSuggestions = () => {
    const newSuggestions = [
      `Explain the main concepts in this section`,
      `Give me a practical example of this topic`,
      `What are the key takeaways from this section?`,
      `Help me understand the difficult parts`,
      `Create a quiz question about this topic`,
      `How does this relate to what I learned before?`
    ];
    
    setSuggestions(newSuggestions);
  };

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      const aiResponse = await generateAIResponse(content, conversationContext);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        context: 'response'
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Award XP for asking questions
      addXP(5, 'Asked AI Tutor Question');
      
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.',
        timestamp: new Date(),
        context: 'error'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (userInput, context) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response generation based on input keywords
    const input = userInput.toLowerCase();
    const contextLower = context.toLowerCase();
    
    if (input.includes('explain') || input.includes('what') || input.includes('how')) {
      return `Based on the current section content, here's an explanation: ${generateContextualExplanation(contextLower)}`;
    } else if (input.includes('example') || input.includes('practical')) {
      return `Here's a practical example: ${generatePracticalExample(contextLower)}`;
    } else if (input.includes('quiz') || input.includes('question')) {
      return `Here's a quiz question for you: ${generateQuizQuestion(contextLower)}`;
    } else if (input.includes('difficult') || input.includes('hard') || input.includes('confusing')) {
      return `I understand this can be challenging. Let me break it down: ${generateSimplifiedExplanation(contextLower)}`;
    } else if (input.includes('relate') || input.includes('connect') || input.includes('before')) {
      return `Great question! This connects to previous concepts: ${generateConnectionExplanation(contextLower)}`;
    } else {
      return `I'm here to help you with "${currentLesson?.title}". Could you please be more specific about what you'd like to know? I can explain concepts, provide examples, create quiz questions, or help clarify difficult topics.`;
    }
  };

  const generateContextualExplanation = (context) => {
    if (context.includes('linear algebra')) {
      return "Linear algebra is the study of vectors, vector spaces, and linear transformations. It's fundamental to machine learning because it helps us understand how data can be transformed and manipulated mathematically.";
    } else if (context.includes('statistics')) {
      return "Statistics is the science of collecting, analyzing, and interpreting data. It provides the foundation for making informed decisions based on data patterns and relationships.";
    } else if (context.includes('python')) {
      return "Python is a versatile programming language known for its readability and extensive libraries. In AI, it's particularly popular due to libraries like NumPy, Pandas, and TensorFlow.";
    } else {
      return "This topic is fundamental to understanding the broader concepts in AI and machine learning. It provides the building blocks for more advanced techniques.";
    }
  };

  const generatePracticalExample = (context) => {
    if (context.includes('linear algebra')) {
      return "Consider a simple example: if you have data points representing house prices and square footage, you can use linear algebra to find the best-fit line that predicts price from size.";
    } else if (context.includes('statistics')) {
      return "In practice, you might use statistics to analyze customer behavior data. For instance, calculating the average time spent on a website or the correlation between age and purchase amount.";
    } else if (context.includes('python')) {
      return "Here's a simple Python example: `import numpy as np; data = np.array([1, 2, 3, 4, 5]); mean = np.mean(data); print(f'Average: {mean}')`";
    } else {
      return "A practical application would be using these concepts to solve real-world problems, such as predicting outcomes based on historical data.";
    }
  };

  const generateQuizQuestion = (context) => {
    if (context.includes('linear algebra')) {
      return "What is the dot product of vectors [1, 2, 3] and [4, 5, 6]? (Answer: 1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32)";
    } else if (context.includes('statistics')) {
      return "If you have a dataset with mean 50 and standard deviation 10, what percentage of data falls within one standard deviation of the mean? (Answer: Approximately 68%)";
    } else if (context.includes('python')) {
      return "What does the following Python code output: `print([x*2 for x in range(3)])`? (Answer: [0, 2, 4])";
    } else {
      return "What is the primary goal of this learning module? (Answer: To understand the fundamental concepts and their practical applications)";
    }
  };

  const generateSimplifiedExplanation = () => {
    return "Let me break this down into simpler terms. Think of it like this: [simplified analogy based on context]. The key is to understand the basic principles first, then build up to the more complex applications.";
  };

  const generateConnectionExplanation = () => {
    return "This builds upon the concepts we covered earlier. The connection is that [explanation of relationship]. Understanding this relationship helps you see the bigger picture of how all these concepts work together.";
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  const clearConversation = () => {
    setMessages([]);
    if (currentLesson && currentSection !== undefined) {
      const welcomeMessage = {
        id: Date.now(),
        type: 'ai',
        content: `Hello! I'm your AI tutor. I'm here to help you with "${currentLesson.title}" - specifically the section on "${currentLesson.sections[currentSection]?.title || 'Introduction'}". What would you like to know?`,
        timestamp: new Date(),
        context: 'welcome'
      };
      setMessages([welcomeMessage]);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          AI Tutor
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'ai' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/ai-avatar.png" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggestions */}
        {suggestions.length > 0 && messages.length <= 1 && (
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs h-auto py-1 px-2"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              placeholder="Ask your AI tutor anything..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={() => sendMessage(inputMessage)}
              disabled={isLoading || !inputMessage.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-muted-foreground">
              {messages.length > 1 ? `${messages.length - 1} messages` : 'Start a conversation'}
            </p>
            {messages.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearConversation}
                className="text-xs h-auto py-1 px-2"
              >
                Clear Chat
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITutor; 