
import { GoogleGenAI, Type } from "@google/genai";
import { Article, Category } from "../types";

export class ContentAutomationService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateDailyPost(existingTopics: string[]): Promise<Article> {
    const niches = Object.values(Category);
    const selectedNiche = niches[Math.floor(Math.random() * niches.length)];

    // Using Gemini 3 Pro for search grounding capabilities
    const prompt = `
      STEP 1: Use Google Search to find the most trending and frequently searched questions/topics regarding "${selectedNiche}" today.
      STEP 2: Based on those trends, write a high-authority, SEO-optimized blog post for HealthScope Daily.
      
      Topic context to avoid duplication: ${existingTopics.slice(-10).join(', ')}
      
      Requirements:
      - Title: Must be an H1-style click-worthy, SEO-optimized headline (e.g., "5 Signs of...", "How to Deal with...").
      - Meta Description: High CTR summary for Google Search results.
      - Content: 1000+ words. Deeply informative. Use HTML tags (<h2>, <h3>, <p>, <ul>). 
      - Grounding: Mention real-world statistics or current wellness trends found in your search.
      - Keywords: List 5 high-volume search keywords you identified.
      - Image Alt: Detailed for accessibility.
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable real-time Google search grounding
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            metaDescription: { type: Type.STRING },
            content: { type: Type.STRING },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            imageAlt: { type: Type.STRING }
          },
          required: ["title", "metaDescription", "content", "keywords", "imageAlt"]
        }
      }
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("AI generation failed.");

    const data = JSON.parse(jsonStr.trim());
    const today = new Date().toISOString().split('T')[0];
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return {
      id: Math.random().toString(36).substr(2, 9),
      slug,
      title: data.title,
      metaDescription: data.metaDescription,
      keywords: data.keywords,
      category: selectedNiche,
      content: data.content,
      datePublished: today,
      dateModified: today,
      imageAlt: data.imageAlt,
      author: 'HealthScope Research AI',
      canonicalUrl: `/#/article/${slug}`,
      imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=1200`
    };
  }
}
