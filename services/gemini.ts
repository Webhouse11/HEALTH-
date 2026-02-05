
import { GoogleGenAI, Type } from "@google/genai";
import { Article, Category } from "../types";

export class ContentAutomationService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initialize GoogleGenAI with a named parameter using the environment variable directly.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateDailyPost(existingTopics: string[]): Promise<Article> {
    const niches = Object.values(Category);
    const selectedNiche = niches[Math.floor(Math.random() * niches.length)];

    const prompt = `
      As a mental health expert writer for HealthScope Daily, generate a high-quality, SEO-optimized blog post for today.
      Niche: ${selectedNiche}
      Existing Topics to Avoid: ${existingTopics.join(', ')}
      
      Requirements:
      - Title: SEO-friendly, under 60 chars.
      - Meta Description: Compassionate, under 160 chars.
      - Content: 800-1000 words in HTML format (use <h2>, <h3>, <p>, <ul>).
      - Tone: Empathetic, evidence-informed, professional yet warm.
      - Keywords: 3-5 relevant focus keywords.
      - Image Alt: Detailed descriptive text.
    `;

    // Always use ai.models.generateContent to query GenAI with both the model name and prompt.
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
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

    // Access the text property directly (it's a property, not a method).
    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("The model did not return any text content.");
    }

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
      author: 'HealthScope AI Editor',
      canonicalUrl: `/#/article/${slug}`,
      imageUrl: `https://picsum.photos/seed/${slug}/1200/630`
    };
  }
}
