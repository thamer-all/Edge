// Real AI Engineer Learning Content
export const aiEngineerContent = {
  fundamentals: {
    mathematics: {
      'linear-algebra-basics': {
        title: 'Linear Algebra Fundamentals',
        description: 'Master the mathematical foundation of AI and machine learning',
        duration: 90,
        difficulty: 'beginner',
        sections: [
          {
            id: 'vectors-intro',
            title: 'Introduction to Vectors',
            content: `
# Introduction to Vectors

Vectors are the fundamental building blocks of linear algebra and machine learning. In this lesson, you'll learn what vectors are, how to work with them, and why they're essential for AI.

## What is a Vector?

A vector is an ordered list of numbers. In AI, vectors represent:
- **Features**: [age, income, education_level]
- **Image pixels**: [255, 128, 64] for RGB values
- **Word embeddings**: [0.2, -0.5, 0.8] for semantic meaning

## Vector Operations

### Addition
Vectors can be added element-wise:
\`\`\`python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = a + b  # [5, 7, 9]
\`\`\`

### Scalar Multiplication
Multiply each element by a scalar:
\`\`\`python
a = np.array([1, 2, 3])
scaled = 2 * a  # [2, 4, 6]
\`\`\`

### Dot Product
Measures similarity between vectors:
\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
dot_product = np.dot(a, b)  # 1*4 + 2*5 + 3*6 = 32
\`\`\`

## Real-World Applications

1. **Recommendation Systems**: User preferences as vectors
2. **Image Recognition**: Pixel values as feature vectors
3. **Natural Language Processing**: Words as embedding vectors

## Practice Exercise

Create a Python function that calculates the cosine similarity between two vectors:

\`\`\`python
def cosine_similarity(a, b):
    """
    Calculate cosine similarity between vectors a and b
    """
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_product / (norm_a * norm_b)
\`\`\`

Test your function:
\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
similarity = cosine_similarity(a, b)
print(f"Cosine similarity: {similarity:.4f}")
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement vector addition and subtraction functions',
                starterCode: `
def vector_add(a, b):
    # Your code here
    pass

def vector_subtract(a, b):
    # Your code here
    pass
                `,
                solution: `
def vector_add(a, b):
    return [a[i] + b[i] for i in range(len(a))]

def vector_subtract(a, b):
    return [a[i] - b[i] for i in range(len(a))]
                `
              },
              {
                type: 'multiple_choice',
                question: 'What is the dot product of vectors [1, 2, 3] and [4, 5, 6]?',
                options: ['32', '28', '36', '24'],
                correct: 0
              }
            ]
          },
          {
            id: 'matrices-operations',
            title: 'Matrices and Operations',
            content: `
# Matrices and Operations

Matrices are 2D arrays of numbers that represent transformations and relationships. They're crucial for neural networks and data processing.

## Matrix Fundamentals

A matrix is a rectangular array of numbers:

\`\`\`python
import numpy as np

# 2x3 matrix
A = np.array([[1, 2, 3],
              [4, 5, 6]])

# 3x2 matrix
B = np.array([[1, 2],
              [3, 4],
              [5, 6]])
\`\`\`

## Matrix Operations

### Matrix Multiplication
\`\`\`python
# Matrix multiplication
C = np.dot(A, B)  # or A @ B
print(C)
# Output: [[22 28]
#          [49 64]]
\`\`\`

### Transpose
\`\`\`python
A_transpose = A.T
print(A_transpose)
# Output: [[1 4]
#          [2 5]
#          [3 6]]
\`\`\`

### Inverse
\`\`\`python
# Only for square matrices
square_matrix = np.array([[1, 2], [3, 4]])
inverse = np.linalg.inv(square_matrix)
\`\`\`

## Applications in AI

1. **Neural Networks**: Weight matrices
2. **Data Transformation**: Feature scaling
3. **Principal Component Analysis**: Dimensionality reduction

## Practice Exercise

Implement matrix multiplication from scratch:

\`\`\`python
def matrix_multiply(A, B):
    """
    Multiply matrices A and B
    A: m x n matrix
    B: n x p matrix
    Returns: m x p matrix
    """
    m, n = len(A), len(A[0])
    n2, p = len(B), len(B[0])
    
    if n != n2:
        raise ValueError("Matrix dimensions don't match")
    
    result = [[0 for _ in range(p)] for _ in range(m)]
    
    for i in range(m):
        for j in range(p):
            for k in range(n):
                result[i][j] += A[i][k] * B[k][j]
    
    return result
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Calculate the determinant of a 2x2 matrix',
                starterCode: `
def determinant_2x2(matrix):
    # Your code here
    pass
                `,
                solution: `
def determinant_2x2(matrix):
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
                `
              }
            ]
          }
        ]
      },
      'calculus-for-ml': {
        title: 'Calculus for Machine Learning',
        description: 'Learn derivatives, gradients, and optimization techniques',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'derivatives-basics',
            title: 'Understanding Derivatives',
            content: `
# Understanding Derivatives

Derivatives measure how a function changes as its input changes. In machine learning, they're essential for optimization and gradient descent.

## What is a Derivative?

The derivative of a function f(x) at point x is the rate of change:

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

def derivative_at_point(f, x, h=0.0001):
    """Calculate derivative using finite difference"""
    return (f(x + h) - f(x)) / h

# Example: derivative of x²
def f(x):
    return x**2

x = 2
derivative = derivative_at_point(f, x)
print(f"Derivative of x² at x={x}: {derivative}")
# Output: 4.0 (which is 2*x)
\`\`\`

## Common Derivatives

1. **Power Rule**: d/dx(x^n) = n*x^(n-1)
2. **Exponential**: d/dx(e^x) = e^x
3. **Logarithm**: d/dx(ln(x)) = 1/x
4. **Chain Rule**: d/dx(f(g(x))) = f'(g(x)) * g'(x)

## Gradients

For functions with multiple variables, we use gradients:

\`\`\`python
def gradient_2d(f, x, y, h=0.0001):
    """Calculate gradient of 2D function"""
    df_dx = (f(x + h, y) - f(x, y)) / h
    df_dy = (f(x, y + h) - f(x, y)) / h
    return [df_dx, df_dy]

# Example: f(x,y) = x² + y²
def f_2d(x, y):
    return x**2 + y**2

grad = gradient_2d(f_2d, 1, 2)
print(f"Gradient at (1,2): {grad}")
# Output: [2.0, 4.0]
\`\`\`

## Gradient Descent

The core optimization algorithm in machine learning:

\`\`\`python
def gradient_descent(f, grad_f, start_point, learning_rate=0.1, iterations=100):
    """Simple gradient descent implementation"""
    x = np.array(start_point)
    
    for i in range(iterations):
        gradient = grad_f(x[0], x[1])
        x = x - learning_rate * np.array(gradient)
        
        if i % 10 == 0:
            print(f"Iteration {i}: x={x}, f(x)={f(x[0], x[1])}")
    
    return x

# Find minimum of f(x,y) = x² + y²
def grad_f_2d(x, y):
    return [2*x, 2*y]

minimum = gradient_descent(f_2d, grad_f_2d, [1, 1])
print(f"Minimum found at: {minimum}")
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement the derivative of a polynomial function',
                starterCode: `
def polynomial_derivative(coefficients):
    # coefficients: [a0, a1, a2, ...] for a0 + a1*x + a2*x² + ...
    # Return derivative coefficients
    pass
                `,
                solution: `
def polynomial_derivative(coefficients):
    if len(coefficients) <= 1:
        return [0]
    
    derivative = []
    for i in range(1, len(coefficients)):
        derivative.append(i * coefficients[i])
    
    return derivative
                `
              }
            ]
          }
        ]
      }
    },
    programming: {
      'python-basics': {
        title: 'Python Fundamentals for AI',
        description: 'Master Python programming for AI and machine learning',
        duration: 120,
        difficulty: 'beginner',
        sections: [
          {
            id: 'python-data-structures',
            title: 'Data Structures for AI',
            content: `
# Data Structures for AI

Understanding data structures is crucial for efficient AI programming. Let's explore the most important ones.

## Lists and Arrays

\`\`\`python
import numpy as np

# Python lists
data = [1, 2, 3, 4, 5]

# NumPy arrays (more efficient for numerical operations)
array = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2, 3], [4, 5, 6]])

# Array operations
print(array * 2)  # Element-wise multiplication
print(array + 1)  # Broadcasting
print(np.dot(array, array))  # Dot product
\`\`\`

## Dictionaries

Perfect for storing features and metadata:

\`\`\`python
# Feature dictionary
features = {
    'age': 25,
    'income': 50000,
    'education': 'bachelor',
    'location': 'NYC'
}

# Nested dictionaries for complex data
dataset = {
    'user_1': {
        'features': features,
        'target': 1
    },
    'user_2': {
        'features': {'age': 30, 'income': 60000, 'education': 'master', 'location': 'LA'},
        'target': 0
    }
}
\`\`\`

## Sets

Useful for unique elements and set operations:

\`\`\`python
# Unique categories
categories = {'cat', 'dog', 'bird', 'cat'}  # Duplicates removed
print(categories)  # {'cat', 'dog', 'bird'}

# Set operations
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}
print(set1 & set2)  # Intersection: {3, 4}
print(set1 | set2)  # Union: {1, 2, 3, 4, 5, 6}
\`\`\`

## Practice Exercise

Create a function to process a dataset:

\`\`\`python
def process_dataset(data):
    """
    Process a list of dictionaries containing user data
    Return: processed features and targets
    """
    features = []
    targets = []
    
    for item in data:
        # Extract features (excluding target)
        feature_vector = [
            item['age'],
            item['income'],
            1 if item['education'] == 'master' else 0,
            1 if item['location'] == 'NYC' else 0
        ]
        
        features.append(feature_vector)
        targets.append(item['target'])
    
    return np.array(features), np.array(targets)

# Test data
test_data = [
    {'age': 25, 'income': 50000, 'education': 'bachelor', 'location': 'NYC', 'target': 1},
    {'age': 30, 'income': 60000, 'education': 'master', 'location': 'LA', 'target': 0},
    {'age': 35, 'income': 75000, 'education': 'master', 'location': 'NYC', 'target': 1}
]

X, y = process_dataset(test_data)
print("Features shape:", X.shape)
print("Targets shape:", y.shape)
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Create a function to normalize numerical features',
                starterCode: `
def normalize_features(features):
    # Normalize features using z-score normalization
    # Return normalized features and normalization parameters
    pass
                `,
                solution: `
def normalize_features(features):
    mean = np.mean(features, axis=0)
    std = np.std(features, axis=0)
    normalized = (features - mean) / std
    return normalized, {'mean': mean, 'std': std}
                `
              }
            ]
          }
        ]
      }
    }
  },
  machine_learning: {
    'supervised-learning': {
      'linear-regression': {
        title: 'Linear Regression from Scratch',
        description: 'Implement linear regression algorithm step by step',
        duration: 150,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'linear-regression-theory',
            title: 'Linear Regression Theory',
            content: `
# Linear Regression Theory

Linear regression is the foundation of supervised learning. It models the relationship between input features and a continuous target variable.

## Mathematical Foundation

The linear regression model is:

**y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ + ε**

Where:
- y is the target variable
- β₀ is the intercept (bias)
- β₁, β₂, ..., βₙ are the coefficients (weights)
- x₁, x₂, ..., xₙ are the features
- ε is the error term

## Cost Function

We use Mean Squared Error (MSE) as the cost function:

**J(β) = (1/2m) * Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²**

Where:
- h(x) is our prediction function
- m is the number of training examples
- y⁽ⁱ⁾ is the actual value

## Gradient Descent

To minimize the cost function, we use gradient descent:

**βⱼ := βⱼ - α * ∂J(β)/∂βⱼ**

Where α is the learning rate.

## Implementation

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

class LinearRegression:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.learning_rate = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None
        self.cost_history = []
    
    def fit(self, X, y):
        """
        Train the linear regression model
        """
        m, n = X.shape
        
        # Initialize parameters
        self.weights = np.zeros(n)
        self.bias = 0
        
        # Gradient descent
        for i in range(self.iterations):
            # Forward pass
            y_pred = self.predict(X)
            
            # Compute gradients
            dw = (1/m) * np.dot(X.T, (y_pred - y))
            db = (1/m) * np.sum(y_pred - y)
            
            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
            
            # Compute cost
            cost = self.compute_cost(X, y)
            self.cost_history.append(cost)
            
            if i % 100 == 0:
                print(f"Iteration {i}, Cost: {cost:.4f}")
    
    def predict(self, X):
        """
        Make predictions
        """
        return np.dot(X, self.weights) + self.bias
    
    def compute_cost(self, X, y):
        """
        Compute Mean Squared Error
        """
        m = len(y)
        y_pred = self.predict(X)
        cost = (1/(2*m)) * np.sum((y_pred - y)**2)
        return cost

# Generate sample data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Train model
model = LinearRegression(learning_rate=0.01, iterations=1000)
model.fit(X, y)

print(f"Learned weights: {model.weights[0]:.4f}")
print(f"Learned bias: {model.bias:.4f}")

# Plot results
plt.scatter(X, y, alpha=0.5)
X_test = np.linspace(0, 2, 100).reshape(-1, 1)
y_pred = model.predict(X_test)
plt.plot(X_test, y_pred, 'r-', linewidth=2)
plt.xlabel('X')
plt.ylabel('y')
plt.title('Linear Regression')
plt.show()
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement ridge regression with L2 regularization',
                starterCode: `
class RidgeRegression:
    def __init__(self, alpha=1.0, learning_rate=0.01, iterations=1000):
        # Your code here
        pass
    
    def fit(self, X, y):
        # Your code here
        pass
                `,
                solution: `
class RidgeRegression:
    def __init__(self, alpha=1.0, learning_rate=0.01, iterations=1000):
        self.alpha = alpha
        self.learning_rate = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None
    
    def fit(self, X, y):
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias = 0
        
        for i in range(self.iterations):
            y_pred = self.predict(X)
            
            # Gradients with L2 regularization
            dw = (1/m) * np.dot(X.T, (y_pred - y)) + (self.alpha/m) * self.weights
            db = (1/m) * np.sum(y_pred - y)
            
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
                `
              }
            ]
          }
        ]
      }
    }
  }
};

export default aiEngineerContent; 