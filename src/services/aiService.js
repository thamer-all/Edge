// AI Service for Local LLM Integration
// This service handles communication with local LLM models for content generation

class AIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001/api';
    this.model = import.meta.env.VITE_AI_MODEL || 'llama3.1';
    this.isLocal = import.meta.env.VITE_USE_LOCAL_LLM === 'true';
  }

  // Generate lesson content using local LLM
  async generateLessonContent(topic, difficulty = 'intermediate', format = 'lesson') {
    try {
      if (this.isLocal) {
        return await this.generateWithLocalLLM(topic, difficulty, format);
      } else {
        return await this.generateWithFallback(topic, difficulty, format);
      }
    } catch (error) {
      console.error('AI content generation failed:', error);
      return this.getFallbackContent(topic, difficulty, format);
    }
  }

  // Generate content using local LLM (Ollama, LM Studio, etc.)
  async generateWithLocalLLM(topic, difficulty, format) {
    const prompt = this.buildPrompt(topic, difficulty, format);
    
    const response = await fetch(`${this.baseURL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.model,
        prompt,
        max_tokens: 2000,
        temperature: 0.7,
        format: 'json'
      })
    });

    if (!response.ok) {
      throw new Error(`Local LLM request failed: ${response.status}`);
    }

    const data = await response.json();
    return this.parseAIResponse(data.content, format);
  }

  // Fallback to pre-generated content
  async generateWithFallback(topic, difficulty, format) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return this.getFallbackContent(topic, difficulty, format);
  }

  // Build prompt for AI generation
  buildPrompt(topic, difficulty, format) {
    const basePrompt = `You are an expert AI educator specializing in ${topic}. 
    Create comprehensive educational content for a ${difficulty} level student.
    
    Topic: ${topic}
    Difficulty: ${difficulty}
    Format: ${format}
    
    Requirements:
    - Use clear, engaging language
    - Include practical examples
    - Add interactive elements where appropriate
    - Structure content logically
    - Include key takeaways
    - Make it suitable for online learning
    
    Please provide the content in JSON format with the following structure:
    {
      "title": "Lesson title",
      "description": "Brief description",
      "content": "Main lesson content",
      "examples": ["Example 1", "Example 2"],
      "keyPoints": ["Key point 1", "Key point 2"],
      "interactiveElements": ["Element 1", "Element 2"],
      "quiz": [
        {
          "question": "Question text",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": 0,
          "explanation": "Why this is correct"
        }
      ]
    }`;

    return basePrompt;
  }

  // Parse AI response
  parseAIResponse(content, format) {
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(content);
      return parsed;
    } catch {
      // If not JSON, create structured content from text
      return this.structureTextContent(content);
    }
  }

  // Structure text content into lesson format
  structureTextContent(content) {
    const lines = content.split('\n').filter(line => line.trim());
    
    return {
      title: lines[0] || 'Generated Lesson',
      description: lines[1] || 'AI-generated educational content',
      content: lines.slice(2).join('\n'),
      examples: this.extractExamples(content),
      keyPoints: this.extractKeyPoints(content),
      interactiveElements: [],
      quiz: this.generateQuizFromContent(content)
    };
  }

  // Extract examples from content
  extractExamples(content) {
    const examples = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].toLowerCase();
      if (line.includes('example') || line.includes('for instance') || line.includes('such as')) {
        if (i + 1 < lines.length) {
          examples.push(lines[i + 1].trim());
        }
      }
    }
    
    return examples.slice(0, 3); // Return max 3 examples
  }

  // Extract key points from content
  extractKeyPoints(content) {
    const keyPoints = [];
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.trim().startsWith('-') || line.trim().startsWith('•') || line.trim().startsWith('*')) {
        keyPoints.push(line.trim().substring(1).trim());
      }
    }
    
    return keyPoints.slice(0, 5); // Return max 5 key points
  }

  // Generate quiz from content
  generateQuizFromContent(content) {
    const quiz = [];
    const sentences = content.split('. ').filter(s => s.length > 20);
    
    // Generate simple quiz questions from content
    for (let i = 0; i < Math.min(3, sentences.length); i++) {
      const sentence = sentences[i];
      const words = sentence.split(' ');
      
      if (words.length > 5) {
        const question = `What is the main concept discussed in: "${sentence.substring(0, 100)}..."?`;
        quiz.push({
          question,
          options: [
            'The primary topic',
            'A secondary detail',
            'An unrelated concept',
            'A technical term'
          ],
          correctAnswer: 0,
          explanation: 'This question tests understanding of the main concept.'
        });
      }
    }
    
    return quiz;
  }

  // Get fallback content when AI is unavailable
  getFallbackContent(topic, difficulty, format) {
    const fallbackContent = {
      title: `${topic} - ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`,
      description: `Comprehensive guide to ${topic} concepts and applications.`,
      content: `This lesson covers the fundamental concepts of ${topic} at a ${difficulty} level. 
      
      Key Concepts:
      • Understanding the basics of ${topic}
      • Practical applications in real-world scenarios
      • Advanced techniques and methodologies
      • Best practices and common pitfalls
      
      This content is designed to provide you with a solid foundation in ${topic} while preparing you for more advanced topics.`,
      examples: [
        `Example 1: Basic ${topic} implementation`,
        `Example 2: Advanced ${topic} techniques`,
        `Example 3: Real-world ${topic} applications`
      ],
      keyPoints: [
        `Master the fundamentals of ${topic}`,
        `Understand practical applications`,
        `Learn best practices`,
        `Avoid common mistakes`,
        `Prepare for advanced topics`
      ],
      interactiveElements: [
        `Interactive ${topic} simulation`,
        `Practice exercises`,
        `Code examples`
      ],
      quiz: [
        {
          question: `What is the primary purpose of ${topic}?`,
          options: [
            'To solve complex problems',
            'To simplify basic tasks',
            'To create new technologies',
            'To replace human intelligence'
          ],
          correctAnswer: 0,
          explanation: `${topic} is primarily used to solve complex problems that would be difficult or impossible to solve using traditional methods.`
        }
      ]
    };

    return fallbackContent;
  }

  // Save generated content to local storage
  saveGeneratedContent(topic, content) {
    try {
      const savedContent = JSON.parse(localStorage.getItem('ai_generated_content') || '{}');
      savedContent[topic] = {
        content,
        timestamp: new Date().toISOString(),
        model: this.model
      };
      localStorage.setItem('ai_generated_content', JSON.stringify(savedContent));
      return true;
    } catch (error) {
      console.error('Failed to save generated content:', error);
      return false;
    }
  }

  // Get saved generated content
  getSavedContent(topic) {
    try {
      const savedContent = JSON.parse(localStorage.getItem('ai_generated_content') || '{}');
      return savedContent[topic] || null;
    } catch (error) {
      console.error('Failed to get saved content:', error);
      return null;
    }
  }

  // Check if content exists and is recent (less than 24 hours old)
  isContentRecent(topic) {
    const saved = this.getSavedContent(topic);
    if (!saved) return false;
    
    const contentAge = Date.now() - new Date(saved.timestamp).getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    return contentAge < oneDay;
  }

  // Generate concept graph for a topic
  async generateConceptGraph(topic) {
    try {
      const prompt = `Create a concept graph for ${topic} showing the relationships between key concepts. 
      Return as JSON with nodes and edges:
      {
        "nodes": [{"id": "concept1", "label": "Concept 1", "level": 1}],
        "edges": [{"from": "concept1", "to": "concept2", "label": "relates to"}]
      }`;

      if (this.isLocal) {
        const response = await fetch(`${this.baseURL}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: this.model,
            prompt,
            max_tokens: 1000,
            temperature: 0.5
          })
        });

        if (response.ok) {
          const data = await response.json();
          return JSON.parse(data.content);
        }
      }

      // Fallback concept graph
      return this.getFallbackConceptGraph(topic);
    } catch (error) {
      console.error('Failed to generate concept graph:', error);
      return this.getFallbackConceptGraph(topic);
    }
  }

  // Get fallback concept graph
  getFallbackConceptGraph(topic) {
    return {
      nodes: [
        { id: topic, label: topic, level: 0 },
        { id: `${topic}_basics`, label: 'Basic Concepts', level: 1 },
        { id: `${topic}_advanced`, label: 'Advanced Topics', level: 1 },
        { id: `${topic}_applications`, label: 'Applications', level: 1 },
        { id: `${topic}_tools`, label: 'Tools & Frameworks', level: 2 },
        { id: `${topic}_best_practices`, label: 'Best Practices', level: 2 }
      ],
      edges: [
        { from: topic, to: `${topic}_basics`, label: 'includes' },
        { from: topic, to: `${topic}_advanced`, label: 'leads to' },
        { from: topic, to: `${topic}_applications`, label: 'enables' },
        { from: `${topic}_basics`, to: `${topic}_tools`, label: 'uses' },
        { from: `${topic}_advanced`, to: `${topic}_best_practices`, label: 'follows' }
      ]
    };
  }
}

// Create singleton instance
const aiService = new AIService();

export default aiService; 