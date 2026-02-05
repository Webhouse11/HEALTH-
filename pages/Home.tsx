
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

  // Legit Mirror: 1 Big Featured, then 3 small, then more sections
  const heroItems = useMemo(() => {
    return articles.slice(0, 8);
  }, [articles]);

  const sections = useMemo(() => {
    const categories = Object.values(Category);
    return categories.map(category => ({
      title: category,
      articles: articles.filter(a => a.category === category).slice(0, 4)
    })).filter(s => s.articles.length > 0);
  }, [articles]);

  return (
    <div className="space-y-12">
      <SEO 
        title={cat ? `${cat} Insights` : "Latest Mental Health & Emotional News"} 
        description="HealthScope Daily: The definitive destination for mental health news and emotional wellness insights." 
      />

      {/* TOP MOSAIC GRID (Mirroring Legit's top section) */}
      {!cat && heroItems.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-2 gap-1 h-auto lg:h-[600px] bg-slate-200">
          {/* Main Big Feature (2x2) */}
          <Link to={`/article/${heroItems[0].slug}`} className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden bg-legit-dark">
            <img src={heroItems[0].imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 p-8 text-white w-full">
              <span className="bg-legit-red text-white text-[10px] font-black uppercase px-3 py-1.5 mb-4 inline-block tracking-widest">Featured</span>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 group-hover:underline">{heroItems[0].title}</h2>
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <span>{heroItems[0].author}</span>
                <span className="w-1 h-1 bg-legit-red rounded-full" />
                <span>{heroItems[0].datePublished}</span>
              </div>
            </div>
          </Link>

          {/* Smaller Cards */}
          {heroItems.slice(1, 5).map((item, idx) => (
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

      {/* MAIN NEWS FEED LAYOUT (With Sidebar) */}
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        <div className="flex-grow space-y-12">
          {/* IF CATEGORY VIEW */}
          {cat && (
             <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                   <h2 className="text-3xl font-black uppercase tracking-tighter border-l-4 border-legit-red pl-4">{cat}</h2>
                   <div className="h-px bg-slate-200 flex-grow" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {filteredArticles.map(article => (
                      <article key={article.id} className="bg-white news-grid-shadow overflow-hidden group">
                         <Link to={`/article/${article.slug}`}>
                            <div className="aspect-video relative overflow-hidden">
                               <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-5">
                               <span className="text-[10px] font-black uppercase text-legit-red tracking-widest block mb-2">{article.category}</span>
                               <h4 className="text-xl font-black mb-3 leading-tight group-hover:text-legit-red transition-colors">{article.title}</h4>
                               <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{article.metaDescription}</p>
                            </div>
                         </Link>
                      </article>
                   ))}
                </div>
             </div>
          )}

          {/* HOME CATEGORY SECTIONS */}
          {!cat && sections.map((section, sIdx) => (
            <section key={section.title} className="space-y-6">
              <div className="flex justify-between items-center border-b-2 border-slate-100 pb-2">
                <h2 className="text-xl font-black uppercase tracking-tighter border-l-4 border-legit-red pl-4">{section.title}</h2>
                <Link to={`/category/${section.title}`} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-legit-red">View All</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.articles.map(article => (
                  <article key={article.id} className="group">
                    <Link to={`/article/${article.slug}`}>
                      <div className="aspect-video mb-3 overflow-hidden rounded-sm">
                        <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h4 className="text-sm font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{article.title}</h4>
                    </Link>
                  </article>
                ))}
              </div>
              {/* Insert Ad after every 2 sections */}
              {sIdx % 2 === 1 && <AdPlaceholder type="inStream" config={ads.inStream} className="py-8" />}
            </section>
          ))}
        </div>

        {/* SIDEBAR (Mirroring Legit's Trending/Sidebar) */}
        <aside className="lg:w-80 flex-shrink-0 space-y-12">
          {/* Trending Section */}
          <div className="bg-white p-6 border-t-2 border-legit-red news-grid-shadow">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">Trending Now</h3>
            <div className="space-y-6">
              {articles.slice(5, 10).map((post, idx) => (
                <Link key={post.id} to={`/article/${post.slug}`} className="flex gap-4 group">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-legit-red transition-colors">0{idx + 1}</span>
                  <div>
                    <h4 className="text-xs font-bold leading-tight group-hover:text-legit-red transition-colors line-clamp-3">{post.title}</h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase mt-2 block">{post.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <AdPlaceholder type="rectangle" config={ads.rectangle} />
          
          {/* Category List */}
          <div className="bg-legit-dark text-white p-6 rounded-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-legit-red mb-6">Browse by Niche</h3>
            <div className="flex flex-col gap-3">
              {Object.values(Category).map(c => (
                <Link key={c} to={`/category/${c}`} className="text-xs font-bold hover:text-legit-red transition-colors flex justify-between">
                  <span>{c}</span>
                  <svg className="w-4 h-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </Link>
              ))}
            </div>
          </div>

          <AdPlaceholder type="skyscraper" config={ads.skyscraper} />
        </aside>
      </div>
    </div>
  );
};
