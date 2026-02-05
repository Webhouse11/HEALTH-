
export enum Category {
  ANXIETY = 'Anxiety Management',
  DEPRESSION = 'Depression Coping',
  STRESS = 'Stress & Burnout',
  TRAUMA = 'Trauma & Regulation',
  MINDFULNESS = 'Mindfulness & Meditation',
  MEN_HEALTH = "Men's Mental Health",
  WOMEN_HEALTH = "Women's Mental Health",
  DAILY_GUIDE = "Daily Guides"
}

export enum UserRole {
  GUEST = 'Guest',
  EDITOR = 'Editor',
  ADMIN = 'Admin'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  category: Category;
  content: string;
  datePublished: string;
  dateModified: string;
  imageAlt: string;
  author: string;
  canonicalUrl: string;
  imageUrl: string;
}

export interface AppState {
  articles: Article[];
  isGenerating: boolean;
  lastGeneratedDate: string | null;
  currentUser: User | null;
}
