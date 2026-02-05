
import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Article as ArticleType } from '../types';
import { SEO } from '../components/SEO';
import { AdPlaceholder } from '../components/AdPlaceholder';

interface ArticleProps {
  articles: ArticleType[];
}

export const Article: React.FC<ArticleProps> = ({ articles }) => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  // Logic to find 3 recommended articles
  const recommendedArticles = useMemo(() => {
    if (!article) return [];
    
    // 1. Filter out the current article
    const others = articles.filter(a => a.id !== article.id);
    
    // 2. Try to find articles in the same category first
    const sameCategory = others.filter(a => a.category === article.category);
    
    // 3. Combine and pick the top 3 (preferring same category)
    const combined = [...sameCategory, ...others.filter(a => a.category !== article.category)];
    
    return combined.slice(0, 3);
  }, [article, articles]);

  if (!article) return <Navigate to="/" />;

  return (
    <article className="max-w-4xl mx-auto py-8">
      <SEO 
        title={article.title} 
        description={article.metaDescription} 
        article={article} 
      />

      <nav className="text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-teal-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-600 font-medium">{article.category}</span>
      </nav>

      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white shadow-sm" />
          <div className="text-base">
            <p className="font-bold text-slate-900">{article.author}</p>
            <p className="text-slate-400">Published: {new Date(article.datePublished).toLocaleDateString()}</p>
          </div>
        </div>

        {article.imageUrl ? (
          <img 
            src={article.imageUrl} 
            alt={article.imageAlt} 
            className="w-full aspect-[21/9] object-cover rounded-[2rem] shadow-xl mb-12"
          />
        ) : (
          <div className="w-full aspect-[21/9] bg-slate-100 border border-slate-200 rounded-[2rem] flex items-center justify-center text-slate-400 font-bold italic mb-12">
            Visualizing Wellness...
          </div>
        )}
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-grow">
          <div 
            className="prose prose-xl prose-slate max-w-none 
              prose-headings:serif prose-headings:font-bold prose-headings:text-slate-900 
              prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-8
              prose-li:text-slate-700 prose-strong:text-slate-900"
            dangerouslySetInnerHTML={{ __html: article.content }} 
          />
          
          <AdPlaceholder type="inline" />

          {/* Recommended Articles Section */}
          {recommendedArticles.length > 0 && (
            <section className="mt-20 pt-16 border-t border-slate-100">
              <h3 className="text-3xl font-bold text-slate-900 mb-10 serif italic">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recommendedArticles.map(rec => (
                  <Link key={rec.id} to={`/article/${rec.slug}`} className="group block space-y-4">
                    <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm">
                      {rec.imageUrl ? (
                        <img src={rec.imageUrl} alt={rec.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic text-sm">Insight</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{rec.category}</span>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors line-clamp-2">
                        {rec.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 pt-12 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Article Focus</h4>
            <div className="flex flex-wrap gap-3">
              {article.keywords.map(k => (
                <span key={k} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 shadow-sm">#{k}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24 space-y-10">
            <AdPlaceholder type="sidebar" />
            <div className="bg-white rounded-[1.5rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-6 text-lg">Share Insight</h4>
              <div className="grid grid-cols-1 gap-3">
                <button className="w-full py-3 bg-[#1877F2] text-white rounded-xl text-sm font-bold shadow-md hover:brightness-110 transition-all">Facebook</button>
                <button className="w-full py-3 bg-[#1DA1F2] text-white rounded-xl text-sm font-bold shadow-md hover:brightness-110 transition-all">Twitter / X</button>
                <button className="w-full py-3 bg-[#25D366] text-white rounded-xl text-sm font-bold shadow-md hover:brightness-110 transition-all">WhatsApp</button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="max-w-4xl mx-auto">
        <AdPlaceholder type="footer" />
      </div>
    </article>
  );
};
