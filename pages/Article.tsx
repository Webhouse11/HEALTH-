
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

      {/* Top Breadcrumb */}
      <div className="mb-6 flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <Link to="/" className="hover:text-legit-red">Home</Link>
        <span>/</span>
        <Link to={`/category/${article.category}`} className="hover:text-legit-red">{article.category}</Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Article Column */}
        <div className="flex-grow max-w-4xl">
          <header className="mb-10">
            <span className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1 mb-6 inline-block tracking-widest">Wellness News</span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{article.title}</h1>
            
            <div className="flex items-center justify-between border-y border-slate-100 py-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-legit-red flex items-center justify-center text-white font-black text-sm">H</div>
                <div className="text-[10px] font-black uppercase tracking-widest">
                   <p className="text-slate-900">By {article.author}</p>
                   <p className="text-slate-400">{article.datePublished}</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-legit-red hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></button>
                 <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-legit-red hover:text-white transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></button>
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
                            <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block">{post.category}</span>
                         </div>
                      </Link>
                   ))}
                </div>
             </section>
          </footer>
        </div>

        {/* Article Sidebar */}
        <aside className="lg:w-80 flex-shrink-0 space-y-12">
           <AdPlaceholder type="rectangle" config={ads.rectangle} />
           
           <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow sticky top-24">
              <h3 className="text-sm font-black uppercase tracking-widest mb-6">Trending Topics</h3>
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
