
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

export interface AdSlot {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  imageUrl: string;
  type: 'placeholder' | 'custom';
  customScript: string;
  active: boolean;
}

export interface AdConfig {
  leaderboard: AdSlot;
  anchor: AdSlot;
  rectangle: AdSlot;
  tenancy: AdSlot;
  inText: AdSlot;
  sticky: AdSlot;
  interArticle: AdSlot;
  skyscraper: AdSlot;
  inStream: AdSlot;
  interstitial: AdSlot;
  sponsor: AdSlot;
  // Mobile Specific
  mLeaderboard: AdSlot;
  mTenancy: AdSlot;
  mInText: AdSlot;
  mAnchor: AdSlot;
  mInterArticle: AdSlot;
  mInStream: AdSlot;
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
  ads: AdConfig;
}
