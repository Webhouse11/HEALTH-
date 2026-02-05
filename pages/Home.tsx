
import React, { useMemo, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Article, Category } from '../types';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface HomeProps {
  articles: Article[];
}

interface SliderItem {
  type: 'article' | 'ad';
  data?: Article;
  adContent?: {
    title: string;
    subtitle: string;
    cta: string;
    imageUrl: string;
    tag: string;
  };
}

export const Home: React.FC<HomeProps> = ({ articles }) => {
  const { cat } = useParams<{ cat: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredArticles = useMemo(() => {
    if (!cat) return articles;
    return articles.filter(a => a.category === cat);
  }, [articles, cat]);

  const sliderItems = useMemo<SliderItem[]>(() => {
    const items: SliderItem[] = [];
    
    // 2 Articles for Slider
    const featuredArticles = articles.slice(0, 2);
    featuredArticles.forEach(art => items.push({ type: 'article', data: art }));

    // 3 Ads for Slider
    items.push({
      type: 'ad',
      adContent: {
        title: "Find Your Inner Calm with ZenSpace",
        subtitle: "Guided meditations tailored to your emotional state. Start your 7-day free trial today.",
        cta: "Download Now",
        imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&q=80&w=1200",
        tag: "SPONSORED"
      }
    });
    items.push({
      type: 'ad',
      adContent: {
        title: "Better Sleep is a Habit Away",
        subtitle: "The world's leading sleep tracking ring. Use code HEALTHSCOPE for 15% off.",
        cta: "Shop Oura",
        imageUrl: "https://images.unsplash.com/photo-1520206159572-46ecd9927a7c?auto=format&fit=crop&q=80&w=1200",
        tag: "PARTNER"
      }
    });
    items.push({
      type: 'ad',
      adContent: {
        title: "24/7 Professional Counseling",
        subtitle: "Connect with licensed therapists anytime, anywhere. Private and confidential support.",
        cta: "Get Started",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200",
        tag: "ADVERTISEMENT"
      }
    });

    return items;
  }, [articles]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [sliderItems.length]);

  const featured = filteredArticles[0];
  const recents = filteredArticles.slice(1);

  return (
    <div className="space-y-16">
      <SEO 
        title={cat ? `${cat} Insights` : "Mental Health & Emotional Wellness"} 
        description={`HealthScope Daily delivers daily, expert-guided insights on ${cat || 'mental health, anxiety, depression, and stress recovery'}.`} 
      />
      
      {!cat && (
        <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-[3rem] shadow-2xl bg-slate-900 group">
          {sliderItems.map((item, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent z-10" />
              <img 
                src={item.type === 'article' ? item.data?.imageUrl : item.adContent?.imageUrl} 
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[10s] linear"
              />
              <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
                <span className="text-teal-400 font-bold tracking-[0.3em] text-xs mb-4 uppercase">
                  {item.type === 'article' ? item.data?.category : item.adContent?.tag}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 serif leading-[1.1]">
                  {item.type === 'article' ? item.data?.title : item.adContent?.title}
                </h2>
                <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl line-clamp-2">
                  {item.type === 'article' ? item.data?.metaDescription : item.adContent?.subtitle}
                </p>
                <div>
                  {item.type === 'article' ? (
                    <Link 
                      to={`/article/${item.data?.slug}`}
                      className="inline-block px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold hover:bg-teal-700 transition-all shadow-lg"
                    >
                      Read Article
                    </Link>
                  ) : (
                    <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-lg">
                      {item.adContent?.cta}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-10 right-8 md:right-20 z-30 flex gap-3">
            {sliderItems.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 transition-all rounded-full ${i === currentSlide ? 'w-10 bg-teal-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </section>
      )}

      <section className="text-center py-6">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
          {cat ? cat : "HealthScope Daily – Mental Health & Emotional Wellness, Every Day"}
        </h1>
        <p className="text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          {cat 
            ? `Deep dives and daily guidance for ${cat.toLowerCase()}.`
            : "Expert-guided daily insights for your emotional wellness journey, crafted for clarity and peace."
          }
        </p>
      </section>

      {featured && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 p-4 lg:p-0">
          <div className="h-80 lg:h-[550px] overflow-hidden bg-slate-100 flex items-center justify-center rounded-[2rem] lg:rounded-none">
            {featured.imageUrl ? (
              <img 
                src={featured.imageUrl} 
                alt={featured.imageAlt} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            ) : (
              <span className="text-slate-300 font-bold italic serif text-3xl">HealthScope Daily</span>
            )}
          </div>
          <div className="p-8 lg:p-16 space-y-6">
            <span className="text-sm font-bold text-teal-600 uppercase tracking-[0.2em]">{featured.category}</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.2]">
              <Link to={`/article/${featured.slug}`} className="hover:text-teal-700 transition-colors">
                {featured.title}
              </Link>
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed">
              {featured.metaDescription}
            </p>
            <div className="pt-6 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
              <div>
                <p className="text-base font-semibold text-slate-900">{featured.author}</p>
                <p className="text-sm text-slate-400">{new Date(featured.datePublished).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <div className="flex justify-between items-end border-b-2 border-teal-100 pb-4">
             <h3 className="text-3xl font-bold">
               {cat ? `Latest in ${cat}` : 'Featured Insights'}
             </h3>
             <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">{filteredArticles.length} articles</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {recents.map(article => (
              <article key={article.id} className="group">
                <Link to={`/article/${article.slug}`}>
                  <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-md bg-slate-100 flex items-center justify-center">
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.imageAlt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="text-slate-300 font-bold text-lg italic">Wellness Insight</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">{article.category}</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-3 mb-3 group-hover:text-teal-700 transition-colors leading-tight">
                    {article.title}
                  </h4>
                </Link>
                <p className="text-slate-500 text-lg leading-relaxed line-clamp-3">
                  {article.metaDescription}
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-12">
          <div className="sticky top-28 space-y-12">
            <AdPlaceholder type="sidebar" />
            <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] text-xs">Explore Niches</h4>
              <div className="flex flex-col gap-3">
                {Object.values(Category).map(categoryValue => (
                  <Link 
                    key={categoryValue} 
                    to={`/category/${categoryValue}`}
                    className={`px-5 py-3 rounded-xl text-base font-semibold transition-all shadow-sm ${
                      cat === categoryValue 
                        ? 'bg-teal-600 text-white translate-x-2' 
                        : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-700 hover:translate-x-2'
                    }`}
                  >
                    {categoryValue}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
