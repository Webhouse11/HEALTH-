

import { GoogleGenAI, Type } from "@google/genai";
import { Article, Category } from "../types";

export class ContentAutomationService {
  /**
   * Generates a daily wellness blog post grounded in real-time trends using Gemini 3.
   * - Uses gemini-3-pro-preview for complex reasoning and deep writing tasks.
   * - Initializes GoogleGenAI per request to ensure the latest configuration is used.
   * - Extracts grounding sources when using googleSearch to comply with grounding rules.
   */
  async generateDailyPost(existingTopics: string[]): Promise<Article> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const niches = Object.values(Category);
    const selectedNiche = niches[Math.floor(Math.random() * niches.length)];

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

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview", // Complex writing task requires the Pro model
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
      if (!jsonStr) throw new Error("AI generation failed: Empty response.");

      const data = JSON.parse(jsonStr.trim());
      const today = new Date().toISOString().split('T')[0];
      const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      // Correctly extract URLs from groundingChunks as required by the guidelines
      const groundingSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => {
          if (chunk.web) {
            return {
              title: chunk.web.title || chunk.web.uri,
              uri: chunk.web.uri
            };
          }
          return null;
        })
        .filter((source: any) => source !== null) || [];

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
        imageUrl: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&q=80&w=1200`,
        groundingSources
      };
    } catch (error: any) {
      if (error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
        throw new Error("QUOTA_EXCEEDED");
      }
      throw error;
    }
  }
}