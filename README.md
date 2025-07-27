# AGI Learning Platform

A comprehensive, interactive learning platform designed to guide users through the complete journey of becoming an AI/AGI engineer. Built with React, TypeScript, and modern web technologies.

## 🚀 Features

### 📚 Comprehensive Learning Path
- **11 Main Categories** covering the complete AI/AGI roadmap
- **Interactive Lessons** with real-world examples and practical applications
- **Progress Tracking** with detailed analytics and achievements
- **Adaptive Learning** based on user progress and preferences

### 🎮 Gamification System
- **XP & Leveling System** with 100+ levels
- **Achievements** with 30+ unlockable badges
- **Daily Challenges** to maintain engagement
- **Study Streaks** and progress tracking
- **Real-time Notifications** for achievements and milestones

### ⏱️ Study Tools
- **Pomodoro Timer** with customizable settings
- **Session Tracking** with detailed statistics
- **Break Reminders** and productivity tips
- **Study Time Analytics** and insights

### 📊 Progress Dashboard
- **Visual Analytics** with charts and graphs
- **Skill Assessment** across different domains
- **Learning Velocity** tracking
- **Achievement Gallery** with unlock history

### 🎨 Modern UI/UX
- **Responsive Design** for all devices
- **Dark/Light Theme** with system preference detection
- **Smooth Animations** and transitions
- **Accessibility Features** with keyboard navigation

### 🔧 Interactive Features
- **Code Editor** with syntax highlighting
- **Interactive Visualizations** for complex concepts
- **Quiz Engine** with multiple question types
- **Note-taking System** with auto-save
- **Section Summaries** for better retention

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agi-learning-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── CategoryPage.jsx # Category overview
│   ├── LessonPage.jsx  # Individual lessons
│   ├── ProgressDashboard.jsx # Progress analytics
│   ├── StudyTimer.jsx  # Pomodoro timer
│   ├── GamificationWidget.jsx # XP/achievements
│   └── ...
├── contexts/           # React contexts
│   ├── GamificationContext.jsx # XP, achievements, challenges
│   └── ThemeContext.jsx # Theme management
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Images and static files
```

## 🎯 Learning Categories

### 1. AI Engineer Fundamentals
- Mathematics (Linear Algebra, Calculus, Statistics)
- Python Programming & Libraries
- Machine Learning Fundamentals
- Deep Learning & Neural Networks

### 2. Data Analyst Track
- Statistics & Probability
- Microsoft Excel Mastery
- SQL & Database Management
- Business Intelligence Tools

### 3. AI Data Scientist Track
- Data Science Lifecycle
- Feature Engineering & Selection
- Model Deployment & MLOps
- Big Data Tools

### 4. Computer Vision
- Image Processing Fundamentals
- CNN Architectures
- Object Detection & Recognition
- Image Segmentation

### 5. Natural Language Processing
- Text Preprocessing & Tokenization
- Language Models & Transformers
- Sentiment Analysis & Classification
- LLM Applications & Fine-tuning

### 6. Generative AI
- GANs & Generative Models
- Diffusion Models
- Prompt Engineering
- Multimodal AI Systems

### 7. AI Agents & Autonomous Systems
- Reinforcement Learning
- Multi-Agent Systems
- Autonomous Agents
- Agent Frameworks & Tools

### 8. AI Red Teaming & Security
- Adversarial Attacks & Defense
- AI Model Security Testing
- Data Poisoning & Protection
- AI Safety & Robustness Testing

### 9. MLOps & Production AI
- Model Deployment Strategies
- CI/CD for Machine Learning
- Model Monitoring & Observability
- Scalable ML Infrastructure

### 10. Cloud AI Platforms
- AWS AI/ML Services
- Google Cloud AI Platform
- Azure Machine Learning
- Edge AI & Mobile Deployment

### 11. AI Ethics & Governance
- Responsible AI Development
- Bias Detection & Mitigation
- Explainable AI (XAI)
- AI Governance & Compliance

### 12. Specialized AI Domains
- Healthcare AI Applications
- AI in Finance & FinTech
- Autonomous Vehicles & Robotics
- AI for Scientific Research

## 🎮 Gamification Features

### XP System
- **100+ Levels** with increasing XP requirements
- **Multiple XP Sources**: lessons, notes, summaries, quizzes, study time
- **Level-based Achievements** with special rewards

### Achievements
- **Learning Achievements**: First lesson, lesson streaks, milestone completions
- **Note-taking Achievements**: Note count milestones, quality metrics
- **Quiz Achievements**: Perfect scores, quiz streaks
- **Study Time Achievements**: Session length, total study time
- **Special Achievements**: Early bird, night owl, weekend warrior

### Daily Challenges
- **5 Challenge Types**: Complete lesson, write notes, summarize, study time, perfect quiz
- **Daily Reset**: New challenges every day
- **Bonus XP**: Extra rewards for completing challenges

## ⏱️ Study Timer Features

### Pomodoro Technique
- **Customizable Intervals**: Focus time, short breaks, long breaks
- **Auto-start Options**: Automatic progression between sessions
- **Session Statistics**: Completed pomodoros, total focus time
- **Notifications**: Sound and browser notifications

### Settings
- **Timer Durations**: Adjustable focus and break times
- **Automation**: Auto-start breaks and pomodoros
- **Notifications**: Sound and browser notification toggles
- **Long Break Interval**: Configure when long breaks occur

## 📊 Progress Dashboard

### Overview Tab
- **Category Progress**: Visual progress bars for each category
- **Skill Assessment**: Skill level indicators across domains
- **Quick Stats**: Day streak, notes written, summaries, study time

### Progress Tab
- **Weekly Study Activity**: Bar chart of study hours and sections
- **Learning Velocity**: Line chart of sections completed over time
- **Study Distribution**: Pie chart of time spent by category

### Achievements Tab
- **Achievement Gallery**: All available achievements with unlock status
- **Recent Unlocks**: Recently earned achievements
- **Progress Tracking**: Achievement completion percentages

### Analytics Tab
- **Learning Insights**: Peak learning times, average sessions, best subjects
- **Detailed Statistics**: Comprehensive learning metrics
- **Performance Trends**: Long-term progress analysis

## 🎨 Theme System

### Theme Options
- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes for extended study sessions
- **System Theme**: Automatically follows OS preference

### Features
- **Persistent Storage**: Remembers user preference
- **System Detection**: Automatically detects OS theme
- **Smooth Transitions**: Animated theme switching

## 🔧 Development

### Available Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
```

### Code Quality
- **ESLint**: Code linting and style enforcement
- **TypeScript**: Type safety and better development experience
- **Prettier**: Code formatting (via ESLint)

### Performance
- **Code Splitting**: Automatic chunk optimization
- **Lazy Loading**: Components loaded on demand
- **Optimized Builds**: Production-ready optimizations

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adaptive layout with touch-friendly controls
- **Mobile**: Mobile-first design with collapsible navigation

## 🔒 Data Persistence

All user data is stored locally using:
- **localStorage**: Notes, summaries, progress data
- **Session Storage**: Temporary session data
- **No External Dependencies**: Privacy-focused, works offline

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `pnpm build`
3. Set output directory: `dist`
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide React** for the comprehensive icon set
- **Recharts** for the data visualization components
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

For questions, issues, or feature requests, please open an issue on GitHub.

---

**Happy Learning! 🚀** 