import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Article, Category, AdConfig } from '../types';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HomeProps {
  articles: Article[];
  ads: AdConfig;
}

export const Home: React.FC<HomeProps> = ({ articles, ads }) => {
  const { cat } = useParams<{ cat: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (cat) result = result.filter(a => a.category === cat);
    if (searchQuery) {
      result = result.filter(a => 
        a.title.toLowerCase().includes(searchQuery) ||
        a.keywords.some(k => k.toLowerCase().includes(searchQuery)) ||
        a.metaDescription.toLowerCase().includes(searchQuery)
      );
    }
    return result;
  }, [articles, cat, searchQuery]);

  // The very latest article (index 0) is the "Lead Feature"
  const latestArticle = useMemo(() => articles[0], [articles]);
  
  // Secondary features (the next 4)
  const subFeatures = useMemo(() => articles.slice(1, 5), [articles]);

  // Rest of the feed
  const feedArticles = useMemo(() => {
    if (searchQuery || cat) return filteredArticles;
    return articles.slice(5);
  }, [articles, filteredArticles, cat, searchQuery]);

  const renderFeedWithAds = (items: Article[]) => {
    const feedElements: React.ReactNode[] = [];
    items.forEach((article, index) => {
      // Logic for item numbering: Total Articles - Index
      const articleNumber = articles.length - articles.indexOf(article);
      
      feedElements.push(
        <article key={article.id} className="bg-white news-grid-shadow overflow-hidden group mb-8 relative border-l-2 border-transparent hover:border-legit-red transition-all">
          <Link to={`/article/${article.slug}`}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 aspect-video relative overflow-hidden flex-shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase text-legit-red tracking-widest block">
                    {article.category}
                  </span>
                  <span className="text-[8px] font-bold text-slate-300">INSIGHT #{articleNumber}</span>
                </div>
                <h4 className="text-xl md:text-2xl font-black mb-3 leading-tight group-hover:text-legit-red transition-colors">
                  {article.title}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {article.metaDescription}
                </p>
                <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>By {article.author}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span>{article.datePublished}</span>
                </div>
              </div>
            </div>
          </Link>
        </article>
      );

      if ((index + 1) % 4 === 0) {
        feedElements.push(
          <div key={`ad-intext-${index}`} className="mb-8">
            <AdPlaceholder type="inText" config={ads.inText} />
          </div>
        );
      }
    });
    return feedElements;
  };

  const sectionTitle = searchQuery 
    ? `Search: "${searchQuery}"`
    : cat 
      ? cat 
      : "Latest Wellness Stories";

  return (
    <div className="space-y-12">
      <SEO 
        title={searchQuery ? `Search: ${searchQuery}` : (cat ? `${cat}` : "Daily Mental Health Insights")} 
        description="HealthScope Daily: Professional mental health news and emotional wellness archive." 
      />

      {/* LEAD FEATURE SECTION (Always the Latest Upload) */}
      {!cat && !searchQuery && latestArticle && (
        <section className="relative overflow-hidden bg-legit-dark text-white rounded-[2.5rem] news-grid-shadow group border border-white/5">
           <div className="flex flex-col lg:flex-row h-full">
              {/* Feature Image */}
              <div className="lg:w-3/5 relative h-[400px] lg:h-[650px] overflow-hidden">
                 <img 
                    src={latestArticle.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-80" 
                    alt={latestArticle.imageAlt}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-legit-dark via-transparent to-transparent opacity-90" />
                 <div className="absolute top-8 left-8 lg:top-12 lg:left-12 z-20 flex flex-col gap-3">
                    <span className="bg-legit-red text-white text-[10px] font-black uppercase px-5 py-2.5 shadow-2xl tracking-[0.2em] flex items-center gap-2.5 rounded-full border border-white/20">
                      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                      Just Published
                    </span>
                    <span className="bg-white/10 backdrop-blur-xl text-white text-[9px] font-black uppercase px-4 py-2 tracking-[0.2em] border border-white/10 rounded-full shadow-lg">
                      Discovery #{articles.length} of {articles.length}
                    </span>
                 </div>
              </div>

              {/* Feature Text Content */}
              <div className="lg:w-2/5 p-8 lg:p-16 flex flex-col justify-center bg-legit-dark relative">
                 <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none">
                    <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703C7.91246 16 7.01703 16.8954 7.01703 18V21H14.017ZM14.017 21H19.017V18C19.017 14.134 15.883 11 12.017 11C8.15104 11 5.01703 14.134 5.01703 18V21H14.017Z"/></svg>
                 </div>

                 <span className="text-legit-red text-[11px] font-black uppercase tracking-[0.5em] mb-6 block drop-shadow-sm">Lead Featured Story</span>
                 
                 <Link to={`/article/${latestArticle.slug}`}>
                    <h2 className="text-3xl lg:text-5xl font-black mb-10 leading-[1.1] hover:text-legit-red transition-all decoration-legit-red underline-offset-[12px] group-hover:underline">
                       {latestArticle.title}
                    </h2>
                 </Link>
                 
                 <p className="text-slate-400 text-lg leading-relaxed mb-12 line-clamp-4 lg:line-clamp-none opacity-90 font-medium">
                    {latestArticle.metaDescription}
                 </p>
                 
                 <div className="flex items-center gap-10 mb-12 border-t border-white/10 pt-12">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Editor In Chief</span>
                       <span className="text-xs font-bold uppercase text-white tracking-widest">{latestArticle.author}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Released</span>
                       <span className="text-xs font-bold uppercase text-white tracking-widest">{latestArticle.datePublished}</span>
                    </div>
                 </div>
                 
                 <Link 
                    to={`/article/${latestArticle.slug}`}
                    className="group/btn inline-flex items-center justify-center gap-5 bg-white text-legit-dark px-12 py-6 rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-legit-red hover:text-white transition-all transform hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                 >
                    Read Full Insight
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                 </Link>
              </div>
           </div>
        </section>
      )}

      {/* SECONDARY TIERS */}
      {!cat && !searchQuery && subFeatures.length > 0 && (
         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subFeatures.map((item) => (
               <Link key={item.id} to={`/article/${item.slug}`} className="bg-white p-6 rounded-[2.5rem] news-grid-shadow group hover:-translate-y-2 transition-all border border-transparent hover:border-slate-200">
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-inner border border-slate-50">
                     <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-legit-red tracking-widest mb-2 block">{item.category}</span>
                  <h3 className="text-sm font-black leading-snug group-hover:text-legit-red transition-colors line-clamp-2">{item.title}</h3>
               </Link>
            ))}
         </section>
      )}

      {/* MAIN FEED */}
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 border-b-4 border-slate-900 pb-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {sectionTitle} <span className="text-slate-200 text-sm ml-2">— {filteredArticles.length} Recent Insights</span>
            </h2>
            <div className="hidden sm:flex items-center gap-2">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Archive:</span>
               <span className="bg-legit-dark text-white px-3 py-1 rounded-full text-[10px] font-black">{articles.length}</span>
            </div>
          </div>

          <div className="space-y-2">
            {renderFeedWithAds(feedArticles)}
          </div>

          {feedArticles.length === 0 && (
            <div className="py-24 text-center text-slate-400 bg-white news-grid-shadow rounded-3xl border border-slate-100">
              <p className="font-bold uppercase tracking-widest text-xs">No matching articles in this view.</p>
              <Link to="/" className="inline-block mt-8 text-[10px] font-black uppercase tracking-widest bg-legit-red text-white px-8 py-3 rounded-full">Return Home</Link>
            </div>
          )}
        </div>

        <aside className="lg:w-80 flex-shrink-0 space-y-12">
          <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow sticky top-24 rounded-3xl">
            <h3 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-slate-50 pb-4">Pulse Charts</h3>
            <div className="space-y-8">
              {articles.slice(5, 12).map((post, idx) => (
                <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-legit-red transition-colors">#{articles.length - articles.indexOf(post)}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{post.title}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block tracking-tighter">{post.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdPlaceholder type="rectangle" config={ads.rectangle} />
        </aside>
      </div>
    </div>
  );
};