
import React, { useState, useEffect } from 'react';
import { AdSlot } from '../types';

type AdType = 
  | 'leaderboard' | 'anchor' | 'rectangle' | 'tenancy' 
  | 'inText' | 'sticky' | 'interArticle' | 'skyscraper' 
  | 'inStream' | 'interstitial' | 'sponsor' 
  | 'mLeaderboard' | 'mTenancy' | 'mInText' | 'mAnchor' 
  | 'mInterArticle' | 'mInStream';

interface AdProps {
  type: AdType;
  className?: string;
  config?: AdSlot;
}

export const AdPlaceholder: React.FC<AdProps> = ({ type, className = "", config }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!config || !config.active || isDismissed) return null;

  // Custom HTML rendering for all types
  if (config.type === 'custom') {
    return (
      <div 
        className={`${className} ad-container-${type} overflow-hidden flex items-center justify-center`}
        dangerouslySetInnerHTML={{ __html: config.customScript }}
      />
    );
  }

  const Badge = () => (
    <span className="absolute top-1 right-2 text-[7px] font-black uppercase text-slate-300 tracking-tighter pointer-events-none z-10">
      AD
    </span>
  );

  const getStyle = () => {
    switch (type) {
      case 'leaderboard': return "w-full max-w-[728px] h-[90px] bg-white border border-slate-100 shadow-sm mx-auto my-4 flex items-center justify-between px-6 rounded-lg relative overflow-hidden";
      case 'mLeaderboard': return "w-full h-[50px] bg-white border border-slate-100 shadow-sm my-2 flex items-center justify-between px-3 rounded-md relative overflow-hidden md:hidden";
      case 'anchor': return "fixed bottom-0 left-0 right-0 h-[60px] bg-slate-900 text-white z-[999] flex items-center justify-between px-8 shadow-2xl border-t border-white/10";
      case 'mAnchor': return "fixed bottom-0 left-0 right-0 h-[50px] bg-teal-900 text-white z-[999] flex items-center justify-between px-4 shadow-2xl md:hidden";
      case 'skyscraper': return "w-[160px] h-[600px] bg-white border border-slate-100 shadow-sm rounded-xl flex flex-col items-center p-4 relative overflow-hidden hidden xl:flex";
      case 'rectangle': return "w-full max-w-[300px] min-h-[250px] bg-white border border-slate-100 rounded-2xl shadow-sm p-5 relative flex flex-col";
      case 'inText': return "w-full py-8 bg-slate-50 border-y border-slate-100 my-8 px-6 text-center relative overflow-hidden";
      case 'mInText': return "w-full py-4 bg-teal-50 border-y border-teal-100 my-4 px-4 text-center relative overflow-hidden md:hidden";
      case 'interstitial': return "fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-6";
      case 'inStream': return "w-full aspect-video bg-black rounded-3xl overflow-hidden flex items-center justify-center relative";
      case 'mInStream': return "w-full aspect-square bg-black rounded-2xl overflow-hidden flex items-center justify-center relative md:hidden";
      case 'sponsor': return "inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-[10px] font-bold text-teal-700";
      default: return "w-full bg-white border border-slate-100 p-4 rounded-xl relative flex items-center gap-4";
    }
  };

  // Interstitial Overlay
  if (type === 'interstitial') {
    return (
      <div className={getStyle()}>
        <div className="bg-white max-w-sm w-full rounded-[2.5rem] p-8 relative shadow-2xl animate-in zoom-in-95 duration-300">
          <button onClick={() => setIsDismissed(true)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="text-center">
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest block mb-4">Sponsor Spotlight</span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{config.title}</h3>
            <p className="text-sm text-slate-500 mb-8">{config.subtitle}</p>
            <button className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-600/20">{config.cta}</button>
          </div>
        </div>
      </div>
    );
  }

  // Anchor Banner (Desktop/Mobile)
  if (type === 'anchor' || type === 'mAnchor') {
    return (
      <div className={getStyle()}>
        <div className="flex items-center gap-4 overflow-hidden">
          <span className="text-[9px] font-bold bg-white/10 px-1.5 py-0.5 rounded uppercase hidden sm:inline">Ad</span>
          <p className="text-sm font-bold truncate max-w-[200px] sm:max-w-md">{config.title}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 bg-teal-500 text-white text-[11px] font-black rounded uppercase hover:bg-teal-400 transition-colors whitespace-nowrap">
            {config.cta}
          </button>
          <button onClick={() => setIsDismissed(true)} className="text-white/40 hover:text-white">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>
    );
  }

  // Skyscraper
  if (type === 'skyscraper') {
    return (
      <div className={getStyle()}>
        <Badge />
        <div className="w-full h-32 bg-slate-50 rounded-lg mb-4 flex items-center justify-center italic text-slate-300 text-[10px]">Media</div>
        <h4 className="text-center font-bold text-slate-900 text-sm mb-2">{config.title}</h4>
        <p className="text-center text-[10px] text-slate-400 leading-relaxed mb-4">{config.subtitle}</p>
        <button className="mt-auto w-full py-3 bg-teal-600 text-white text-[10px] font-black rounded-lg uppercase">{config.cta}</button>
      </div>
    );
  }

  // Sponsorship Badge
  if (type === 'sponsor') {
    return (
      <span className={getStyle()}>
        <span className="text-[8px] opacity-40">SPONSORED BY</span>
        {config.title}
      </span>
    );
  }

  // Standard Placeholders
  return (
    <div className={`${getStyle()} ${className}`}>
      <Badge />
      {config.imageUrl && (
        <img src={config.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity" />
      )}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <h4 className="font-bold text-slate-900 text-sm">{config.title}</h4>
        <p className="text-xs text-slate-400 truncate max-w-[250px]">{config.subtitle}</p>
      </div>
      <button className="relative z-10 px-4 py-2 bg-teal-600 text-white text-[10px] font-black rounded uppercase hover:bg-teal-700 transition-all shrink-0">
        {config.cta}
      </button>
    </div>
  );
};
