
import { Article } from '../types';

export class SEOGenerator {
  private baseUrl: string = "https://healthscopedaily.com";

  generateSitemap(articles: Article[]): string {
    // Fix: Explicitly type the pages array to include optional lastmod to satisfy the compiler
    const pages: { url: string; priority: string; changefreq: string; lastmod?: string }[] = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/about', priority: '0.8', changefreq: 'monthly' },
      { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    ];

    const articleUrls = articles.map(a => ({
      url: `/article/${a.slug}`,
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: a.dateModified
    }));

    const allUrls = [...pages, ...articleUrls];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${this.baseUrl}/#${u.url}</loc>
    <lastmod>${u.lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  }

  generateRSS(articles: Article[]): string {
    const items = articles.slice(0, 20).map(a => `    <item>
      <title>${this.escapeXml(a.title)}</title>
      <link>${this.baseUrl}/#/article/${a.slug}</link>
      <description>${this.escapeXml(a.metaDescription)}</description>
      <pubDate>${new Date(a.datePublished).toUTCString()}</pubDate>
      <guid>${this.baseUrl}/#/article/${a.slug}</guid>
    </item>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HealthScope Daily</title>
    <link>${this.baseUrl}</link>
    <description>Mental Health &amp; Emotional Wellness, Every Day</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /
Sitemap: ${this.baseUrl}/sitemap.xml`;
  }

  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&"']/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '"': return '&quot;';
        case "'": return '&apos;';
        default: return c;
      }
    });
  }
}
