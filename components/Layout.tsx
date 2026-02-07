
import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { AdPlaceholder } from './AdPlaceholder';
import { WellnessCompanion } from './WellnessCompanion';
import { User, UserRole, AdConfig, Category } from '../types';

const MOTIVATION_QUOTES = [
  "Your mental health is a priority.",
  "Self-care is not selfish.",
  "Healing is not linear.",
  "Be kind to your mind.",
  "It is okay to rest.",
  "Small daily improvements win.",
  "Breathe. You're doing better than you think.",
  "Everything you need is within you."
];

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  ads: AdConfig;
  notificationsEnabled: boolean;
  onRequestNotifications: () => void;
  totalArticles: number;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onLogin, 
  onLogout, 
  ads, 
  notificationsEnabled, 
  onRequestNotifications,
  totalArticles
}) => {
  const isStaff = user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const marqueeText = MOTIVATION_QUOTES.join(" • ") + " • ";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Floating Global Article Counter */}
      <div className="fixed bottom-8 left-8 z-[150] hidden sm:flex items-center gap-3 bg-legit-dark text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 news-grid-shadow animate-in slide-in-from-left-4">
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Total Archive</span>
          <span className="text-xl font-black text-legit-red">{totalArticles.toLocaleString()}</span>
        </div>
        <div className="h-8 w-px bg-white/10 mx-1"></div>
        <div className="flex flex-col">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">Status</span>
          <span className="text-[10px] font-black text-green-400 flex items-center gap-1.5 uppercase">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            Online
          </span>
        </div>
      </div>

      {/* Top Utility Bar */}
      <div className="bg-legit-dark text-white text-[10px] font-bold py-2 hidden md:block border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <div className="flex items-center gap-2">
              <span className="text-legit-red">●</span>
              <span className="text-slate-400 uppercase tracking-widest text-[9px]">Live Insight Counter:</span>
              <span className="bg-legit-red px-1.5 py-0.5 rounded text-white font-black">{totalArticles.toLocaleString()} Articles</span>
            </div>
          </div>
          <div className="flex gap-4 uppercase tracking-widest">
            <Link to="/about" className="hover:text-legit-red">About Us</Link>
            <Link to="/contact" className="hover:text-legit-red">Contact</Link>
            {user ? (
              <button onClick={onLogout} className="text-red-400">Logout</button>
            ) : (
              <button onClick={() => onLogin(UserRole.ADMIN)} className="opacity-40">Staff Login</button>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center group">
            <div className="flex items-center gap-1">
              <span className="text-4xl md:text-5xl font-black text-legit-dark tracking-tighter uppercase transition-colors group-hover:text-legit-red">
                Health<span className="text-legit-red">Scope</span>
              </span>
            </div>
            <div className="h-0.5 w-12 bg-legit-red mt-1 group-hover:w-full transition-all duration-300"></div>
            <div className="mt-2 flex items-center gap-2">
               <span className="h-1 w-1 rounded-full bg-legit-red animate-pulse"></span>
               <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Publishing Daily Archive: {totalArticles} Professional Guides</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Sticky Category Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-[100] news-grid-shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <Link to="/" className={`px-4 h-14 flex items-center text-xs font-black uppercase tracking-widest border-b-4 transition-all ${location.pathname === '/' && !searchParams.get('q') ? 'border-legit-red text-legit-red' : 'border-transparent text-slate-600 hover:text-legit-red'}`}>
                Home
              </Link>
              {Object.values(Category).map(cat => (
                <Link 
                  key={cat} 
                  to={`/category/${cat}`} 
                  className={`px-4 h-14 flex items-center text-xs font-black uppercase tracking-widest border-b-4 whitespace-nowrap transition-all ${location.pathname === `/category/${cat}` ? 'border-legit-red text-legit-red' : 'border-transparent text-slate-600 hover:text-legit-red'}`}
                >
                  {cat.split(' ')[0]}
                </Link>
              ))}
              {isStaff && (
                <Link to="/dashboard" className="px-4 h-14 flex items-center text-xs font-black uppercase tracking-widest text-legit-red border-b-4 border-transparent">
                  Dashboard
                </Link>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative hidden sm:block">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-[10px] font-bold uppercase tracking-widest px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-1 focus:ring-legit-red w-40 md:w-64 transition-all"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-legit-red transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </button>
              </form>

              <div className="flex items-center gap-2">
                <button 
                  onClick={onRequestNotifications}
                  className={`p-2 transition-colors relative group ${notificationsEnabled ? 'text-legit-red' : 'text-slate-400 hover:text-legit-red'}`}
                  title={notificationsEnabled ? "Notifications Active" : "Get Alerts for New Posts"}
                >
                  <svg className="w-5 h-5" fill={notificationsEnabled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                  {!notificationsEnabled && (
                     <span className="absolute -top-1 -right-1 flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-legit-red opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-legit-red"></span>
                     </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="bg-slate-100 py-2 px-4 sm:hidden border-b border-slate-200 flex justify-between items-center">
        <form onSubmit={handleSearch} className="relative flex-grow mr-4">
          <input 
            type="text" 
            placeholder="Search wellness..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-widest px-4 py-2 pr-10 rounded-lg focus:outline-none"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </button>
        </form>
        <span className="bg-legit-red px-2 py-1 rounded text-white text-[8px] font-black">{totalArticles} POSTS</span>
      </div>

      {/* Ticker Bar */}
      <div className="bg-white border-b border-slate-200 py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1 ml-4 whitespace-nowrap">Wellness Quotes</div>
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-xs font-bold text-slate-600 italic tracking-wide px-4">{marqueeText}</span>
            <span className="text-xs font-bold text-slate-600 italic tracking-wide px-4">{marqueeText}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full mt-6">
        <AdPlaceholder type="leaderboard" config={ads.leaderboard} />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 w-full py-8">
        {children}
      </main>

      <footer className="bg-legit-dark text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h4 className="text-3xl font-black uppercase tracking-tighter mb-6">Health<span className="text-legit-red">Scope</span></h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-8">
              HealthScope Daily is a premium news platform dedicated to providing the most reliable daily mental health insights. Currently hosting <strong>{totalArticles.toLocaleString()}</strong> professional articles.
            </p>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-widest text-legit-red mb-6">Explore Topics</h5>
            <ul className="space-y-3 text-sm text-slate-300">
              {Object.values(Category).slice(0,5).map(c => <li key={c}><Link to={`/category/${c}`} className="hover:text-white transition-colors">{c}</Link></li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-widest text-legit-red mb-6">Follow Us</h5>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'YT'].map(s => <div key={s} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black cursor-pointer hover:bg-legit-red transition-colors">{s}</div>)}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-8 text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} HealthScope Daily. All rights reserved. {totalArticles} Articles Online.</span>
        </div>
      </footer>
      <WellnessCompanion />
    </div>
  );
};
