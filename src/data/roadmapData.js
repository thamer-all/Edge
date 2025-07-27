// Comprehensive roadmap data based on roadmap.sh
export const roadmapData = {
  'AI Engineer': {
    title: 'AI Engineer',
    description: 'Build and deploy AI systems at scale',
    icon: '🤖',
    color: '#3b82f6',
    categories: [
      {
        id: 'fundamentals',
        title: 'Fundamentals',
        description: 'Core concepts and prerequisites',
        topics: [
          {
            id: 'mathematics',
            title: 'Mathematics',
            description: 'Linear algebra, calculus, probability, and statistics',
            lessons: [
              {
                id: 'linear-algebra-basics',
                title: 'Linear Algebra Basics',
                description: 'Vectors, matrices, eigenvalues, and eigenvectors',
                difficulty: 'beginner',
                duration: 45,
                tags: ['linear algebra', 'mathematics', 'vectors', 'matrices']
              },
              {
                id: 'calculus-for-ml',
                title: 'Calculus for Machine Learning',
                description: 'Derivatives, gradients, and optimization',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['calculus', 'optimization', 'gradients', 'derivatives']
              },
              {
                id: 'probability-statistics',
                title: 'Probability and Statistics',
                description: 'Probability distributions, hypothesis testing, and Bayesian inference',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['probability', 'statistics', 'distributions', 'bayesian']
              }
            ]
          },
          {
            id: 'programming',
            title: 'Programming',
            description: 'Python, data structures, and algorithms',
            lessons: [
              {
                id: 'python-basics',
                title: 'Python Fundamentals',
                description: 'Core Python programming concepts',
                difficulty: 'beginner',
                duration: 90,
                tags: ['python', 'programming', 'basics', 'syntax']
              },
              {
                id: 'data-structures',
                title: 'Data Structures and Algorithms',
                description: 'Essential data structures for AI applications',
                difficulty: 'intermediate',
                duration: 120,
                tags: ['algorithms', 'data structures', 'complexity', 'optimization']
              },
              {
                id: 'python-libraries',
                title: 'Python Libraries for AI',
                description: 'NumPy, Pandas, Matplotlib, and SciPy',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['numpy', 'pandas', 'matplotlib', 'scipy']
              }
            ]
          }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        description: 'Core ML algorithms and techniques',
        topics: [
          {
            id: 'supervised-learning',
            title: 'Supervised Learning',
            description: 'Classification and regression algorithms',
            lessons: [
              {
                id: 'linear-regression',
                title: 'Linear Regression',
                description: 'Understanding and implementing linear regression',
                difficulty: 'beginner',
                duration: 45,
                tags: ['regression', 'linear', 'scikit-learn', 'gradient-descent']
              },
              {
                id: 'logistic-regression',
                title: 'Logistic Regression',
                description: 'Binary and multiclass classification',
                difficulty: 'beginner',
                duration: 60,
                tags: ['classification', 'logistic', 'probability', 'odds']
              },
              {
                id: 'decision-trees',
                title: 'Decision Trees and Random Forests',
                description: 'Tree-based models and ensemble methods',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['decision trees', 'random forest', 'ensemble', 'feature importance']
              },
              {
                id: 'svm',
                title: 'Support Vector Machines',
                description: 'SVM for classification and regression',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['svm', 'kernel methods', 'margin', 'hyperplane']
              }
            ]
          },
          {
            id: 'unsupervised-learning',
            title: 'Unsupervised Learning',
            description: 'Clustering and dimensionality reduction',
            lessons: [
              {
                id: 'k-means',
                title: 'K-Means Clustering',
                description: 'Partitioning data into clusters',
                difficulty: 'intermediate',
                duration: 45,
                tags: ['clustering', 'k-means', 'centroids', 'partitioning']
              },
              {
                id: 'pca',
                title: 'Principal Component Analysis',
                description: 'Dimensionality reduction and feature extraction',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['pca', 'dimensionality reduction', 'eigenvalues', 'variance']
              },
              {
                id: 'dbscan',
                title: 'DBSCAN Clustering',
                description: 'Density-based clustering algorithm',
                difficulty: 'intermediate',
                duration: 45,
                tags: ['dbscan', 'density-based', 'noise', 'eps']
              }
            ]
          }
        ]
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning frameworks',
        topics: [
          {
            id: 'neural-networks',
            title: 'Neural Networks',
            description: 'Fundamentals of artificial neural networks',
            lessons: [
              {
                id: 'nn-basics',
                title: 'Neural Network Basics',
                description: 'Perceptrons, activation functions, and backpropagation',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['neural networks', 'perceptron', 'activation functions', 'backpropagation']
              },
              {
                id: 'cnn',
                title: 'Convolutional Neural Networks',
                description: 'CNNs for image processing and computer vision',
                difficulty: 'advanced',
                duration: 120,
                tags: ['cnn', 'convolution', 'filters', 'image processing']
              },
              {
                id: 'rnn-lstm',
                title: 'RNNs and LSTM',
                description: 'Recurrent neural networks for sequential data',
                difficulty: 'advanced',
                duration: 105,
                tags: ['rnn', 'lstm', 'sequential data', 'memory']
              },
              {
                id: 'transformer',
                title: 'Transformer Architecture',
                description: 'Attention mechanisms and transformer models',
                difficulty: 'advanced',
                duration: 135,
                tags: ['transformer', 'attention', 'self-attention', 'bert']
              }
            ]
          },
          {
            id: 'frameworks',
            title: 'Deep Learning Frameworks',
            description: 'TensorFlow, PyTorch, and Keras',
            lessons: [
              {
                id: 'tensorflow-basics',
                title: 'TensorFlow Fundamentals',
                description: 'Building models with TensorFlow',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['tensorflow', 'keras', 'layers', 'models']
              },
              {
                id: 'pytorch-basics',
                title: 'PyTorch Fundamentals',
                description: 'Dynamic computation graphs and PyTorch',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['pytorch', 'tensors', 'autograd', 'nn.module']
              },
              {
                id: 'model-deployment',
                title: 'Model Deployment',
                description: 'Deploying models in production',
                difficulty: 'advanced',
                duration: 120,
                tags: ['deployment', 'production', 'api', 'serving']
              }
            ]
          }
        ]
      },
      {
        id: 'mlops',
        title: 'MLOps',
        description: 'Machine Learning Operations and DevOps',
        topics: [
          {
            id: 'version-control',
            title: 'Version Control and CI/CD',
            description: 'Git, GitHub, and continuous integration',
            lessons: [
              {
                id: 'git-ml',
                title: 'Git for Machine Learning',
                description: 'Version control for ML projects',
                difficulty: 'beginner',
                duration: 45,
                tags: ['git', 'version control', 'github', 'collaboration']
              },
              {
                id: 'ci-cd-ml',
                title: 'CI/CD for ML',
                description: 'Automated testing and deployment pipelines',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['ci/cd', 'jenkins', 'github actions', 'automation']
              }
            ]
          },
          {
            id: 'model-monitoring',
            title: 'Model Monitoring and Observability',
            description: 'Tracking model performance and drift',
            lessons: [
              {
                id: 'model-monitoring',
                title: 'Model Monitoring',
                description: 'Tracking model performance in production',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['monitoring', 'performance', 'drift', 'metrics']
              },
              {
                id: 'mlflow',
                title: 'MLflow for Experiment Tracking',
                description: 'Managing ML experiments and model registry',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['mlflow', 'experiments', 'model registry', 'tracking']
              }
            ]
          }
        ]
      }
    ]
  },
  'Data Analyst': {
    title: 'Data Analyst',
    description: 'Transform data into actionable insights',
    icon: '📊',
    color: '#10b981',
    categories: [
      {
        id: 'data-fundamentals',
        title: 'Data Fundamentals',
        description: 'Core data analysis concepts',
        topics: [
          {
            id: 'statistics',
            title: 'Statistics',
            description: 'Descriptive and inferential statistics',
            lessons: [
              {
                id: 'descriptive-stats',
                title: 'Descriptive Statistics',
                description: 'Measures of central tendency and dispersion',
                difficulty: 'beginner',
                duration: 60,
                tags: ['statistics', 'mean', 'median', 'variance']
              },
              {
                id: 'inferential-stats',
                title: 'Inferential Statistics',
                description: 'Hypothesis testing and confidence intervals',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['hypothesis testing', 'p-values', 'confidence intervals', 't-tests']
              }
            ]
          },
          {
            id: 'data-types',
            title: 'Data Types and Structures',
            description: 'Understanding different data formats',
            lessons: [
              {
                id: 'data-types',
                title: 'Data Types',
                description: 'Numerical, categorical, and temporal data',
                difficulty: 'beginner',
                duration: 45,
                tags: ['data types', 'numerical', 'categorical', 'temporal']
              },
              {
                id: 'data-quality',
                title: 'Data Quality Assessment',
                description: 'Identifying and handling data issues',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['data quality', 'missing values', 'outliers', 'validation']
              }
            ]
          }
        ]
      },
      {
        id: 'data-manipulation',
        title: 'Data Manipulation',
        description: 'Cleaning and transforming data',
        topics: [
          {
            id: 'pandas',
            title: 'Pandas',
            description: 'Data manipulation with pandas',
            lessons: [
              {
                id: 'pandas-basics',
                title: 'Pandas Basics',
                description: 'DataFrames, Series, and basic operations',
                difficulty: 'beginner',
                duration: 90,
                tags: ['pandas', 'dataframe', 'series', 'data manipulation']
              },
              {
                id: 'data-cleaning',
                title: 'Data Cleaning with Pandas',
                description: 'Handling missing data, duplicates, and outliers',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['data cleaning', 'missing values', 'duplicates', 'outliers']
              },
              {
                id: 'data-transformation',
                title: 'Data Transformation',
                description: 'Reshaping, merging, and aggregating data',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['transformation', 'merge', 'groupby', 'pivot']
              }
            ]
          },
          {
            id: 'sql',
            title: 'SQL',
            description: 'Database querying and manipulation',
            lessons: [
              {
                id: 'sql-basics',
                title: 'SQL Basics',
                description: 'SELECT, WHERE, JOIN, and basic queries',
                difficulty: 'beginner',
                duration: 90,
                tags: ['sql', 'database', 'queries', 'joins']
              },
              {
                id: 'advanced-sql',
                title: 'Advanced SQL',
                description: 'Window functions, CTEs, and complex queries',
                difficulty: 'intermediate',
                duration: 120,
                tags: ['window functions', 'cte', 'subqueries', 'aggregation']
              }
            ]
          }
        ]
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Creating compelling visualizations',
        topics: [
          {
            id: 'matplotlib-seaborn',
            title: 'Matplotlib and Seaborn',
            description: 'Python visualization libraries',
            lessons: [
              {
                id: 'matplotlib-basics',
                title: 'Matplotlib Basics',
                description: 'Creating basic plots and charts',
                difficulty: 'beginner',
                duration: 60,
                tags: ['matplotlib', 'plots', 'charts', 'visualization']
              },
              {
                id: 'seaborn',
                title: 'Seaborn for Statistical Visualization',
                description: 'Statistical plotting with seaborn',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['seaborn', 'statistical plots', 'distributions', 'correlations']
              }
            ]
          },
          {
            id: 'interactive-viz',
            title: 'Interactive Visualizations',
            description: 'Plotly, Bokeh, and interactive charts',
            lessons: [
              {
                id: 'plotly',
                title: 'Interactive Charts with Plotly',
                description: 'Creating interactive visualizations',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['plotly', 'interactive', 'dashboards', 'web']
              },
              {
                id: 'dashboard-design',
                title: 'Dashboard Design Principles',
                description: 'Creating effective data dashboards',
                difficulty: 'intermediate',
                duration: 60,
                tags: ['dashboard', 'design', 'ux', 'storytelling']
              }
            ]
          }
        ]
      },
      {
        id: 'business-intelligence',
        title: 'Business Intelligence',
        description: 'BI tools and reporting',
        topics: [
          {
            id: 'bi-tools',
            title: 'BI Tools',
            description: 'Tableau, Power BI, and other BI platforms',
            lessons: [
              {
                id: 'tableau-basics',
                title: 'Tableau Basics',
                description: 'Creating visualizations in Tableau',
                difficulty: 'beginner',
                duration: 90,
                tags: ['tableau', 'bi', 'visualization', 'dashboard']
              },
              {
                id: 'power-bi',
                title: 'Power BI',
                description: 'Microsoft Power BI for business analytics',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['power bi', 'microsoft', 'analytics', 'reports']
              }
            ]
          }
        ]
      }
    ]
  },
  'AI Data Scientist': {
    title: 'AI Data Scientist',
    description: 'Bridge the gap between data science and AI',
    icon: '🧠',
    color: '#8b5cf6',
    categories: [
      {
        id: 'advanced-ml',
        title: 'Advanced Machine Learning',
        description: 'Advanced ML techniques and algorithms',
        topics: [
          {
            id: 'ensemble-methods',
            title: 'Ensemble Methods',
            description: 'Boosting, bagging, and stacking',
            lessons: [
              {
                id: 'gradient-boosting',
                title: 'Gradient Boosting',
                description: 'XGBoost, LightGBM, and CatBoost',
                difficulty: 'advanced',
                duration: 120,
                tags: ['gradient boosting', 'xgboost', 'lightgbm', 'catboost']
              },
              {
                id: 'random-forest',
                title: 'Random Forest Deep Dive',
                description: 'Advanced random forest concepts',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['random forest', 'ensemble', 'bootstrap', 'feature importance']
              }
            ]
          },
          {
            id: 'optimization',
            title: 'Optimization Techniques',
            description: 'Advanced optimization for ML',
            lessons: [
              {
                id: 'hyperparameter-tuning',
                title: 'Hyperparameter Tuning',
                description: 'Grid search, random search, and Bayesian optimization',
                difficulty: 'advanced',
                duration: 90,
                tags: ['hyperparameter', 'grid search', 'bayesian optimization', 'optuna']
              },
              {
                id: 'feature-engineering',
                title: 'Feature Engineering',
                description: 'Creating and selecting features',
                difficulty: 'intermediate',
                duration: 120,
                tags: ['feature engineering', 'feature selection', 'dimensionality reduction']
              }
            ]
          }
        ]
      },
      {
        id: 'nlp',
        title: 'Natural Language Processing',
        description: 'Text processing and language models',
        topics: [
          {
            id: 'text-processing',
            title: 'Text Processing',
            description: 'Text preprocessing and feature extraction',
            lessons: [
              {
                id: 'text-preprocessing',
                title: 'Text Preprocessing',
                description: 'Tokenization, stemming, and lemmatization',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['nlp', 'tokenization', 'stemming', 'lemmatization']
              },
              {
                id: 'word-embeddings',
                title: 'Word Embeddings',
                description: 'Word2Vec, GloVe, and FastText',
                difficulty: 'advanced',
                duration: 90,
                tags: ['word embeddings', 'word2vec', 'glove', 'fasttext']
              }
            ]
          },
          {
            id: 'language-models',
            title: 'Language Models',
            description: 'BERT, GPT, and transformer models',
            lessons: [
              {
                id: 'bert',
                title: 'BERT and Transformers',
                description: 'Understanding BERT architecture',
                difficulty: 'advanced',
                duration: 120,
                tags: ['bert', 'transformer', 'attention', 'huggingface']
              },
              {
                id: 'gpt-models',
                title: 'GPT Models',
                description: 'Generative Pre-trained Transformers',
                difficulty: 'advanced',
                duration: 105,
                tags: ['gpt', 'generative', 'language model', 'openai']
              }
            ]
          }
        ]
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision',
        description: 'Image processing and computer vision',
        topics: [
          {
            id: 'image-processing',
            title: 'Image Processing',
            description: 'Basic image processing techniques',
            lessons: [
              {
                id: 'opencv-basics',
                title: 'OpenCV Basics',
                description: 'Image manipulation with OpenCV',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['opencv', 'image processing', 'computer vision', 'python']
              },
              {
                id: 'image-features',
                title: 'Image Feature Extraction',
                description: 'SIFT, SURF, and other feature detectors',
                difficulty: 'advanced',
                duration: 75,
                tags: ['feature extraction', 'sift', 'surf', 'keypoints']
              }
            ]
          },
          {
            id: 'deep-vision',
            title: 'Deep Learning for Vision',
            description: 'CNN architectures and vision models',
            lessons: [
              {
                id: 'cnn-architectures',
                title: 'CNN Architectures',
                description: 'ResNet, VGG, and modern CNN designs',
                difficulty: 'advanced',
                duration: 120,
                tags: ['cnn', 'resnet', 'vgg', 'architecture']
              },
              {
                id: 'object-detection',
                title: 'Object Detection',
                description: 'YOLO, R-CNN, and detection models',
                difficulty: 'advanced',
                duration: 135,
                tags: ['object detection', 'yolo', 'r-cnn', 'bounding boxes']
              }
            ]
          }
        ]
      }
    ]
  },
  'AI Red Teaming': {
    title: 'AI Red Teaming',
    description: 'Security testing and adversarial AI',
    icon: '🛡️',
    color: '#ef4444',
    categories: [
      {
        id: 'security-fundamentals',
        title: 'Security Fundamentals',
        description: 'Core cybersecurity concepts',
        topics: [
          {
            id: 'cybersecurity-basics',
            title: 'Cybersecurity Basics',
            description: 'Security principles and threat modeling',
            lessons: [
              {
                id: 'security-principles',
                title: 'Security Principles',
                description: 'CIA triad, defense in depth, and security models',
                difficulty: 'beginner',
                duration: 60,
                tags: ['security', 'cia triad', 'defense in depth', 'principles']
              },
              {
                id: 'threat-modeling',
                title: 'Threat Modeling',
                description: 'Identifying and analyzing security threats',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['threat modeling', 'risk assessment', 'attack vectors']
              }
            ]
          },
          {
            id: 'network-security',
            title: 'Network Security',
            description: 'Network protocols and security',
            lessons: [
              {
                id: 'network-protocols',
                title: 'Network Protocols',
                description: 'TCP/IP, HTTP, and security implications',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['networking', 'tcp/ip', 'http', 'protocols']
              },
              {
                id: 'penetration-testing',
                title: 'Penetration Testing Basics',
                description: 'Ethical hacking and security testing',
                difficulty: 'intermediate',
                duration: 120,
                tags: ['penetration testing', 'ethical hacking', 'vulnerabilities']
              }
            ]
          }
        ]
      },
      {
        id: 'adversarial-ml',
        title: 'Adversarial Machine Learning',
        description: 'Attacking and defending ML systems',
        topics: [
          {
            id: 'adversarial-attacks',
            title: 'Adversarial Attacks',
            description: 'Types of attacks on ML models',
            lessons: [
              {
                id: 'evasion-attacks',
                title: 'Evasion Attacks',
                description: 'FGSM, PGD, and evasion techniques',
                difficulty: 'advanced',
                duration: 120,
                tags: ['adversarial attacks', 'fgsm', 'pgd', 'evasion']
              },
              {
                id: 'poisoning-attacks',
                title: 'Poisoning Attacks',
                description: 'Data poisoning and backdoor attacks',
                difficulty: 'advanced',
                duration: 105,
                tags: ['poisoning', 'backdoor', 'data manipulation']
              },
              {
                id: 'model-inversion',
                title: 'Model Inversion',
                description: 'Extracting training data from models',
                difficulty: 'advanced',
                duration: 90,
                tags: ['model inversion', 'privacy', 'data extraction']
              }
            ]
          },
          {
            id: 'defense-techniques',
            title: 'Defense Techniques',
            description: 'Protecting ML models from attacks',
            lessons: [
              {
                id: 'adversarial-training',
                title: 'Adversarial Training',
                description: 'Training models to be robust against attacks',
                difficulty: 'advanced',
                duration: 120,
                tags: ['adversarial training', 'robustness', 'defense']
              },
              {
                id: 'detection-methods',
                title: 'Attack Detection',
                description: 'Detecting adversarial inputs',
                difficulty: 'advanced',
                duration: 90,
                tags: ['detection', 'anomaly detection', 'defense']
              }
            ]
          }
        ]
      },
      {
        id: 'ai-security-tools',
        title: 'AI Security Tools',
        description: 'Tools and frameworks for AI security',
        topics: [
          {
            id: 'security-frameworks',
            title: 'Security Frameworks',
            description: 'Frameworks for AI security testing',
            lessons: [
              {
                id: 'cleverhans',
                title: 'CleverHans',
                description: 'Adversarial example library for TensorFlow',
                difficulty: 'advanced',
                duration: 75,
                tags: ['cleverhans', 'tensorflow', 'adversarial examples']
              },
              {
                id: 'adversarial-robustness',
                title: 'Adversarial Robustness Toolbox',
                description: 'IBM\'s library for adversarial robustness',
                difficulty: 'advanced',
                duration: 90,
                tags: ['art', 'ibm', 'robustness', 'defense']
              }
            ]
          }
        ]
      }
    ]
  },
  'AI Agents': {
    title: 'AI Agents',
    description: 'Building intelligent autonomous systems',
    icon: '🤖',
    color: '#f97316',
    categories: [
      {
        id: 'agent-fundamentals',
        title: 'Agent Fundamentals',
        description: 'Core concepts of intelligent agents',
        topics: [
          {
            id: 'agent-architectures',
            title: 'Agent Architectures',
            description: 'Different types of AI agents',
            lessons: [
              {
                id: 'agent-types',
                title: 'Types of AI Agents',
                description: 'Reactive, deliberative, and hybrid agents',
                difficulty: 'intermediate',
                duration: 75,
                tags: ['agents', 'reactive', 'deliberative', 'hybrid']
              },
              {
                id: 'agent-environment',
                title: 'Agent-Environment Interaction',
                description: 'Perception, action, and environment modeling',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['environment', 'perception', 'action', 'modeling']
              }
            ]
          },
          {
            id: 'decision-making',
            title: 'Decision Making',
            description: 'Algorithms for agent decision making',
            lessons: [
              {
                id: 'search-algorithms',
                title: 'Search Algorithms',
                description: 'BFS, DFS, A*, and heuristic search',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['search', 'bfs', 'dfs', 'a-star', 'heuristics']
              },
              {
                id: 'planning',
                title: 'Automated Planning',
                description: 'STRIPS, PDDL, and planning algorithms',
                difficulty: 'advanced',
                duration: 120,
                tags: ['planning', 'strips', 'pddl', 'automated planning']
              }
            ]
          }
        ]
      },
      {
        id: 'multi-agent-systems',
        title: 'Multi-Agent Systems',
        description: 'Coordinating multiple AI agents',
        topics: [
          {
            id: 'coordination',
            title: 'Agent Coordination',
            description: 'Coordination and communication between agents',
            lessons: [
              {
                id: 'coordination-methods',
                title: 'Coordination Methods',
                description: 'Centralized, decentralized, and distributed coordination',
                difficulty: 'advanced',
                duration: 105,
                tags: ['coordination', 'centralized', 'decentralized', 'distributed']
              },
              {
                id: 'communication-protocols',
                title: 'Communication Protocols',
                description: 'Agent communication languages and protocols',
                difficulty: 'advanced',
                duration: 90,
                tags: ['communication', 'protocols', 'acl', 'fipa']
              }
            ]
          },
          {
            id: 'game-theory',
            title: 'Game Theory',
            description: 'Strategic interactions between agents',
            lessons: [
              {
                id: 'game-theory-basics',
                title: 'Game Theory Basics',
                description: 'Nash equilibrium, dominant strategies, and game types',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['game theory', 'nash equilibrium', 'strategies', 'payoffs']
              },
              {
                id: 'mechanism-design',
                title: 'Mechanism Design',
                description: 'Designing systems for strategic agents',
                difficulty: 'advanced',
                duration: 120,
                tags: ['mechanism design', 'incentives', 'auctions', 'voting']
              }
            ]
          }
        ]
      },
      {
        id: 'reinforcement-learning',
        title: 'Reinforcement Learning',
        description: 'Learning through interaction',
        topics: [
          {
            id: 'rl-basics',
            title: 'RL Basics',
            description: 'Fundamentals of reinforcement learning',
            lessons: [
              {
                id: 'markov-decision-processes',
                title: 'Markov Decision Processes',
                description: 'MDPs and the Bellman equation',
                difficulty: 'intermediate',
                duration: 90,
                tags: ['mdp', 'bellman equation', 'states', 'actions']
              },
              {
                id: 'q-learning',
                title: 'Q-Learning',
                description: 'Value-based reinforcement learning',
                difficulty: 'intermediate',
                duration: 105,
                tags: ['q-learning', 'value function', 'temporal difference']
              },
              {
                id: 'policy-gradient',
                title: 'Policy Gradient Methods',
                description: 'Policy-based reinforcement learning',
                difficulty: 'advanced',
                duration: 120,
                tags: ['policy gradient', 'actor-critic', 'reinforce']
              }
            ]
          },
          {
            id: 'deep-rl',
            title: 'Deep Reinforcement Learning',
            description: 'Combining deep learning with RL',
            lessons: [
              {
                id: 'dqn',
                title: 'Deep Q-Networks',
                description: 'DQN and its variants',
                difficulty: 'advanced',
                duration: 135,
                tags: ['dqn', 'deep q-learning', 'experience replay', 'target networks']
              },
              {
                id: 'ppo',
                title: 'Proximal Policy Optimization',
                description: 'PPO algorithm and implementation',
                difficulty: 'advanced',
                duration: 120,
                tags: ['ppo', 'policy optimization', 'clipping', 'surrogate']
              }
            ]
          }
        ]
      }
    ]
  }
};

export const getRoadmapCategories = () => {
  return Object.keys(roadmapData).map(key => ({
    id: key,
    ...roadmapData[key]
  }));
};

export const getRoadmapByCategory = (categoryId) => {
  return roadmapData[categoryId];
};

export const getAllLessons = () => {
  const lessons = [];
  
  Object.entries(roadmapData).forEach(([categoryId, category]) => {
    category.categories.forEach(subCategory => {
      subCategory.topics.forEach(topic => {
        topic.lessons.forEach(lesson => {
          lessons.push({
            ...lesson,
            category: categoryId,
            subCategory: subCategory.id,
            topic: topic.id
          });
        });
      });
    });
  });
  
  return lessons;
};

export const searchLessons = (query) => {
  const allLessons = getAllLessons();
  const searchTerms = query.toLowerCase().split(' ');
  
  return allLessons.filter(lesson => {
    const searchableText = [
      lesson.title,
      lesson.description,
      lesson.category,
      ...lesson.tags
    ].join(' ').toLowerCase();
    
    return searchTerms.every(term => searchableText.includes(term));
  });
}; 