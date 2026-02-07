
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Article, Category, AdConfig } from '../types';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HomeProps {
  articles: Article[];
  ads: AdConfig;
}

export const Home: React.FC<HomeProps> = ({ articles, ads }) => {
  const { cat } = useParams<{ cat: string }>();

  const filteredArticles = useMemo(() => {
    if (!cat) return articles;
    return articles.filter(a => a.category === cat);
  }, [articles, cat]);

  // Top 5 articles for the Hero/Mosaic
  const heroItems = useMemo(() => {
    return articles.slice(0, 5);
  }, [articles]);

  // The rest of the articles for the main feed
  const feedArticles = useMemo(() => {
    if (cat) return filteredArticles;
    return articles.slice(5);
  }, [articles, filteredArticles, cat]);

  // Helper to interleave ads into a flat list of articles
  const renderFeedWithAds = (items: Article[]) => {
    const feedElements: React.ReactNode[] = [];
    
    items.forEach((article, index) => {
      feedElements.push(
        <article key={article.id} className="bg-white news-grid-shadow overflow-hidden group mb-8">
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
                <span className="text-[10px] font-black uppercase text-legit-red tracking-widest block mb-2">
                  {article.category}
                </span>
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

      // Inject ads at specific intervals
      if ((index + 1) % 3 === 0) {
        feedElements.push(
          <div key={`ad-instream-${index}`} className="mb-8">
            <AdPlaceholder type="inStream" config={ads.inStream} />
          </div>
        );
      }
      if ((index + 1) % 7 === 0) {
        feedElements.push(
          <div key={`ad-intext-${index}`} className="mb-8">
            <AdPlaceholder type="inText" config={ads.inText} />
          </div>
        );
      }
    });

    return feedElements;
  };

  return (
    <div className="space-y-12">
      <SEO 
        title={cat ? `${cat} Insights` : "Latest Mental Health & Emotional News"} 
        description="HealthScope Daily: The definitive destination for mental health news and emotional wellness insights." 
      />

      {/* TOP MOSAIC GRID (Featured Section) */}
      {!cat && heroItems.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-1 h-auto lg:h-[600px] bg-slate-200">
          {/* Main Big Feature (2x2) */}
          <Link to={`/article/${heroItems[0].slug}`} className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden bg-legit-dark">
            <img src={heroItems[0].imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <span className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1.5 mb-4 inline-block tracking-widest shadow-xl">Featured Story</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 group-hover:underline">{heroItems[0].title}</h2>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <span>{heroItems[0].author}</span>
                <span className="w-1 h-1 bg-legit-red rounded-full" />
                <span>{heroItems[0].datePublished}</span>
              </div>
            </div>
          </Link>

          {/* Smaller Cards */}
          {heroItems.slice(1, 5).map((item) => (
            <Link key={item.id} to={`/article/${item.slug}`} className="relative group overflow-hidden bg-legit-dark h-64 lg:h-auto">
              <img src={item.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                <span className="text-[9px] font-black uppercase text-legit-red tracking-widest mb-2 block">{item.category}</span>
                <h3 className="text-lg font-black leading-snug group-hover:underline line-clamp-2">{item.title}</h3>
              </div>
            </Link>
          ))}
        </section>
      )}

      {/* MAIN NEWS FEED LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        <div className="flex-grow">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8 border-b-4 border-slate-900 pb-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {cat ? cat : "Latest Stories"}
            </h2>
            {!cat && <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Real-time Daily Updates</span>}
          </div>

          {/* The Feed - No Shortening, All Articles Visible */}
          <div className="space-y-2">
            {renderFeedWithAds(feedArticles)}
          </div>

          {feedArticles.length === 0 && (
            <div className="py-20 text-center text-slate-400 bg-white news-grid-shadow rounded-lg">
              <p className="font-bold uppercase tracking-widest text-xs">More insights coming soon...</p>
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:w-80 flex-shrink-0 space-y-12">
          {/* Trending Section */}
          <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow sticky top-24">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Trending In Wellness</h3>
            <div className="space-y-6">
              {articles.slice(5, 12).map((post, idx) => (
                <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-legit-red transition-colors">0{idx + 1}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{post.title}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block">{post.category}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <AdPlaceholder type="rectangle" config={ads.rectangle} />
            </div>
          </div>

          <AdPlaceholder type="skyscraper" config={ads.skyscraper} />

          {/* Social Proof Box */}
          <div className="bg-legit-dark text-white p-8 text-center rounded-sm">
            <h4 className="text-xl font-black mb-4 tracking-tighter">Join Our Community</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Get daily doses of mental clarity delivered straight to your notification tray.</p>
            <div className="flex gap-2 justify-center">
              {['FB', 'TW', 'IG'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-black hover:bg-legit-red transition-colors cursor-pointer">{s}</div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <AdPlaceholder type="anchor" config={ads.anchor} />
    </div>
  );
};
