

import React, { useMemo, useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Article as ArticleType, Category, AdConfig } from '../types';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface ArticleProps {
  articles: ArticleType[];
  ads: AdConfig;
}

export const Article: React.FC<ArticleProps> = ({ articles, ads }) => {
  const { slug } = useParams<{ slug: string }>();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ads.interstitial.active) setShowInterstitial(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [ads.interstitial.active]);

  const sidebarRecentPosts = useMemo(() => {
    return articles.filter(a => a.slug !== slug).slice(0, 5);
  }, [articles, slug]);

  const injectedContent = useMemo(() => {
    if (!article) return "";
    const paragraphs = article.content.split('</p>');
    if (paragraphs.length > 3) {
      paragraphs.splice(2, 0, `<div class="ad-insertion-point my-12"></div>`);
    }
    return paragraphs.join('</p>');
  }, [article]);

  if (!article) return <Navigate to="/" />;

  return (
    <div className="relative">
      <SEO title={article.title} description={article.metaDescription} article={article} />
      
      {showInterstitial && (
        <div onClick={() => setShowInterstitial(false)}>
           <AdPlaceholder type="interstitial" config={ads.interstitial} />
        </div>
      )}

      <div className="mb-6 flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <Link to="/" className="hover:text-legit-red">Home</Link>
        <span>/</span>
        <Link to={`/category/${article.category}`} className="hover:text-legit-red">{article.category}</Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-grow max-w-4xl">
          <header className="mb-10">
            <span className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1 mb-6 inline-block tracking-widest">Wellness Insight</span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{article.title}</h1>
            
            <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-legit-red flex items-center justify-center text-white font-black text-sm">H</div>
                <div className="text-[10px] font-black uppercase tracking-widest">
                   <p className="text-slate-900">By {article.author}</p>
                   <p className="text-slate-400">{article.datePublished}</p>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-sm overflow-hidden mb-12 shadow-md">
               <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover" />
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-slate-800 leading-relaxed font-medium mb-16">
             <div dangerouslySetInnerHTML={{ __html: injectedContent.split('<div class="ad-insertion-point my-12"></div>')[0] }} />
             
             <div className="my-16">
                <AdPlaceholder type="inText" config={ads.inText} className="!rounded-none border-y-2 border-legit-red" />
                <AdPlaceholder type="mInText" config={ads.mInText} />
             </div>

             <div dangerouslySetInnerHTML={{ __html: injectedContent.split('<div class="ad-insertion-point my-12"></div>')[1] }} />
          </div>

          {/* Grounding Sources Section: Required by Gemini Search Grounding guidelines */}
          {article.groundingSources && article.groundingSources.length > 0 && (
            <div className="mb-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Verified Sources & Research</h3>
              <ul className="space-y-2">
                {article.groundingSources.map((source, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-600 hover:text-legit-red transition-colors">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <footer className="pt-12 border-t border-slate-100 mb-20">
             <div className="flex flex-wrap gap-2 mb-12">
                {article.keywords.map(k => <span key={k} className="bg-slate-100 px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-500 rounded">#{k}</span>)}
             </div>
             
             <section className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-tighter border-l-4 border-legit-red pl-4">Read Next</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {sidebarRecentPosts.map(post => (
                      <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                         <div className="w-24 h-24 rounded-sm overflow-hidden flex-shrink-0 shadow-sm">
                            <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                         </div>
                         <div>
                            <h4 className="text-sm font-black leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{post.title}</h4>
                         </div>
                      </Link>
                   ))}
                </div>
             </section>
          </footer>
        </div>

        <aside className="lg:w-80 flex-shrink-0 space-y-12">
           {/* Adsterra Native Ads Placement - TOP OF SIDEBAR */}
           <div className="bg-white p-4 rounded-3xl news-grid-shadow overflow-hidden border border-slate-100">
              <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest block mb-2 text-center">SPONSORED CONTENT</span>
              <div id="container-d9e35cd28e618badc2aec5bfc4766fb5"></div>
           </div>

           <AdPlaceholder type="rectangle" config={ads.rectangle} />
           
           <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Trending Insights</h3>
              <div className="space-y-6">
                {articles.filter(a => a.id !== article.id).slice(0, 5).map((post, idx) => (
                  <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-legit-red transition-colors">#{idx + 1}</span>
                    <h4 className="text-xs font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-2">{post.title}</h4>
                  </Link>
                ))}
              </div>
           </div>

           <AdPlaceholder type="skyscraper" config={ads.skyscraper} />
        </aside>
      </div>

      <AdPlaceholder type="anchor" config={ads.anchor} />
    </div>
  );
};