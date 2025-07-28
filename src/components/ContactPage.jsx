import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon, Shield, Globe, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      availability: '24/7',
      responseTime: 'Instant',
      color: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us detailed questions or feedback',
      action: 'Send Email',
      availability: 'Always',
      responseTime: '< 4 hours',
      color: 'text-blue-600'
    },
    {
      icon: HeadphonesIcon,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      action: 'Call Now',
      availability: 'Mon-Fri 9AM-6PM PST',
      responseTime: 'Immediate',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other learners and experts',
      action: 'Join Discussion',
      availability: '24/7',
      responseTime: 'Varies',
      color: 'text-orange-600'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Innovation Drive, Suite 500',
      country: 'United States',
      phone: '+1 (555) 123-4567',
      email: 'sf@agilearnhub.com',
      timezone: 'PST (UTC-8)',
      flag: '🇺🇸'
    },
    {
      city: 'London',
      address: '45 Tech Square, Floor 12',
      country: 'United Kingdom',
      phone: '+44 20 7123 4567',
      email: 'london@agilearnhub.com',
      timezone: 'GMT (UTC+0)',
      flag: '🇬🇧'
    },
    {
      city: 'Singapore',
      address: '88 Marina Bay, Tower A',
      country: 'Singapore',
      phone: '+65 6123 4567',
      email: 'sg@agilearnhub.com',
      timezone: 'SGT (UTC+8)',
      flag: '🇸🇬'
    },
    {
      city: 'Toronto',
      address: '200 Bay Street, Suite 1000',
      country: 'Canada',
      phone: '+1 (416) 123-4567',
      email: 'toronto@agilearnhub.com',
      timezone: 'EST (UTC-5)',
      flag: '🇨🇦'
    }
  ];

  const teamContacts = [
    {
      department: 'Academic Support',
      description: 'Course content, learning paths, and academic guidance',
      email: 'academic@agilearnhub.com',
      specialties: ['Curriculum Questions', 'Learning Path Guidance', 'Academic Support']
    },
    {
      department: 'Technical Support',
      description: 'Platform issues, technical troubleshooting, and bug reports',
      email: 'tech@agilearnhub.com',
      specialties: ['Platform Issues', 'Technical Bugs', 'Account Problems']
    },
    {
      department: 'Career Services',
      description: 'Job placement, career guidance, and industry connections',
      email: 'careers@agilearnhub.com',
      specialties: ['Job Placement', 'Resume Review', 'Interview Prep']
    },
    {
      department: 'Business Partnerships',
      description: 'Corporate training, enterprise solutions, and partnerships',
      email: 'partnerships@agilearnhub.com',
      specialties: ['Corporate Training', 'Enterprise Plans', 'Bulk Licensing']
    },
    {
      department: 'Media & Press',
      description: 'Press inquiries, media relations, and public communications',
      email: 'press@agilearnhub.com',
      specialties: ['Press Releases', 'Media Kits', 'Interview Requests']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form or show success message
      alert('Thank you for your message! We\'ll get back to you within 4 hours.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Have questions about our AI learning platform? We're here to help you succeed in your learning journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24/7 Support Available</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Global Team</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Quick Response</span>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Preferred Contact Method</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <method.icon className={`h-12 w-12 ${method.color} mx-auto mb-3`} />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="font-medium">{method.availability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Response:</span>
                      <span className="font-medium">{method.responseTime}</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email Address *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject *</label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject line"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="academic">Academic Support</SelectItem>
                          <SelectItem value="billing">Billing Question</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="press">Press/Media</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Why Contact Us?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">&lt; 4hrs</div>
                      <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">98%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">Support Available</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">50K+</div>
                      <div className="text-sm text-muted-foreground">Happy Learners</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Department Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Contacts</CardTitle>
                  <CardDescription>Reach out to the right team for faster assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {teamContacts.slice(0, 3).map((dept, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold">{dept.department}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{dept.description}</p>
                      <a href={`mailto:${dept.email}`} className="text-sm text-primary hover:underline">
                        {dept.email}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Global Offices</h2>
            <p className="text-xl text-muted-foreground">
              We're here to support learners around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <span className="text-2xl mr-2">{office.flag}</span>
                    {office.city}
                  </CardTitle>
                  <CardDescription>{office.country}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <span className="text-sm">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{office.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{office.timezone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Urgent Help?</h2>
          <p className="text-lg mb-6 opacity-90">
            For critical technical issues or account emergencies, our emergency support team is available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <MessageCircle className="h-5 w-5 mr-2" />
              Emergency Chat
            </Button>
            <Button size="lg" variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Hotline
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;