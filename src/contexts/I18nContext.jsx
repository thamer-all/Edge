import React, { createContext, useContext, useState, useEffect } from 'react';

const I18nContext = createContext();

// Language configurations
const LANGUAGES = {
  en: {
    name: 'English',
    nativeName: 'English',
    code: 'en',
    dir: 'ltr',
    flag: '🇺🇸'
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    dir: 'ltr',
    flag: '🇪🇸'
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    dir: 'ltr',
    flag: '🇫🇷'
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    dir: 'ltr',
    flag: '🇩🇪'
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh',
    dir: 'ltr',
    flag: '🇨🇳'
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja',
    dir: 'ltr',
    flag: '🇯🇵'
  },
  ar: {
    name: 'Arabic',
    nativeName: 'العربية',
    code: 'ar',
    dir: 'rtl',
    flag: '🇸🇦'
  },
  he: {
    name: 'Hebrew',
    nativeName: 'עברית',
    code: 'he',
    dir: 'rtl',
    flag: '🇮🇱'
  }
};

// Translation strings
const TRANSLATIONS = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.lessons': 'Lessons',
    'nav.progress': 'Progress',
    'nav.analytics': 'Analytics',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Common actions
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.create': 'Create',
    'action.update': 'Update',
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.export': 'Export',
    'action.import': 'Import',
    'action.download': 'Download',
    'action.upload': 'Upload',
    'action.refresh': 'Refresh',
    'action.view': 'View',
    'action.share': 'Share',
    'action.copy': 'Copy',
    'action.start': 'Start',
    'action.stop': 'Stop',
    'action.pause': 'Pause',
    'action.resume': 'Resume',
    'action.next': 'Next',
    'action.previous': 'Previous',
    'action.close': 'Close',
    'action.open': 'Open',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back!',
    'dashboard.overview': 'Overview',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.learning_progress': 'Learning Progress',
    'dashboard.achievements': 'Achievements',
    'dashboard.quick_stats': 'Quick Stats',
    
    // Learning
    'learning.lessons_completed': 'Lessons Completed',
    'learning.total_study_time': 'Total Study Time',
    'learning.average_score': 'Average Score',
    'learning.current_streak': 'Current Streak',
    'learning.certificates_earned': 'Certificates Earned',
    'learning.concepts_learned': 'Concepts Learned',
    'learning.completion_rate': 'Completion Rate',
    'learning.quiz_performance': 'Quiz Performance',
    
    // Time formats
    'time.minutes': 'minutes',
    'time.hours': 'hours',
    'time.days': 'days',
    'time.weeks': 'weeks',
    'time.months': 'months',
    'time.years': 'years',
    'time.ago': 'ago',
    'time.remaining': 'remaining',
    
    // Status messages
    'status.loading': 'Loading...',
    'status.saving': 'Saving...',
    'status.saved': 'Saved successfully',
    'status.error': 'An error occurred',
    'status.success': 'Success',
    'status.warning': 'Warning',
    'status.info': 'Information',
    'status.no_data': 'No data available',
    'status.empty_state': 'Nothing to show here',
    
    // Form validation
    'validation.required': 'This field is required',
    'validation.email': 'Please enter a valid email address',
    'validation.password': 'Password must be at least 8 characters',
    'validation.confirm_password': 'Passwords do not match',
    'validation.name': 'Please enter your full name',
    'validation.invalid_format': 'Invalid format',
    
    // Analytics
    'analytics.user_engagement': 'User Engagement',
    'analytics.learning_metrics': 'Learning Metrics',
    'analytics.performance_metrics': 'Performance Metrics',
    'analytics.system_health': 'System Health',
    'analytics.active_users': 'Active Users',
    'analytics.session_duration': 'Session Duration',
    'analytics.bounce_rate': 'Bounce Rate',
    'analytics.page_load_time': 'Page Load Time',
    'analytics.error_rate': 'Error Rate',
    'analytics.uptime': 'Uptime',
    
    // VR/AR
    'vr.enter_experience': 'Enter VR Experience',
    'vr.exit_experience': 'Exit VR',
    'vr.scene_loading': 'Loading VR scene...',
    'ar.start_experience': 'Start AR Experience',
    'ar.scanning': 'Scanning environment...',
    'ar.object_detected': 'Object detected',
    
    // Blockchain
    'blockchain.credentials': 'Blockchain Credentials',
    'blockchain.verify': 'Verify on Blockchain',
    'blockchain.verified': 'Verified',
    'blockchain.pending': 'Pending',
    'blockchain.failed': 'Failed',
    'blockchain.network_status': 'Network Status',
    'blockchain.connected': 'Connected',
    'blockchain.disconnected': 'Disconnected',
    
    // Errors
    'error.network': 'Network connection error',
    'error.server': 'Server error',
    'error.not_found': 'Not found',
    'error.unauthorized': 'Unauthorized access',
    'error.forbidden': 'Access forbidden',
    'error.timeout': 'Request timeout',
    'error.unknown': 'Unknown error occurred'
  },
  
  es: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.lessons': 'Lecciones',
    'nav.progress': 'Progreso',
    'nav.analytics': 'Analítica',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    
    // Common actions
    'action.save': 'Guardar',
    'action.cancel': 'Cancelar',
    'action.delete': 'Eliminar',
    'action.edit': 'Editar',
    'action.create': 'Crear',
    'action.update': 'Actualizar',
    'action.search': 'Buscar',
    'action.filter': 'Filtrar',
    'action.export': 'Exportar',
    'action.import': 'Importar',
    'action.download': 'Descargar',
    'action.upload': 'Subir',
    'action.refresh': 'Actualizar',
    'action.view': 'Ver',
    'action.share': 'Compartir',
    'action.copy': 'Copiar',
    'action.start': 'Iniciar',
    'action.stop': 'Detener',
    'action.pause': 'Pausar',
    'action.resume': 'Reanudar',
    'action.next': 'Siguiente',
    'action.previous': 'Anterior',
    'action.close': 'Cerrar',
    'action.open': 'Abrir',
    
    // Dashboard
    'dashboard.welcome': '¡Bienvenido de vuelta!',
    'dashboard.overview': 'Resumen',
    'dashboard.recent_activity': 'Actividad Reciente',
    'dashboard.learning_progress': 'Progreso de Aprendizaje',
    'dashboard.achievements': 'Logros',
    'dashboard.quick_stats': 'Estadísticas Rápidas',
    
    // Learning
    'learning.lessons_completed': 'Lecciones Completadas',
    'learning.total_study_time': 'Tiempo Total de Estudio',
    'learning.average_score': 'Puntuación Promedio',
    'learning.current_streak': 'Racha Actual',
    'learning.certificates_earned': 'Certificados Obtenidos',
    'learning.concepts_learned': 'Conceptos Aprendidos',
    'learning.completion_rate': 'Tasa de Finalización',
    'learning.quiz_performance': 'Rendimiento en Cuestionarios',
    
    // Time formats
    'time.minutes': 'minutos',
    'time.hours': 'horas',
    'time.days': 'días',
    'time.weeks': 'semanas',
    'time.months': 'meses',
    'time.years': 'años',
    'time.ago': 'hace',
    'time.remaining': 'restante',
    
    // Status messages
    'status.loading': 'Cargando...',
    'status.saving': 'Guardando...',
    'status.saved': 'Guardado exitosamente',
    'status.error': 'Ocurrió un error',
    'status.success': 'Éxito',
    'status.warning': 'Advertencia',
    'status.info': 'Información',
    'status.no_data': 'No hay datos disponibles',
    'status.empty_state': 'Nada que mostrar aquí'
  },
  
  // Add more languages as needed
  fr: {
    'nav.dashboard': 'Tableau de bord',
    'nav.lessons': 'Leçons',
    'action.save': 'Enregistrer',
    'action.cancel': 'Annuler',
    'dashboard.welcome': 'Bon retour !',
    'status.loading': 'Chargement...'
    // ... more French translations
  },
  
  ar: {
    'nav.dashboard': 'لوحة التحكم',
    'nav.lessons': 'الدروس',
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'dashboard.welcome': 'مرحباً بعودتك!',
    'status.loading': 'جارٍ التحميل...'
    // ... more Arabic translations
  }
};

export const I18nProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('app_language') || 'en';
    setCurrentLanguage(savedLanguage);
    updateDirection(savedLanguage);
  }, []);
  
  useEffect(() => {
    // Update document direction and language
    updateDirection(currentLanguage);
    document.documentElement.lang = currentLanguage;
    
    // Save to localStorage
    localStorage.setItem('app_language', currentLanguage);
  }, [currentLanguage]);
  
  const updateDirection = (langCode) => {
    const language = LANGUAGES[langCode];
    if (language) {
      const isRightToLeft = language.dir === 'rtl';
      setIsRTL(isRightToLeft);
      document.documentElement.dir = language.dir;
      document.body.classList.toggle('rtl', isRightToLeft);
    }
  };
  
  const t = (key, params = {}) => {
    const translation = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || key;
    
    // Simple parameter interpolation
    return Object.keys(params).reduce((text, param) => {
      return text.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    }, translation);
  };
  
  const changeLanguage = (langCode) => {
    if (LANGUAGES[langCode]) {
      setCurrentLanguage(langCode);
    }
  };
  
  const getCurrentLanguage = () => LANGUAGES[currentLanguage];
  
  const getAvailableLanguages = () => Object.values(LANGUAGES);
  
  const formatNumber = (number, options = {}) => {
    try {
      return new Intl.NumberFormat(currentLanguage, options).format(number);
    } catch (error) {
      return number.toString();
    }
  };
  
  const formatDate = (date, options = {}) => {
    try {
      return new Intl.DateTimeFormat(currentLanguage, options).format(new Date(date));
    } catch (error) {
      return new Date(date).toLocaleDateString();
    }
  };
  
  const formatCurrency = (amount, currency = 'USD') => {
    try {
      return new Intl.NumberFormat(currentLanguage, {
        style: 'currency',
        currency: currency
      }).format(amount);
    } catch (error) {
      return `${currency} ${amount}`;
    }
  };
  
  const formatRelativeTime = (date) => {
    try {
      const rtf = new Intl.RelativeTimeFormat(currentLanguage, { numeric: 'auto' });
      const diff = new Date(date) - new Date();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      if (Math.abs(days) < 1) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (Math.abs(hours) < 1) {
          const minutes = Math.floor(diff / (1000 * 60));
          return rtf.format(minutes, 'minute');
        }
        return rtf.format(hours, 'hour');
      }
      
      if (Math.abs(days) < 7) {
        return rtf.format(days, 'day');
      }
      
      if (Math.abs(days) < 30) {
        const weeks = Math.floor(days / 7);
        return rtf.format(weeks, 'week');
      }
      
      if (Math.abs(days) < 365) {
        const months = Math.floor(days / 30);
        return rtf.format(months, 'month');
      }
      
      const years = Math.floor(days / 365);
      return rtf.format(years, 'year');
    } catch (error) {
      return formatDate(date);
    }
  };
  
  const value = {
    currentLanguage,
    isRTL,
    t,
    changeLanguage,
    getCurrentLanguage,
    getAvailableLanguages,
    formatNumber,
    formatDate,
    formatCurrency,
    formatRelativeTime,
    languages: LANGUAGES
  };
  
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}; 