

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Article, AppState, User, UserRole, AdConfig, AdSlot, NotificationToast as NotificationType } from './types';
import { INITIAL_ARTICLES } from './constants';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Article as ArticlePage } from './pages/Article';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ContentAutomationService } from './services/gemini';
import { NotificationToast } from './components/NotificationToast';
import { NotificationPrompt } from './components/NotificationPrompt';

const STORAGE_KEY = 'healthscope_v1_state';
const PROMPT_KEY = 'healthscope_prompt_shown';

const createEmptySlot = (id: string, title: string): AdSlot => ({
  id,
  title,
  subtitle: 'Sponsorship available. Contact our sales team.',
  cta: 'Learn More',
  imageUrl: '',
  type: 'placeholder',
  customScript: '',
  active: true
});

const DEFAULT_ADS: AdConfig = {
  leaderboard: createEmptySlot('leaderboard', 'Premium Health & Wellness Brand'),
  anchor: createEmptySlot('anchor', 'Daily Mental Health App'),
  rectangle: createEmptySlot('rectangle', 'Therapy Services'),
  tenancy: createEmptySlot('tenancy', 'Partner Program'),
  inText: createEmptySlot('inText', 'Natural Supplements'),
  sticky: createEmptySlot('sticky', 'Wellness Retreats'),
  interArticle: createEmptySlot('interArticle', 'Healthcare Insurance'),
  skyscraper: createEmptySlot('skyscraper', 'Organic Vitamins'),
  inStream: createEmptySlot('inStream', 'Video: Mindful Breathing'),
  interstitial: createEmptySlot('interstitial', 'Limited Offer: Wellness Kit'),
  sponsor: createEmptySlot('sponsor', 'Category Sponsor'),
  mLeaderboard: createEmptySlot('mLeaderboard', 'Mobile Health App'),
  mTenancy: createEmptySlot('mTenancy', 'Mobile Partner'),
  mInText: createEmptySlot('mInText', 'Quick Meditation'),
  mAnchor: createEmptySlot('mAnchor', 'Mobile Offer'),
  mInterArticle: createEmptySlot('mInterArticle', 'Local Healthcare'),
  mInStream: createEmptySlot('mInStream', 'Mobile Video Ad'),
};

const App: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState<NotificationType[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [engineStatus, setEngineStatus] = useState<'idle' | 'generating' | 'quota_error' | 'error'>('idle');
  // Fix: Use any to avoid NodeJS namespace error which occurs in browser environments
  const quotaTimeoutRef = useRef<any>(null);

  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, ads: { ...DEFAULT_ADS, ...parsed.ads } };
    }
    return {
      articles: INITIAL_ARTICLES,
      isGenerating: false,
      lastGeneratedDate: null,
      currentUser: null,
      ads: DEFAULT_ADS,
      notificationsEnabled: false
    };
  });

  const triggerNotification = useCallback((article: Article) => {
    const newNotif: NotificationType = {
      id: Math.random().toString(36).substr(2, 9),
      title: article.title,
      message: article.metaDescription,
      slug: article.slug
    };
    setActiveNotifications(prev => [newNotif, ...prev]);

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("HealthScope Daily: New Post", {
        body: article.title,
        icon: article.imageUrl
      });
    }
  }, []);

  const handlePostGenerated = useCallback((newArticle: Article) => {
    setState(prev => {
      if (prev.articles.some(a => a.id === newArticle.id || a.slug === newArticle.slug)) return prev;
      return {
        ...prev,
        articles: [newArticle, ...prev.articles],
        lastGeneratedDate: new Date().toLocaleDateString()
      };
    });
    triggerNotification(newArticle);
  }, [triggerNotification]);

  useEffect(() => {
    const triggerAutomation = async () => {
      // Don't trigger if already busy or on quota cooldown
      if (engineStatus !== 'idle') return;

      const today = new Date().toISOString().split('T')[0];
      const articlesToday = state.articles.filter(a => a.datePublished === today);
      
      if (articlesToday.length < 100) {
        setEngineStatus('generating');
        setState(prev => ({ ...prev, isGenerating: true }));
        try {
          const service = new ContentAutomationService();
          const newPost = await service.generateDailyPost(state.articles.map(a => a.title));
          handlePostGenerated(newPost);
          setEngineStatus('idle');
        } catch (e: any) {
          console.error("[Pulse Engine Error]", e);
          if (e.message === 'QUOTA_EXCEEDED') {
            setEngineStatus('quota_error');
            // Pause for 5 minutes on quota error
            quotaTimeoutRef.current = setTimeout(() => setEngineStatus('idle'), 300000);
          } else {
            setEngineStatus('error');
            // Pause for 1 minute on generic error
            quotaTimeoutRef.current = setTimeout(() => setEngineStatus('idle'), 60000);
          }
        } finally {
          setState(prev => ({ ...prev, isGenerating: false }));
        }
      }
    };

    // Increased background check to 2 minutes to respect quota limits
    const interval = setInterval(triggerAutomation, 120000);
    
    // Also trigger once on mount (with a delay)
    const initialTrigger = setTimeout(triggerAutomation, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTrigger);
      if (quotaTimeoutRef.current) clearTimeout(quotaTimeoutRef.current);
    };
  }, [state.articles, engineStatus, handlePostGenerated]);

  useEffect(() => {
    const promptShown = localStorage.getItem(PROMPT_KEY);
    if (!promptShown && !state.notificationsEnabled && Notification.permission !== "granted") {
      setShowPrompt(true);
    }
  }, [state.notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleUpdateArticle = (updatedArticle: Article) => {
    setState(prev => ({
      ...prev,
      articles: prev.articles.map(a => a.id === updatedArticle.id ? updatedArticle : a)
    }));
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setState(prev => ({
        ...prev,
        articles: prev.articles.filter(a => a.id !== id)
      }));
    }
  };

  const handleUpdateAds = (newAds: AdConfig) => {
    setState(prev => ({ ...prev, ads: newAds }));
  };

  const handleLogin = (role: UserRole) => {
    const mockUser: User = { id: 'staff-1', name: 'Staff Member', role };
    setState(prev => ({ ...prev, currentUser: mockUser }));
  };

  const handleLogout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setState(prev => ({ ...prev, notificationsEnabled: true }));
      }
      setShowPrompt(false);
      localStorage.setItem(PROMPT_KEY, 'true');
    }
  };

  const handleIgnorePrompt = () => {
    setShowPrompt(false);
    localStorage.setItem(PROMPT_KEY, 'true');
  };

  return (
    <Router>
      <Layout 
        user={state.currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
        ads={state.ads}
        notificationsEnabled={state.notificationsEnabled}
        onRequestNotifications={requestNotificationPermission}
        totalArticles={state.articles.length}
      >
        <div className="notifications-container">
          {activeNotifications.map(n => (
            <NotificationToast 
              key={n.id} 
              notification={n} 
              onClose={(id) => setActiveNotifications(prev => prev.filter(x => x.id !== id))} 
            />
          ))}
        </div>

        {showPrompt && (
          <NotificationPrompt 
            onEnable={requestNotificationPermission} 
            onIgnore={handleIgnorePrompt} 
          />
        )}

        <Routes>
          <Route path="/" element={<Home articles={state.articles} ads={state.ads} />} />
          <Route path="/article/:slug" element={<ArticlePage articles={state.articles} ads={state.ads} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/dashboard" 
            element={
              <Dashboard 
                state={state} 
                onPostGenerated={handlePostGenerated} 
                onUpdateArticle={handleUpdateArticle}
                onDeleteArticle={handleDeleteArticle}
                onUpdateAds={handleUpdateAds}
                onLogin={handleLogin}
                engineStatus={engineStatus}
              />
            } 
          />
          <Route path="/category/:cat" element={<Home articles={state.articles} ads={state.ads} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;