
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { AdPlaceholder } from './AdPlaceholder';
import { WellnessCompanion } from './WellnessCompanion';

const HEALTH_QUOTES = [
  "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.",
  "You don't have to see the whole staircase, just take the first step.",
  "Healing is not linear, and every small step forward is a victory.",
  "Be kind to your mind; it's doing the best it can.",
  "It is okay to rest. It is okay to start over. It is okay to be exactly where you are.",
  "Peace of mind is not the absence of conflict, but the ability to cope with it.",
];

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const quoteString = HEALTH_QUOTES.join(" • ") + " • ";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scrolling Quote Banner */}
      <div className="bg-teal-900 text-teal-50 py-2 overflow-hidden border-b border-teal-800 select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium tracking-wide mx-4">
            {quoteString}
          </span>
          <span className="text-sm font-medium tracking-wide mx-4">
            {quoteString}
          </span>
          <span className="text-sm font-medium tracking-wide mx-4">
            {quoteString}
          </span>
        </div>
      </div>

      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-teal-700 serif">HealthScope</span>
              <span className="text-xs bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-medium">Daily</span>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {NAV_LINKS.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <button className="md:hidden text-slate-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AdPlaceholder type="header" />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold text-teal-700 serif">HealthScope Daily</span>
              <p className="mt-4 text-slate-500 max-w-xs leading-relaxed">
                Empowering individuals with science-backed mental health insights and daily emotional wellness strategies.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-600 cursor-pointer transition-colors">f</div>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-600 cursor-pointer transition-colors">t</div>
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-teal-600 cursor-pointer transition-colors">i</div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} HealthScope Daily. All rights reserved. Content for informational purposes only.
          </div>
        </div>
      </footer>

      {/* Real-time Wellness Companion */}
      <WellnessCompanion />
    </div>
  );
};
