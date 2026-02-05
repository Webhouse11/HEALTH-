
import React from 'react';

interface AdProps {
  type: 'header' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

export const AdPlaceholder: React.FC<AdProps> = ({ type, className = "" }) => {
  const styles = {
    header: "w-full h-24 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center shadow-sm my-4 overflow-hidden relative",
    sidebar: "w-full h-80 bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-3xl flex flex-col items-center justify-center p-6 my-4 shadow-sm relative",
    inline: "w-full py-8 bg-slate-50 border-y border-slate-100 flex flex-col items-center justify-center my-8 relative",
    footer: "w-full h-24 bg-teal-900/5 border border-teal-900/10 rounded-2xl flex items-center justify-center my-12 relative"
  };

  const Badge = () => (
    <span className="absolute top-2 right-3 text-[9px] font-bold text-slate-300 uppercase tracking-widest pointer-events-none">
      Sponsored Placement
    </span>
  );

  if (type === 'sidebar') {
    return (
      <div className={`${styles.sidebar} ${className}`}>
        <Badge />
        <div className="w-12 h-12 bg-teal-600 rounded-xl mb-4 flex items-center justify-center text-white font-bold italic">H</div>
        <p className="text-sm font-bold text-slate-900 text-center mb-2">Support Our Mission</p>
        <p className="text-xs text-slate-500 text-center mb-6 px-4 leading-relaxed">HealthScope partners with trusted wellness providers to bring you evidence-based tools.</p>
        <button className="px-6 py-2 bg-white border border-teal-600 text-teal-700 text-xs font-bold rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-sm">Learn More</button>
      </div>
    );
  }

  return (
    <div className={`${styles[type]} ${className}`}>
      <Badge />
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        <div className="space-y-1">
          <div className="w-32 h-2 bg-slate-200 rounded animate-pulse" />
          <div className="w-20 h-2 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
