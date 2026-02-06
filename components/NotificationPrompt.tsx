
import React, { useEffect, useState } from 'react';

interface Props {
  onEnable: () => void;
  onIgnore: () => void;
}

export const NotificationPrompt: React.FC<Props> = ({ onEnable, onIgnore }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[3000] w-[calc(100%-2rem)] max-w-md transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-8 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-legit-red/5 rounded-full -ml-12 -mb-12 opacity-50" />
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-legit-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-legit-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Stay Grounded Daily</h3>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">
            Get notified the moment we drop new expert insights on mental health and emotional wellness. 
            <span className="block mt-1 font-bold text-slate-400 italic">No spam, just healing.</span>
          </p>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={onEnable}
              className="w-full py-4 bg-legit-red text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-red-200 hover:bg-red-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Enable Notifications
            </button>
            <button 
              onClick={onIgnore}
              className="w-full py-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
