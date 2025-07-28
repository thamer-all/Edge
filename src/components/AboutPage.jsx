import React from 'react';
import { ArrowRight, Brain, Users, Target, Zap, BookOpen, Award, Globe, Lightbulb, Rocket, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths powered by advanced AI algorithms that adapt to your learning style and pace.',
      color: 'text-blue-600'
    },
    {
      icon: Target,
      title: 'Hands-On Projects',
      description: 'Build real-world projects from day one with our comprehensive project-based learning approach.',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Learn from industry experts and connect with a global community of AI enthusiasts and professionals.',
      color: 'text-purple-600'
    },
    {
      icon: Rocket,
      title: 'Career Ready',
      description: 'Gain skills that are in high demand with curriculum designed by top AI companies and universities.',
      color: 'text-orange-600'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'From fundamentals to advanced topics, covering all aspects of AI, ML, and data science.',
      color: 'text-red-600'
    },
    {
      icon: Award,
      title: 'Industry Recognition',
      description: 'Earn certificates and credentials recognized by leading tech companies worldwide.',
      color: 'text-indigo-600'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Learners' },
    { number: '200+', label: 'Expert-Designed Courses' },
    { number: '95%', label: 'Career Success Rate' },
    { number: '150+', label: 'Partner Companies' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      bio: 'Former Google AI researcher with 15+ years in machine learning and neural networks.',
      image: '👩‍💼'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Curriculum',
      bio: 'Ex-Facebook engineer who has trained over 10,000 developers in AI technologies.',
      image: '👨‍💼'
    },
    {
      name: 'Dr. Priya Patel',
      role: 'Learning Experience Director',
      bio: 'PhD in Cognitive Science, specializing in adaptive learning systems.',
      image: '👩‍🔬'
    },
    {
      name: 'James Thompson',
      role: 'Industry Partnerships',
      bio: 'Connects our platform with leading AI companies for real-world project opportunities.',
      image: '👨‍💻'
    }
  ];

  const roadmaps = [
    {
      title: 'AI Engineer',
      description: 'Master machine learning, deep learning, and AI system deployment',
      modules: 18,
      duration: '6-8 months',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Data Scientist',
      description: 'Analytics, statistical modeling, and data-driven decision making',
      modules: 16,
      duration: '4-6 months',
      level: 'Beginner to Intermediate'
    },
    {
      title: 'AI Data Scientist',
      description: 'Advanced ML techniques, research methods, and cutting-edge AI',
      modules: 22,
      duration: '8-12 months',
      level: 'Advanced'
    },
    {
      title: 'AI Red Team Specialist',
      description: 'AI security, adversarial attacks, and ethical AI development',
      modules: 14,
      duration: '3-5 months',
      level: 'Advanced'
    },
    {
      title: 'AI Agents Developer',
      description: 'Build autonomous AI systems and intelligent agents',
      modules: 20,
      duration: '6-9 months',
      level: 'Advanced'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4" variant="outline">
              🚀 Next-Generation AI Education
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Democratizing AI Education for Everyone
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Our mission is to make world-class AI education accessible to learners everywhere. 
              Through cutting-edge technology, expert instruction, and personalized learning paths, 
              we're building the next generation of AI professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Curriculum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that AI education should be accessible, practical, and transformative. 
                Our platform combines the latest in educational technology with proven pedagogical 
                methods to create an unparalleled learning experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Global Accessibility</h3>
                    <p className="text-muted-foreground">Breaking down barriers to quality AI education worldwide</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lightbulb className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Innovation-Driven</h3>
                    <p className="text-muted-foreground">Continuously evolving with the latest AI breakthroughs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Community-Centered</h3>
                    <p className="text-muted-foreground">Building supportive networks of learners and experts</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                To create a world where anyone, anywhere can master AI and contribute to solving 
                humanity's greatest challenges through intelligent technology.
              </p>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Ethical AI Leadership
                </h3>
                <p className="text-muted-foreground">
                  We're committed to developing responsible AI practitioners who understand the 
                  ethical implications and societal impact of artificial intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of AI education with features designed for modern learners
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Roadmaps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Learning Roadmaps</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Structured paths to master AI, from fundamentals to specialized expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {roadmap.title}
                    <Badge variant="secondary">{roadmap.level}</Badge>
                  </CardTitle>
                  <CardDescription>{roadmap.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Modules:</span>
                      <span className="font-semibold">{roadmap.modules}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span className="font-semibold">{roadmap.duration}</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Explore Roadmap
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn from industry leaders who have shaped the AI landscape
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-semibold text-primary">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your AI Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of learners who are already building the future with AI. 
            Start your personalized learning path today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;