
import React, { useState, useEffect, useRef } from 'react';
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

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdPlaceholder: React.FC<AdProps> = ({ type, className = "", config }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const initialized = useRef(false);

  // Client ID
  const GOOGLE_CLIENT_ID = "ca-pub-6362880578749388";

  // Use a unique key based on config properties to force remounting when config changes
  // This ensures that when an editor clicks "Save", the ad unit re-initializes
  const adUnitKey = `${config?.id}-${config?.type}-${config?.adSlotId}-${config?.customScript?.length || 0}`;

  useEffect(() => {
    if (config?.active && config?.type === 'adsense' && config?.adSlotId) {
      // Small delay to ensure the DOM element is rendered before pushing
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true;
        } catch (e) {
          console.warn("AdSense push waiting for script or element:", e);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [adUnitKey]);

  if (!config || !config.active || isDismissed) return null;

  // Wrapper function to render based on type
  const renderContent = () => {
    // Render Real Google AdSense Unit
    if (config.type === 'adsense' && config.adSlotId) {
      return (
        <div key={adUnitKey} className="my-4 overflow-hidden flex justify-center w-full min-h-[90px]">
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minWidth: '250px', minHeight: '90px', width: '100%' }}
            data-ad-client={GOOGLE_CLIENT_ID}
            data-ad-slot={config.adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      );
    }

    // Render Custom HTML Script
    if (config.type === 'custom') {
      return (
        <div 
          key={adUnitKey}
          className={`${className} ad-container-${type} overflow-hidden flex items-center justify-center w-full min-h-[50px]`}
          dangerouslySetInnerHTML={{ __html: config.customScript }}
        />
      );
    }

    // Standard Fallback Placeholder
    return (
      <div className={`${getStyle()} ${className} group relative overflow-hidden`}>
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

  const Badge = () => (
    <span className="absolute top-1 right-2 text-[7px] font-black uppercase text-slate-300 tracking-tighter pointer-events-none z-10">
      AD
    </span>
  );

  const getStyle = () => {
    switch (type) {
      case 'leaderboard': return "w-full max-w-[728px] h-[90px] bg-white border border-slate-100 shadow-sm mx-auto my-4 flex items-center justify-between px-6 rounded-lg";
      case 'mLeaderboard': return "w-full h-[50px] bg-white border border-slate-100 shadow-sm my-2 flex items-center justify-between px-3 rounded-md md:hidden";
      case 'anchor': return "fixed bottom-0 left-0 right-0 h-[60px] bg-slate-900 text-white z-[999] flex items-center justify-between px-8 shadow-2xl border-t border-white/10";
      case 'mAnchor': return "fixed bottom-0 left-0 right-0 h-[50px] bg-teal-900 text-white z-[999] flex items-center justify-between px-4 shadow-2xl md:hidden";
      case 'skyscraper': return "w-[160px] h-[600px] bg-white border border-slate-100 shadow-sm rounded-xl flex flex-col items-center p-4 hidden xl:flex";
      case 'rectangle': return "w-full max-w-[300px] min-h-[250px] bg-white border border-slate-100 rounded-2xl shadow-sm p-5 flex flex-col";
      case 'inText': return "w-full py-8 bg-slate-50 border-y border-slate-100 my-8 px-6 text-center";
      case 'mInText': return "w-full py-4 bg-teal-50 border-y border-teal-100 my-4 px-4 text-center md:hidden";
      case 'interstitial': return "fixed inset-0 bg-black/80 z-[2000] flex items-center justify-center p-6";
      case 'inStream': return "w-full aspect-video bg-black rounded-3xl overflow-hidden flex items-center justify-center";
      case 'mInStream': return "w-full aspect-square bg-black rounded-2xl overflow-hidden flex items-center justify-center md:hidden";
      case 'sponsor': return "inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-100 rounded-full text-[10px] font-bold text-teal-700";
      default: return "w-full bg-white border border-slate-100 p-4 rounded-xl flex items-center gap-4";
    }
  };

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

  return renderContent();
};
