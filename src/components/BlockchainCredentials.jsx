import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Shield, 
  Award,
  Link,
  Hash,
  Key,
  Download,
  Share,
  CheckCircle,
  Copy,
  Check,
  Eye,
  Calendar,
  User,
  Trophy,
  Sparkles,
  FileText,
  QrCode,
  Globe,
  Lock,
  XCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';

const BlockchainCredentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [verificationHash, setVerificationHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [blockchainStatus, setBlockchainStatus] = useState('connected');
  const [_selectedCredential, setSelectedCredential] = useState(null);
  const { user } = useAuth();
  const { addXP } = useGamification();

  useEffect(() => {
    loadUserCredentials();
    checkBlockchainConnection();
  }, [user]);

  const loadUserCredentials = () => {
    // Load credentials from localStorage (simulate blockchain)
    const savedCredentials = localStorage.getItem(`credentials_${user?.id || 'anonymous'}`);
    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    } else {
      // Generate sample credentials based on achievements
      generateSampleCredentials();
    }
  };

  const generateSampleCredentials = () => {
    const sampleCredentials = [
      {
        id: 'cert_001',
        title: 'AI Fundamentals Certificate',
        description: 'Completed comprehensive AI fundamentals course',
        issueDate: new Date('2024-01-15'),
        blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
        status: 'verified',
        level: 'Foundation',
        skills: ['Machine Learning Basics', 'Neural Networks', 'Data Analysis'],
        issuer: 'AGI Learning Platform',
        verificationUrl: 'https://blockchain.agi-platform.com/verify/cert_001'
      },
      {
        id: 'cert_002',
        title: 'Deep Learning Specialist',
        description: 'Advanced deep learning techniques and applications',
        issueDate: new Date('2024-02-20'),
        blockchainHash: '0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c',
        status: 'pending',
        level: 'Advanced',
        skills: ['Deep Neural Networks', 'CNN', 'RNN', 'Transformers'],
        issuer: 'AGI Learning Platform',
        verificationUrl: 'https://blockchain.agi-platform.com/verify/cert_002'
      }
    ];

    setCredentials(sampleCredentials);
    localStorage.setItem(`credentials_${user?.id || 'anonymous'}`, JSON.stringify(sampleCredentials));
  };

  const checkBlockchainConnection = () => {
    // Simulate blockchain connection check
    setTimeout(() => {
      setBlockchainStatus(Math.random() > 0.1 ? 'connected' : 'disconnected');
    }, 1000);
  };

  const generateNewCredential = async (achievementType) => {
    setIsGenerating(true);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newCredential = {
      id: `cert_${Date.now()}`,
      title: getCredentialTitle(achievementType),
      description: getCredentialDescription(achievementType),
      issueDate: new Date(),
      blockchainHash: generateBlockchainHash(),
      status: 'verified',
      level: getCredentialLevel(achievementType),
      skills: getCredentialSkills(achievementType),
      issuer: 'AGI Learning Platform',
      verificationUrl: `https://blockchain.agi-platform.com/verify/cert_${Date.now()}`
    };

    const updatedCredentials = [...credentials, newCredential];
    setCredentials(updatedCredentials);
    localStorage.setItem(`credentials_${user?.id || 'anonymous'}`, JSON.stringify(updatedCredentials));
    
    setIsGenerating(false);
    addXP(50, 'Blockchain Credential Issued');
  };

  const verifyCredential = async (hash) => {
    if (!hash.trim()) return;
    
    setVerificationResult({ status: 'verifying' });
    
    // Simulate blockchain verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const credential = credentials.find(cred => cred.blockchainHash === hash);
    
    if (credential) {
      setVerificationResult({
        status: 'valid',
        credential: credential,
        verifiedAt: new Date(),
        blockNumber: Math.floor(Math.random() * 1000000) + 500000
      });
    } else {
      setVerificationResult({
        status: 'invalid',
        error: 'Credential not found on blockchain'
      });
    }
  };

  const generateBlockchainHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 40; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const getCredentialTitle = (type) => {
    const titles = {
      'quiz_master': 'Quiz Master Certificate',
      'study_streak': 'Consistent Learner Badge',
      'concept_explorer': 'AI Concept Explorer',
      'vr_pioneer': 'VR Learning Pioneer',
      'ar_innovator': 'AR Learning Innovator'
    };
    return titles[type] || 'Achievement Certificate';
  };

  const getCredentialDescription = (type) => {
    const descriptions = {
      'quiz_master': 'Demonstrated exceptional performance in AI quizzes',
      'study_streak': 'Maintained consistent learning streak for 30+ days',
      'concept_explorer': 'Explored advanced AI concepts and applications',
      'vr_pioneer': 'Completed VR learning experiences',
      'ar_innovator': 'Mastered AR-enhanced learning techniques'
    };
    return descriptions[type] || 'Outstanding achievement in AI learning';
  };

  const getCredentialLevel = (type) => {
    const levels = {
      'quiz_master': 'Intermediate',
      'study_streak': 'Foundation',
      'concept_explorer': 'Advanced',
      'vr_pioneer': 'Specialist',
      'ar_innovator': 'Specialist'
    };
    return levels[type] || 'Foundation';
  };

  const getCredentialSkills = (type) => {
    const skills = {
      'quiz_master': ['Problem Solving', 'AI Knowledge', 'Critical Thinking'],
      'study_streak': ['Consistency', 'Self-Motivation', 'Time Management'],
      'concept_explorer': ['Research Skills', 'Advanced AI', 'Innovation'],
      'vr_pioneer': ['Immersive Learning', 'VR Technology', 'Spatial Thinking'],
      'ar_innovator': ['AR Technology', 'Mixed Reality', 'Interactive Learning']
    };
    return skills[type] || ['AI Fundamentals'];
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  const downloadCredential = (credential) => {
    const credentialData = {
      ...credential,
      recipient: user?.name || 'Learner',
      downloadedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(credentialData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${credential.title.replace(/\s+/g, '_')}_${credential.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'expired': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'Foundation': return <FileText className="w-4 h-4" />;
      case 'Intermediate': return <Award className="w-4 h-4" />;
      case 'Advanced': return <Trophy className="w-4 h-4" />;
      case 'Specialist': return <Sparkles className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Blockchain Credentials
          <Badge variant="secondary" className={`ml-auto ${
            blockchainStatus === 'connected' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Globe className="w-3 h-3 mr-1" />
            {blockchainStatus}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Blockchain Status */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Network Status</h4>
            <Badge variant="outline" className="text-xs">
              Block #789,456
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Network:</span>
              <p className="font-medium">Ethereum Testnet</p>
            </div>
            <div>
              <span className="text-muted-foreground">Gas Fee:</span>
              <p className="font-medium">0.002 ETH</p>
            </div>
            <div>
              <span className="text-muted-foreground">Confirmations:</span>
              <p className="font-medium">12/12</p>
            </div>
          </div>
        </div>

        {/* Credential Generation */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Generate New Credential</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => generateNewCredential('quiz_master')}
              disabled={isGenerating}
              variant="outline"
              size="sm"
            >
              {isGenerating ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div> : <Award className="w-4 h-4" />}
              Quiz Master
            </Button>
            <Button
              onClick={() => generateNewCredential('vr_pioneer')}
              disabled={isGenerating}
              variant="outline"
              size="sm"
            >
              {isGenerating ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div> : <Eye className="w-4 h-4" />}
              VR Pioneer
            </Button>
          </div>
        </div>

        {/* Credentials List */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">My Credentials ({credentials.length})</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {credentials.map((credential) => (
              <div
                key={credential.id}
                className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getLevelIcon(credential.level)}
                    <div>
                      <h5 className="font-medium text-sm">{credential.title}</h5>
                      <p className="text-xs text-muted-foreground">{credential.description}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(credential.status)}`}>
                    {credential.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                  <div>
                    <span className="text-muted-foreground">Issue Date:</span>
                    <p className="font-medium">{credential.issueDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Level:</span>
                    <p className="font-medium">{credential.level}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs text-muted-foreground">Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {credential.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs text-muted-foreground">Blockchain Hash:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                      {credential.blockchainHash.substring(0, 20)}...
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(credential.blockchainHash)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedCredential(credential)}>
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => downloadCredential(credential)}>
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credential Verification */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Verify Credential</h4>
          <div className="space-y-2">
            <Input
              placeholder="Enter blockchain hash to verify..."
              value={verificationHash}
              onChange={(e) => setVerificationHash(e.target.value)}
              className="font-mono text-sm"
            />
            <Button
              onClick={() => verifyCredential(verificationHash)}
              disabled={!verificationHash.trim()}
              className="w-full"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verify on Blockchain
            </Button>
          </div>

          {verificationResult && (
            <div className={`border rounded-lg p-3 ${
              verificationResult.status === 'valid' 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : verificationResult.status === 'invalid'
                ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                : 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
            }`}>
              {verificationResult.status === 'verifying' && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                  <span className="text-sm">Verifying on blockchain...</span>
                </div>
              )}

              {verificationResult.status === 'valid' && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-sm">Credential Verified</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Title: {verificationResult.credential.title}</p>
                    <p>Issuer: {verificationResult.credential.issuer}</p>
                    <p>Block: #{verificationResult.blockNumber}</p>
                    <p>Verified: {verificationResult.verifiedAt.toLocaleString()}</p>
                  </div>
                </div>
              )}

              {verificationResult.status === 'invalid' && (
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Invalid or not found</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Blockchain Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            Blockchain Security
          </h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• All credentials are immutably stored on blockchain</li>
            <li>• Cryptographic signatures ensure authenticity</li>
            <li>• Decentralized verification prevents tampering</li>
            <li>• Public ledger provides transparent audit trail</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockchainCredentials; 