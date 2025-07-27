import React, { useState, useEffect } from 'react';
import { Moon, Sun, Monitor, Palette, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ showAdvanced = false }) => {
  const { theme, setTheme, preferences, updatePreferences } = useTheme();
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(showAdvanced);
  const [customColors, setCustomColors] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b'
  });

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { id: 'system', name: 'System', icon: Monitor, description: 'Follows your OS preference' }
  ];

  const colorSchemes = [
    { name: 'Blue', primary: '#3b82f6', secondary: '#64748b', accent: '#f59e0b' },
    { name: 'Green', primary: '#10b981', secondary: '#64748b', accent: '#f59e0b' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#64748b', accent: '#f59e0b' },
    { name: 'Red', primary: '#ef4444', secondary: '#64748b', accent: '#f59e0b' },
    { name: 'Orange', primary: '#f97316', secondary: '#64748b', accent: '#f59e0b' }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    updatePreferences({ theme: newTheme });
  };

  const handleColorSchemeChange = (scheme) => {
    setCustomColors(scheme);
    updatePreferences({ colorScheme: scheme });
  };

  const handlePreferenceChange = (key, value) => {
    updatePreferences({ [key]: value });
  };

  const applyCustomColors = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary', customColors.primary);
    root.style.setProperty('--secondary', customColors.secondary);
    root.style.setProperty('--accent', customColors.accent);
  };

  useEffect(() => {
    applyCustomColors();
  }, [customColors]);

  const currentTheme = themes.find(t => t.id === theme);
  const ThemeIcon = currentTheme?.icon || Sun;

  return (
    <div className="space-y-4">
      {/* Main Theme Toggle */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ThemeIcon className="w-4 h-4" />
              <span>{currentTheme?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <DropdownMenuItem
                  key={themeOption.id}
                  onClick={() => handleThemeChange(themeOption.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <div>
                    <div className="font-medium">{themeOption.name}</div>
                    <div className="text-xs text-muted-foreground">{themeOption.description}</div>
                  </div>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {showAdvanced && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedPanel(!showAdvancedPanel)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Advanced
          </Button>
        )}
      </div>

      {/* Advanced Theme Panel */}
      {showAdvancedPanel && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Advanced Theme Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Color Scheme Selection */}
            <div className="space-y-3">
              <Label>Color Scheme</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {colorSchemes.map((scheme) => (
                  <div
                    key={scheme.name}
                    className="relative cursor-pointer group"
                    onClick={() => handleColorSchemeChange(scheme)}
                  >
                    <div className="h-16 rounded-lg border-2 border-transparent group-hover:border-primary transition-colors overflow-hidden">
                      <div 
                        className="h-full w-full"
                        style={{
                          background: `linear-gradient(135deg, ${scheme.primary} 0%, ${scheme.secondary} 50%, ${scheme.accent} 100%)`
                        }}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium">{scheme.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {scheme.primary}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Color Picker */}
            <div className="space-y-3">
              <Label>Custom Colors</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Primary</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primary: e.target.value }))}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColors.primary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primary: e.target.value }))}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Secondary</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondary: e.target.value }))}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColors.secondary}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondary: e.target.value }))}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      placeholder="#64748b"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Accent</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customColors.accent}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, accent: e.target.value }))}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={customColors.accent}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, accent: e.target.value }))}
                      className="flex-1 px-2 py-1 text-sm border rounded"
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Preferences */}
            <div className="space-y-4">
              <Label>Theme Preferences</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Reduced Motion</Label>
                    <div className="text-xs text-muted-foreground">
                      Reduce animations for accessibility
                    </div>
                  </div>
                  <Switch
                    checked={preferences.reducedMotion}
                    onCheckedChange={(checked) => handlePreferenceChange('reducedMotion', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">High Contrast</Label>
                    <div className="text-xs text-muted-foreground">
                      Increase contrast for better visibility
                    </div>
                  </div>
                  <Switch
                    checked={preferences.highContrast}
                    onCheckedChange={(checked) => handlePreferenceChange('highContrast', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm">Large Text</Label>
                    <div className="text-xs text-muted-foreground">
                      Increase font size for readability
                    </div>
                  </div>
                  <Switch
                    checked={preferences.largeText}
                    onCheckedChange={(checked) => handlePreferenceChange('largeText', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Font Size Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Font Size</Label>
                <Badge variant="secondary">{preferences.fontSize}px</Badge>
              </div>
              <Slider
                value={[preferences.fontSize]}
                onValueChange={([value]) => handlePreferenceChange('fontSize', value)}
                max={24}
                min={12}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            {/* Border Radius Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Border Radius</Label>
                <Badge variant="secondary">{preferences.borderRadius}px</Badge>
              </div>
              <Slider
                value={[preferences.borderRadius]}
                onValueChange={([value]) => handlePreferenceChange('borderRadius', value)}
                max={16}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Sharp</span>
                <span>Rounded</span>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-3">
              <Label>Preview</Label>
              <div className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <Button size="sm">Primary Button</Button>
                  <Button variant="outline" size="sm">Secondary Button</Button>
                  <Button variant="ghost" size="sm">Ghost Button</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <div className="text-sm">
                  <p>Sample text with current theme settings.</p>
                  <p className="text-muted-foreground">Muted text example.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThemeToggle; 