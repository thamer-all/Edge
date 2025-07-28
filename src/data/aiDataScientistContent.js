// Real AI Data Scientist Learning Content
const aiDataScientistContent = {
  fundamentals: {
    statistics: {
      'inferential-statistics': {
        title: 'Inferential Statistics',
        description: 'Learn statistical inference for making data-driven decisions',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'hypothesis-testing',
            title: 'Hypothesis Testing Fundamentals',
            content: `
# Hypothesis Testing Fundamentals

Hypothesis testing is the foundation of statistical inference, allowing us to make data-driven decisions about populations based on sample data.

## The Hypothesis Testing Process

1. **State the Hypotheses**
   - Null Hypothesis (H₀): The default assumption
   - Alternative Hypothesis (H₁): What we want to prove

2. **Choose Significance Level (α)**
   - Common values: 0.05, 0.01, 0.10
   - Probability of rejecting H₀ when it's true (Type I error)

3. **Calculate Test Statistic**
   - Compare sample data to null hypothesis

4. **Make Decision**
   - Reject or fail to reject H₀

```python
import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

# Example: Testing if a coin is fair
def coin_flip_test(n_flips, observed_heads, alpha=0.05):
    """
    Test if a coin is fair using binomial test
    """
    # Null hypothesis: p = 0.5 (fair coin)
    # Alternative hypothesis: p ≠ 0.5 (biased coin)
    
    # Calculate p-value using binomial test
    p_value = stats.binomtest(observed_heads, n_flips, p=0.5).proportions_ci()
    
    # Make decision
    if p_value < alpha:
        decision = "Reject H₀ - Coin is biased"
    else:
        decision = "Fail to reject H₀ - Coin appears fair"
    
    return {
        'p_value': p_value,
        'decision': decision,
        'alpha': alpha
    }

# Test with sample data
n_flips = 100
observed_heads = 65
result = coin_flip_test(n_flips, observed_heads)
print(f"P-value: {result['p_value']:.4f}")
print(f"Decision: {result['decision']}")
```

## Types of Hypothesis Tests

### 1. Z-Test (Large Samples)
```python
def z_test(sample_mean, pop_mean, pop_std, sample_size, alpha=0.05):
    """
    Perform z-test for population mean
    """
    # Calculate z-statistic
    z_stat = (sample_mean - pop_mean) / (pop_std / np.sqrt(sample_size))
    
    # Calculate p-value (two-tailed)
    p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
    
    # Make decision
    if p_value < alpha:
        decision = "Reject H₀"
    else:
        decision = "Fail to reject H₀"
    
    return {
        'z_statistic': z_stat,
        'p_value': p_value,
        'decision': decision
    }

# Example: Testing if sample mean differs from population mean
sample_mean = 52.5
pop_mean = 50
pop_std = 10
sample_size = 100

result = z_test(sample_mean, pop_mean, pop_std, sample_size)
print(f"Z-statistic: {result['z_statistic']:.3f}")
print(f"P-value: {result['p_value']:.4f}")
print(f"Decision: {result['decision']}")
```

### 2. T-Test (Small Samples)
```python
def t_test_one_sample(data, pop_mean, alpha=0.05):
    """
    Perform one-sample t-test
    """
    # Calculate t-statistic and p-value
    t_stat, p_value = stats.ttest_1samp(data, pop_mean)
    
    # Make decision
    if p_value < alpha:
        decision = "Reject H₀"
    else:
        decision = "Fail to reject H₀"
    
    return {
        't_statistic': t_stat,
        'p_value': p_value,
        'decision': decision
    }

# Example: Testing if sample mean differs from 50
sample_data = [45, 52, 48, 55, 51, 49, 53, 47, 50, 54]
result = t_test_one_sample(sample_data, 50)
print(f"T-statistic: {result['t_statistic']:.3f}")
print(f"P-value: {result['p_value']:.4f}")
print(f"Decision: {result['decision']}")
```

## Confidence Intervals

Confidence intervals provide a range of plausible values for population parameters:

```python
def confidence_interval(data, confidence=0.95):
    """
    Calculate confidence interval for population mean
    """
    n = len(data)
    mean = np.mean(data)
    std_err = np.std(data, ddof=1) / np.sqrt(n)
    
    # Calculate t-critical value
    t_critical = stats.t.ppf((1 + confidence) / 2, df=n-1)
    
    # Calculate margin of error
    margin_of_error = t_critical * std_err
    
    # Calculate confidence interval
    ci_lower = mean - margin_of_error
    ci_upper = mean + margin_of_error
    
    return {
        'mean': mean,
        'confidence_interval': (ci_lower, ci_upper),
        'margin_of_error': margin_of_error,
        'confidence_level': confidence
    }

# Example: Calculate 95% confidence interval
sample_data = [10, 12, 15, 18, 20, 22, 25, 28, 30, 32]
ci_result = confidence_interval(sample_data, 0.95)
print(f"Sample mean: {ci_result['mean']:.2f}")
print(f"95% CI: ({ci_result['confidence_interval'][0]:.2f}, {ci_result['confidence_interval'][1]:.2f})")
```

## Practice Exercise

Create a comprehensive hypothesis testing function:

```python
def comprehensive_hypothesis_test(data, null_value, test_type='t', alpha=0.05):
    """
    Perform comprehensive hypothesis testing
    """
    if test_type == 't':
        # One-sample t-test
        t_stat, p_value = stats.ttest_1samp(data, null_value)
        test_name = "One-Sample T-Test"
    elif test_type == 'z':
        # Z-test (assuming known population std)
        sample_mean = np.mean(data)
        pop_std = np.std(data)  # In practice, this would be known
        n = len(data)
        z_stat = (sample_mean - null_value) / (pop_std / np.sqrt(n))
        p_value = 2 * (1 - stats.norm.cdf(abs(z_stat)))
        t_stat = z_stat
        test_name = "Z-Test"
    
    # Calculate confidence interval
    ci_result = confidence_interval(data, 1 - alpha)
    
    # Make decision
    if p_value < alpha:
        decision = "Reject H₀"
    else:
        decision = "Fail to reject H₀"
    
    return {
        'test_name': test_name,
        'test_statistic': t_stat,
        'p_value': p_value,
        'decision': decision,
        'confidence_interval': ci_result['confidence_interval'],
        'sample_mean': np.mean(data),
        'sample_size': len(data)
    }

# Test the function
test_data = [48, 52, 55, 49, 51, 53, 47, 50, 54, 52]
result = comprehensive_hypothesis_test(test_data, 50, 't', 0.05)
print("Hypothesis Test Results:")
for key, value in result.items():
    print(f"{key}: {value}")
```
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Perform a two-sample t-test to compare two groups',
                starterCode: `
def two_sample_t_test(group1, group2, alpha=0.05):
    # Your code here
    pass
                `,
                solution: `
def two_sample_t_test(group1, group2, alpha=0.05):
    t_stat, p_value = stats.ttest_ind(group1, group2)
    
    if p_value < alpha:
        decision = "Reject H₀ - Groups are significantly different"
    else:
        decision = "Fail to reject H₀ - No significant difference"
    
    return {
        't_statistic': t_stat,
        'p_value': p_value,
        'decision': decision
    }
                `
              },
              {
                type: 'multiple_choice',
                question: 'What is the probability of making a Type I error when α = 0.05?',
                options: ['0.05', '0.95', '0.01', '0.10'],
                correct: 0
              }
            ]
          }
        ]
      }
    },
    machine_learning: {
      'supervised-learning': {
        'classification-algorithms': {
          title: 'Classification Algorithms',
          description: 'Master classification techniques for categorical predictions',
          duration: 180,
          difficulty: 'intermediate',
          sections: [
            {
              id: 'logistic-regression',
              title: 'Logistic Regression',
              content: `
# Logistic Regression

Logistic regression is a fundamental classification algorithm that models the probability of a binary outcome using a logistic function.

## Mathematical Foundation

The logistic function (sigmoid) transforms linear combinations to probabilities:

**P(y=1|x) = 1 / (1 + e^(-z))**

Where z = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ

```python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# Generate sample data
np.random.seed(42)
n_samples = 1000

# Create two classes with some overlap
class_0 = np.random.multivariate_normal([0, 0], [[1, 0.5], [0.5, 1]], n_samples//2)
class_1 = np.random.multivariate_normal([2, 2], [[1, 0.5], [0.5, 1]], n_samples//2)

X = np.vstack([class_0, class_1])
y = np.hstack([np.zeros(n_samples//2), np.ones(n_samples//2)])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train logistic regression
model = LogisticRegression(random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

# Evaluate model
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Plot decision boundary
def plot_decision_boundary(X, y, model):
    """
    Plot decision boundary for 2D data
    """
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    
    xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.1),
                         np.arange(y_min, y_max, 0.1))
    
    Z = model.predict(np.c_[xx.ravel(), yy.ravel()])
    Z = Z.reshape(xx.shape)
    
    plt.figure(figsize=(10, 8))
    plt.contourf(xx, yy, Z, alpha=0.4)
    plt.scatter(X[:, 0], X[:, 1], c=y, alpha=0.8)
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.title('Logistic Regression Decision Boundary')
    plt.colorbar()
    plt.show()

plot_decision_boundary(X_test, y_test, model)
```

## Model Interpretation

### Coefficients and Odds Ratios
```python
def interpret_logistic_model(model, feature_names=None):
    """
    Interpret logistic regression coefficients
    """
    coefficients = model.coef_[0]
    intercept = model.intercept_[0]
    
    if feature_names is None:
        feature_names = [f"Feature_{i}" for i in range(len(coefficients))]
    
    print("Logistic Regression Coefficients:")
    print(f"Intercept: {intercept:.4f}")
    
    for name, coef in zip(feature_names, coefficients):
        odds_ratio = np.exp(coef)
        print(f"{name}: {coef:.4f} (Odds Ratio: {odds_ratio:.4f})")
    
    return {
        'intercept': intercept,
        'coefficients': coefficients,
        'odds_ratios': np.exp(coefficients)
    }

# Interpret the model
interpretation = interpret_logistic_model(model, ['Feature_1', 'Feature_2'])
```

### Model Performance Metrics
```python
def evaluate_classification_model(y_true, y_pred, y_pred_proba=None):
    """
    Comprehensive evaluation of classification model
    """
    from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
    
    # Basic metrics
    accuracy = accuracy_score(y_true, y_pred)
    precision = precision_score(y_true, y_pred)
    recall = recall_score(y_true, y_pred)
    f1 = f1_score(y_true, y_pred)
    
    # ROC-AUC if probabilities are available
    roc_auc = None
    if y_pred_proba is not None:
        roc_auc = roc_auc_score(y_true, y_pred_proba)
    
    # Confusion matrix
    cm = confusion_matrix(y_true, y_pred)
    
    # Print results
    print("Model Performance Metrics:")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Precision: {precision:.4f}")
    print(f"Recall: {recall:.4f}")
    print(f"F1-Score: {f1:.4f}")
    if roc_auc:
        print(f"ROC-AUC: {roc_auc:.4f}")
    
    # Plot confusion matrix
    plt.figure(figsize=(8, 6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.show()
    
    return {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1_score': f1,
        'roc_auc': roc_auc,
        'confusion_matrix': cm
    }

# Evaluate the model
performance = evaluate_classification_model(y_test, y_pred, y_pred_proba)
```

## Regularization

Regularization helps prevent overfitting:

```python
from sklearn.linear_model import LogisticRegressionCV

# L1 regularization (Lasso)
l1_model = LogisticRegressionCV(cv=5, penalty='l1', solver='liblinear', random_state=42)
l1_model.fit(X_train, y_train)

# L2 regularization (Ridge)
l2_model = LogisticRegressionCV(cv=5, penalty='l2', random_state=42)
l2_model.fit(X_train, y_train)

# Compare models
models = {
    'No Regularization': model,
    'L1 Regularization': l1_model,
    'L2 Regularization': l2_model
}

print("Model Comparison:")
for name, model in models.items():
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"{name}: {accuracy:.4f}")
```

## Practice Exercise

Create a function to perform logistic regression with cross-validation:

```python
def logistic_regression_cv(X, y, cv_folds=5):
    """
    Perform logistic regression with cross-validation
    """
    from sklearn.model_selection import cross_val_score
    
    # Create model
    model = LogisticRegression(random_state=42)
    
    # Perform cross-validation
    cv_scores = cross_val_score(model, X, y, cv=cv_folds, scoring='accuracy')
    
    # Fit model on full training data
    model.fit(X, y)
    
    return {
        'model': model,
        'cv_scores': cv_scores,
        'mean_cv_score': cv_scores.mean(),
        'std_cv_score': cv_scores.std()
    }

# Test the function
cv_result = logistic_regression_cv(X_train, y_train, cv_folds=5)
print(f"Cross-validation accuracy: {cv_result['mean_cv_score']:.4f} (+/- {cv_result['std_cv_score']*2:.4f})")
```
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement logistic regression from scratch using gradient descent',
                starterCode: `
class LogisticRegressionGD:
    def __init__(self, learning_rate=0.01, iterations=1000):
        # Your code here
        pass
    
    def sigmoid(self, z):
        # Your code here
        pass
    
    def fit(self, X, y):
        # Your code here
        pass
                `,
                solution: `
class LogisticRegressionGD:
    def __init__(self, learning_rate=0.01, iterations=1000):
        self.learning_rate = learning_rate
        self.iterations = iterations
        self.weights = None
        self.bias = None
    
    def sigmoid(self, z):
        return 1 / (1 + np.exp(-z))
    
    def fit(self, X, y):
        m, n = X.shape
        self.weights = np.zeros(n)
        self.bias = 0
        
        for _ in range(self.iterations):
            # Forward pass
            z = np.dot(X, self.weights) + self.bias
            predictions = self.sigmoid(z)
            
            # Gradients
            dw = (1/m) * np.dot(X.T, (predictions - y))
            db = (1/m) * np.sum(predictions - y)
            
            # Update parameters
            self.weights -= self.learning_rate * dw
            self.bias -= self.learning_rate * db
                `
              }
            ]
          }
        ]
      }
    }
  },
  data_engineering: {
    'feature-engineering': {
      'feature-selection': {
        title: 'Feature Selection Techniques',
        description: 'Learn methods to select the most relevant features for your models',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'filter-methods',
            title: 'Filter Methods for Feature Selection',
            content: `
# Filter Methods for Feature Selection

Filter methods select features based on statistical measures, independent of the machine learning algorithm.

## Correlation-Based Selection

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.feature_selection import SelectKBest, f_classif, mutual_info_classif
from sklearn.datasets import make_classification

# Generate sample dataset
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, 
                         n_redundant=5, n_clusters_per_class=1, random_state=42)

# Create DataFrame
feature_names = [f"feature_{i}" for i in range(X.shape[1])]
df = pd.DataFrame(X, columns=feature_names)
df['target'] = y

# Calculate correlation matrix
correlation_matrix = df.corr()

# Plot correlation heatmap
plt.figure(figsize=(12, 10))
sns.heatmap(correlation_matrix, annot=False, cmap='coolwarm', center=0)
plt.title('Feature Correlation Matrix')
plt.tight_layout()
plt.show()

# Find highly correlated features
def find_correlated_features(correlation_matrix, threshold=0.8):
    """
    Find pairs of highly correlated features
    """
    correlated_pairs = []
    
    for i in range(len(correlation_matrix.columns)):
        for j in range(i+1, len(correlation_matrix.columns)):
            if abs(correlation_matrix.iloc[i, j]) > threshold:
                correlated_pairs.append((
                    correlation_matrix.columns[i],
                    correlation_matrix.columns[j],
                    correlation_matrix.iloc[i, j]
                ))
    
    return correlated_pairs

# Find correlated features
correlated_features = find_correlated_features(correlation_matrix, threshold=0.8)
print("Highly correlated feature pairs:")
for feat1, feat2, corr in correlated_features:
    print(f"{feat1} - {feat2}: {corr:.3f}")
```

## Statistical Tests

### ANOVA F-test
```python
def anova_feature_selection(X, y, k=10):
    """
    Select top k features using ANOVA F-test
    """
    # Perform ANOVA F-test
    f_scores, p_values = f_classif(X, y)
    
    # Create feature scores DataFrame
    feature_scores = pd.DataFrame({
        'feature': [f"feature_{i}" for i in range(X.shape[1])],
        'f_score': f_scores,
        'p_value': p_values
    })
    
    # Sort by f-score
    feature_scores = feature_scores.sort_values('f_score', ascending=False)
    
    # Select top k features
    top_features = feature_scores.head(k)
    
    return top_features, feature_scores

# Perform ANOVA feature selection
top_features, all_features = anova_feature_selection(X, y, k=10)

print("Top 10 features by ANOVA F-test:")
print(top_features)

# Plot feature importance
plt.figure(figsize=(12, 6))
plt.bar(range(len(top_features)), top_features['f_score'])
plt.xlabel('Features')
plt.ylabel('F-Score')
plt.title('Feature Importance (ANOVA F-test)')
plt.xticks(range(len(top_features)), top_features['feature'], rotation=45)
plt.tight_layout()
plt.show()
```

### Mutual Information
```python
def mutual_info_feature_selection(X, y, k=10):
    """
    Select top k features using mutual information
    """
    # Calculate mutual information
    mi_scores = mutual_info_classif(X, y, random_state=42)
    
    # Create feature scores DataFrame
    feature_scores = pd.DataFrame({
        'feature': [f"feature_{i}" for i in range(X.shape[1])],
        'mutual_info': mi_scores
    })
    
    # Sort by mutual information
    feature_scores = feature_scores.sort_values('mutual_info', ascending=False)
    
    # Select top k features
    top_features = feature_scores.head(k)
    
    return top_features, feature_scores

# Perform mutual information feature selection
mi_top_features, mi_all_features = mutual_info_feature_selection(X, y, k=10)

print("Top 10 features by Mutual Information:")
print(mi_top_features)

# Compare ANOVA and Mutual Information
comparison = pd.merge(
    all_features[['feature', 'f_score']], 
    mi_all_features[['feature', 'mutual_info']], 
    on='feature'
)

print("\\nFeature Selection Comparison:")
print(comparison.head(10))
```

## Variance Threshold

Remove low-variance features:

```python
from sklearn.feature_selection import VarianceThreshold

def variance_feature_selection(X, threshold=0.01):
    """
    Remove features with low variance
    """
    # Create variance threshold selector
    selector = VarianceThreshold(threshold=threshold)
    
    # Fit and transform
    X_selected = selector.fit_transform(X)
    
    # Get selected feature indices
    selected_features = selector.get_support()
    
    # Get feature names
    feature_names = [f"feature_{i}" for i in range(X.shape[1])]
    selected_feature_names = [feature_names[i] for i in range(len(feature_names)) if selected_features[i]]
    
    return X_selected, selected_feature_names, selector

# Perform variance-based feature selection
X_var_selected, var_selected_features, var_selector = variance_feature_selection(X, threshold=0.01)

print(f"Original features: {X.shape[1]}")
print(f"Selected features: {X_var_selected.shape[1]}")
print(f"Removed features: {X.shape[1] - X_var_selected.shape[1]}")
print(f"Selected feature names: {var_selected_features}")
```

## Comprehensive Feature Selection Pipeline

```python
def comprehensive_feature_selection(X, y, k=10, variance_threshold=0.01, correlation_threshold=0.8):
    """
    Comprehensive feature selection pipeline
    """
    # Step 1: Remove low variance features
    X_var_selected, var_features, var_selector = variance_feature_selection(X, variance_threshold)
    
    # Step 2: Remove highly correlated features
    df_var = pd.DataFrame(X_var_selected, columns=var_features)
    correlation_matrix = df_var.corr()
    correlated_pairs = find_correlated_features(correlation_matrix, correlation_threshold)
    
    # Remove one feature from each correlated pair
    features_to_remove = set()
    for feat1, feat2, corr in correlated_pairs:
        # Keep the feature with higher variance
        var1 = df_var[feat1].var()
        var2 = df_var[feat2].var()
        if var1 < var2:
            features_to_remove.add(feat1)
        else:
            features_to_remove.add(feat2)
    
    # Remove correlated features
    uncorrelated_features = [f for f in var_features if f not in features_to_remove]
    X_uncorr = df_var[uncorrelated_features].values
    
    # Step 3: Statistical feature selection
    top_features, all_features = anova_feature_selection(X_uncorr, y, k)
    
    # Get final selected features
    final_features = top_features['feature'].tolist()
    X_final = X_uncorr[:, [uncorrelated_features.index(f) for f in final_features]]
    
    return {
        'X_final': X_final,
        'selected_features': final_features,
        'variance_removed': X.shape[1] - X_var_selected.shape[1],
        'correlation_removed': len(features_to_remove),
        'final_count': X_final.shape[1]
    }

# Run comprehensive feature selection
feature_selection_result = comprehensive_feature_selection(X, y, k=10)

print("Comprehensive Feature Selection Results:")
print(f"Original features: {X.shape[1]}")
print(f"After variance threshold: {X.shape[1] - feature_selection_result['variance_removed']}")
print(f"After correlation removal: {feature_selection_result['final_count'] + feature_selection_result['correlation_removed']}")
print(f"Final selected features: {feature_selection_result['final_count']}")
print(f"Selected feature names: {feature_selection_result['selected_features']}")
```

## Practice Exercise

Create a feature selection evaluation function:

```python
def evaluate_feature_selection(X, y, selected_features, model):
    """
    Evaluate the impact of feature selection on model performance
    """
    from sklearn.model_selection import cross_val_score
    
    # Train model with all features
    scores_all = cross_val_score(model, X, y, cv=5, scoring='accuracy')
    
    # Train model with selected features
    feature_indices = [int(f.split('_')[1]) for f in selected_features]
    X_selected = X[:, feature_indices]
    scores_selected = cross_val_score(model, X_selected, y, cv=5, scoring='accuracy')
    
    return {
        'all_features_score': scores_all.mean(),
        'selected_features_score': scores_selected.mean(),
        'improvement': scores_selected.mean() - scores_all.mean(),
        'feature_reduction': (X.shape[1] - len(selected_features)) / X.shape[1] * 100
    }

# Evaluate feature selection
from sklearn.linear_model import LogisticRegression
model = LogisticRegression(random_state=42)

evaluation = evaluate_feature_selection(
    X, y, 
    feature_selection_result['selected_features'], 
    model
)

print("Feature Selection Evaluation:")
print(f"All features accuracy: {evaluation['all_features_score']:.4f}")
print(f"Selected features accuracy: {evaluation['selected_features_score']:.4f}")
print(f"Improvement: {evaluation['improvement']:.4f}")
print(f"Feature reduction: {evaluation['feature_reduction']:.1f}%")
```
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement recursive feature elimination (RFE)',
                starterCode: `
def recursive_feature_elimination(X, y, n_features, model):
    # Your code here
    pass
                `,
                solution: `
def recursive_feature_elimination(X, y, n_features, model):
    from sklearn.feature_selection import RFE
    
    rfe = RFE(estimator=model, n_features_to_select=n_features)
    X_rfe = rfe.fit_transform(X, y)
    
    selected_features = [f"feature_{i}" for i in range(X.shape[1]) if rfe.support_[i]]
    
    return X_rfe, selected_features, rfe
                `
              }
            ]
          }
        ]
      }
    }
  }
};

export default aiDataScientistContent; 