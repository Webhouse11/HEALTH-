
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogin, onLogout, ads }) => {
  const isStaff = user?.role === UserRole.ADMIN || user?.role === UserRole.EDITOR;
  const location = useLocation();
  const marqueeText = MOTIVATION_QUOTES.join(" • ") + " • ";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Top Utility Bar (Mirroring Legit's black top bar) */}
      <div className="bg-legit-dark text-white text-[10px] font-bold py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-legit-red">● Trending Now</span>
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
          </Link>
        </div>
      </header>

      {/* Sticky Category Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-[100] news-grid-shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              <Link to="/" className={`px-4 h-14 flex items-center text-xs font-black uppercase tracking-widest border-b-4 transition-all ${location.pathname === '/' ? 'border-legit-red text-legit-red' : 'border-transparent text-slate-600 hover:text-legit-red'}`}>
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
            <button className="p-2 text-slate-400 hover:text-legit-red">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Ticker Bar (News Style) */}
      <div className="bg-white border-b border-slate-200 py-2.5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1 ml-4 whitespace-nowrap">Wellness Quotes</div>
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-xs font-bold text-slate-600 italic tracking-wide px-4">{marqueeText}</span>
            <span className="text-xs font-bold text-slate-600 italic tracking-wide px-4">{marqueeText}</span>
          </div>
        </div>
      </div>

      {/* Global Ad Slot */}
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
              HealthScope Daily is a premium news platform dedicated to providing the most reliable daily mental health insights. Our mission is to democratize emotional wellness and provide grounding for every human journey.
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
          <span>&copy; {new Date().getFullYear()} HealthScope Daily. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
      <WellnessCompanion />
    </div>
  );
};
