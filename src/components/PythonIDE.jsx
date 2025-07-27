import React, { useState, useRef } from 'react';
import { Play, Square, RotateCcw, Download, Upload, Settings, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const PythonIDE = ({ initialCode = '', onCodeChange, readOnly = false }) => {
  const [code, setCode] = useState(initialCode || `# Welcome to the AGI Learning Platform Python IDE
import numpy as np
import matplotlib.pyplot as plt

# Example: Simple linear regression
def linear_regression_demo():
    # Generate sample data
    np.random.seed(42)
    X = np.random.randn(100, 1)
    y = 2 * X.squeeze() + 1 + 0.1 * np.random.randn(100)
    
    # Simple linear regression
    X_with_bias = np.column_stack([np.ones(X.shape[0]), X.squeeze()])
    weights = np.linalg.inv(X_with_bias.T @ X_with_bias) @ X_with_bias.T @ y
    
    print(f"Learned weights: {weights}")
    print(f"Slope: {weights[1]:.2f}, Intercept: {weights[0]:.2f}")
    
    return weights

# Run the demo
if __name__ == "__main__":
    weights = linear_regression_demo()
    print("Linear regression completed successfully!")
`);
  
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const fileInputRef = useRef(null);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...\n');
    setActiveTab('output');

    try {
      // Simulate code execution (in a real implementation, this would use Pyodide)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock output based on the code content
      let mockOutput = '';
      
      if (code.includes('linear_regression_demo')) {
        mockOutput = `Learned weights: [1.02 1.98]
Slope: 1.98, Intercept: 1.02
Linear regression completed successfully!
`;
      } else if (code.includes('print')) {
        // Extract print statements and simulate output
        const printMatches = code.match(/print\([^)]+\)/g);
        if (printMatches) {
          mockOutput = printMatches.map(match => {
            const content = match.match(/print\(([^)]+)\)/)[1];
            return content.replace(/['"]/g, '');
          }).join('\n') + '\n';
        }
      } else {
        mockOutput = 'Code executed successfully!\n';
      }
      
      setOutput(mockOutput);
    } catch (error) {
      setOutput(`Error: ${error.message}\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.py';
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleCodeChange(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="font-mono text-sm">Python IDE</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <Button size="sm" variant="outline" onClick={downloadCode}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button size="sm" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Interactive Python environment for learning and experimentation
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="editor">Code Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button onClick={runCode} disabled={isRunning || readOnly}>
                    {isRunning ? (
                      <Square className="w-4 h-4 mr-2" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isRunning ? 'Running...' : 'Run Code'}
                  </Button>
                  <Button variant="outline" onClick={resetCode} disabled={readOnly}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Press Ctrl+Enter to run
                </div>
              </div>

              <div className="relative">
                <Textarea
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  placeholder="Write your Python code here..."
                  className="font-mono text-sm min-h-[400px] resize-none"
                  readOnly={readOnly}
                  onKeyDown={(e) => {
                    if (e.ctrlKey && e.key === 'Enter') {
                      e.preventDefault();
                      runCode();
                    }
                  }}
                />
                <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                  Python 3.11
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="output" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4" />
                  <span className="text-sm font-medium">Console Output</span>
                </div>
                <Button variant="outline" size="sm" onClick={clearOutput}>
                  Clear
                </Button>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[400px] overflow-auto">
                <div className="mb-2 text-gray-400">Python 3.11.0 | AGI Learning Platform</div>
                <div className="mb-2 text-gray-400">Type help() for more information.</div>
                <div className="mb-2">{'>>>'}</div>
                {output && (
                  <div className="whitespace-pre-wrap text-white">
                    {output}
                  </div>
                )}
                {isRunning && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                    <span>Executing...</span>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Lines: {code.split('\n').length}</span>
            <span>Characters: {code.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Ready</span>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".py,.txt"
          onChange={uploadFile}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default PythonIDE;

