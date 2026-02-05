
import React, { useEffect } from 'react';
import { Article } from '../types';

interface SEOProps {
  title: string;
  description: string;
  article?: Article;
}

export const SEO: React.FC<SEOProps> = ({ title, description, article }) => {
  const siteName = "HealthScope Daily";
  const fullTitle = `${title} | ${siteName}`;
  const siteUrl = "https://healthscopedaily.com";

  useEffect(() => {
    document.title = fullTitle;
    
    // Update meta tags dynamically
    const updateMeta = (name: string, content: string, property = false) => {
      let el = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', article ? 'article' : 'website', true);
    updateMeta('og:url', window.location.href, true);
    if (article) {
      updateMeta('og:image', article.imageUrl, true);
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', fullTitle);
      updateMeta('twitter:description', description);
      updateMeta('twitter:image', article.imageUrl);
    }
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);

  }, [title, description, article, fullTitle]);

  const jsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/#/article/${article.slug}`
    },
    "headline": article.title,
    "description": article.metaDescription,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "image": article.imageUrl,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo-600.png`
      }
    },
    "keywords": article.keywords.join(', ')
  } : {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": siteName,
    "url": siteUrl,
    "description": "Daily expert-guided insights on mental health and emotional wellness."
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
};
