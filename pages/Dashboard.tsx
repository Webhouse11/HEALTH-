
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Article, AppState, Category, UserRole, AdConfig, AdSlot } from '../types';
import { ContentAutomationService } from '../services/gemini';
import { Navigate } from 'react-router-dom';

interface DashboardProps {
  state: AppState;
  onPostGenerated: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateAds: (ads: AdConfig) => void;
  onLogin: (role: UserRole) => void;
  engineStatus?: 'idle' | 'generating' | 'quota_error' | 'error';
}

type Tab = 'articles' | 'media' | 'seo' | 'ads';

export const Dashboard: React.FC<DashboardProps> = ({ state, onPostGenerated, onUpdateArticle, onDeleteArticle, onUpdateAds, onLogin, engineStatus = 'idle' }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [localAds, setLocalAds] = useState<AdConfig>(state.ads);
  const [savedSlots, setSavedSlots] = useState<Record<string, boolean>>({});

  const isStaff = state.currentUser?.role === UserRole.ADMIN || state.currentUser?.role === UserRole.EDITOR;

  const todayStr = new Date().toISOString().split('T')[0];
  const articlesToday = useMemo(() => state.articles.filter(a => a.datePublished === todayStr), [state.articles, todayStr]);
  const progressPercent = Math.min(100, (articlesToday.length / 100) * 100);

  // Sync localAds with state if state changes externally
  useEffect(() => {
    setLocalAds(state.ads);
  }, [state.ads]);

  if (!isStaff) return <Navigate to="/" replace />;

  const handleUpdateLocalAdField = (slot: keyof AdConfig, field: keyof AdSlot, value: any) => {
    setLocalAds(prev => ({
      ...prev,
      [slot]: { ...prev[slot], [field]: value }
    }));
    // Clear saved status when edited
    if (savedSlots[slot]) {
      setSavedSlots(prev => ({ ...prev, [slot]: false }));
    }
  };

  const handleSaveAdSlot = (slotKey: keyof AdConfig) => {
    onUpdateAds({
      ...state.ads,
      [slotKey]: localAds[slotKey]
    });
    setSavedSlots(prev => ({ ...prev, [slotKey]: true }));
    setTimeout(() => {
      setSavedSlots(prev => ({ ...prev, [slotKey]: false }));
    }, 3000);
  };

  const handleCreateNewBlank = () => {
    const today = new Date().toISOString().split('T')[0];
    const newArticle: Article = {
      id: Math.random().toString(36).substr(2, 9),
      slug: '',
      title: '',
      metaDescription: '',
      keywords: [],
      category: Category.DAILY_GUIDE,
      content: '<h2>New Article Headline</h2><p>Start writing here...</p>',
      datePublished: today,
      dateModified: today,
      imageAlt: '',
      author: state.currentUser?.name || 'Staff Author',
      canonicalUrl: '',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200'
    };
    setEditingArticle(newArticle);
  };

  const adGroups = {
    "Desktop Placements": ['leaderboard', 'anchor', 'rectangle', 'tenancy', 'inText', 'sticky', 'interArticle', 'skyscraper', 'inStream'],
    "Mobile Placements": ['mLeaderboard', 'mTenancy', 'mInText', 'mAnchor', 'mInterArticle', 'mInStream'],
    "Premium Special": ['interstitial', 'sponsor']
  };

  const getEngineBadge = () => {
    switch(engineStatus) {
      case 'generating': return <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-3 py-1 rounded-full animate-pulse">AI Researching...</span>;
      case 'quota_error': return <span className="text-[9px] font-black bg-orange-100 text-orange-600 px-3 py-1 rounded-full">Quota Limit: Paused</span>;
      case 'error': return <span className="text-[9px] font-black bg-red-100 text-red-600 px-3 py-1 rounded-full">Engine Error</span>;
      default: return <span className="text-[9px] font-black bg-green-100 text-green-600 px-3 py-1 rounded-full">Pulse Engine Online</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-legit-red bg-red-50 px-2 py-1 rounded inline-block">Staff Console</span>
            {getEngineBadge()}
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Content Management System</h1>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleCreateNewBlank}
            className="px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl font-black text-[10px] tracking-widest shadow-sm hover:bg-slate-900 hover:text-white transition-all uppercase"
          >
            Write New Article
          </button>
          <button 
            onClick={async () => {
              setLoading(true);
              try {
                const service = new ContentAutomationService();
                const art = await service.generateDailyPost(state.articles.map(a => a.title));
                onPostGenerated(art);
              } catch (e: any) {
                console.error(e);
                if (e.message === 'QUOTA_EXCEEDED') {
                  alert("Daily AI API quota exceeded. Please wait a few minutes or check your Gemini API plan.");
                } else {
                  alert("Generation error. Check your network or API Key.");
                }
              }
              setLoading(false);
            }}
            disabled={loading || articlesToday.length >= 100 || engineStatus === 'generating'}
            className="px-8 py-3 bg-legit-red text-white rounded-2xl font-black text-[10px] tracking-widest shadow-lg hover:bg-red-700 disabled:opacity-50 transition-all flex items-center gap-3 uppercase"
          >
            {loading ? 'AI Researching...' : 'Auto-Generate Pulse Post'}
          </button>
        </div>
      </header>

      {/* Daily Pulse Tracker */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 mb-12 shadow-sm relative overflow-hidden">
        {engineStatus === 'quota_error' && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-md">
              <p className="text-lg font-black text-orange-600 mb-2">PULSE ENGINE THROTTLED</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">The Gemini API quota is currently exhausted. Background automation will resume automatically in a few minutes.</p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Daily Pulse Goal</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Targeting 100 High-Impact Posts per day</p>
          </div>
          <span className="text-2xl font-black text-legit-red">{articlesToday.length}<span className="text-slate-200 text-sm">/100</span></span>
        </div>
        <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
           <div className="h-full bg-legit-red transition-all duration-1000 ease-out relative" style={{ width: `${progressPercent}%` }}>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
           </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar gap-2">
        {['articles', 'media', 'seo', 'ads'].map((t) => (
          <button 
            key={t}
            onClick={() => setActiveTab(t as Tab)}
            className={`px-8 py-4 font-black text-[10px] tracking-widest uppercase transition-all border-b-2 ${activeTab === t ? 'border-legit-red text-legit-red' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {t === 'ads' ? 'Ad Network' : t}
          </button>
        ))}
      </div>

      {activeTab === 'ads' && (
        <div className="space-y-12 pb-24">
          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 mb-8">
             <p className="text-[10px] font-black uppercase text-yellow-700 tracking-widest">Global AdSense ID Configured</p>
             <p className="text-xs text-yellow-600 mt-2">The system is using Client ID: <strong>ca-pub-6362880578749388</strong>. Enter the individual Slot IDs below for each placement.</p>
          </div>
          
          {Object.entries(adGroups).map(([groupName, slots]) => (
            <div key={groupName}>
              <h3 className="text-[11px] font-black text-slate-900 mb-8 flex items-center gap-4 uppercase tracking-[0.3em]">
                {groupName}
                <span className="h-px bg-slate-100 flex-grow" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slots.map((slotKey) => {
                  const currentSlot = localAds[slotKey as keyof AdConfig];
                  const isSaved = savedSlots[slotKey];
                  
                  return (
                    <div key={slotKey} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${currentSlot.active ? 'bg-legit-red shadow-sm shadow-red-500/50' : 'bg-slate-200'}`} />
                          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{slotKey}</h4>
                        </div>
                        <button 
                          onClick={() => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'active', !currentSlot.active)}
                          className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-xl transition-all ${currentSlot.active ? 'bg-legit-red text-white' : 'bg-slate-100 text-slate-400'}`}
                        >
                          {currentSlot.active ? 'Live' : 'Off'}
                        </button>
                      </div>

                      <div className="space-y-4 flex-grow">
                        <div className="space-y-1">
                          <label className="text-[8px] font-black uppercase text-slate-400">Unit Type</label>
                          <select 
                            className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-legit-red bg-slate-50 font-bold"
                            value={currentSlot.type}
                            onChange={(e) => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'type', e.target.value)}
                          >
                            <option value="placeholder">Manual Image & Link</option>
                            <option value="adsense">Google AdSense Unit</option>
                            <option value="custom">Raw HTML/Script</option>
                          </select>
                        </div>

                        {currentSlot.type === 'adsense' ? (
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-400">AdSense Slot ID</label>
                            <input 
                              className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-legit-red bg-white transition-all font-mono" 
                              placeholder="e.g., 1234567890" 
                              value={currentSlot.adSlotId || ''} 
                              onChange={(e) => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'adSlotId', e.target.value)} 
                            />
                          </div>
                        ) : currentSlot.type === 'custom' ? (
                          <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-400">HTML Code / Script</label>
                            <textarea 
                              className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-legit-red bg-white transition-all font-mono h-24"
                              placeholder="<div id='custom-ad'></div>..."
                              value={currentSlot.customScript || ''}
                              onChange={(e) => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'customScript', e.target.value)}
                            />
                          </div>
                        ) : (
                          <>
                            <div className="space-y-1">
                              <label className="text-[8px] font-black uppercase text-slate-400">Placement Title</label>
                              <input className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-legit-red bg-slate-50 focus:bg-white transition-all" value={currentSlot.title} onChange={(e) => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'title', e.target.value)} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[8px] font-black uppercase text-slate-400">Image Asset URL</label>
                              <input className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-legit-red bg-slate-50 focus:bg-white transition-all" value={currentSlot.imageUrl} onChange={(e) => handleUpdateLocalAdField(slotKey as keyof AdConfig, 'imageUrl', e.target.value)} />
                            </div>
                          </>
                        )}
                      </div>

                      <button 
                        onClick={() => handleSaveAdSlot(slotKey as keyof AdConfig)}
                        className={`mt-6 w-full py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-legit-red shadow-lg'}`}
                      >
                        {isSaved ? 'Saved & Deployed!' : 'Save Placement'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'articles' && (
        <div className="space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden overflow-x-auto p-8">
              <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Manage Global Archive</p>
              <table className="w-full text-left mt-8">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-6">Article Preview</th>
                    <th className="px-8 py-6">Niche</th>
                    <th className="px-8 py-6 text-right">Editor Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.articles.map(article => (
                    <tr key={article.id}>
                      <td className="px-8 py-6 font-bold text-sm">{article.title}</td>
                      <td className="px-8 py-6"><span className="text-[10px] font-black text-legit-red">{article.category}</span></td>
                      <td className="px-8 py-6 text-right">
                        <button onClick={() => setEditingArticle(article)} className="text-xs font-black uppercase text-slate-400 hover:text-legit-red px-2">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};
