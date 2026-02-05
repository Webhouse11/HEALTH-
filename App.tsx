
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Article, AppState } from './types';
import { INITIAL_ARTICLES } from './constants';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Article as ArticlePage } from './pages/Article';
import { Dashboard } from './pages/Dashboard';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

const STORAGE_KEY = 'healthscope_v1_state';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      articles: INITIAL_ARTICLES,
      isGenerating: false,
      lastGeneratedDate: null
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handlePostGenerated = (newArticle: Article) => {
    setState(prev => ({
      ...prev,
      articles: [newArticle, ...prev.articles],
      lastGeneratedDate: new Date().toLocaleDateString()
    }));
  };

  const handleUpdateArticle = (updatedArticle: Article) => {
    setState(prev => ({
      ...prev,
      articles: prev.articles.map(a => a.id === updatedArticle.id ? updatedArticle : a)
    }));
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      setState(prev => ({
        ...prev,
        articles: prev.articles.filter(a => a.id !== id)
      }));
    }
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home articles={state.articles} />} />
          <Route path="/article/:slug" element={<ArticlePage articles={state.articles} />} />
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
              />
            } 
          />
          <Route path="/category/:cat" element={<Home articles={state.articles} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
