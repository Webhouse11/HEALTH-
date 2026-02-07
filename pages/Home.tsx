
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

      {/* LEAD FEATURE SECTION (Newest Post) */}
      {!cat && !searchQuery && latestArticle && (
        <section className="relative overflow-hidden bg-legit-dark text-white rounded-[2rem] news-grid-shadow group">
           <div className="flex flex-col lg:flex-row h-full">
              {/* Feature Image */}
              <div className="lg:w-2/3 relative h-[400px] lg:h-[600px] overflow-hidden">
                 <img 
                    src={latestArticle.imageUrl} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" 
                    alt={latestArticle.imageAlt}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                 <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
                    <span className="bg-legit-red text-white text-[10px] font-black uppercase px-4 py-2 shadow-2xl tracking-[0.2em] flex items-center gap-2 rounded-sm">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Just Published
                    </span>
                    <span className="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1.5 tracking-widest border border-white/20 rounded-sm">
                      Latest Discovery: Article {articles.length} of {articles.length}
                    </span>
                 </div>
              </div>

              {/* Feature Text */}
              <div className="lg:w-1/3 p-8 lg:p-12 flex flex-col justify-center bg-legit-dark">
                 <span className="text-legit-red text-[10px] font-black uppercase tracking-[0.3em] mb-4">Lead Feature Story</span>
                 <Link to={`/article/${latestArticle.slug}`}>
                    <h2 className="text-3xl lg:text-5xl font-black mb-6 leading-tight hover:text-legit-red transition-colors">
                       {latestArticle.title}
                    </h2>
                 </Link>
                 <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {latestArticle.metaDescription}
                 </p>
                 <div className="flex items-center gap-6 mb-8 border-t border-white/10 pt-8">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Editor</span>
                       <span className="text-[10px] font-bold uppercase">{latestArticle.author}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Released</span>
                       <span className="text-[10px] font-bold uppercase">{latestArticle.datePublished}</span>
                    </div>
                 </div>
                 <Link 
                    to={`/article/${latestArticle.slug}`}
                    className="inline-flex items-center gap-4 bg-white text-legit-dark px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-legit-red hover:text-white transition-all transform hover:translate-x-2"
                 >
                    Read Full Insight
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                 </Link>
              </div>
           </div>
        </section>
      )}

      {/* SECONDARY TIERS */}
      {!cat && !searchQuery && subFeatures.length > 0 && (
         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subFeatures.map((item) => (
               <Link key={item.id} to={`/article/${item.slug}`} className="bg-white p-5 rounded-[1.5rem] news-grid-shadow group hover:-translate-y-1 transition-all border border-transparent hover:border-slate-200">
                  <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
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
              {sectionTitle} <span className="text-slate-200 text-sm ml-2">— {filteredArticles.length} Articles Found</span>
            </h2>
            <div className="hidden sm:flex items-center gap-2">
               <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Archive:</span>
               <span className="bg-legit-dark text-white px-2 py-0.5 rounded text-[10px] font-black">{articles.length}</span>
            </div>
          </div>

          <div className="space-y-2">
            {renderFeedWithAds(feedArticles)}
          </div>

          {feedArticles.length === 0 && (
            <div className="py-24 text-center text-slate-400 bg-white news-grid-shadow rounded-lg">
              <p className="font-bold uppercase tracking-widest text-xs">No matching articles in this view.</p>
              <Link to="/" className="inline-block mt-8 text-[10px] font-black uppercase tracking-widest bg-legit-red text-white px-6 py-2.5 rounded-full">Return Home</Link>
            </div>
          )}
        </div>

        <aside className="lg:w-80 flex-shrink-0 space-y-12">
          <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Archive Spotlight</h3>
            <div className="space-y-6">
              {articles.slice(5, 12).map((post, idx) => (
                <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-legit-red transition-colors">#{articles.length - articles.indexOf(post)}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{post.title}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block">{post.category}</span>
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
