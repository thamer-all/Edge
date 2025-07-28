// Comprehensive lesson data for all categories and subcategories
export const lessonData = {
  // FOUNDATIONAL MATHEMATICS
  'linear-algebra': {
    'intro-lesson': {
      title: 'Introduction to Linear Algebra',
      description: 'Master vectors, matrices, and the fundamental operations that power AI algorithms',
      duration: '50 min',
      difficulty: 'Beginner',
      progress: 75,
      learningObjectives: [
        'Understand vectors and vector operations',
        'Master matrix multiplication and properties', 
        'Learn eigenvalues and eigenvectors',
        'Apply linear algebra to AI problems'
      ],
      prerequisites: ['Basic Mathematics', 'High School Algebra'],
      sections: [
        {
          id: 'vectors-intro',
          title: 'Introduction to Vectors',
          duration: '12 min',
          type: 'content',
          completed: true,
          content: {
            text: `Vectors are fundamental building blocks in AI and machine learning. Think of a vector as a list of numbers that can represent anything from pixel values in an image to features in a dataset.

## What is a Vector?

A vector is an ordered list of numbers. In AI, vectors often represent:
- **Image pixels**: [255, 128, 64] could represent RGB values
- **Word embeddings**: [0.2, -0.5, 0.8] represents word meaning
- **Feature vectors**: [age, income, score] for predictions

## Vector Operations

**Addition**: Combine vectors element-wise
**Scalar Multiplication**: Scale all elements by a number  
**Dot Product**: Measure similarity between vectors

## Why Vectors Matter in AI

Every piece of data in machine learning becomes a vector. Images, text, audio - everything gets converted to numbers that algorithms can process.`,
            keyPoints: [
              'Vectors are ordered lists of numbers',
              'They represent data in machine learning',
              'Vector operations are fundamental to AI algorithms',
              'Dot products measure similarity between data points'
            ],
            realWorldExamples: [
              {
                title: 'Image Recognition',
                description: 'Each pixel becomes a number in a vector representing the image',
                industry: 'Computer Vision'
              },
              {
                title: 'Recommendation Systems', 
                description: 'User preferences stored as vectors to find similar users',
                industry: 'E-commerce'
              },
              {
                title: 'Natural Language Processing',
                description: 'Words converted to vectors that capture semantic meaning',
                industry: 'Technology'
              }
            ]
          }
        },
        {
          id: 'matrices-operations',
          title: 'Matrices and Operations',
          duration: '18 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `Matrices are 2D arrays of numbers that represent transformations and relationships. In AI, matrices are everywhere - from neural network weights to data transformations.

## Matrix Fundamentals

A matrix is a rectangular array of numbers arranged in rows and columns:

\`\`\`
A = [1  2  3]
    [4  5  6]
    [7  8  9]
\`\`\`

## Key Matrix Operations

**Matrix Multiplication**: Combining transformations
**Transpose**: Flipping rows and columns
**Inverse**: Undoing a transformation
**Determinant**: Measuring transformation magnitude`,
            comparison: [
              {
                aspect: 'Addition',
                matrix: 'Element-wise addition',
                vector: 'Element-wise addition',
                difference: 'Same operation, different dimensions'
              },
              {
                aspect: 'Multiplication',
                matrix: 'Complex row-column operations',
                vector: 'Dot product or element-wise',
                difference: 'Matrix multiplication is more complex'
              }
            ],
            keyTakeaways: [
              'Matrices represent linear transformations',
              'Matrix multiplication is not commutative',
              'Identity matrix leaves vectors unchanged',
              'Inverse matrix undoes a transformation'
            ]
          }
        },
        {
          id: 'eigenvalues-eigenvectors',
          title: 'Eigenvalues and Eigenvectors',
          duration: '20 min',
          type: 'content',
          completed: false,
          content: {
            text: `Eigenvalues and eigenvectors are special properties of matrices that have significant applications in AI, particularly in dimensionality reduction and feature extraction.

## What are Eigenvalues and Eigenvectors?

An eigenvector of a matrix is a non-zero vector that, when multiplied by the matrix, results in a scaled version of the original eigenvector. The scaling factor is the eigenvalue.

**Av = λv**

Where:
- **A** is the matrix
- **v** is the eigenvector
- **λ** is the eigenvalue

## Why They Matter in AI

Eigenvalues and eigenvectors are used in:
- **Principal Component Analysis (PCA)**: For dimensionality reduction
- **Facial Recognition**: Eigenfaces are eigenvectors of face images
- **Graph Analysis**: Understanding network structures`,
            keyPoints: [
              'Eigenvectors are vectors that are only scaled by a matrix transformation',
              'Eigenvalues are the scaling factors for eigenvectors',
              'They reveal the underlying structure of a matrix',
              'Used in PCA for dimensionality reduction'
            ],
            realWorldExamples: [
              {
                title: 'Principal Component Analysis (PCA)',
                description: 'Eigenvectors of the covariance matrix are the principal components',
                industry: 'Data Science'
              },
              {
                title: 'Facial Recognition',
                description: 'Eigenfaces are used to represent and recognize faces',
                industry: 'Computer Vision'
              }
            ]
          }
        },
        {
          id: 'advanced-matrix-operations',
          title: 'Advanced Matrix Operations',
          duration: '25 min',
          type: 'content',
          completed: false,
          content: {
            text: `Advanced matrix operations form the backbone of many AI algorithms. Understanding decompositions, transformations, and special matrices is crucial for deeper AI applications.

## Matrix Decompositions

**Singular Value Decomposition (SVD)**
SVD breaks down any matrix into three simpler matrices: A = UΣV^T

**LU Decomposition**
Decomposes a matrix into Lower and Upper triangular matrices for efficient solving.

**QR Decomposition**
Breaks a matrix into an orthogonal matrix Q and an upper triangular matrix R.

## Special Matrices in AI

**Covariance Matrices**: Measure relationships between variables
**Gram Matrices**: Used in kernel methods and SVMs
**Adjacency Matrices**: Represent graph structures in neural networks

## Applications in Deep Learning

- **Weight Initialization**: Using orthogonal matrices for stable training
- **Regularization**: Matrix norms for preventing overfitting
- **Attention Mechanisms**: Query, Key, Value matrix operations in transformers`,
            keyPoints: [
              'SVD is fundamental to dimensionality reduction techniques',
              'Matrix decompositions enable efficient computation',
              'Special matrices have specific AI applications',
              'Matrix operations are optimized in modern AI frameworks'
            ],
            realWorldExamples: [
              {
                title: 'Recommendation Systems',
                description: 'SVD and matrix factorization for collaborative filtering',
                industry: 'E-commerce'
              },
              {
                title: 'Image Compression',
                description: 'SVD for lossy image compression while preserving quality',
                industry: 'Computer Vision'
              },
              {
                title: 'Natural Language Processing',
                description: 'Matrix operations in transformer attention mechanisms',
                industry: 'NLP'
              }
            ]
          }
        },
        {
          id: 'linear-algebra-quiz',
          title: 'Linear Algebra Knowledge Check',
          duration: '15 min',
          type: 'quiz',
          completed: false,
          quiz: {
            questions: [
              {
                id: 'vector-operation',
                question: 'What is the dot product of vectors [2, 3, 1] and [1, 4, 2]?',
                options: ['14', '16', '18', '12'],
                correct: 1,
                explanation: 'Dot product = (2×1) + (3×4) + (1×2) = 2 + 12 + 2 = 16'
              },
              {
                id: 'matrix-multiplication',
                question: 'Which property does NOT hold for matrix multiplication?',
                options: ['Associative', 'Commutative', 'Distributive', 'Compatible with scalar multiplication'],
                correct: 1,
                explanation: 'Matrix multiplication is NOT commutative: AB ≠ BA in general'
              },
              {
                id: 'eigenvalues-application',
                question: 'Eigenvalues and eigenvectors are primarily used in which AI technique?',
                options: ['Principal Component Analysis', 'Gradient Descent', 'Backpropagation', 'Cross-validation'],
                correct: 0,
                explanation: 'PCA uses eigenvalues and eigenvectors of the covariance matrix to find principal components'
              }
            ]
          }
        }
      ]
    }
  },
  'calculus-optimization': {
    'intro-lesson': {
      title: 'Calculus & Optimization for AI',
      description: 'Learn derivatives, gradients, and optimization techniques essential for machine learning',
      duration: '60 min',
      difficulty: 'Intermediate',
      progress: 60,
      learningObjectives: [
        'Understand derivatives and gradients',
        'Master gradient descent optimization',
        'Learn chain rule and backpropagation',
        'Apply calculus to neural network training'
      ],
      prerequisites: ['Linear Algebra', 'Basic Calculus'],
      sections: [
        {
          id: 'derivatives-basics',
          title: 'Derivatives and Gradients',
          duration: '15 min',
          type: 'content',
          completed: true,
          content: {
            text: `Calculus is the mathematical foundation of optimization in machine learning. Understanding derivatives and gradients is crucial for training neural networks and optimizing models.

## What are Derivatives?

A derivative measures how a function changes as its input changes. In machine learning, we use derivatives to:
- Find the direction of steepest ascent/descent
- Optimize loss functions
- Train neural networks efficiently

## Gradients

A gradient is a vector of partial derivatives. It points in the direction of steepest increase of a function.

## Why This Matters for AI

Every optimization algorithm in machine learning relies on gradients to find the best parameters for our models.`,
            keyPoints: [
              'Derivatives measure rate of change',
              'Gradients point toward steepest ascent',
              'Negative gradients point toward steepest descent',
              'Gradient descent uses gradients to minimize loss'
            ],
            realWorldExamples: [
              {
                title: 'Neural Network Training',
                description: 'Gradients guide weight updates during backpropagation',
                industry: 'Deep Learning'
              },
              {
                title: 'Loss Function Optimization',
                description: 'Finding minimum of loss function using gradient descent',
                industry: 'Machine Learning'
              }
            ]
          }
        },
        {
          id: 'gradient-descent',
          title: 'Gradient Descent',
          duration: '25 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `Gradient descent is the most common optimization algorithm in machine learning. It's an iterative method used to find the minimum of a function.

## How it Works

1.  **Initialize**: Start with random values for the model parameters.
2.  **Calculate Gradient**: Compute the gradient of the loss function with respect to the parameters.
3.  **Update Parameters**: Move the parameters in the opposite direction of the gradient.
4.  **Repeat**: Continue until the loss is minimized.

## Learning Rate

The learning rate is a hyperparameter that controls how much we adjust the parameters in each step. A small learning rate can be slow, while a large learning rate can overshoot the minimum.`,
            comparison: [
              {
                aspect: 'Batch Gradient Descent',
                optionA: 'Uses the entire dataset for each update',
                optionB: 'Slow for large datasets',
                difference: 'Computationally expensive'
              },
              {
                aspect: 'Stochastic Gradient Descent (SGD)',
                optionA: 'Uses a single data point for each update',
                optionB: 'Faster but more noisy updates',
                difference: 'Can escape local minima'
              },
              {
                aspect: 'Mini-batch Gradient Descent',
                optionA: 'Uses a small batch of data for each update',
                optionB: 'Best of both worlds',
                difference: 'Most common approach'
              }
            ],
            keyTakeaways: [
              'Gradient descent minimizes a function iteratively',
              'The learning rate is a crucial hyperparameter',
              'Different variants of gradient descent trade off speed and accuracy'
            ]
          }
        },
        {
          id: 'backpropagation',
          title: 'Backpropagation',
          duration: '20 min',
          type: 'content',
          completed: false,
          content: {
            text: `Backpropagation is the algorithm used to train neural networks. It's an efficient way to compute the gradients of the loss function with respect to the network's weights.

## How it Works

Backpropagation uses the chain rule of calculus to propagate the error from the output layer back to the input layer. This allows us to calculate the gradient for each weight in the network.

1.  **Forward Pass**: Input data is fed through the network to compute the output and the loss.
2.  **Backward Pass**: The gradient of the loss is computed with respect to the output layer's weights.
3.  **Propagate Gradients**: The gradients are propagated backward through the network, layer by layer.
4.  **Update Weights**: The weights are updated using gradient descent.

## Why it's Important

Backpropagation is the cornerstone of modern deep learning. It allows us to train deep neural networks with millions of parameters efficiently.`,
            keyPoints: [
              'Backpropagation is used to train neural networks',
              'It uses the chain rule to compute gradients',
              'It consists of a forward pass and a backward pass',
              'It enables the training of deep neural networks'
            ],
            realWorldExamples: [
              {
                title: 'Training Deep Neural Networks',
                description: 'Backpropagation is used to train all modern deep learning models',
                industry: 'Deep Learning'
              }
            ]
          }
        }
      ]
    }
  },
  'probability-statistics': {
    'intro-lesson': {
      title: 'Probability & Statistics for AI',
      description: 'Master probability theory and statistical inference for machine learning',
      duration: '55 min',
      difficulty: 'Intermediate',
      progress: 40,
      learningObjectives: [
        'Understand probability distributions',
        'Master Bayes theorem and inference',
        'Learn hypothesis testing',
        'Apply statistics to model evaluation'
      ],
      prerequisites: ['Basic Mathematics', 'Linear Algebra'],
      sections: [
        {
          id: 'probability-basics',
          title: 'Probability Fundamentals',
          duration: '20 min',
          type: 'content',
          completed: true,
          content: {
            text: `Probability and statistics form the foundation for understanding uncertainty in AI systems. From model predictions to data analysis, these concepts are essential.

## Probability Basics

Probability measures the likelihood of events occurring. In AI, we use probability to:
- Model uncertainty in predictions
- Make decisions under uncertainty
- Evaluate model performance
- Understand data distributions

## Key Concepts

**Random Variables**: Variables that can take different values with certain probabilities
**Probability Distributions**: Functions that describe the probability of different outcomes
**Expected Value**: Average outcome over many trials
**Variance**: Measure of spread around the expected value`,
            keyPoints: [
              'Probability measures uncertainty',
              'Random variables model uncertain outcomes',
              'Distributions describe probability patterns',
              'Statistics help us make inferences from data'
            ],
            realWorldExamples: [
              {
                title: 'Predictive Modeling',
                description: 'Models output probability distributions for predictions',
                industry: 'Data Science'
              },
              {
                title: 'A/B Testing',
                description: 'Statistical testing to evaluate model performance',
                industry: 'Technology'
              }
            ]
          }
        },
        {
          id: 'bayes-theorem',
          title: 'Bayes\' Theorem',
          duration: '20 min',
          type: 'content',
          completed: false,
          content: {
            text: `Bayes' theorem is a fundamental concept in probability theory and a cornerstone of Bayesian statistics. It describes the probability of an event based on prior knowledge of conditions that might be related to the event.

## The Formula

**P(A|B) = (P(B|A) * P(A)) / P(B)**

Where:
- **P(A|B)** is the posterior probability: the probability of A given B.
- **P(B|A)** is the likelihood: the probability of B given A.
- **P(A)** is the prior probability: the initial probability of A.
- **P(B)** is the marginal likelihood: the probability of B.

## Why it's Important in AI

Bayes' theorem is used in many AI applications, including:
- **Spam filtering**: Classifying emails as spam or not spam.
- **Medical diagnosis**: Diagnosing diseases based on symptoms.
- **Document classification**: Categorizing documents based on their content.`,
            keyPoints: [
              'Bayes\' theorem updates our beliefs based on new evidence',
              'It combines prior knowledge with observed data',
              'It\'s the foundation of Bayesian machine learning'
            ],
            realWorldExamples: [
              {
                title: 'Spam Filtering',
                description: 'Bayesian filters use Bayes\' theorem to identify spam emails',
                industry: 'Email Providers'
              },
              {
                title: 'Medical Diagnosis',
                description: 'Bayesian networks are used to diagnose diseases based on symptoms and test results',
                industry: 'Healthcare'
              }
            ]
          }
        },
        {
          id: 'hypothesis-testing',
          title: 'Hypothesis Testing',
          duration: '15 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `Hypothesis testing is a statistical method used to make decisions or draw conclusions about a population based on a sample of data.

## The Process

1.  **State the Hypotheses**: Define the null hypothesis (H0) and the alternative hypothesis (H1).
2.  **Set the Significance Level**: Choose a significance level (alpha), typically 0.05.
3.  **Calculate the Test Statistic**: Compute a test statistic based on the sample data.
4.  **Make a Decision**: Compare the p-value to the significance level to decide whether to reject the null hypothesis.

## Why it's Important in AI

Hypothesis testing is used to:
- **Evaluate model performance**: Determine if a new model is significantly better than an old one.
- **Feature selection**: Test the significance of different features.
- **A/B testing**: Compare the effectiveness of different versions of a product.`,
            comparison: [
              {
                aspect: 'Null Hypothesis (H0)',
                optionA: 'There is no effect or difference',
                optionB: 'The default assumption',
                difference: 'What we try to disprove'
              },
              {
                aspect: 'Alternative Hypothesis (H1)',
                optionA: 'There is an effect or difference',
                optionB: 'What we want to prove',
                difference: 'The opposite of the null hypothesis'
              }
            ],
            keyTakeaways: [
              'Hypothesis testing is a formal procedure for making statistical decisions',
              'The p-value is the probability of observing the data if the null hypothesis is true',
              'A small p-value provides evidence against the null hypothesis'
            ]
          }
        }
      ]
    }
  },
  // PROGRAMMING & COMPUTER SCIENCE
  'python-programming': {
    'intro-lesson': {
      title: 'Python Programming for AI',
      description: 'Master Python fundamentals and essential libraries for AI development',
      duration: '70 min',
      difficulty: 'Beginner',
      progress: 80,
      learningObjectives: [
        'Learn Python syntax and data structures',
        'Master NumPy and Pandas for data manipulation',
        'Understand Matplotlib for visualization',
        'Apply Python to AI/ML projects'
      ],
      prerequisites: ['Basic Programming Concepts'],
      sections: [
        {
          id: 'python-basics',
          title: 'Python Fundamentals',
          duration: '25 min',
          type: 'content',
          completed: true,
          content: {
            text: `Python is the most popular programming language for AI and machine learning. Its simplicity, extensive libraries, and strong community make it ideal for AI development.

## Why Python for AI?

Python excels in AI development because:
- **Readable syntax**: Easy to understand and maintain
- **Rich ecosystem**: Extensive libraries for AI/ML
- **Strong community**: Large, active developer community
- **Rapid prototyping**: Quick to develop and test ideas

## Essential Libraries

**NumPy**: Numerical computing and array operations
**Pandas**: Data manipulation and analysis
**Matplotlib**: Data visualization
**Scikit-learn**: Machine learning algorithms

## Getting Started

Python's simple syntax makes it perfect for beginners while being powerful enough for complex AI applications.`,
            keyPoints: [
              'Python is the dominant language for AI',
              'NumPy provides efficient array operations',
              'Pandas excels at data manipulation',
              'Matplotlib creates professional visualizations'
            ],
            realWorldExamples: [
              {
                title: 'Data Analysis',
                description: 'Pandas for cleaning and analyzing datasets',
                industry: 'Data Science'
              },
              {
                title: 'Machine Learning',
                description: 'Scikit-learn for building ML models',
                industry: 'Technology'
              },
              {
                title: 'Deep Learning',
                description: 'TensorFlow/PyTorch for neural networks',
                industry: 'AI Research'
              }
            ]
          }
        },
        {
          id: 'numpy-pandas',
          title: 'NumPy and Pandas',
          duration: '25 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `NumPy and Pandas are the two most important Python libraries for data science and machine learning.

## NumPy

NumPy (Numerical Python) is the fundamental package for numerical computation in Python. It provides a powerful N-dimensional array object and a collection of functions for working with arrays.

## Pandas

Pandas is a library for data manipulation and analysis. It provides two main data structures: Series (1-dimensional) and DataFrame (2-dimensional). Pandas makes it easy to read, write, and manipulate data from various sources.`,
            comparison: [
              {
                aspect: 'Data Structure',
                optionA: 'NumPy: ndarray',
                optionB: 'Pandas: Series, DataFrame',
                difference: 'Pandas is built on top of NumPy'
              },
              {
                aspect: 'Use Case',
                optionA: 'NumPy: Numerical operations, linear algebra',
                optionB: 'Pandas: Data cleaning, analysis, and manipulation',
                difference: 'Pandas is for structured data'
              }
            ],
            keyTakeaways: [
              'NumPy is for numerical computation',
              'Pandas is for data manipulation and analysis',
              'Both libraries are essential for data science in Python'
            ]
          }
        },
        {
          id: 'matplotlib-seaborn',
          title: 'Matplotlib and Seaborn',
          duration: '20 min',
          type: 'content',
          completed: false,
          content: {
            text: `Matplotlib and Seaborn are two of the most popular Python libraries for data visualization.

## Matplotlib

Matplotlib is a low-level plotting library that provides a great deal of flexibility and control over the appearance of plots. It's the foundation for many other plotting libraries in Python.

## Seaborn

Seaborn is a high-level plotting library that is built on top of Matplotlib. It provides a more attractive and informative statistical plots. Seaborn makes it easier to create common types of plots, such as heatmaps, violin plots, and pair plots.`,
            keyPoints: [
              'Matplotlib is a flexible, low-level plotting library',
              'Seaborn is a high-level library for statistical plots',
              'Seaborn is built on top of Matplotlib',
              'Both are essential for data visualization in Python'
            ],
            realWorldExamples: [
              {
                title: 'Exploratory Data Analysis (EDA)',
                description: 'Using Matplotlib and Seaborn to visualize data and uncover insights',
                industry: 'Data Science'
              },
              {
                title: 'Model Evaluation',
                description: 'Plotting confusion matrices, ROC curves, and other evaluation metrics',
                industry: 'Machine Learning'
              }
            ]
          }
        }
      ]
    }
  },
  // MACHINE LEARNING
  'machine-learning': {
    'intro-lesson': {
      title: 'Introduction to Machine Learning',
      description: 'Learn the fundamentals of machine learning algorithms and their applications',
      duration: '90 min',
      difficulty: 'Intermediate',
      progress: 75,
      learningObjectives: [
        'Understand supervised vs unsupervised learning',
        'Master key ML algorithms (Linear Regression, Classification)',
        'Learn model evaluation and validation techniques',
        'Apply ML to real-world problems'
      ],
      prerequisites: ['Python Programming', 'Statistics & Probability'],
      sections: [
        {
          id: 'ml-overview',
          title: 'Machine Learning Overview',
          duration: '30 min',
          type: 'content',
          completed: true,
          content: {
            text: `Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions without being explicitly programmed.

## Types of Machine Learning

### Supervised Learning
- **Classification**: Predicting categories (spam/not spam, disease/no disease)
- **Regression**: Predicting continuous values (house prices, stock prices)

### Unsupervised Learning
- **Clustering**: Grouping similar data points (customer segmentation)
- **Dimensionality Reduction**: Reducing data complexity (PCA)

### Reinforcement Learning
- **Learning through interaction**: Agents learn by taking actions and receiving rewards

## The ML Workflow

1. **Data Collection**: Gather relevant data
2. **Data Preprocessing**: Clean and prepare data
3. **Feature Engineering**: Create meaningful features
4. **Model Selection**: Choose appropriate algorithm
5. **Training**: Fit model to data
6. **Evaluation**: Assess model performance
7. **Deployment**: Use model for predictions`,
            keyPoints: [
              'ML enables computers to learn from data',
              'Three main types: Supervised, Unsupervised, Reinforcement',
              'The ML workflow is iterative and systematic',
              'Feature engineering is crucial for model performance'
            ],
            realWorldExamples: [
              {
                title: 'Recommendation Systems',
                description: 'Netflix, Amazon use ML to suggest content/products',
                industry: 'E-commerce'
              },
              {
                title: 'Medical Diagnosis',
                description: 'ML models help doctors diagnose diseases from medical images',
                industry: 'Healthcare'
              },
              {
                title: 'Autonomous Vehicles',
                description: 'Self-driving cars use ML for perception and decision-making',
                industry: 'Transportation'
              }
            ]
          }
        },
        {
          id: 'linear-regression',
          title: 'Linear Regression',
          duration: '30 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `Linear Regression is the foundation of supervised learning and one of the most widely used algorithms in machine learning.

## What is Linear Regression?

Linear Regression models the relationship between a dependent variable (target) and one or more independent variables (features) using a linear function.

## The Linear Model

**y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε**

Where:
- **y**: Target variable
- **β₀**: Intercept (bias)
- **βᵢ**: Coefficients for each feature
- **xᵢ**: Feature values
- **ε**: Error term

## Key Concepts

### Loss Function
Mean Squared Error (MSE) measures prediction accuracy:
**MSE = (1/n) Σ(yᵢ - ŷᵢ)²**

### Gradient Descent
An optimization algorithm to find the best coefficients by minimizing the loss function.

### R-squared (R²)
Measures how well the model explains the variance in the target variable.`,
            comparison: [
              {
                aspect: 'Simple Linear Regression',
                optionA: 'One feature variable',
                optionB: 'y = β₀ + β₁x',
                difference: 'Easier to visualize and understand'
              },
              {
                aspect: 'Multiple Linear Regression',
                optionA: 'Multiple feature variables',
                optionB: 'y = β₀ + β₁x₁ + β₂x₂ + ...',
                difference: 'More complex but more powerful'
              }
            ],
            keyTakeaways: [
              'Linear Regression assumes a linear relationship between features and target',
              'Gradient Descent is used to optimize model parameters',
              'R-squared measures model performance (0 to 1)',
              'Feature scaling improves convergence and performance'
            ]
          }
        },
        {
          id: 'classification',
          title: 'Classification Algorithms',
          duration: '30 min',
          type: 'quiz',
          completed: false,
          content: {
            text: `Classification is a supervised learning task where the goal is to predict categorical labels for new data points.

## Types of Classification

### Binary Classification
- Two possible outcomes (0/1, Yes/No, Spam/Not Spam)
- Examples: Email spam detection, disease diagnosis

### Multi-class Classification
- More than two possible outcomes
- Examples: Image classification, sentiment analysis

## Popular Classification Algorithms

### Logistic Regression
- Uses sigmoid function to output probabilities
- Good baseline for binary classification
- Interpretable and fast

### Decision Trees
- Tree-like structure for decision making
- Easy to understand and visualize
- Can handle non-linear relationships

### Random Forest
- Ensemble of decision trees
- Reduces overfitting
- Good for feature importance

### Support Vector Machines (SVM)
- Finds optimal hyperplane to separate classes
- Effective in high-dimensional spaces
- Good for small to medium datasets

### Neural Networks
- Deep learning approach
- Can learn complex patterns
- Requires more data and computation`,
            quiz: [
              {
                question: 'Which algorithm is best for binary classification with interpretable results?',
                options: [
                  'Random Forest',
                  'Logistic Regression',
                  'Neural Network',
                  'Support Vector Machine'
                ],
                correctAnswer: 1,
                explanation: 'Logistic Regression provides interpretable coefficients and is excellent for binary classification tasks.'
              },
              {
                question: 'What is the main advantage of Random Forest over single Decision Trees?',
                options: [
                  'Faster training time',
                  'Better interpretability',
                  'Reduced overfitting',
                  'Lower memory usage'
                ],
                correctAnswer: 2,
                explanation: 'Random Forest reduces overfitting by averaging predictions from multiple trees.'
              },
              {
                question: 'Which metric is most appropriate for imbalanced classification datasets?',
                options: [
                  'Accuracy',
                  'Precision',
                  'F1-Score',
                  'R-squared'
                ],
                correctAnswer: 2,
                explanation: 'F1-Score balances precision and recall, making it suitable for imbalanced datasets.'
              }
            ]
          }
        }
      ]
    }
  },
  // COMPUTER VISION
  'computer-vision': {
    'intro-lesson': {
      title: 'Computer Vision Fundamentals',
      description: 'Master image processing, feature extraction, and deep learning for computer vision',
      duration: '90 min',
      difficulty: 'Intermediate',
      progress: 0,
      learningObjectives: [
        'Understand image representation and processing',
        'Learn feature extraction techniques',
        'Master convolutional neural networks (CNNs)',
        'Apply computer vision to real-world problems'
      ],
      prerequisites: ['Deep Learning', 'Linear Algebra', 'Python Programming'],
      sections: [
        {
          id: 'image-basics',
          title: 'Digital Image Fundamentals',
          duration: '20 min',
          type: 'content',
          completed: false,
          content: {
            text: `Computer Vision enables machines to interpret and understand visual information from the world. Let's start with the basics of how computers "see" images.

## Digital Image Representation

**Pixels and Arrays**
- Images are represented as multi-dimensional arrays
- Grayscale: 2D array (height × width)
- Color (RGB): 3D array (height × width × 3 channels)
- Each pixel value represents intensity (0-255 for 8-bit images)

**Color Spaces**
- **RGB**: Red, Green, Blue - additive color model
- **HSV**: Hue, Saturation, Value - intuitive for human perception
- **LAB**: Lightness, A (green-red), B (blue-yellow) - perceptually uniform

## Image Operations

**Filtering and Convolution**
- Convolution applies filters to detect features
- Common filters: edge detection, blurring, sharpening
- Kernels define the operation (3×3, 5×5 matrices)

**Morphological Operations**
- Erosion and dilation for shape analysis
- Opening and closing for noise reduction
- Useful for binary image processing`,
            keyPoints: [
              'Images are numerical arrays that computers can process',
              'Different color spaces serve different purposes',
              'Convolution is fundamental to feature detection',
              'Preprocessing improves algorithm performance'
            ],
            realWorldExamples: [
              {
                title: 'Medical Imaging',
                description: 'X-ray and MRI analysis for disease detection',
                industry: 'Healthcare'
              },
              {
                title: 'Autonomous Vehicles',
                description: 'Real-time object detection and lane recognition',
                industry: 'Automotive'
              },
              {
                title: 'Quality Control',
                description: 'Automated defect detection in manufacturing',
                industry: 'Manufacturing'
              }
            ]
          }
        },
        {
          id: 'feature-extraction',
          title: 'Feature Extraction & Detection',
          duration: '25 min',
          type: 'content',
          completed: false,
          content: {
            text: `Feature extraction identifies distinctive patterns in images that can be used for recognition, matching, and analysis.

## Traditional Feature Detectors

**Edge Detection**
- Sobel, Canny, Prewitt operators
- Detect boundaries between different regions
- Foundation for shape recognition

**Corner Detection**
- Harris corner detector
- Shi-Tomasi method
- Important for object tracking and 3D reconstruction

**Keypoint Descriptors**
- **SIFT** (Scale-Invariant Feature Transform)
- **SURF** (Speeded-Up Robust Features)
- **ORB** (Oriented FAST and Rotated BRIEF)

## Modern Deep Learning Features

**Convolutional Features**
- Automatically learned through training
- Hierarchical feature representation
- More robust than hand-crafted features

**Transfer Learning**
- Use pre-trained CNN features
- Fine-tune for specific tasks
- Reduces training time and data requirements`,
            keyPoints: [
              'Traditional methods use hand-crafted features',
              'Deep learning automatically learns optimal features',
              'Different features are suitable for different tasks',
              'Transfer learning leverages existing knowledge'
            ],
            realWorldExamples: [
              {
                title: 'Face Recognition',
                description: 'SIFT features for facial landmark detection',
                industry: 'Security'
              },
              {
                title: 'Augmented Reality',
                description: 'Feature matching for object tracking',
                industry: 'Entertainment'
              }
            ]
          }
        },
        {
          id: 'cnn-architecture',
          title: 'Convolutional Neural Networks',
          duration: '30 min',
          type: 'content',
          completed: false,
          content: {
            text: `CNNs are the backbone of modern computer vision, designed specifically to process grid-like data such as images.

## CNN Architecture Components

**Convolutional Layers**
- Apply learnable filters to detect features
- Preserve spatial relationships in images
- Parameters: filter size, stride, padding

**Pooling Layers**
- Reduce spatial dimensions
- Max pooling: takes maximum value in region
- Average pooling: takes average value
- Provides translation invariance

**Fully Connected Layers**
- Traditional neural network layers
- Usually at the end for classification
- Flatten spatial features to vectors

## Popular CNN Architectures

**LeNet-5 (1998)**
- First successful CNN for digit recognition
- Simple architecture: Conv → Pool → Conv → Pool → FC

**AlexNet (2012)**
- Won ImageNet competition
- Introduced ReLU activation and dropout
- Deeper network with 8 layers

**VGG (2014)**
- Very deep networks (16-19 layers)
- Small 3×3 filters throughout
- Demonstrated importance of depth

**ResNet (2015)**
- Introduced skip connections
- Solved vanishing gradient problem
- Enabled training of very deep networks (152+ layers)

**Modern Architectures**
- **Inception**: Multi-scale feature extraction
- **EfficientNet**: Balanced scaling of depth, width, resolution
- **Vision Transformers**: Self-attention for images`,
            keyPoints: [
              'CNNs preserve spatial structure of images',
              'Hierarchical feature learning from simple to complex',
              'Architecture design greatly impacts performance',
              'Skip connections enable training deeper networks'
            ],
            realWorldExamples: [
              {
                title: 'ImageNet Classification',
                description: 'ResNet achieves human-level accuracy on 1000 classes',
                industry: 'Research'
              },
              {
                title: 'Medical Diagnosis',
                description: 'CNN models detect skin cancer from dermoscopy images',
                industry: 'Healthcare'
              }
            ]
          }
        },
        {
          id: 'cv-applications',
          title: 'Computer Vision Applications',
          duration: '15 min',
          type: 'content',
          completed: false,
          content: {
            text: `Computer vision has transformed numerous industries through practical applications that solve real-world problems.

## Object Detection & Recognition

**Object Classification**
- Identifying what objects are present in images
- Single object per image classification
- Applications: content filtering, medical diagnosis

**Object Detection**
- Locating and classifying multiple objects
- Bounding box regression + classification
- Popular models: YOLO, R-CNN, SSD

**Instance Segmentation**
- Pixel-level object identification
- Combines detection and segmentation
- Useful for precise object boundaries

## Advanced Applications

**Facial Recognition**
- Identity verification and authentication
- Emotion recognition and analysis
- Privacy and ethical considerations

**Optical Character Recognition (OCR)**
- Converting images of text to machine-readable text
- Document digitization and processing
- Real-time text translation

**Autonomous Systems**
- Self-driving cars and navigation
- Drone path planning and obstacle avoidance
- Robot vision and manipulation

## Industry Impact

**Healthcare**: Medical imaging, drug discovery, surgical assistance
**Retail**: Visual search, inventory management, customer analytics
**Agriculture**: Crop monitoring, yield prediction, automated harvesting
**Entertainment**: Special effects, content creation, gaming`,
            keyPoints: [
              'CV applications span virtually every industry',
              'Different tasks require different architectural approaches',
              'Real-world deployment requires consideration of edge cases',
              'Ethical implications must be carefully considered'
            ],
            realWorldExamples: [
              {
                title: 'Tesla Autopilot',
                description: 'Multi-camera system for autonomous driving',
                industry: 'Automotive'
              },
              {
                title: 'Google Photos',
                description: 'Automatic photo organization and search',
                industry: 'Technology'
              },
              {
                title: 'Amazon Go',
                description: 'Cashier-less shopping with computer vision',
                industry: 'Retail'
              }
            ]
          }
        }
      ]
    }
  },
  // NATURAL LANGUAGE PROCESSING
  'natural-language-processing': {
    'intro-lesson': {
      title: 'Natural Language Processing Fundamentals',
      description: 'Master text processing, language models, and NLP applications',
      duration: '100 min',
      difficulty: 'Intermediate',
      progress: 0,
      learningObjectives: [
        'Understand text preprocessing and tokenization',
        'Learn word embeddings and language representations',
        'Master transformer architecture and attention mechanisms',
        'Apply NLP to real-world text processing tasks'
      ],
      prerequisites: ['Machine Learning', 'Deep Learning', 'Python Programming'],
      sections: [
        {
          id: 'text-preprocessing',
          title: 'Text Preprocessing & Tokenization',
          duration: '25 min',
          type: 'content',
          completed: false,
          content: {
            text: `Natural Language Processing enables computers to understand, interpret, and generate human language. The first step is converting raw text into a format machines can process.

## Text Preprocessing Pipeline

**Cleaning and Normalization**
- Remove special characters, HTML tags, URLs
- Convert to lowercase for consistency
- Handle contractions (can't → cannot)
- Normalize whitespace and punctuation

**Tokenization**
- Split text into individual words or subwords
- **Word-level**: Split by spaces and punctuation
- **Subword-level**: Byte Pair Encoding (BPE), WordPiece
- **Character-level**: Individual characters as tokens

**Stop Word Removal**
- Remove common words (the, is, at, which)
- Reduces noise but may lose important context
- Task-dependent decision

**Stemming and Lemmatization**
- **Stemming**: Reduce words to root form (running → run)
- **Lemmatization**: Reduce to dictionary form considering context
- Helps reduce vocabulary size and improve matching

## Advanced Preprocessing

**Named Entity Recognition (NER)**
- Identify and classify named entities (people, places, organizations)
- Preserves important semantic information
- Used for information extraction

**Part-of-Speech (POS) Tagging**
- Assign grammatical categories (noun, verb, adjective)
- Helps understand sentence structure
- Useful for parsing and syntax analysis`,
            keyPoints: [
              'Text must be cleaned and normalized before processing',
              'Tokenization strategy affects model performance',
              'Preprocessing choices depend on the specific task',
              'Modern NLP often uses subword tokenization'
            ],
            realWorldExamples: [
              {
                title: 'Search Engines',
                description: 'Query preprocessing for better search results',
                industry: 'Technology'
              },
              {
                title: 'Social Media Analytics',
                description: 'Sentiment analysis of user posts and comments',
                industry: 'Marketing'
              },
              {
                title: 'Customer Support',
                description: 'Automatic categorization of support tickets',
                industry: 'Customer Service'
              }
            ]
          }
        },
        {
          id: 'word-embeddings',
          title: 'Word Embeddings & Language Representations',
          duration: '30 min',
          type: 'content',
          completed: false,
          content: {
            text: `Word embeddings convert words into dense vector representations that capture semantic meaning and relationships.

## Traditional Approaches

**One-Hot Encoding**
- Binary vectors with single 1 and rest 0s
- Sparse, high-dimensional representation
- No semantic similarity information

**TF-IDF (Term Frequency-Inverse Document Frequency)**
- Weights words by frequency and rarity
- Good for document similarity
- Still sparse representation

## Dense Word Embeddings

**Word2Vec**
- **Skip-gram**: Predict context words from target word
- **CBOW**: Predict target word from context
- Captures semantic relationships (king - man + woman ≈ queen)

**GloVe (Global Vectors)**
- Combines global matrix factorization and local context
- Uses co-occurrence statistics
- Often performs better on analogy tasks

**FastText**
- Extension of Word2Vec with subword information
- Handles out-of-vocabulary words
- Better for morphologically rich languages

## Contextual Embeddings

**ELMo (Embeddings from Language Models)**
- Bidirectional LSTM language model
- Context-dependent word representations
- Same word has different embeddings in different contexts

**BERT (Bidirectional Encoder Representations from Transformers)**
- Transformer-based bidirectional model
- Masked language modeling pre-training
- State-of-the-art performance on many NLP tasks

**GPT Family**
- Generative Pre-trained Transformers
- Autoregressive language modeling
- Excellent for text generation tasks`,
            keyPoints: [
              'Dense embeddings capture semantic relationships',
              'Contextual models understand word meaning in context',
              'Pre-trained embeddings transfer knowledge across tasks',
              'Different embedding methods suit different applications'
            ],
            realWorldExamples: [
              {
                title: 'Machine Translation',
                description: 'Word embeddings help translate between languages',
                industry: 'Technology'
              },
              {
                title: 'Recommendation Systems',
                description: 'Embed user preferences and item descriptions',
                industry: 'E-commerce'
              }
            ]
          }
        },
        {
          id: 'transformer-architecture',
          title: 'Transformer Architecture & Attention',
          duration: '35 min',
          type: 'content',
          completed: false,
          content: {
            text: `Transformers revolutionized NLP by introducing the attention mechanism, enabling parallel processing and better long-range dependencies.

## Attention Mechanism

**Self-Attention**
- Each word attends to all other words in the sequence
- Computes attention weights based on relevance
- Enables modeling of long-range dependencies

**Multi-Head Attention**
- Multiple attention heads capture different types of relationships
- Each head learns different aspect of dependencies
- Results are concatenated and projected

**Scaled Dot-Product Attention**
- Attention(Q,K,V) = softmax(QK^T/√d_k)V
- Q (queries), K (keys), V (values) from input
- Scaling prevents softmax saturation

## Transformer Architecture

**Encoder Stack**
- 6 identical layers in original Transformer
- Each layer: Multi-Head Attention + Feed-Forward Network
- Residual connections and layer normalization

**Decoder Stack**
- 6 identical layers with additional encoder-decoder attention
- Masked self-attention prevents looking ahead
- Used for sequence generation tasks

**Positional Encoding**
- Adds position information to embeddings
- Since attention has no inherent order awareness
- Sine and cosine functions of different frequencies

## Modern Transformer Variants

**BERT (Encoder-only)**
- Bidirectional encoding for understanding tasks
- Masked language modeling pre-training
- Fine-tuned for classification, NER, Q&A

**GPT (Decoder-only)**
- Autoregressive generation
- Next token prediction pre-training
- Excellent for text generation and completion

**T5 (Text-to-Text Transfer Transformer)**
- Treats all NLP tasks as text-to-text
- Unified framework for various tasks
- "Text-to-text" approach simplifies training`,
            keyPoints: [
              'Attention allows models to focus on relevant parts',
              'Transformers enable parallel processing unlike RNNs',
              'Pre-training + fine-tuning is the dominant paradigm',
              'Different architectures suit different task types'
            ],
            realWorldExamples: [
              {
                title: 'ChatGPT/GPT-4',
                description: 'Large language models for conversational AI',
                industry: 'AI Services'
              },
              {
                title: 'Google Search',
                description: 'BERT improves search query understanding',
                industry: 'Search'
              },
              {
                title: 'Microsoft Translator',
                description: 'Transformer models for real-time translation',
                industry: 'Translation'
              }
            ]
          }
        },
        {
          id: 'nlp-applications',
          title: 'NLP Applications & Use Cases',
          duration: '10 min',
          type: 'content',
          completed: false,
          content: {
            text: `NLP has enabled breakthrough applications across industries, from search engines to virtual assistants.

## Core NLP Tasks

**Text Classification**
- Sentiment analysis, spam detection, topic categorization
- Binary, multi-class, or multi-label classification
- Applications: content moderation, customer feedback analysis

**Named Entity Recognition**
- Extract entities like names, locations, organizations
- Critical for information extraction and knowledge graphs
- Used in document processing and search

**Machine Translation**
- Automatic translation between languages
- Neural machine translation with attention mechanisms
- Real-time communication and content localization

**Question Answering**
- Extract answers from text given questions
- Reading comprehension and knowledge retrieval
- Chatbots and virtual assistants

## Advanced Applications

**Text Summarization**
- **Extractive**: Select important sentences from original text
- **Abstractive**: Generate new summary text
- News aggregation, document processing

**Dialogue Systems**
- Task-oriented: booking, customer service
- Open-domain: general conversation
- Combine NLU, dialogue management, and NLG

**Code Generation**
- Generate code from natural language descriptions
- Programming assistance and automation
- Examples: GitHub Copilot, CodeT5

## Emerging Trends

**Large Language Models (LLMs)**
- GPT-3/4, PaLM, ChatGPT
- Few-shot and zero-shot learning capabilities
- Emergent abilities at scale

**Multimodal Models**
- Combine text with images, audio, video
- Vision-language models (CLIP, DALL-E)
- Richer understanding and generation`,
            keyPoints: [
              'NLP applications span numerous industries and use cases',
              'Different tasks require different architectural approaches',
              'Large models enable few-shot learning on new tasks',
              'Multimodal AI is the next frontier'
            ],
            realWorldExamples: [
              {
                title: 'Grammarly',
                description: 'AI-powered writing assistance and grammar checking',
                industry: 'EdTech'
              },
              {
                title: 'Amazon Alexa',
                description: 'Voice-controlled virtual assistant with NLP',
                industry: 'Consumer Electronics'
              },
              {
                title: 'DeepL Translator',
                description: 'High-quality neural machine translation',
                industry: 'Translation Services'
              }
            ]
          }
        }
      ]
    }
  },
  // DEEP LEARNING
  'deep-learning': {
    'intro-lesson': {
      title: 'Deep Learning Fundamentals',
      description: 'Master neural networks and deep learning techniques for AI applications',
      duration: '120 min',
      difficulty: 'Advanced',
      progress: 60,
      learningObjectives: [
        'Understand neural network architecture',
        'Learn backpropagation and gradient descent',
        'Master popular deep learning frameworks',
        'Apply deep learning to real problems'
      ],
      prerequisites: ['Machine Learning', 'Linear Algebra', 'Calculus'],
      sections: [
        {
          id: 'neural-networks',
          title: 'Neural Network Basics',
          duration: '40 min',
          type: 'content',
          completed: true,
          content: {
            text: `Neural Networks are the foundation of deep learning, inspired by the human brain's structure and function.

## What is a Neural Network?

A neural network is a computational model composed of interconnected nodes (neurons) organized in layers. Each connection has a weight that determines the strength of the signal.

## Neural Network Architecture

### Input Layer
- Receives the input features
- Number of neurons = number of features

### Hidden Layers
- Process information through weighted connections
- Can have multiple layers (deep networks)
- Each neuron applies an activation function

### Output Layer
- Produces the final prediction
- Number of neurons depends on the task

## Activation Functions

### Sigmoid
- Outputs values between 0 and 1
- Good for binary classification
- Suffers from vanishing gradient problem

### ReLU (Rectified Linear Unit)
- f(x) = max(0, x)
- Most popular activation function
- Helps with vanishing gradient problem

### Tanh (Hyperbolic Tangent)
- Outputs values between -1 and 1
- Zero-centered, good for hidden layers

## Forward Propagation

The process of computing predictions by passing input through the network:
1. Multiply inputs by weights
2. Add bias terms
3. Apply activation function
4. Pass to next layer`,
            keyPoints: [
              'Neural networks are inspired by biological neurons',
              'Multiple layers enable learning complex patterns',
              'Activation functions introduce non-linearity',
              'Forward propagation computes predictions'
            ],
            realWorldExamples: [
              {
                title: 'Image Recognition',
                description: 'Convolutional Neural Networks (CNNs) for computer vision',
                industry: 'Computer Vision'
              },
              {
                title: 'Natural Language Processing',
                description: 'Recurrent Neural Networks (RNNs) for text processing',
                industry: 'NLP'
              },
              {
                title: 'Game Playing',
                description: 'Deep Q-Networks (DQN) for reinforcement learning',
                industry: 'Gaming'
              }
            ]
          }
        },
        {
          id: 'backpropagation',
          title: 'Backpropagation',
          duration: '40 min',
          type: 'interactive',
          completed: false,
          content: {
            text: `Backpropagation is the algorithm that enables neural networks to learn by computing gradients of the loss function with respect to the network parameters.

## How Backpropagation Works

### Step 1: Forward Pass
- Compute predictions using current weights
- Calculate loss (difference between predictions and targets)

### Step 2: Backward Pass
- Compute gradients of loss with respect to each weight
- Use chain rule to propagate gradients backward
- Update weights using gradient descent

## The Chain Rule

Backpropagation uses the chain rule from calculus:
**∂L/∂w = ∂L/∂y × ∂y/∂z × ∂z/∂w**

Where:
- **L**: Loss function
- **y**: Output of the neuron
- **z**: Weighted sum before activation
- **w**: Weight parameter

## Gradient Descent Update

**w_new = w_old - α × ∂L/∂w**

Where:
- **α**: Learning rate (controls step size)
- **∂L/∂w**: Gradient of loss with respect to weight

## Common Issues

### Vanishing Gradients
- Gradients become very small in deep networks
- Solved with ReLU activation and proper weight initialization

### Exploding Gradients
- Gradients become very large
- Solved with gradient clipping and batch normalization`,
            comparison: [
              {
                aspect: 'Forward Pass',
                optionA: 'Compute predictions',
                optionB: 'Input → Hidden → Output',
                difference: 'No learning, just computation'
              },
              {
                aspect: 'Backward Pass',
                optionA: 'Compute gradients',
                optionB: 'Output → Hidden → Input',
                difference: 'Learning happens here'
              }
            ],
            keyTakeaways: [
              'Backpropagation computes gradients efficiently',
              'Chain rule enables gradient computation',
              'Gradient descent updates weights to minimize loss',
              'Proper initialization prevents vanishing/exploding gradients'
            ]
          }
        },
        {
          id: 'deep-learning-frameworks',
          title: 'Deep Learning Frameworks',
          duration: '40 min',
          type: 'quiz',
          completed: false,
          content: {
            text: `Deep learning frameworks provide tools and libraries to build, train, and deploy neural networks efficiently.

## Popular Frameworks

### TensorFlow
- Developed by Google
- Excellent for production deployment
- Strong ecosystem and community
- TensorFlow.js for web applications

### PyTorch
- Developed by Facebook (Meta)
- Dynamic computational graphs
- Great for research and prototyping
- Pythonic and intuitive

### Keras
- High-level API for neural networks
- Can run on TensorFlow, Theano, or CNTK
- Easy to learn and use
- Good for beginners

### JAX
- Developed by Google
- Automatic differentiation and GPU acceleration
- Functional programming approach
- Excellent for research

## Framework Comparison

### Ease of Use
- **Keras**: Easiest to learn
- **PyTorch**: Very intuitive
- **TensorFlow**: Steeper learning curve
- **JAX**: Advanced, functional approach

### Performance
- **TensorFlow**: Excellent for production
- **PyTorch**: Great for research
- **JAX**: Best for custom research
- **Keras**: Good for standard tasks

### Community & Ecosystem
- **TensorFlow**: Largest ecosystem
- **PyTorch**: Growing rapidly
- **Keras**: Good documentation
- **JAX**: Research-focused`,
            quiz: [
              {
                question: 'Which framework is best for beginners learning deep learning?',
                options: [
                  'TensorFlow',
                  'PyTorch',
                  'Keras',
                  'JAX'
                ],
                correctAnswer: 2,
                explanation: 'Keras provides a high-level, intuitive API that makes it easy for beginners to build neural networks.'
              },
              {
                question: 'Which framework is most popular in research and academia?',
                options: [
                  'TensorFlow',
                  'PyTorch',
                  'Keras',
                  'JAX'
                ],
                correctAnswer: 1,
                explanation: 'PyTorch\'s dynamic computational graphs and intuitive API make it popular in research.'
              },
              {
                question: 'What is the main advantage of JAX over other frameworks?',
                options: [
                  'Easier to learn',
                  'Better documentation',
                  'Automatic differentiation and GPU acceleration',
                  'Larger community'
                ],
                correctAnswer: 2,
                explanation: 'JAX provides excellent automatic differentiation and GPU acceleration capabilities.'
              }
            ]
          }
        }
      ]
    }
  }
};

// Default lesson generator for missing content
export const getDefaultLesson = (categoryId, subCategoryId) => {
  const titles = {
    'information-theory': 'Information Theory',
    'cpp-programming': 'C++ Programming',
    'data-structures': 'Data Structures & Algorithms',
    'algorithms': 'Algorithm Design & Analysis',
    'machine-learning': 'Machine Learning Fundamentals',
    'supervised-learning': 'Supervised Learning',
    'unsupervised-learning': 'Unsupervised Learning',
    'reinforcement-learning': 'Reinforcement Learning',
    'deep-learning': 'Deep Learning',
    'neural-networks': 'Neural Networks',
    'convolutional-neural-networks': 'Convolutional Neural Networks',
    'recurrent-neural-networks': 'Recurrent Neural Networks',
    'transformer-architecture': 'Transformer Architecture',
    'natural-language-processing': 'Natural Language Processing',
    'text-preprocessing': 'Text Preprocessing',
    'language-models': 'Language Models',
    'sentiment-analysis': 'Sentiment Analysis',
    'machine-translation': 'Machine Translation',
    'computer-vision': 'Computer Vision',
    'object-detection': 'Object Detection',
    'image-classification': 'Image Classification',
    'semantic-segmentation': 'Semantic Segmentation',
    'model-evaluation': 'Model Evaluation & Validation',
    'ai-ethics': 'AI Ethics & Responsible AI',
    'ai-safety': 'AI Safety & Alignment',
    'agi-theory': 'AGI Theory & Philosophy',
    'cognitive-architecture': 'Cognitive Architecture',
    'multi-agent-systems': 'Multi-Agent Systems',
    'human-ai-interaction': 'Human-AI Interaction',
    'ai-governance': 'AI Governance & Policy'
  };

  return {
    title: titles[subCategoryId] || 'Introduction to ' + subCategoryId.replace('-', ' '),
    description: 'Comprehensive introduction to the fundamental concepts and practical applications',
    duration: '45 min',
    difficulty: 'Intermediate',
    progress: 0,
    learningObjectives: [
      'Understand the core concepts and principles',
      'Learn practical implementation techniques',
      'Apply knowledge to real-world problems',
      'Master essential skills and tools'
    ],
    prerequisites: ['Basic Mathematics', 'Programming Fundamentals'],
    sections: [
      {
        id: 'introduction',
        title: 'Introduction & Overview',
        duration: '15 min',
        type: 'content',
        completed: false,
        content: {
          text: `Welcome to this comprehensive lesson! In this section, we'll explore the fundamental concepts and understand why this topic is crucial in the field of AI and machine learning.

## What You'll Learn

This lesson covers essential concepts that form the backbone of modern AI systems. We'll start with basic principles and gradually build up to more advanced topics.

## Real-World Importance

Understanding these concepts is crucial for:
- Building robust AI systems
- Solving complex real-world problems
- Advancing your career in AI/ML
- Contributing to cutting-edge research

## Learning Approach

We'll use a hands-on approach combining:
- Theoretical foundations
- Practical implementations
- Real-world examples
- Interactive exercises`,
          keyPoints: [
            'Fundamental concepts are building blocks for advanced topics',
            'Theory and practice must be combined for deep understanding',
            'Real-world applications demonstrate practical value',
            'Interactive learning accelerates comprehension'
          ],
          realWorldExamples: [
            {
              title: 'Industry Applications',
              description: 'Used in leading tech companies for production systems',
              industry: 'Technology'
            },
            {
              title: 'Research Advancement',
              description: 'Drives innovation in academic and corporate research',
              industry: 'Research'
            },
            {
              title: 'Problem Solving',
              description: 'Essential tool for solving complex real-world challenges',
              industry: 'Various'
            }
          ]
        }
      },
      {
        id: 'core-concepts',
        title: 'Core Concepts & Principles',
        duration: '20 min',
        type: 'interactive',
        completed: false,
        content: {
          text: `Now let's dive into the core concepts that you need to master. These principles form the foundation for everything else in this domain.

## Key Principles

Understanding these fundamental principles will help you:
- Build intuition for complex topics
- Apply knowledge to new problems
- Communicate effectively with other AI practitioners
- Make informed decisions in your projects

## Practical Applications

We'll explore how these concepts are applied in real-world scenarios, from research to production systems.`,
          keyTakeaways: [
            'Core principles guide all applications',
            'Theory informs practice',
            'Real-world problems drive innovation',
            'Continuous learning is essential'
          ]
        }
      },
      {
        id: 'quiz-assessment',
        title: 'Knowledge Check',
        duration: '10 min',
        type: 'quiz',
        completed: false,
        quiz: {
          questions: [
            {
              id: 'q1',
              question: 'What is the primary goal of this field?',
              options: [
                'To create intelligent systems',
                'To automate simple tasks',
                'To replace human workers',
                'To increase computational speed'
              ],
              correct: 0,
              explanation: 'The primary goal is to create intelligent systems that can learn, reason, and solve complex problems.'
            },
            {
              id: 'q2',
              question: 'Which approach combines theory and practice?',
              options: [
                'Theoretical only',
                'Practical only',
                'Hands-on approach',
                'Memorization'
              ],
              correct: 2,
              explanation: 'A hands-on approach that combines theoretical foundations with practical implementations is most effective.'
            }
          ]
        }
      }
    ]
  };
}; 