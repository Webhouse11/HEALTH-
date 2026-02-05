
import React, { useState, useRef, useEffect } from 'react';
import { Article, AppState, Category } from '../types';
import { ContentAutomationService } from '../services/gemini';
import { SEOGenerator } from '../services/seo-generator';

interface DashboardProps {
  state: AppState;
  onPostGenerated: (article: Article) => void;
  onUpdateArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
}

type Tab = 'articles' | 'media' | 'seo';

export const Dashboard: React.FC<DashboardProps> = ({ state, onPostGenerated, onUpdateArticle, onDeleteArticle }) => {
  const [loading, setLoading] = useState(false);
  const [autoPilot, setAutoPilot] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const seoGen = new SEOGenerator();
  const todayStr = new Date().toLocaleDateString();
  const isTodayPublished = state.lastGeneratedDate === todayStr;

  useEffect(() => {
    if (autoPilot && !isTodayPublished && !loading) {
      handleManualGeneration();
    }
  }, [autoPilot, isTodayPublished]);

  const handleManualGeneration = async () => {
    setLoading(true);
    setError(null);
    try {
      const service = new ContentAutomationService();
      const existingTitles = state.articles.map(a => a.title);
      const newArticle = await service.generateDailyPost(existingTitles);
      onPostGenerated(newArticle);
    } catch (e: any) {
      setError(e.message || "Failed to generate content. Please ensure API key is set.");
      setAutoPilot(false); // Disable auto-pilot on error
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      onUpdateArticle(editingArticle);
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

  const removeImage = () => {
    if (editingArticle) {
      setEditingArticle({
        ...editingArticle,
        imageUrl: '',
        imageAlt: 'No image provided'
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Publishing Command Center</h1>
          <p className="text-slate-500">Managing your daily mental health ecosystem.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase">Auto-Pilot</span>
            <button 
              onClick={() => setAutoPilot(!autoPilot)}
              className={`w-10 h-6 rounded-full transition-colors relative ${autoPilot ? 'bg-teal-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${autoPilot ? 'left-5' : 'left-1'}`} />
            </button>
          </div>
          <button 
            onClick={handleManualGeneration}
            disabled={loading || isTodayPublished}
            className={`px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg flex items-center gap-2 ${loading || isTodayPublished ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                AI Generating...
              </span>
            ) : isTodayPublished ? 'Today Published' : 'Generate Today\'s Post'}
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Live Posts', value: state.articles.length, icon: '📄' },
          { label: 'Publish Status', value: isTodayPublished ? 'Up to Date' : 'Pending', icon: '✅' },
          { label: 'Authority Score', value: '9.2', icon: '✨' },
          { label: 'Last Generated', value: state.lastGeneratedDate || 'None', icon: '⏰' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 serif">{stat.value}</p>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-700 mb-8 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab('articles')}
          className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'articles' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Articles Management
        </button>
        <button 
          onClick={() => setActiveTab('media')}
          className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'media' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Media Library
        </button>
        <button 
          onClick={() => setActiveTab('seo')}
          className={`px-8 py-4 font-bold text-sm transition-all border-b-2 ${activeTab === 'seo' ? 'border-teal-600 text-teal-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          SEO Export
        </button>
      </div>

      {activeTab === 'articles' && (
        <div className="space-y-8">
          {editingArticle ? (
            <div className="bg-white p-8 rounded-3xl border border-teal-100 shadow-xl animate-in fade-in slide-in-from-top-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Edit Article</h3>
                <button onClick={() => setEditingArticle(null)} className="text-slate-400 hover:text-slate-600 font-bold">Cancel</button>
              </div>
              <form onSubmit={handleSaveEdit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Title</label>
                        <input 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                          value={editingArticle.title}
                          onChange={e => setEditingArticle({...editingArticle, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                        <select 
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
                          value={editingArticle.category}
                          onChange={e => setEditingArticle({...editingArticle, category: e.target.value as Category})}
                        >
                          {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase">Meta Description</label>
                      <textarea 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none h-20"
                        value={editingArticle.metaDescription}
                        onChange={e => setEditingArticle({...editingArticle, metaDescription: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Featured Image</label>
                    <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[16/9]">
                      {editingArticle.imageUrl ? (
                        <>
                          <img src={editingArticle.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="px-4 py-2 bg-white text-slate-900 rounded-lg text-xs font-bold">Change</button>
                            <button type="button" onClick={removeImage} className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-bold">Remove</button>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                          <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          <span className="text-xs font-bold">Upload Image</span>
                        </div>
                      )}
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Article Content (HTML)</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none h-64 font-mono text-sm"
                    value={editingArticle.content}
                    onChange={e => setEditingArticle({...editingArticle, content: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg">Save Changes</button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Title & Category</th>
                    <th className="px-6 py-4">Featured Image</th>
                    <th className="px-6 py-4">SEO Score</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.articles.map(article => (
                    <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 line-clamp-1">{article.title}</p>
                        <p className="text-xs text-teal-600 font-medium">{article.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        {article.imageUrl ? (
                          <img src={article.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-[10px] text-slate-400">None</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full w-[95%]"></div>
                          </div>
                          <span className="text-[10px] font-bold text-green-600">A+</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{article.datePublished}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => setEditingArticle(article)} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">Edit</button>
                        <button onClick={() => onDeleteArticle(article.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === 'media' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4">
          {state.articles.filter(a => a.imageUrl).map(article => (
            <div key={`media-${article.id}`} className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-square overflow-hidden bg-slate-100 relative">
                <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => setEditingArticle(article)} className="p-2 bg-white rounded-full text-slate-900 hover:text-teal-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <span className="text-[10px] px-2 py-0.5 bg-slate-100 rounded text-slate-500">{article.imageUrl.startsWith('data:') ? 'LOCAL' : 'REMOTE'}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'seo' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-4">Google Discovery Assets</h3>
            <p className="text-slate-500 mb-8">Copy these generated files to your project root for instant Google indexing and search visibility.</p>
            
            <div className="space-y-12">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-teal-700">sitemap.xml</h4>
                  <button onClick={() => navigator.clipboard.writeText(seoGen.generateSitemap(state.articles))} className="text-xs font-bold text-slate-400 hover:text-teal-600">Copy to Clipboard</button>
                </div>
                <pre className="bg-slate-900 text-teal-400 p-6 rounded-2xl overflow-x-auto text-sm font-mono max-h-60">
                  {seoGen.generateSitemap(state.articles)}
                </pre>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-teal-700">rss.xml</h4>
                  <button onClick={() => navigator.clipboard.writeText(seoGen.generateRSS(state.articles))} className="text-xs font-bold text-slate-400 hover:text-teal-600">Copy to Clipboard</button>
                </div>
                <pre className="bg-slate-900 text-teal-400 p-6 rounded-2xl overflow-x-auto text-sm font-mono max-h-60">
                  {seoGen.generateRSS(state.articles)}
                </pre>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-teal-700">robots.txt</h4>
                  <button onClick={() => navigator.clipboard.writeText(seoGen.generateRobotsTxt())} className="text-xs font-bold text-slate-400 hover:text-teal-600">Copy to Clipboard</button>
                </div>
                <pre className="bg-slate-900 text-teal-400 p-6 rounded-2xl overflow-x-auto text-sm font-mono">
                  {seoGen.generateRobotsTxt()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
