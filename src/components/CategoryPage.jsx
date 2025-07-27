import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, Target, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  // Comprehensive subcategories data based on AGI roadmap
  const categoryData = {
    'foundational-mathematics': {
      title: 'Foundational Mathematics',
      description: 'The language of intelligence: Core mathematical foundations',
      progress: 45,
      totalLessons: 85,
      completedLessons: 38,
      estimatedTime: '12 weeks',
      difficulty: 'Intermediate',
      prerequisites: [],
      subCategories: [
        {
          id: 'linear-algebra',
          title: 'Linear Algebra',
          description: 'Vectors, matrices, eigenvalues, and the structure of data',
          progress: 90,
          lessons: 20,
          duration: '8h 30m',
          difficulty: 'Beginner',
          keyTopics: ['Vectors & Matrices', 'Eigenvalues & Eigenvectors', 'SVD', 'Matrix Operations'],
          practicalApplications: ['Neural Network Foundations', 'Data Dimensionality Reduction', 'Computer Graphics']
        },
        {
          id: 'calculus-optimization',
          title: 'Calculus & Optimization',
          description: 'Derivatives, gradients, and the engine of machine learning',
          progress: 75,
          lessons: 25,
          duration: '12h 15m',
          difficulty: 'Intermediate',
          keyTopics: ['Derivatives', 'Partial Derivatives', 'Chain Rule', 'Gradient Descent'],
          practicalApplications: ['Neural Network Training', 'Optimization Algorithms', 'Loss Function Minimization']
        },
        {
          id: 'probability-statistics',
          title: 'Probability & Statistics',
          description: 'Framework for uncertainty and statistical inference',
          progress: 50,
          lessons: 15,
          duration: '6h 45m',
          difficulty: 'Intermediate',
          keyTopics: ['Probability Distributions', 'Bayes Theorem', 'Hypothesis Testing', 'MLE/MAP'],
          practicalApplications: ['Uncertainty Quantification', 'Statistical Models', 'Bayesian Learning']
        },
        {
          id: 'information-theory',
          title: 'Information Theory',
          description: 'Entropy, mutual information, and the measure of knowledge',
          progress: 30,
          lessons: 12,
          duration: '5h 20m',
          difficulty: 'Advanced',
          keyTopics: ['Entropy', 'Mutual Information', 'KL Divergence', 'Cross-Entropy'],
          practicalApplications: ['Loss Functions', 'Model Compression', 'Feature Selection']
        }
      ]
    },
    'programming-cs': {
      title: 'Programming & Computer Science',
      description: 'Tools of creation: Programming and CS fundamentals',
      progress: 62,
      totalLessons: 102,
      completedLessons: 63,
      estimatedTime: '16 weeks',
      difficulty: 'Beginner to Advanced',
      prerequisites: [],
      subCategories: [
        {
          id: 'python-programming',
          title: 'Python Programming',
          description: 'Master Python for AI/ML development and data science',
          progress: 85,
          lessons: 30,
          duration: '15h 45m',
          difficulty: 'Beginner',
          keyTopics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
          practicalApplications: ['Data Analysis', 'Machine Learning', 'AI Prototyping']
        },
        {
          id: 'cpp-programming',
          title: 'C++ Programming',
          description: 'High-performance computing and system-level programming',
          progress: 45,
          lessons: 25,
          duration: '18h 20m',
          difficulty: 'Intermediate',
          keyTopics: ['Memory Management', 'STL', 'Templates', 'Performance Optimization'],
          practicalApplications: ['High-Performance Computing', 'Game Engines', 'Embedded Systems']
        },
        {
          id: 'data-structures',
          title: 'Data Structures',
          description: 'Arrays, trees, graphs, and efficient data organization',
          progress: 70,
          lessons: 22,
          duration: '11h 30m',
          difficulty: 'Intermediate',
          keyTopics: ['Arrays & Lists', 'Trees & Graphs', 'Hash Tables', 'Heaps & Priority Queues'],
          practicalApplications: ['Algorithm Optimization', 'Database Design', 'AI Search Algorithms']
        },
        {
          id: 'algorithms',
          title: 'Algorithms',
          description: 'Search, sort, dynamic programming, and algorithmic thinking',
          progress: 60,
          lessons: 28,
          duration: '14h 15m',
          difficulty: 'Intermediate',
          keyTopics: ['Sorting & Searching', 'Dynamic Programming', 'Graph Algorithms', 'Complexity Analysis'],
          practicalApplications: ['Problem Solving', 'System Optimization', 'AI Algorithm Development']
        }
      ]
    },
    'machine-learning': {
      title: 'Machine Learning Fundamentals',
      description: 'Core ML paradigms: Supervised, unsupervised, and reinforcement learning',
      progress: 72,
      totalLessons: 95,
      completedLessons: 68,
      estimatedTime: '14 weeks',
      difficulty: 'Intermediate',
      prerequisites: ['Basic Python', 'Statistics', 'Linear Algebra'],
      subCategories: [
        {
          id: 'supervised-learning',
          title: 'Supervised Learning',
          description: 'Classification and regression with labeled data',
          progress: 90,
          lessons: 25,
          duration: '12h 30m',
          difficulty: 'Beginner',
          keyTopics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'SVM'],
          practicalApplications: ['Predictive Analytics', 'Image Classification', 'Medical Diagnosis']
        },
        {
          id: 'unsupervised-learning',
          title: 'Unsupervised Learning',
          description: 'Clustering, dimensionality reduction, and pattern discovery',
          progress: 75,
          lessons: 20,
          duration: '10h 15m',
          difficulty: 'Intermediate',
          keyTopics: ['K-Means', 'Hierarchical Clustering', 'PCA', 't-SNE'],
          practicalApplications: ['Customer Segmentation', 'Anomaly Detection', 'Data Exploration']
        },
        {
          id: 'reinforcement-learning',
          title: 'Reinforcement Learning',
          description: 'Learning through interaction and reward signals',
          progress: 45,
          lessons: 22,
          duration: '14h 20m',
          difficulty: 'Advanced',
          keyTopics: ['Q-Learning', 'Policy Gradients', 'Actor-Critic', 'Deep RL'],
          practicalApplications: ['Game AI', 'Robotics Control', 'Autonomous Systems']
        },
        {
          id: 'model-evaluation',
          title: 'Model Evaluation',
          description: 'Cross-validation, metrics, and performance assessment',
          progress: 85,
          lessons: 18,
          duration: '8h 45m',
          difficulty: 'Intermediate',
          keyTopics: ['Cross-Validation', 'Evaluation Metrics', 'Bias-Variance', 'Statistical Testing'],
          practicalApplications: ['Model Selection', 'Performance Optimization', 'Deployment Readiness']
        }
      ]
    },
    'deep-learning': {
      title: 'Deep Learning & Neural Networks',
      description: 'Advanced architectures: CNNs, RNNs, Transformers, and beyond',
      progress: 55,
      totalLessons: 85,
      completedLessons: 47,
      estimatedTime: '18 weeks',
      difficulty: 'Advanced',
      prerequisites: ['Machine Learning', 'Python', 'Linear Algebra'],
      subCategories: [
        {
          id: 'neural-network-foundations',
          title: 'Neural Network Foundations',
          description: 'Perceptrons, MLPs, backpropagation, and training',
          progress: 85,
          lessons: 20,
          duration: '12h 15m',
          difficulty: 'Beginner',
          keyTopics: ['Perceptrons', 'Backpropagation', 'Activation Functions', 'Loss Functions'],
          practicalApplications: ['Basic Classification', 'Function Approximation', 'Pattern Recognition']
        },
        {
          id: 'convolutional-neural-networks',
          title: 'Convolutional Neural Networks',
          description: 'CNNs for computer vision and image processing',
          progress: 70,
          lessons: 25,
          duration: '15h 30m',
          difficulty: 'Intermediate',
          keyTopics: ['Convolution', 'Pooling', 'CNN Architectures', 'Transfer Learning'],
          practicalApplications: ['Image Recognition', 'Medical Imaging', 'Autonomous Vehicles']
        },
        {
          id: 'recurrent-neural-networks',
          title: 'Recurrent Neural Networks',
          description: 'RNNs, LSTMs, and sequence modeling',
          progress: 60,
          lessons: 22,
          duration: '13h 45m',
          difficulty: 'Intermediate',
          keyTopics: ['RNNs', 'LSTMs', 'GRUs', 'Sequence-to-Sequence'],
          practicalApplications: ['Natural Language Processing', 'Time Series Prediction', 'Speech Recognition']
        },
        {
          id: 'transformer-architecture',
          title: 'Transformer Architecture',
          description: 'Attention mechanisms and modern NLP architectures',
          progress: 40,
          lessons: 18,
          duration: '11h 20m',
          difficulty: 'Advanced',
          keyTopics: ['Self-Attention', 'Multi-Head Attention', 'BERT', 'GPT'],
          practicalApplications: ['Language Models', 'Machine Translation', 'Text Generation']
        }
      ]
    },
    // Add other categories with similar enhanced structure...
    'nlp-language': {
      title: 'Natural Language Processing',
      description: 'Language understanding: From text processing to large language models',
      progress: 41,
      totalLessons: 75,
      completedLessons: 31,
      estimatedTime: '15 weeks',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Python', 'Basic Machine Learning', 'Statistics'],
      subCategories: [
        {
          id: 'text-preprocessing',
          title: 'Text Preprocessing',
          description: 'Tokenization, normalization, and text cleaning',
          progress: 80,
          lessons: 15,
          duration: '7h 30m',
          difficulty: 'Beginner',
          keyTopics: ['Tokenization', 'Stemming', 'Lemmatization', 'Stop Words'],
          practicalApplications: ['Data Preparation', 'Text Mining', 'Search Systems']
        },
        {
          id: 'language-models',
          title: 'Language Models',
          description: 'N-grams, neural language models, and transformers',
          progress: 60,
          lessons: 22,
          duration: '14h 20m',
          difficulty: 'Intermediate',
          keyTopics: ['N-gram Models', 'Neural LMs', 'Transformer LMs', 'GPT Family'],
          practicalApplications: ['Text Generation', 'Auto-completion', 'Chatbots']
        },
        {
          id: 'sentiment-analysis',
          title: 'Sentiment Analysis',
          description: 'Opinion mining and emotion detection in text',
          progress: 45,
          lessons: 18,
          duration: '9h 15m',
          difficulty: 'Intermediate',
          keyTopics: ['Polarity Detection', 'Emotion Classification', 'Aspect-based SA', 'Deep Learning SA'],
          practicalApplications: ['Social Media Monitoring', 'Product Reviews', 'Customer Feedback']
        },
        {
          id: 'machine-translation',
          title: 'Machine Translation',
          description: 'Statistical and neural machine translation systems',
          progress: 25,
          lessons: 20,
          duration: '12h 45m',
          difficulty: 'Advanced',
          keyTopics: ['Statistical MT', 'Neural MT', 'Attention Mechanisms', 'Transformer MT'],
          practicalApplications: ['Global Communication', 'Content Localization', 'Language Accessibility']
        }
      ]
    },
    'computer-vision': {
      title: 'Computer Vision',
      description: 'Visual intelligence: Image processing, object detection, and recognition',
      progress: 33,
      totalLessons: 85,
      completedLessons: 28,
      estimatedTime: '16 weeks',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Python', 'Linear Algebra', 'Basic Machine Learning'],
      subCategories: [
        {
          id: 'image-processing',
          title: 'Image Processing',
          description: 'Filtering, enhancement, and basic image operations',
          progress: 70,
          lessons: 20,
          duration: '10h 30m',
          difficulty: 'Beginner',
          keyTopics: ['Image Filtering', 'Edge Detection', 'Morphological Operations', 'Color Spaces'],
          practicalApplications: ['Photo Enhancement', 'Medical Imaging', 'Quality Control']
        },
        {
          id: 'object-detection',
          title: 'Object Detection',
          description: 'Locating and classifying objects in images',
          progress: 40,
          lessons: 25,
          duration: '15h 45m',
          difficulty: 'Advanced',
          keyTopics: ['YOLO', 'R-CNN', 'SSD', 'Feature Pyramids'],
          practicalApplications: ['Autonomous Driving', 'Security Systems', 'Robotics']
        },
        {
          id: 'image-classification',
          title: 'Image Classification',
          description: 'Categorizing images using deep learning',
          progress: 65,
          lessons: 22,
          duration: '13h 20m',
          difficulty: 'Intermediate',
          keyTopics: ['CNN Architectures', 'Transfer Learning', 'Data Augmentation', 'Fine-tuning'],
          practicalApplications: ['Content Moderation', 'Medical Diagnosis', 'E-commerce']
        },
        {
          id: 'semantic-segmentation',
          title: 'Semantic Segmentation',
          description: 'Pixel-level classification and scene understanding',
          progress: 20,
          lessons: 18,
          duration: '11h 15m',
          difficulty: 'Advanced',
          keyTopics: ['FCN', 'U-Net', 'DeepLab', 'Mask R-CNN'],
          practicalApplications: ['Medical Imaging', 'Autonomous Navigation', 'Satellite Analysis']
        }
      ]
    },
    'agi-research': {
      title: 'AGI Research & Theory',
      description: 'Cutting-edge research: AGI architectures, alignment, and safety',
      progress: 15,
      totalLessons: 69,
      completedLessons: 10,
      estimatedTime: '20 weeks',
      difficulty: 'Advanced',
      prerequisites: ['Deep Learning', 'Machine Learning', 'Cognitive Science'],
      subCategories: [
        {
          id: 'agi-architectures',
          title: 'AGI Architectures',
          description: 'Cognitive architectures and general intelligence frameworks',
          progress: 25,
          lessons: 15,
          duration: '12h 30m',
          difficulty: 'Advanced',
          keyTopics: ['Cognitive Architectures', 'SOAR', 'ACT-R', 'Hybrid Systems'],
          practicalApplications: ['AI Research', 'Cognitive Modeling', 'Human-AI Interaction']
        },
        {
          id: 'ai-alignment',
          title: 'AI Alignment',
          description: 'Ensuring AI systems pursue intended goals',
          progress: 20,
          lessons: 18,
          duration: '14h 45m',
          difficulty: 'Advanced',
          keyTopics: ['Value Alignment', 'Reward Modeling', 'Constitutional AI', 'RLHF'],
          practicalApplications: ['Safe AI Development', 'AI Governance', 'Ethics Implementation']
        },
        {
          id: 'ai-safety',
          title: 'AI Safety',
          description: 'Robustness, interpretability, and safe AI systems',
          progress: 15,
          lessons: 20,
          duration: '16h 20m',
          difficulty: 'Advanced',
          keyTopics: ['Adversarial Robustness', 'Interpretability', 'Safety Verification', 'Risk Assessment'],
          practicalApplications: ['Critical Systems', 'AI Auditing', 'Regulatory Compliance']
        },
        {
          id: 'meta-learning',
          title: 'Meta-Learning',
          description: 'Learning to learn and few-shot adaptation',
          progress: 10,
          lessons: 16,
          duration: '10h 15m',
          difficulty: 'Advanced',
          keyTopics: ['MAML', 'Prototypical Networks', 'Memory Networks', 'Few-shot Learning'],
          practicalApplications: ['Rapid Adaptation', 'Few-shot Learning', 'Transfer Learning']
        }
      ]
    }
  };

  const category = categoryData[categoryId];
  if (!category) {
    return (
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="text-center space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Category not found</h1>
                      <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Home / Categories / {category.title}
            </div>
          </div>

          {/* Category Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 sm:p-6 lg:p-8 rounded-xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="space-y-2 lg:space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{category.title}</h1>
                <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg">{category.description}</p>
                
                {/* Category Stats */}
                <div className="flex flex-wrap gap-3 lg:gap-4 text-sm lg:text-base">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{category.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{category.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>{category.difficulty}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">{category.progress}%</div>
                <div className="text-primary-foreground/90 text-sm lg:text-base">Category completion</div>
                <div className="text-primary-foreground/80 text-xs lg:text-sm mt-1">
                  {category.completedLessons}/{category.totalLessons} lessons
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 lg:mt-6">
              <Progress value={category.progress} className="h-2 lg:h-3" />
            </div>
          </div>
        </div>

        {/* Prerequisites (if any) */}
        {category.prerequisites && category.prerequisites.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-sm lg:text-base font-semibold text-yellow-800">Prerequisites</h3>
                  <p className="text-xs lg:text-sm text-yellow-700 mt-1">
                    Recommended knowledge: {category.prerequisites.join(', ')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Modules */}
        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Learning Modules</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {category.subCategories.map((subCategory) => (
              <Card key={subCategory.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3 lg:pb-4">
                  <div className="flex items-center justify-between mb-3 lg:mb-4">
                    <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                      <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
                    </div>
                    <Badge className={getDifficultyColor(subCategory.difficulty)} variant="outline">
                      {subCategory.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-base lg:text-xl leading-tight">{subCategory.title}</CardTitle>
                  <CardDescription className="text-xs lg:text-sm leading-relaxed">{subCategory.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 lg:space-y-4">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{subCategory.progress}%</span>
                    </div>
                    <Progress value={subCategory.progress} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs lg:text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-3 h-3" />
                      <span>{subCategory.lessons} lessons</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{subCategory.duration}</span>
                    </div>
                  </div>

                  {/* Key topics */}
                  <div className="space-y-2">
                    <h4 className="text-xs lg:text-sm font-medium">Key Topics</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {subCategory.keyTopics.slice(0, 4).map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                          <span className="truncate">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Applications */}
                  {subCategory.practicalApplications && (
                    <div className="space-y-2">
                      <h4 className="text-xs lg:text-sm font-medium text-green-700">Applications</h4>
                      <div className="space-y-1">
                        {subCategory.practicalApplications.slice(0, 2).map((app, appIndex) => (
                          <div key={appIndex} className="flex items-center space-x-2 text-xs text-green-600">
                            <Trophy className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/lesson/${categoryId}/${subCategory.id}/intro-lesson`);
                    }}
                  >
                    {subCategory.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Path */}
        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Recommended Learning Path</h2>
          
          <Card>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="text-base lg:text-lg font-semibold">Complete {category.title} Mastery</h3>
                  <Badge variant="outline" className="self-start sm:self-auto">
                    {category.subCategories.length} modules
                  </Badge>
                </div>
                
                <div className="space-y-2 lg:space-y-3">
                  {category.subCategories.map((subCategory, index) => (
                    <div key={subCategory.id} className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs lg:text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm lg:text-base truncate">{subCategory.title}</div>
                        <div className="text-xs lg:text-sm text-muted-foreground">
                          {subCategory.lessons} lessons • {subCategory.duration}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs lg:text-sm text-muted-foreground">
                          {subCategory.progress}%
                        </div>
                        {subCategory.progress === 100 ? (
                          <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                        ) : subCategory.progress > 0 ? (
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-primary bg-primary/20"></div>
                        ) : (
                          <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full border-2 border-muted"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

