// Real AI Red Teaming Learning Content
export const aiRedTeamingContent = {
  fundamentals: {
    cybersecurity: {
      'threat-modeling': {
        title: 'Threat Modeling for AI Systems',
        description: 'Learn to identify and analyze security threats in AI systems',
        duration: 120,
        difficulty: 'intermediate',
        sections: [
          {
            id: 'stride-framework',
            title: 'STRIDE Threat Modeling Framework',
            content: `
# STRIDE Threat Modeling Framework

STRIDE is a threat modeling framework that helps identify security threats in software systems, including AI systems.

## STRIDE Categories

- **S**poofing: Impersonating someone or something else
- **T**ampering: Modifying data or code
- **R**epudiation: Denying actions or events
- **I**nformation Disclosure: Exposing sensitive information
- **D**enial of Service: Preventing legitimate use
- **E**levation of Privilege: Gaining unauthorized access

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Define STRIDE threat categories
stride_categories = {
    'Spoofing': 'Impersonating users, models, or data sources',
    'Tampering': 'Modifying training data, model parameters, or inputs',
    'Repudiation': 'Denying model predictions or data usage',
    'Information Disclosure': 'Exposing sensitive training data or model internals',
    'Denial of Service': 'Overwhelming AI systems with malicious inputs',
    'Elevation of Privilege': 'Gaining unauthorized model access or control'
}

# Create threat assessment framework
class AISystemThreatModel:
    def __init__(self, system_name):
        self.system_name = system_name
        self.threats = []
        self.risk_scores = {}
    
    def add_threat(self, category, description, likelihood, impact):
        """
        Add a threat to the model
        likelihood and impact: 1-5 scale
        """
        threat = {
            'category': category,
            'description': description,
            'likelihood': likelihood,
            'impact': impact,
            'risk_score': likelihood * impact
        }
        self.threats.append(threat)
        return threat
    
    def calculate_risk_scores(self):
        """
        Calculate risk scores for each STRIDE category
        """
        for category in stride_categories.keys():
            category_threats = [t for t in self.threats if t['category'] == category]
            if category_threats:
                avg_risk = sum(t['risk_score'] for t in category_threats) / len(category_threats)
                self.risk_scores[category] = avg_risk
            else:
                self.risk_scores[category] = 0
    
    def generate_report(self):
        """
        Generate a threat modeling report
        """
        self.calculate_risk_scores()
        
        print(f"Threat Model Report for {self.system_name}")
        print("=" * 50)
        
        # Overall risk assessment
        total_risk = sum(self.risk_scores.values())
        print(f"Total Risk Score: {total_risk:.2f}")
        
        # Risk by category
        print("\\nRisk by STRIDE Category:")
        for category, risk in sorted(self.risk_scores.items(), key=lambda x: x[1], reverse=True):
            print(f"{category}: {risk:.2f}")
        
        # High-risk threats
        high_risk_threats = [t for t in self.threats if t['risk_score'] >= 15]
        if high_risk_threats:
            print("\\nHigh-Risk Threats (Score >= 15):")
            for threat in high_risk_threats:
                print(f"- {threat['category']}: {threat['description']} (Score: {threat['risk_score']})")
        
        return {
            'total_risk': total_risk,
            'risk_scores': self.risk_scores,
            'high_risk_threats': high_risk_threats
        }

# Example: Threat modeling for a machine learning API
ml_api_threats = AISystemThreatModel("Machine Learning API")

# Add threats
ml_api_threats.add_threat(
    'Spoofing', 
    'Adversary impersonates legitimate API users', 
    3, 4
)

ml_api_threats.add_threat(
    'Tampering', 
    'Adversary modifies input data to manipulate predictions', 
    4, 5
)

ml_api_threats.add_threat(
    'Information Disclosure', 
    'Model inversion attacks reveal training data', 
    2, 5
)

ml_api_threats.add_threat(
    'Denial of Service', 
    'Adversarial examples cause model failures', 
    4, 3
)

ml_api_threats.add_threat(
    'Elevation of Privilege', 
    'Adversary gains admin access to model parameters', 
    1, 5
)

# Generate report
report = ml_api_threats.generate_report()

# Visualize risk scores
plt.figure(figsize=(12, 6))
categories = list(report['risk_scores'].keys())
scores = list(report['risk_scores'].values())

plt.bar(categories, scores, color='red', alpha=0.7)
plt.title('STRIDE Risk Assessment for ML API')
plt.xlabel('Threat Category')
plt.ylabel('Risk Score')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
\`\`\`

## AI-Specific Threat Vectors

### 1. Model Inversion Attacks
\`\`\`python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
import matplotlib.pyplot as plt

class ModelInversionAttack:
    def __init__(self, target_model):
        self.target_model = target_model
        self.reconstructed_data = []
    
    def reconstruct_training_data(self, target_class, n_queries=1000, learning_rate=0.01):
        """
        Attempt to reconstruct training data using model queries
        """
        # Initialize random data
        n_features = self.target_model.coef_.shape[1]
        reconstructed = np.random.randn(n_features)
        
        for _ in range(n_queries):
            # Query the model
            prediction = self.target_model.predict_proba([reconstructed])[0]
            
            # Calculate gradient (simplified)
            if target_class == 1:
                gradient = prediction[1] - 0.5
            else:
                gradient = prediction[0] - 0.5
            
            # Update reconstructed data
            reconstructed += learning_rate * gradient * np.random.randn(n_features)
            
            # Normalize
            reconstructed = np.clip(reconstructed, -3, 3)
        
        return reconstructed
    
    def evaluate_reconstruction(self, original_data, reconstructed_data):
        """
        Evaluate the quality of reconstruction
        """
        # Calculate correlation
        correlation = np.corrcoef(original_data.flatten(), reconstructed_data.flatten())[0, 1]
        
        # Calculate mean squared error
        mse = np.mean((original_data - reconstructed_data) ** 2)
        
        return {
            'correlation': correlation,
            'mse': mse,
            'reconstruction_quality': 'Good' if correlation > 0.7 else 'Poor'
        }

# Generate sample data and train model
X, y = make_classification(n_samples=1000, n_features=10, n_informative=5, random_state=42)
model = LogisticRegression(random_state=42)
model.fit(X, y)

# Perform model inversion attack
attack = ModelInversionAttack(model)

# Reconstruct data for class 1
reconstructed_class_1 = attack.reconstruct_training_data(target_class=1)

# Evaluate reconstruction
original_class_1_data = X[y == 1]
if len(original_class_1_data) > 0:
    evaluation = attack.evaluate_reconstruction(
        original_class_1_data[0], 
        reconstructed_class_1
    )
    
    print("Model Inversion Attack Results:")
    print(f"Correlation with original: {evaluation['correlation']:.3f}")
    print(f"Mean Squared Error: {evaluation['mse']:.3f}")
    print(f"Reconstruction Quality: {evaluation['reconstruction_quality']}")

# Visualize reconstruction
plt.figure(figsize=(12, 4))

plt.subplot(1, 2, 1)
plt.hist(original_class_1_data[0], alpha=0.7, label='Original', bins=20)
plt.title('Original Training Data Distribution')
plt.xlabel('Feature Values')
plt.ylabel('Frequency')

plt.subplot(1, 2, 2)
plt.hist(reconstructed_class_1, alpha=0.7, label='Reconstructed', bins=20, color='red')
plt.title('Reconstructed Data Distribution')
plt.xlabel('Feature Values')
plt.ylabel('Frequency')

plt.tight_layout()
plt.show()
\`\`\`

### 2. Membership Inference Attacks
\`\`\`python
class MembershipInferenceAttack:
    def __init__(self, target_model):
        self.target_model = target_model
        self.shadow_models = []
    
    def train_shadow_models(self, shadow_data, n_shadow_models=5):
        """
        Train shadow models to learn membership inference patterns
        """
        for i in range(n_shadow_models):
            # Split shadow data into train/test
            train_idx = np.random.choice(len(shadow_data), size=len(shadow_data)//2, replace=False)
            test_idx = np.setdiff1d(np.arange(len(shadow_data)), train_idx)
            
            # Train shadow model
            shadow_model = LogisticRegression(random_state=42+i)
            shadow_model.fit(shadow_data[train_idx], np.ones(len(train_idx)))
            
            # Generate membership inference training data
            train_predictions = shadow_model.predict_proba(shadow_data[train_idx])
            test_predictions = shadow_model.predict_proba(shadow_data[test_idx])
            
            # Create membership inference dataset
            membership_data = np.vstack([
                np.column_stack([train_predictions, np.ones(len(train_predictions))]),
                np.column_stack([test_predictions, np.zeros(len(test_predictions))])
            ])
            
            # Train membership inference classifier
            membership_classifier = LogisticRegression(random_state=42+i)
            membership_classifier.fit(membership_data[:, :-1], membership_data[:, -1])
            
            self.shadow_models.append({
                'shadow_model': shadow_model,
                'membership_classifier': membership_classifier
            })
    
    def infer_membership(self, target_data):
        """
        Infer whether target data was used in training
        """
        predictions = self.target_model.predict_proba(target_data)
        
        # Use shadow models to make membership predictions
        membership_scores = []
        for shadow_info in self.shadow_models:
            score = shadow_info['membership_classifier'].predict_proba(predictions)[:, 1]
            membership_scores.append(score)
        
        # Average predictions from all shadow models
        avg_membership_score = np.mean(membership_scores, axis=0)
        membership_prediction = (avg_membership_score > 0.5).astype(int)
        
        return {
            'membership_scores': avg_membership_score,
            'membership_predictions': membership_prediction,
            'confidence': np.abs(avg_membership_score - 0.5) * 2
        }

# Generate shadow data
shadow_X, _ = make_classification(n_samples=2000, n_features=10, n_informative=5, random_state=123)

# Perform membership inference attack
mia_attack = MembershipInferenceAttack(model)
mia_attack.train_shadow_models(shadow_X, n_shadow_models=3)

# Test membership inference
test_data = X[:100]  # Assume first 100 samples are training data
membership_results = mia_attack.infer_membership(test_data)

print("Membership Inference Attack Results:")
print(f"Average membership score: {np.mean(membership_results['membership_scores']):.3f}")
print(f"Predicted members: {np.sum(membership_results['membership_predictions'])}")
print(f"Average confidence: {np.mean(membership_results['confidence']):.3f}")

# Visualize membership scores
plt.figure(figsize=(10, 6))
plt.hist(membership_results['membership_scores'], bins=20, alpha=0.7)
plt.axvline(0.5, color='red', linestyle='--', label='Decision Threshold')
plt.xlabel('Membership Score')
plt.ylabel('Frequency')
plt.title('Membership Inference Attack Results')
plt.legend()
plt.show()
\`\`\`

## Practice Exercise

Create a comprehensive threat assessment tool:

\`\`\`python
def comprehensive_ai_threat_assessment(ai_system_config):
    """
    Perform comprehensive threat assessment for AI systems
    """
    threat_model = AISystemThreatModel(ai_system_config['name'])
    
    # Add AI-specific threats based on system configuration
    if ai_system_config.get('api_access', False):
        threat_model.add_threat('Spoofing', 'API key theft or impersonation', 3, 4)
        threat_model.add_threat('Tampering', 'Input manipulation attacks', 4, 5)
    
    if ai_system_config.get('sensitive_data', False):
        threat_model.add_threat('Information Disclosure', 'Training data extraction', 2, 5)
        threat_model.add_threat('Repudiation', 'Data usage denial', 3, 3)
    
    if ai_system_config.get('real_time', False):
        threat_model.add_threat('Denial of Service', 'Adversarial example flooding', 4, 4)
    
    if ai_system_config.get('model_updates', False):
        threat_model.add_threat('Elevation of Privilege', 'Model parameter manipulation', 2, 5)
    
    # Generate report
    report = threat_model.generate_report()
    
    # Add mitigation recommendations
    mitigations = {
        'Spoofing': ['Implement strong authentication', 'Use API keys with expiration'],
        'Tampering': ['Input validation and sanitization', 'Adversarial training'],
        'Information Disclosure': ['Differential privacy', 'Model obfuscation'],
        'Denial of Service': ['Rate limiting', 'Input filtering'],
        'Elevation of Privilege': ['Access controls', 'Model versioning']
    }
    
    print("\\nRecommended Mitigations:")
    for category, risk in report['risk_scores'].items():
        if risk > 10:  # High risk categories
            print(f"\\n{category} (Risk: {risk:.2f}):")
            for mitigation in mitigations.get(category, []):
                print(f"  - {mitigation}")
    
    return report

# Test the comprehensive assessment
ai_config = {
    'name': 'Customer Sentiment Analysis API',
    'api_access': True,
    'sensitive_data': True,
    'real_time': True,
    'model_updates': False
}

assessment = comprehensive_ai_threat_assessment(ai_config)
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement a basic adversarial example generator',
                starterCode: `
def generate_adversarial_example(model, original_input, target_class, epsilon=0.1):
    # Your code here
    pass
                `,
                solution: `
def generate_adversarial_example(model, original_input, target_class, epsilon=0.1):
    import tensorflow as tf
    
    # Convert to tensor
    input_tensor = tf.convert_to_tensor(original_input.reshape(1, -1), dtype=tf.float32)
    
    with tf.GradientTape() as tape:
        tape.watch(input_tensor)
        prediction = model(input_tensor)
        loss = tf.keras.losses.sparse_categorical_crossentropy(target_class, prediction)
    
    # Calculate gradient
    gradient = tape.gradient(loss, input_tensor)
    
    # Generate adversarial example
    adversarial_input = input_tensor + epsilon * tf.sign(gradient)
    
    return adversarial_input.numpy().flatten()
                `
              }
            ]
          }
        ]
      }
    },
    adversarial_attacks: {
      'evasion-attacks': {
        title: 'Evasion Attacks on AI Systems',
        description: 'Learn to create and defend against adversarial examples',
        duration: 150,
        difficulty: 'advanced',
        sections: [
          {
            id: 'fast-gradient-sign-method',
            title: 'Fast Gradient Sign Method (FGSM)',
            content: `
# Fast Gradient Sign Method (FGSM)

FGSM is a simple but effective method for generating adversarial examples by adding perturbations in the direction of the gradient.

## Mathematical Foundation

The FGSM attack generates adversarial examples using:

**x_adv = x + ε * sign(∇x J(x, y))**

Where:
- x is the original input
- ε is the perturbation size
- J(x, y) is the loss function
- sign() returns the sign of the gradient

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
import tensorflow as tf

# Generate sample data
X, y = make_classification(n_samples=1000, n_features=20, n_informative=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a simple neural network
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(20,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(2, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, batch_size=32, verbose=0)

# FGSM Implementation
class FGSMAttack:
    def __init__(self, model, epsilon=0.1):
        self.model = model
        self.epsilon = epsilon
    
    def generate_adversarial_examples(self, X, y):
        """
        Generate adversarial examples using FGSM
        """
        X_tensor = tf.convert_to_tensor(X, dtype=tf.float32)
        y_tensor = tf.convert_to_tensor(y, dtype=tf.int32)
        
        with tf.GradientTape() as tape:
            tape.watch(X_tensor)
            predictions = self.model(X_tensor)
            loss = tf.keras.losses.sparse_categorical_crossentropy(y_tensor, predictions)
        
        # Calculate gradients
        gradients = tape.gradient(loss, X_tensor)
        
        # Generate adversarial examples
        perturbations = self.epsilon * tf.sign(gradients)
        X_adv = X_tensor + perturbations
        
        # Clip to valid range
        X_adv = tf.clip_by_value(X_adv, 0, 1)
        
        return X_adv.numpy()
    
    def evaluate_attack(self, X_original, y_original, X_adv):
        """
        Evaluate the effectiveness of the attack
        """
        # Original accuracy
        original_predictions = self.model.predict(X_original)
        original_accuracy = np.mean(np.argmax(original_predictions, axis=1) == y_original)
        
        # Adversarial accuracy
        adv_predictions = self.model.predict(X_adv)
        adv_accuracy = np.mean(np.argmax(adv_predictions, axis=1) == y_original)
        
        # Perturbation magnitude
        perturbation_magnitude = np.mean(np.linalg.norm(X_adv - X_original, axis=1))
        
        return {
            'original_accuracy': original_accuracy,
            'adversarial_accuracy': adv_accuracy,
            'accuracy_drop': original_accuracy - adv_accuracy,
            'perturbation_magnitude': perturbation_magnitude
        }

# Test FGSM attack
fgsm_attack = FGSMAttack(model, epsilon=0.1)

# Generate adversarial examples
X_test_adv = fgsm_attack.generate_adversarial_examples(X_test, y_test)

# Evaluate attack
attack_results = fgsm_attack.evaluate_attack(X_test, y_test, X_test_adv)

print("FGSM Attack Results:")
print(f"Original Accuracy: {attack_results['original_accuracy']:.3f}")
print(f"Adversarial Accuracy: {attack_results['adversarial_accuracy']:.3f}")
print(f"Accuracy Drop: {attack_results['accuracy_drop']:.3f}")
print(f"Average Perturbation: {attack_results['perturbation_magnitude']:.3f}")

# Visualize perturbations
plt.figure(figsize=(15, 5))

# Original vs Adversarial
plt.subplot(1, 3, 1)
plt.scatter(X_test[:, 0], X_test[:, 1], c=y_test, alpha=0.6, label='Original')
plt.title('Original Data')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')

plt.subplot(1, 3, 2)
plt.scatter(X_test_adv[:, 0], X_test_adv[:, 1], c=y_test, alpha=0.6, label='Adversarial')
plt.title('Adversarial Data')
plt.xlabel('Feature 1')
plt.ylabel('Feature 2')

# Perturbations
plt.subplot(1, 3, 3)
perturbations = X_test_adv - X_test
plt.hist(perturbations.flatten(), bins=50, alpha=0.7)
plt.title('Perturbation Distribution')
plt.xlabel('Perturbation Magnitude')
plt.ylabel('Frequency')

plt.tight_layout()
plt.show()
\`\`\`

## Projected Gradient Descent (PGD)

PGD is an iterative version of FGSM that provides stronger attacks:

\`\`\`python
class PGDAttack:
    def __init__(self, model, epsilon=0.1, alpha=0.01, iterations=10):
        self.model = model
        self.epsilon = epsilon
        self.alpha = alpha
        self.iterations = iterations
    
    def generate_adversarial_examples(self, X, y):
        """
        Generate adversarial examples using PGD
        """
        X_tensor = tf.convert_to_tensor(X, dtype=tf.float32)
        y_tensor = tf.convert_to_tensor(y, dtype=tf.int32)
        
        # Initialize adversarial examples
        X_adv = X_tensor + tf.random.uniform(X_tensor.shape, -self.epsilon, self.epsilon)
        X_adv = tf.clip_by_value(X_adv, 0, 1)
        
        for _ in range(self.iterations):
            with tf.GradientTape() as tape:
                tape.watch(X_adv)
                predictions = self.model(X_adv)
                loss = tf.keras.losses.sparse_categorical_crossentropy(y_tensor, predictions)
            
            # Calculate gradients
            gradients = tape.gradient(loss, X_adv)
            
            # Update adversarial examples
            X_adv = X_adv + self.alpha * tf.sign(gradients)
            
            # Project back to epsilon ball
            delta = X_adv - X_tensor
            delta = tf.clip_by_value(delta, -self.epsilon, self.epsilon)
            X_adv = X_tensor + delta
            
            # Clip to valid range
            X_adv = tf.clip_by_value(X_adv, 0, 1)
        
        return X_adv.numpy()

# Test PGD attack
pgd_attack = PGDAttack(model, epsilon=0.1, alpha=0.01, iterations=10)
X_test_pgd = pgd_attack.generate_adversarial_examples(X_test, y_test)

# Compare FGSM vs PGD
fgsm_results = fgsm_attack.evaluate_attack(X_test, y_test, X_test_adv)
pgd_results = fgsm_attack.evaluate_attack(X_test, y_test, X_test_pgd)

print("\\nAttack Comparison:")
print(f"{'Metric':<20} {'FGSM':<10} {'PGD':<10}")
print("-" * 40)
print(f"{'Original Accuracy':<20} {fgsm_results['original_accuracy']:<10.3f} {pgd_results['original_accuracy']:<10.3f}")
print(f"{'Adversarial Accuracy':<20} {fgsm_results['adversarial_accuracy']:<10.3f} {pgd_results['adversarial_accuracy']:<10.3f}")
print(f"{'Accuracy Drop':<20} {fgsm_results['accuracy_drop']:<10.3f} {pgd_results['accuracy_drop']:<10.3f}")
print(f"{'Perturbation':<20} {fgsm_results['perturbation_magnitude']:<10.3f} {pgd_results['perturbation_magnitude']:<10.3f}")
\`\`\`

## Adversarial Training Defense

\`\`\`python
class AdversarialTraining:
    def __init__(self, model, attack_method, epsilon=0.1):
        self.model = model
        self.attack_method = attack_method
        self.epsilon = epsilon
    
    def train_with_adversarial_examples(self, X_train, y_train, epochs=10, batch_size=32):
        """
        Train model with adversarial examples
        """
        for epoch in range(epochs):
            print(f"Epoch {epoch+1}/{epochs}")
            
            # Generate adversarial examples for training
            X_adv = self.attack_method.generate_adversarial_examples(X_train, y_train)
            
            # Combine original and adversarial data
            X_combined = np.vstack([X_train, X_adv])
            y_combined = np.hstack([y_train, y_train])
            
            # Train model
            self.model.fit(X_combined, y_combined, epochs=1, batch_size=batch_size, verbose=0)
            
            # Evaluate robustness
            if epoch % 2 == 0:
                test_adv = self.attack_method.generate_adversarial_examples(X_test, y_test)
                test_results = self.attack_method.evaluate_attack(X_test, y_test, test_adv)
                print(f"  Test Accuracy: {test_results['adversarial_accuracy']:.3f}")

# Train robust model
robust_model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(20,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(2, activation='softmax')
])

robust_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Adversarial training
adv_trainer = AdversarialTraining(robust_model, fgsm_attack, epsilon=0.1)
adv_trainer.train_with_adversarial_examples(X_train, y_train, epochs=5)

# Compare robustness
original_adv = fgsm_attack.generate_adversarial_examples(X_test, y_test)
robust_adv = fgsm_attack.generate_adversarial_examples(X_test, y_test)

original_results = fgsm_attack.evaluate_attack(X_test, y_test, original_adv)
robust_results = fgsm_attack.evaluate_attack(X_test, y_test, robust_adv)

print("\\nRobustness Comparison:")
print(f"{'Model':<15} {'Clean Accuracy':<15} {'Adversarial Accuracy':<20}")
print("-" * 50)
print(f"{'Original':<15} {original_results['original_accuracy']:<15.3f} {original_results['adversarial_accuracy']:<20.3f}")
print(f"{'Robust':<15} {robust_results['original_accuracy']:<15.3f} {robust_results['adversarial_accuracy']:<20.3f}")
\`\`\`

## Practice Exercise

Create a comprehensive adversarial attack evaluation framework:

\`\`\`python
def evaluate_adversarial_robustness(model, X_test, y_test, attack_methods, epsilons=[0.01, 0.05, 0.1, 0.15, 0.2]):
    """
    Evaluate model robustness against multiple attacks and perturbation sizes
    """
    results = {}
    
    for attack_name, attack_class in attack_methods.items():
        results[attack_name] = {}
        
        for epsilon in epsilons:
            attack = attack_class(model, epsilon=epsilon)
            X_adv = attack.generate_adversarial_examples(X_test, y_test)
            
            attack_results = attack.evaluate_attack(X_test, y_test, X_adv)
            results[attack_name][epsilon] = attack_results
    
    # Visualize results
    plt.figure(figsize=(15, 5))
    
    for i, attack_name in enumerate(attack_methods.keys()):
        plt.subplot(1, len(attack_methods), i+1)
        
        epsilons = list(results[attack_name].keys())
        accuracies = [results[attack_name][eps]['adversarial_accuracy'] for eps in epsilons]
        
        plt.plot(epsilons, accuracies, marker='o', label=attack_name)
        plt.xlabel('Epsilon')
        plt.ylabel('Adversarial Accuracy')
        plt.title(f'{attack_name} Attack')
        plt.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()
    
    return results

# Test the evaluation framework
attack_methods = {
    'FGSM': FGSMAttack,
    'PGD': PGDAttack
}

robustness_results = evaluate_adversarial_robustness(
    robust_model, X_test, y_test, attack_methods
)
\`\`\`
            `,
            exercises: [
              {
                type: 'coding',
                question: 'Implement Carlini & Wagner (C&W) attack',
                starterCode: `
def carlini_wagner_attack(model, X, y, c=1.0, steps=1000):
    # Your code here
    pass
                `,
                solution: `
def carlini_wagner_attack(model, X, y, c=1.0, steps=1000):
    # Simplified C&W implementation
    X_tensor = tf.convert_to_tensor(X, dtype=tf.float32)
    y_tensor = tf.convert_to_tensor(y, dtype=tf.int32)
    
    # Initialize perturbation
    delta = tf.Variable(tf.zeros_like(X_tensor))
    
    optimizer = tf.keras.optimizers.Adam(learning_rate=0.01)
    
    for step in range(steps):
        with tf.GradientTape() as tape:
            X_adv = X_tensor + delta
            predictions = model(X_adv)
            
            # C&W loss function
            target_logit = tf.reduce_sum(predictions * tf.one_hot(y_tensor, 2), axis=1)
            max_other_logit = tf.reduce_max(predictions * (1 - tf.one_hot(y_tensor, 2)), axis=1)
            
            loss = tf.reduce_mean(tf.maximum(0.0, max_other_logit - target_logit + c))
            loss += 0.1 * tf.reduce_mean(tf.square(delta))
        
        gradients = tape.gradient(loss, delta)
        optimizer.apply_gradients([(gradients, delta)])
    
    return (X_tensor + delta).numpy()
                `
              }
            ]
          }
        ]
      }
    }
  }
};

export default aiRedTeamingContent; 