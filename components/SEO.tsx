
import React, { useEffect } from 'react';
import { Article } from '../types';

interface SEOProps {
  title: string;
  description: string;
  article?: Article;
}

export const SEO: React.FC<SEOProps> = ({ title, description, article }) => {
  useEffect(() => {
    document.title = `${title} | HealthScope Daily`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
  }, [title, description]);

  const jsonLd = article ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://healthscopedaily.com/#/article/${article.slug}`
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
      "name": "HealthScope Daily",
      "logo": {
        "@type": "ImageObject",
        "url": "https://healthscopedaily.com/logo-600.png"
      }
    },
    "keywords": article.keywords.join(', ')
  } : {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "HealthScope Daily",
    "url": "https://healthscopedaily.com/",
    "description": "Daily insights on mental health and emotional wellness."
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
};
