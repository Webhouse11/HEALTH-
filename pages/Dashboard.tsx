
import React, { useState, useRef, useEffect } from 'react';
import { Article, AppState, Category, UserRole, AdConfig, AdSlot } from '../types';
import { ContentAutomationService } from '../services/gemini';
import { SEOGenerator } from '../services/seo-generator';
import { Navigate } from 'react-router-dom';

interface DashboardProps {
  state: AppState;
  onPostGenerated: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onUpdateAds: (ads: AdConfig) => void;
  onLogin: (role: UserRole) => void;
}

type Tab = 'articles' | 'media' | 'seo' | 'ads';

export const Dashboard: React.FC<DashboardProps> = ({ state, onPostGenerated, onUpdateArticle, onDeleteArticle, onUpdateAds, onLogin }) => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [localAds, setLocalAds] = useState<AdConfig>(state.ads);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isStaff = state.currentUser?.role === UserRole.ADMIN || state.currentUser?.role === UserRole.EDITOR;

  if (!isStaff) return <Navigate to="/" replace />;

  const handleUpdateAdField = (slot: keyof AdConfig, field: keyof AdSlot, value: any) => {
    const updatedAds = { ...localAds, [slot]: { ...localAds[slot], [field]: value } };
    setLocalAds(updatedAds);
    onUpdateAds(updatedAds);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      const updated = {
        ...editingArticle,
        dateModified: new Date().toISOString().split('T')[0]
      };
      onUpdateArticle(updated);
      setEditingArticle(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingArticle) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingArticle({
          ...editingArticle,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    if (editingArticle && window.confirm("Are you sure you want to remove this cover image?")) {
      setEditingArticle({
        ...editingArticle,
        imageUrl: ''
      });
    }
  };

  const adGroups = {
    "Desktop Placements": ['leaderboard', 'anchor', 'rectangle', 'tenancy', 'inText', 'sticky', 'interArticle', 'skyscraper', 'inStream'],
    "Mobile Placements": ['mLeaderboard', 'mTenancy', 'mInText', 'mAnchor', 'mInterArticle', 'mInStream'],
    "Premium Special": ['interstitial', 'sponsor']
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-600 bg-teal-50 px-2 py-1 rounded mb-2 inline-block">Staff Console</span>
          <h1 className="text-3xl font-bold text-slate-900 serif">Content Manager</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={async () => {
              setLoading(true);
              try {
                const service = new ContentAutomationService();
                const art = await service.generateDailyPost(state.articles.map(a => a.title));
                onPostGenerated(art);
              } catch (e) {
                console.error(e);
                alert("Generation error. Check your API Key.");
              }
              setLoading(false);
            }}
            disabled={loading}
            className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-black text-[10px] tracking-widest shadow-lg hover:bg-teal-700 disabled:opacity-50 transition-all flex items-center gap-3 uppercase"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : null}
            {loading ? 'Authoring...' : 'Autogenerate Today\'s Post'}
          </button>
        </div>
      </header>

      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar gap-2">
        {['articles', 'media', 'seo', 'ads'].map((t) => (
          <button 
            key={t}
            onClick={() => setActiveTab(t as Tab)}
            className={`px-8 py-4 font-black text-[10px] tracking-widest uppercase transition-all border-b-2 ${activeTab === t ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            {t === 'ads' ? 'Ad Network' : t}
          </button>
        ))}
      </div>

      {activeTab === 'articles' && (
        <div className="space-y-6">
          {editingArticle ? (
            <div className="bg-white rounded-[2.5rem] border border-teal-100 shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex justify-between items-center mb-8 border-b pb-6">
                <h2 className="text-2xl font-bold text-slate-900 serif">Editing Story</h2>
                <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-600 font-black text-[10px] uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                  Exit Editor
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Article Title</label>
                      <input 
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-teal-500 outline-none transition-all font-bold text-slate-800"
                        value={editingArticle.title}
                        onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Niche Category</label>
                      <select 
                        className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-teal-500 outline-none transition-all appearance-none font-bold text-slate-800"
                        value={editingArticle.category}
                        onChange={e => setEditingArticle({...editingArticle, category: e.target.value as Category})}
                      >
                        {Object.values(Category).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Media Management UI */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex justify-between items-center">
                      Feature Image
                      {editingArticle.imageUrl && (
                        <button type="button" onClick={handleRemoveImage} className="text-red-500 hover:underline hover:text-red-700 transition-colors uppercase text-[9px]">Delete Image</button>
                      )}
                    </label>
                    <div className="aspect-video rounded-[2.5rem] bg-slate-50 overflow-hidden border-2 border-dashed border-slate-200 relative group flex items-center justify-center">
                      {editingArticle.imageUrl ? (
                        <>
                          <img src={editingArticle.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                             <button 
                               type="button" 
                               onClick={() => fileInputRef.current?.click()} 
                               className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-teal-50"
                             >
                               Replace Image
                             </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-10">
                          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <button 
                             type="button" 
                             onClick={() => fileInputRef.current?.click()} 
                             className="text-[10px] font-black uppercase text-teal-600 hover:text-teal-700"
                          >
                             Click to Upload Cover
                          </button>
                        </div>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    <input 
                      className="w-full px-4 py-2 text-[10px] border-b border-slate-100 outline-none text-slate-400 italic"
                      placeholder="Or paste external URL here..."
                      value={editingArticle.imageUrl}
                      onChange={e => setEditingArticle({...editingArticle, imageUrl: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Story Body (HTML)</label>
                  <textarea 
                    className="w-full px-6 py-6 rounded-3xl border-2 border-slate-100 focus:border-teal-500 outline-none transition-all h-[500px] font-mono text-sm leading-relaxed"
                    value={editingArticle.content}
                    onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                  />
                </div>

                <div className="flex gap-4">
                   <button type="submit" className="flex-grow py-5 bg-teal-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-teal-700 transition-all hover:scale-[1.01] active:scale-[0.99]">
                     Push Updates Live
                   </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-8 py-6">Creative & Title</th>
                    <th className="px-8 py-6">Topic</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.articles.map(article => (
                    <tr key={article.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-14 rounded-2xl overflow-hidden shadow-inner border border-slate-100 flex-shrink-0">
                             <img src={article.imageUrl} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-tight">{article.title}</p>
                            <p className="text-[9px] text-slate-400 font-mono mt-1.5 uppercase tracking-tighter opacity-60">ID: {article.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-[9px] font-black bg-teal-50 text-teal-700 px-3 py-1 rounded-lg uppercase tracking-widest">
                          {article.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => setEditingArticle(article)}
                            className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl text-[9px] font-black uppercase hover:bg-teal-600 hover:text-white transition-all tracking-widest"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => onDeleteArticle(article.id)}
                            className="px-5 py-2.5 bg-red-50 text-red-500 rounded-xl text-[9px] font-black uppercase hover:bg-red-600 hover:text-white transition-all tracking-widest"
                          >
                            Purge
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {state.articles.length === 0 && (
                <div className="p-24 text-center text-slate-300 italic serif text-2xl">
                   Your publishing queue is empty.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Other tabs (Ads, Media, SEO) maintained as per existing logic */}
      {activeTab === 'ads' && (
        <div className="space-y-12">
          {Object.entries(adGroups).map(([groupName, slots]) => (
            <div key={groupName}>
              <h3 className="text-[11px] font-black text-slate-900 mb-8 flex items-center gap-4 uppercase tracking-[0.3em]">
                {groupName}
                <span className="h-px bg-slate-100 flex-grow" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {slots.map((slotKey) => (
                  <div key={slotKey} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${localAds[slotKey as keyof AdConfig].active ? 'bg-teal-500 shadow-sm shadow-teal-500/50' : 'bg-slate-200'}`} />
                        <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{slotKey}</h4>
                      </div>
                      <button 
                        onClick={() => handleUpdateAdField(slotKey as keyof AdConfig, 'active', !localAds[slotKey as keyof AdConfig].active)}
                        className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-xl transition-all ${localAds[slotKey as keyof AdConfig].active ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                      >
                        {localAds[slotKey as keyof AdConfig].active ? 'Live' : 'Off'}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-teal-500 bg-slate-50 focus:bg-white transition-all" placeholder="Placement Name / Client" value={localAds[slotKey as keyof AdConfig].title} onChange={(e) => handleUpdateAdField(slotKey as keyof AdConfig, 'title', e.target.value)} />
                      <input className="w-full px-5 py-3 text-[11px] rounded-xl border border-slate-100 outline-none focus:border-teal-500 bg-slate-50 focus:bg-white transition-all" placeholder="Asset URL / Script Source" value={localAds[slotKey as keyof AdConfig].imageUrl} onChange={(e) => handleUpdateAdField(slotKey as keyof AdConfig, 'imageUrl', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'media' && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {state.articles.map(article => (
            <div key={article.id} className="group relative aspect-square bg-white rounded-[2rem] overflow-hidden border border-slate-100 cursor-pointer shadow-sm" onClick={() => { setActiveTab('articles'); setEditingArticle(article); }}>
              <img src={article.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-6 backdrop-blur-[2px]">
                <span className="text-white text-[9px] font-black uppercase tracking-widest text-center leading-tight">{article.title}</span>
                <span className="mt-3 px-4 py-1.5 bg-white text-slate-900 rounded-full text-[9px] font-black uppercase tracking-tighter">Edit Asset</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm max-w-4xl mx-auto">
           <h3 className="text-2xl font-bold mb-3 serif">Search Engine Intelligence</h3>
           <p className="text-sm text-slate-500 mb-12">Protocol exports for crawling and site hierarchy verification.</p>
           {['sitemap.xml', 'rss.xml'].map(file => (
             <div key={file} className="mb-10 last:mb-0">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="text-[10px] font-black uppercase text-teal-700 tracking-[0.3em]">{file}</h4>
                   <button onClick={() => {
                      const seo = new SEOGenerator();
                      const content = file === 'sitemap.xml' ? seo.generateSitemap(state.articles) : seo.generateRSS(state.articles);
                      navigator.clipboard.writeText(content);
                      alert(`${file} copied to clipboard.`);
                   }} className="text-[9px] font-black text-slate-400 hover:text-teal-600 uppercase tracking-widest">Copy Content</button>
                </div>
                <pre className="bg-slate-900 text-teal-400 p-8 rounded-[2rem] text-[11px] overflow-x-auto font-mono max-h-72 leading-relaxed shadow-2xl border border-slate-800">
                  {file === 'sitemap.xml' ? new SEOGenerator().generateSitemap(state.articles) : new SEOGenerator().generateRSS(state.articles)}
                </pre>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};
