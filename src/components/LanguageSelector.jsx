import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Globe, Check } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

const LanguageSelector = ({ variant = 'select', size = 'default' }) => {
  const { currentLanguage, changeLanguage, getAvailableLanguages, getCurrentLanguage } = useI18n();
  const languages = getAvailableLanguages();
  const current = getCurrentLanguage();

  if (variant === 'button') {
    return (
      <Button
        variant="outline"
        size={size}
        className="flex items-center gap-2"
        onClick={() => {
          // Cycle through languages for button variant
          const currentIndex = languages.findIndex(lang => lang.code === currentLanguage);
          const nextIndex = (currentIndex + 1) % languages.length;
          changeLanguage(languages[nextIndex].code);
        }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeName}</span>
      </Button>
    );
  }

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger className={`w-auto min-w-[140px] ${size === 'sm' ? 'h-8' : ''}`}>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <span className="text-lg">{current.flag}</span>
          <SelectValue>
            <span className="hidden sm:inline">{current.nativeName}</span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{language.nativeName}</span>
                  <span className="text-xs text-muted-foreground">{language.name}</span>
                </div>
              </div>
              {language.code === currentLanguage && (
                <Check className="w-4 h-4 text-green-600" />
              )}
              {language.dir === 'rtl' && (
                <Badge variant="secondary" className="text-xs ml-2">RTL</Badge>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector; 