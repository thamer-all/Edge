// Real Data Analyst Learning Content
export const dataAnalystContent = {
  fundamentals: {
    statistics: {
      'descriptive-statistics': {
        title: 'Descriptive Statistics',
        description: 'Learn to summarize and describe data using statistical measures',
        duration: 90,
        difficulty: 'beginner',
        sections: [
          {
            id: 'central-tendency',
            title: 'Measures of Central Tendency',
            content: `
# Measures of Central Tendency

Central tendency measures help us understand the "center" or typical value of a dataset. The three main measures are mean, median, and mode.

## Mean (Average)

The mean is the sum of all values divided by the number of values:

**Mean = Σx / n**

\`\`\`python
import numpy as np
import pandas as pd

# Sample data
data = [23, 45, 67, 89, 12, 34, 56, 78, 90, 23]

# Calculate mean
mean = np.mean(data)
print(f"Mean: {mean:.2f}")

# Using pandas
df = pd.DataFrame({'values': data})
mean_pandas = df['values'].mean()
print(f"Mean (pandas): {mean_pandas:.2f}")
\`\`\`

## Median

The median is the middle value when data is ordered:

\`\`\`python
# Calculate median
median = np.median(data)
print(f"Median: {median}")

# Manual calculation
sorted_data = sorted(data)
n = len(sorted_data)
if n % 2 == 0:
    median_manual = (sorted_data[n//2 - 1] + sorted_data[n//2]) / 2
else:
    median_manual = sorted_data[n//2]
print(f"Median (manual): {median_manual}")
\`\`\`

## Mode

The mode is the most frequent value:

\`\`\`python
from scipy import stats

# Calculate mode
mode = stats.mode(data)
print(f"Mode: {mode.mode[0]} (appears {mode.count[0]} times)")

# Using pandas
mode_pandas = df['values'].mode()
print(f"Mode (pandas): {mode_pandas.values}")
\`\`\`

## When to Use Each Measure

- **Mean**: Best for normally distributed data, sensitive to outliers
- **Median**: Better for skewed data, robust to outliers
- **Mode**: Useful for categorical data, can have multiple modes

## Practice Exercise

Create a function that calculates all three measures:

\`\`\`python
def calculate_central_tendency(data):
    """
    Calculate mean, median, and mode for a dataset
    """
    mean = np.mean(data)
    median = np.median(data)
    mode = stats.mode(data)
    
    return {
        'mean': mean,
        'median': median,
        'mode': mode.mode[0] if len(mode.mode) > 0 else None,
        'mode_count': mode.count[0] if len(mode.count) > 0 else 0
    }

# Test with different datasets
normal_data = np.random.normal(50, 10, 100)
skewed_data = np.random.exponential(2, 100)

print("Normal distribution:")
print(calculate_central_tendency(normal_data))

print("\\nSkewed distribution:")
print(calculate_central_tendency(skewed_data))
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Calculate the mean, median, and mode for a given dataset',
                starterCode: `
def analyze_central_tendency(data):
    # Your code here
    pass
                `,
                solution: `
def analyze_central_tendency(data):
    import numpy as np
    from scipy import stats
    
    mean = np.mean(data)
    median = np.median(data)
    mode_result = stats.mode(data)
    
    return {
        'mean': mean,
        'median': median,
        'mode': mode_result.mode[0] if len(mode_result.mode) > 0 else None
    }
                `
              },
              {
                type: 'multiple_choice',
                question: 'Which measure of central tendency is most affected by outliers?',
                options: ['Mean', 'Median', 'Mode', 'All equally'],
                correct: 0
              }
            ]
          },
          {
            id: 'variability',
            title: 'Measures of Variability',
            content: `
# Measures of Variability

Variability measures tell us how spread out our data is. The main measures are range, variance, and standard deviation.

## Range

The range is the difference between the maximum and minimum values:

\`\`\`python
# Calculate range
data_range = np.max(data) - np.min(data)
print(f"Range: {data_range}")

# Using pandas
range_pandas = df['values'].max() - df['values'].min()
print(f"Range (pandas): {range_pandas}")
\`\`\`

## Variance

Variance measures the average squared deviation from the mean:

**Variance = Σ(x - μ)² / n**

\`\`\`python
# Calculate variance
variance = np.var(data)
print(f"Variance: {variance:.2f}")

# Manual calculation
mean = np.mean(data)
squared_deviations = [(x - mean) ** 2 for x in data]
variance_manual = np.mean(squared_deviations)
print(f"Variance (manual): {variance_manual:.2f}")
\`\`\`

## Standard Deviation

Standard deviation is the square root of variance:

\`\`\`python
# Calculate standard deviation
std_dev = np.std(data)
print(f"Standard Deviation: {std_dev:.2f}")

# Manual calculation
std_dev_manual = np.sqrt(variance_manual)
print(f"Standard Deviation (manual): {std_dev_manual:.2f}")
\`\`\`

## Interquartile Range (IQR)

IQR is the difference between Q3 (75th percentile) and Q1 (25th percentile):

\`\`\`python
# Calculate IQR
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1
print(f"IQR: {iqr:.2f}")

# Using pandas
iqr_pandas = df['values'].quantile(0.75) - df['values'].quantile(0.25)
print(f"IQR (pandas): {iqr_pandas:.2f}")
\`\`\`

## Practice Exercise

Create a comprehensive function to analyze data variability:

\`\`\`python
def analyze_variability(data):
    """
    Calculate all measures of variability
    """
    return {
        'range': np.max(data) - np.min(data),
        'variance': np.var(data),
        'std_dev': np.std(data),
        'iqr': np.percentile(data, 75) - np.percentile(data, 25),
        'q1': np.percentile(data, 25),
        'q3': np.percentile(data, 75)
    }

# Test with sample data
sample_data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
variability = analyze_variability(sample_data)
print(variability)
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Calculate the coefficient of variation (CV = std/mean)',
                starterCode: `
def coefficient_of_variation(data):
    # Your code here
    pass
                `,
                solution: `
def coefficient_of_variation(data):
    return np.std(data) / np.mean(data)
                `
              }
            ]
          }
        ]
      },
      'probability-basics': {
        title: 'Probability Fundamentals',
        description: 'Learn probability concepts essential for data analysis',
        duration: 120,
        difficulty: 'beginner',
        sections: [
          {
            id: 'probability-concepts',
            title: 'Basic Probability Concepts',
            content: `
# Basic Probability Concepts

Probability is the foundation of statistical inference. Let's learn the fundamental concepts.

## What is Probability?

Probability measures the likelihood of an event occurring, ranging from 0 (impossible) to 1 (certain).

## Basic Probability Rules

### 1. Addition Rule
P(A or B) = P(A) + P(B) - P(A and B)

### 2. Multiplication Rule
P(A and B) = P(A) × P(B|A)

### 3. Complement Rule
P(not A) = 1 - P(A)

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

# Simulate coin flips
def simulate_coin_flips(n_flips):
    """Simulate n coin flips"""
    return np.random.choice(['H', 'T'], size=n_flips)

# Calculate empirical probability
def empirical_probability(event_outcomes, total_trials):
    """Calculate empirical probability"""
    return event_outcomes / total_trials

# Example: Coin flip simulation
n_flips = 1000
flips = simulate_coin_flips(n_flips)
heads_count = np.sum(flips == 'H')
heads_probability = empirical_probability(heads_count, n_flips)

print(f"Heads probability: {heads_probability:.3f}")
print(f"Theoretical probability: 0.5")
\`\`\`

## Conditional Probability

Conditional probability is the probability of an event given that another event has occurred:

P(A|B) = P(A and B) / P(B)

\`\`\`python
# Example: Drawing cards from a deck
def simulate_card_draw(n_draws):
    """Simulate drawing cards from a deck"""
    suits = ['hearts', 'diamonds', 'clubs', 'spades']
    ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    
    deck = [f"{rank} of {suit}" for suit in suits for rank in ranks]
    return np.random.choice(deck, size=n_draws, replace=False)

# Calculate probability of drawing a heart given it's red
def conditional_probability_hearts():
    """Calculate P(hearts|red)"""
    red_cards = 26  # hearts + diamonds
    hearts = 13
    
    # P(hearts and red) = P(hearts) since all hearts are red
    p_hearts_and_red = hearts / 52
    p_red = red_cards / 52
    
    p_hearts_given_red = p_hearts_and_red / p_red
    return p_hearts_given_red

print(f"P(hearts|red) = {conditional_probability_hearts():.3f}")
\`\`\`

## Bayes' Theorem

Bayes' theorem relates conditional probabilities:

P(A|B) = P(B|A) × P(A) / P(B)

\`\`\`python
def bayes_theorem(p_a, p_b_given_a, p_b):
    """
    Calculate P(A|B) using Bayes' theorem
    """
    return (p_b_given_a * p_a) / p_b

# Example: Medical test
# P(disease) = 0.01 (1% of population has disease)
# P(positive|disease) = 0.95 (95% accuracy if diseased)
# P(positive|no_disease) = 0.05 (5% false positive)

p_disease = 0.01
p_positive_given_disease = 0.95
p_positive_given_no_disease = 0.05

# Calculate P(positive)
p_positive = (p_positive_given_disease * p_disease + 
              p_positive_given_no_disease * (1 - p_disease))

# Calculate P(disease|positive)
p_disease_given_positive = bayes_theorem(
    p_disease, p_positive_given_disease, p_positive
)

print(f"P(disease|positive test) = {p_disease_given_positive:.3f}")
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Simulate rolling two dice and calculate the probability of getting a sum of 7',
                starterCode: `
def dice_sum_probability(target_sum, n_rolls):
    # Your code here
    pass
                `,
                solution: `
def dice_sum_probability(target_sum, n_rolls):
    count = 0
    for _ in range(n_rolls):
        die1 = np.random.randint(1, 7)
        die2 = np.random.randint(1, 7)
        if die1 + die2 == target_sum:
            count += 1
    return count / n_rolls
                `
              }
            ]
          }
        ]
      }
    },
    programming: {
      'sql-basics': {
        title: 'SQL Fundamentals for Data Analysis',
        description: 'Master SQL for data querying and manipulation',
        duration: 150,
        difficulty: 'beginner',
        sections: [
          {
            id: 'sql-select',
            title: 'SELECT Statements and Basic Queries',
            content: `
# SQL SELECT Statements

SQL (Structured Query Language) is essential for data analysts to extract and manipulate data from databases.

## Basic SELECT Statement

\`\`\`sql
-- Select all columns from a table
SELECT * FROM customers;

-- Select specific columns
SELECT customer_id, name, email FROM customers;

-- Select with aliases
SELECT customer_id AS id, name AS customer_name FROM customers;
\`\`\`

## Filtering with WHERE

\`\`\`sql
-- Filter by single condition
SELECT * FROM customers WHERE age > 25;

-- Filter by multiple conditions
SELECT * FROM customers 
WHERE age > 25 AND city = 'New York';

-- Filter with IN operator
SELECT * FROM customers 
WHERE city IN ('New York', 'Los Angeles', 'Chicago');

-- Filter with LIKE for pattern matching
SELECT * FROM customers 
WHERE name LIKE 'John%';  -- Names starting with John
\`\`\`

## Sorting with ORDER BY

\`\`\`sql
-- Sort in ascending order (default)
SELECT * FROM customers ORDER BY age;

-- Sort in descending order
SELECT * FROM customers ORDER BY age DESC;

-- Sort by multiple columns
SELECT * FROM customers 
ORDER BY city ASC, age DESC;
\`\`\`

## Aggregation Functions

\`\`\`sql
-- Count rows
SELECT COUNT(*) FROM customers;

-- Count non-null values
SELECT COUNT(email) FROM customers;

-- Calculate averages
SELECT AVG(age) FROM customers;

-- Sum values
SELECT SUM(total_spent) FROM customers;

-- Find min and max
SELECT MIN(age), MAX(age) FROM customers;
\`\`\`

## GROUP BY and HAVING

\`\`\`sql
-- Group by city and count customers
SELECT city, COUNT(*) as customer_count 
FROM customers 
GROUP BY city;

-- Group with multiple aggregations
SELECT city, 
       COUNT(*) as customer_count,
       AVG(age) as avg_age,
       SUM(total_spent) as total_revenue
FROM customers 
GROUP BY city;

-- Filter grouped results with HAVING
SELECT city, COUNT(*) as customer_count 
FROM customers 
GROUP BY city 
HAVING COUNT(*) > 10;
\`\`\`

## Practice Exercise

Create a query to analyze customer data:

\`\`\`sql
-- Analyze customer spending by age group
SELECT 
    CASE 
        WHEN age < 25 THEN '18-24'
        WHEN age < 35 THEN '25-34'
        WHEN age < 45 THEN '35-44'
        ELSE '45+'
    END as age_group,
    COUNT(*) as customer_count,
    AVG(total_spent) as avg_spending,
    SUM(total_spent) as total_revenue
FROM customers 
WHERE total_spent > 0
GROUP BY age_group
ORDER BY avg_spending DESC;
\`\`\`

## Common Data Analysis Queries

\`\`\`sql
-- Top 10 customers by spending
SELECT customer_id, name, total_spent 
FROM customers 
ORDER BY total_spent DESC 
LIMIT 10;

-- Customer retention analysis
SELECT 
    registration_year,
    COUNT(*) as new_customers,
    COUNT(CASE WHEN last_purchase_date >= '2024-01-01' THEN 1 END) as active_customers
FROM customers 
GROUP BY registration_year;

-- Revenue by month
SELECT 
    DATE_FORMAT(purchase_date, '%Y-%m') as month,
    SUM(amount) as monthly_revenue,
    COUNT(*) as transaction_count
FROM orders 
GROUP BY month 
ORDER BY month;
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Write a SQL query to find the top 5 products by sales revenue',
                starterCode: `
-- Your SQL query here
SELECT 
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
                `,
                solution: `
SELECT 
    p.product_name,
    SUM(oi.quantity * oi.unit_price) as total_revenue
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC
LIMIT 5;
                `
              }
            ]
          }
        ]
      }
    }
  },
  data_visualization: {
    'python-visualization': {
      'matplotlib-basics': {
        title: 'Data Visualization with Matplotlib',
        description: 'Create effective charts and graphs for data analysis',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'basic-charts',
            title: 'Creating Basic Charts',
            content: `
# Data Visualization with Matplotlib

Data visualization is crucial for understanding and communicating data insights. Matplotlib is the foundation for Python data visualization.

## Setting Up Matplotlib

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Set style for better-looking plots
plt.style.use('seaborn-v0_8')
\`\`\`

## Line Plots

Line plots are great for showing trends over time:

\`\`\`python
# Sample time series data
dates = pd.date_range('2024-01-01', periods=100, freq='D')
values = np.cumsum(np.random.randn(100))

# Create line plot
plt.figure(figsize=(12, 6))
plt.plot(dates, values, linewidth=2, color='blue', alpha=0.7)
plt.title('Time Series Data', fontsize=14, fontweight='bold')
plt.xlabel('Date')
plt.ylabel('Value')
plt.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
\`\`\`

## Bar Charts

Bar charts are perfect for comparing categories:

\`\`\`python
# Sample categorical data
categories = ['A', 'B', 'C', 'D', 'E']
values = [23, 45, 56, 78, 32]

# Create bar chart
plt.figure(figsize=(10, 6))
bars = plt.bar(categories, values, color='skyblue', alpha=0.7)

# Add value labels on bars
for bar, value in zip(bars, values):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
             str(value), ha='center', va='bottom')

plt.title('Category Comparison', fontsize=14, fontweight='bold')
plt.xlabel('Categories')
plt.ylabel('Values')
plt.grid(True, alpha=0.3, axis='y')
plt.show()
\`\`\`

## Scatter Plots

Scatter plots show relationships between two variables:

\`\`\`python
# Generate sample data
np.random.seed(42)
x = np.random.randn(100)
y = 2 * x + np.random.randn(100) * 0.5

# Create scatter plot
plt.figure(figsize=(10, 6))
plt.scatter(x, y, alpha=0.6, color='red', s=50)

# Add trend line
z = np.polyfit(x, y, 1)
p = np.poly1d(z)
plt.plot(x, p(x), "b--", alpha=0.8, linewidth=2)

plt.title('Scatter Plot with Trend Line', fontsize=14, fontweight='bold')
plt.xlabel('X Variable')
plt.ylabel('Y Variable')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Histograms

Histograms show the distribution of data:

\`\`\`python
# Generate sample data
data = np.random.normal(0, 1, 1000)

# Create histogram
plt.figure(figsize=(10, 6))
plt.hist(data, bins=30, alpha=0.7, color='green', edgecolor='black')

plt.title('Data Distribution', fontsize=14, fontweight='bold')
plt.xlabel('Values')
plt.ylabel('Frequency')
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

## Subplots

Create multiple plots in one figure:

\`\`\`python
# Create subplots
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Plot 1: Line plot
axes[0, 0].plot(np.random.randn(50))
axes[0, 0].set_title('Line Plot')

# Plot 2: Bar plot
axes[0, 1].bar(['A', 'B', 'C'], [3, 7, 5])
axes[0, 1].set_title('Bar Plot')

# Plot 3: Scatter plot
axes[1, 0].scatter(np.random.randn(50), np.random.randn(50))
axes[1, 0].set_title('Scatter Plot')

# Plot 4: Histogram
axes[1, 1].hist(np.random.randn(100), bins=20)
axes[1, 1].set_title('Histogram')

plt.tight_layout()
plt.show()
\`\`\`

## Practice Exercise

Create a comprehensive visualization function:

\`\`\`python
def create_data_dashboard(data, title="Data Dashboard"):
    """
    Create a dashboard with multiple visualizations
    """
    fig, axes = plt.subplots(2, 2, figsize=(15, 12))
    
    # Histogram
    axes[0, 0].hist(data, bins=20, alpha=0.7, color='skyblue')
    axes[0, 0].set_title('Distribution')
    axes[0, 0].grid(True, alpha=0.3)
    
    # Box plot
    axes[0, 1].boxplot(data)
    axes[0, 1].set_title('Box Plot')
    axes[0, 1].grid(True, alpha=0.3)
    
    # Line plot (cumulative)
    cumulative = np.cumsum(data)
    axes[1, 0].plot(cumulative, color='red')
    axes[1, 0].set_title('Cumulative Sum')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Scatter plot (data vs index)
    axes[1, 1].scatter(range(len(data)), data, alpha=0.6)
    axes[1, 1].set_title('Data vs Index')
    axes[1, 1].grid(True, alpha=0.3)
    
    plt.suptitle(title, fontsize=16, fontweight='bold')
    plt.tight_layout()
    plt.show()

# Test the function
sample_data = np.random.normal(0, 1, 100)
create_data_dashboard(sample_data, "Sample Data Analysis")
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Create a function to plot correlation matrix heatmap',
                starterCode: `
def plot_correlation_heatmap(data):
    # Your code here
    pass
                `,
                solution: `
def plot_correlation_heatmap(data):
    import seaborn as sns
    
    corr_matrix = data.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0)
    plt.title('Correlation Matrix')
    plt.tight_layout()
    plt.show()
                `
              }
            ]
          }
        ]
      }
    }
  }
};

export default dataAnalystContent; 