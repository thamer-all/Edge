import React, { useState } from 'react';
import { Search, BookOpen, MessageCircle, Video, FileText, ChevronDown, ChevronRight, HelpCircle, Lightbulb, Zap, Shield, Users, Clock, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const quickHelp = [
    {
      icon: BookOpen,
      title: 'Getting Started Guide',
      description: 'Learn the basics of navigating our platform',
      link: '#getting-started'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides for all features',
      link: '#tutorials'
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other learners and get help',
      link: '#community'
    },
    {
      icon: FileText,
      title: 'Documentation',
      description: 'Comprehensive technical documentation',
      link: '#docs'
    }
  ];

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I choose the right learning path?',
          answer: 'Our AI-powered assessment helps determine your skill level and goals. Take the initial quiz when you sign up, and we\'ll recommend the best roadmap. You can also browse our detailed course descriptions and prerequisites to make an informed choice.'
        },
        {
          question: 'Do I need programming experience to start?',
          answer: 'Not necessarily! We offer beginner-friendly paths that start with programming fundamentals. However, having basic programming knowledge in Python will help you progress faster in AI and ML courses.'
        },
        {
          question: 'How long does it take to complete a roadmap?',
          answer: 'Completion time varies by roadmap and your pace. Typically: Data Analyst (4-6 months), AI Engineer (6-8 months), AI Data Scientist (8-12 months). Our adaptive learning system adjusts to your schedule.'
        },
        {
          question: 'Can I switch between different roadmaps?',
          answer: 'Absolutely! Your progress is saved, and you can explore multiple paths. Many concepts overlap between roadmaps, so your learning carries over.'
        }
      ]
    },
    {
      category: 'Learning Experience',
      questions: [
        {
          question: 'How does the AI tutor work?',
          answer: 'Our AI tutor analyzes your learning patterns, identifies knowledge gaps, and provides personalized explanations. It adapts to your learning style and provides real-time help during lessons.'
        },
        {
          question: 'What are the hands-on projects like?',
          answer: 'Each roadmap includes real-world projects using industry-standard tools. You\'ll build portfolios with projects like image classifiers, recommendation systems, and data analysis dashboards.'
        },
        {
          question: 'How do quizzes and assessments work?',
          answer: 'We use adaptive quizzing that adjusts difficulty based on your performance. Immediate feedback helps reinforce learning, and spaced repetition ensures long-term retention.'
        },
        {
          question: 'Can I learn at my own pace?',
          answer: 'Yes! Our platform is designed for self-paced learning. Set your goals, and we\'ll create a personalized schedule. You can speed up or slow down as needed.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'What if I encounter technical issues?',
          answer: 'Use our in-platform help chat, check the troubleshooting guide, or contact support. Common issues are usually resolved within minutes using our self-help resources.'
        },
        {
          question: 'Which browsers are supported?',
          answer: 'We support all modern browsers: Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated to the latest version.'
        },
        {
          question: 'Can I access courses offline?',
          answer: 'Selected content can be downloaded for offline viewing through our mobile app. Core lessons, videos, and materials are available offline once downloaded.'
        },
        {
          question: 'How do I reset my progress?',
          answer: 'Go to Settings > Learning Progress > Reset. Note that this action is irreversible. You can also reset individual courses while keeping others intact.'
        }
      ]
    },
    {
      category: 'Certificates & Career',
      questions: [
        {
          question: 'Are the certificates industry-recognized?',
          answer: 'Yes! Our certificates are recognized by 150+ partner companies including major tech firms. We also offer blockchain-verified credentials for authenticity.'
        },
        {
          question: 'How do I showcase my completed projects?',
          answer: 'Your projects are automatically added to your portfolio. You can share individual projects or your complete portfolio with potential employers through unique links.'
        },
        {
          question: 'Do you provide job placement assistance?',
          answer: 'We offer career guidance, resume reviews, and connect top performers with our hiring partners. Many graduates receive job offers within 3-6 months of completion.'
        },
        {
          question: 'Can I get feedback on my code and projects?',
          answer: 'Yes! Peer reviews, automated code analysis, and expert feedback are included. Premium plans include 1-on-1 mentoring sessions for personalized guidance.'
        }
      ]
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: 'AI-Powered Learning',
      description: 'Adaptive content that personalizes to your learning style',
      details: [
        'Intelligent content recommendations',
        'Personalized learning paths',
        'Adaptive difficulty progression',
        'Smart gap identification'
      ]
    },
    {
      icon: Target,
      title: 'Project-Based Learning',
      description: 'Build real-world applications from day one',
      details: [
        'Industry-relevant projects',
        'Portfolio development',
        'Code review and feedback',
        'Version control integration'
      ]
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Learn with peers and industry experts',
      details: [
        'Study groups and forums',
        'Peer code reviews',
        'Expert AMA sessions',
        'Collaborative projects'
      ]
    },
    {
      icon: Shield,
      title: 'Verified Credentials',
      description: 'Blockchain-secured certificates and badges',
      details: [
        'Industry-recognized certificates',
        'Skill-based micro-credentials',
        'Portfolio verification',
        'Employer integration'
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Platform Navigation',
      duration: '5 min',
      description: 'Learn to navigate the dashboard, courses, and features',
      level: 'Beginner'
    },
    {
      title: 'Setting Up Your Learning Path',
      duration: '8 min',
      description: 'Choose and customize your AI learning roadmap',
      level: 'Beginner'
    },
    {
      title: 'Using the AI Tutor',
      duration: '12 min',
      description: 'Maximize learning with personalized AI assistance',
      level: 'Intermediate'
    },
    {
      title: 'Project Workflow',
      duration: '15 min',
      description: 'Complete your first hands-on AI project',
      level: 'Intermediate'
    },
    {
      title: 'Advanced Features',
      duration: '20 min',
      description: 'VR learning, analytics, and collaboration tools',
      level: 'Advanced'
    }
  ];

  const troubleshooting = [
    {
      issue: 'Video not loading',
      solution: 'Check your internet connection, clear browser cache, or try a different browser. If the issue persists, contact support.'
    },
    {
      issue: 'Code editor not working',
      solution: 'Ensure JavaScript is enabled in your browser. Try refreshing the page or using an incognito/private window.'
    },
    {
      issue: 'Progress not saving',
      solution: 'Make sure you\'re logged in and have a stable internet connection. Progress is auto-saved every 30 seconds.'
    },
    {
      issue: 'Certificate not generating',
      solution: 'Ensure you\'ve completed all required modules with passing grades. Certificate generation can take up to 24 hours.'
    }
  ];

  const filteredFAQs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Help & Support Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers, tutorials, and resources to make the most of your AI learning journey
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Quick Help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickHelp.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <item.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="faq" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Frequently Asked Questions</h3>
                <p className="text-muted-foreground">Get instant answers to common questions</p>
              </div>

              {filteredFAQs.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <Collapsible
                        key={faqIndex}
                        open={openFAQ === `${categoryIndex}-${faqIndex}`}
                        onOpenChange={(isOpen) => setOpenFAQ(isOpen ? `${categoryIndex}-${faqIndex}` : null)}
                      >
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                          <span className="text-left font-medium">{faq.question}</span>
                          {openFAQ === `${categoryIndex}-${faqIndex}` ? 
                            <ChevronDown className="h-5 w-5" /> : 
                            <ChevronRight className="h-5 w-5" />
                          }
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 bg-background border border-muted rounded-lg mt-2">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Tutorials Tab */}
            <TabsContent value="tutorials" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Video Tutorials</h3>
                <p className="text-muted-foreground">Step-by-step guides to master our platform</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {tutorials.map((tutorial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                        <Badge variant={tutorial.level === 'Beginner' ? 'default' : tutorial.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                          {tutorial.level}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {tutorial.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                      <Button className="w-full">
                        <Video className="h-4 w-4 mr-2" />
                        Watch Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Platform Features</h3>
                <p className="text-muted-foreground">Discover all the tools available for your learning journey</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <feature.icon className="h-10 w-10 text-primary mb-3" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm">
                            <Star className="h-4 w-4 text-primary mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Troubleshooting Tab */}
            <TabsContent value="troubleshooting" className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Troubleshooting Guide</h3>
                <p className="text-muted-foreground">Quick solutions to common technical issues</p>
              </div>

              <div className="space-y-4">
                {troubleshooting.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Zap className="h-6 w-6 text-destructive mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{item.issue}</h4>
                          <p className="text-muted-foreground">{item.solution}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-2">Still Need Help?</h4>
                  <p className="text-muted-foreground mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Live Chat Support
                    </Button>
                    <Button variant="outline">
                      Contact Support Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;