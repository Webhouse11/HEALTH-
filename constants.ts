
import { Category, Article } from './types';

const getRelativeDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'understanding-anxiety-roots',
    title: 'Understanding the Roots of Daily Anxiety',
    metaDescription: 'Discover the physiological and psychological triggers of daily anxiety and how to manage them effectively with evidence-based techniques.',
    keywords: ['anxiety', 'mental health', 'stress triggers', 'CBT'],
    category: Category.ANXIETY,
    content: `
      <h2>The Anatomy of Modern Anxiety</h2>
      <p>Anxiety is often misunderstood as a simple feeling of nervousness. In reality, it is a sophisticated survival mechanism—the "fight or flight" response—that has evolved over millions of years. For our ancestors, this response was triggered by immediate physical threats, like predators. Today, however, our nervous systems often react to psychological stressors—like a full inbox, social media comparisons, or financial uncertainty—with the same physiological intensity.</p>
      <h3>The Physical Manifestation of Worry</h3>
      <p>When anxiety takes hold, the amygdala signals the release of cortisol and adrenaline. This leads to a cascade of physical symptoms: shallow breathing, muscle tension (particularly in the neck and shoulders), and an elevated heart rate. Chronic activation of this system can lead to exhaustion, digestive issues, and a weakened immune system. Recognizing these physical "red flags" is the first step in emotional regulation.</p>
      <h3>Practical Grounding Techniques</h3>
      <p>To move from a state of hyperarousal back to calm, we must engage the parasympathetic nervous system. One effective method is the 5-4-3-2-1 technique: identify five things you see, four you can touch, three you hear, two you can smell, and one you can taste. This shifts the brain's focus from internal catastrophic thoughts to external sensory reality.</p>
    `,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Person practicing deep breathing in a park',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/understanding-anxiety-roots',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    slug: 'digital-detox-for-burnout',
    title: 'Digital Detox: A Prescription for Modern Burnout',
    metaDescription: 'Learn how stepping away from screens can recalibrate your nervous system and help you recover from workplace burnout.',
    keywords: ['burnout', 'digital detox', 'stress recovery', 'wellness'],
    category: Category.STRESS,
    content: `
      <h2>The High Cost of Constant Connectivity</h2>
      <p>We are the first generation of humans to be globally connected twenty-four hours a day. While this offers unprecedented access to information, it places an immense burden on our cognitive resources. Burnout is often the result of this chronic overstimulation, where the boundary between work and rest is completely eroded by digital devices.</p>
      <h3>The Science of Blue Light and Dopamine</h3>
      <p>Our smartphones are designed to be addictive. Every notification triggers a small hit of dopamine, creating a "compulsion loop" that keeps us scrolling. Furthermore, the blue light emitted by screens suppresses melatonin production, disrupting our circadian rhythms and leading to poor sleep quality—a key driver of mental exhaustion.</p>
    `,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Closed laptop next to a cup of herbal tea',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/digital-detox-for-burnout',
    imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    slug: 'mindfulness-beginners-guide',
    title: 'Mindfulness: A Practical Path to Daily Peace',
    metaDescription: 'Start your mindfulness journey with simple exercises designed to anchor you in the present moment.',
    keywords: ['mindfulness', 'meditation', 'mental peace', 'wellness'],
    category: Category.MINDFULNESS,
    content: `
      <h2>Why Mindfulness Matters</h2>
      <p>Mindfulness is the simple act of being present. It is not about emptying the mind, but about observing thoughts without judgment. Research shows that regular mindfulness practice can physically alter the brain's gray matter in areas associated with emotional regulation and stress.</p>
      <h3>Getting Started</h3>
      <p>You don't need a meditation cushion or an hour of silence. Start with "mindful transitions"—when you walk between rooms or start your car, take three conscious breaths. Notice the sensation of the air entering and leaving your body.</p>
    `,
    datePublished: getRelativeDate(1),
    dateModified: getRelativeDate(1),
    imageAlt: 'Zen stones stacked by water',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/mindfulness-beginners-guide',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '4',
    slug: 'mens-mental-health-stigma',
    title: 'Breaking the Silence: Men\'s Mental Health Stigma',
    metaDescription: 'Exploring why men struggle to seek help and how to build a supportive culture for emotional vulnerability.',
    keywords: ['mens health', 'stigma', 'vulnerability', 'mental support'],
    category: Category.MEN_HEALTH,
    content: `
      <h2>The Hidden Crisis</h2>
      <p>Societal expectations often pressure men to be "strong" and "silent," leading many to suppress emotional distress. This suppression can manifest as anger, irritability, or social withdrawal, often masking underlying depression or anxiety.</p>
      <h3>Redefining Strength</h3>
      <p>True strength includes the ability to recognize when you need support. Vulnerability is not a weakness; it is an essential component of emotional intelligence and long-term psychological health.</p>
    `,
    datePublished: getRelativeDate(1),
    dateModified: getRelativeDate(1),
    imageAlt: 'Man looking out at a mountain range',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/mens-mental-health-stigma',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '5',
    slug: 'postpartum-wellness-guide',
    title: 'Navigating the Fourth Trimester: A Women\'s Guide',
    metaDescription: 'A compassionate guide to the emotional and physical challenges of the postpartum period.',
    keywords: ['postpartum', 'womens health', 'new mother', 'wellness'],
    category: Category.WOMEN_HEALTH,
    content: `
      <h2>Beyond the Baby Blues</h2>
      <p>The transition to motherhood is a monumental hormonal and identity shift. While many expect immediate joy, the reality often includes a complex mix of fatigue, anxiety, and emotional sensitivity known as the "baby blues." When these feelings persist, it may indicate postpartum depression or anxiety, which requires professional support.</p>
      <h3>Self-Care for New Mothers</h3>
      <p>Self-care isn't a luxury for new mothers; it's a medical necessity. Prioritizing rest, nutrition, and asking for help are the foundations of recovery during the fourth trimester.</p>
    `,
    datePublished: getRelativeDate(2),
    dateModified: getRelativeDate(2),
    imageAlt: 'Mother holding a baby',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/postpartum-wellness-guide',
    imageUrl: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '6',
    slug: 'trauma-window-of-tolerance',
    title: 'Understanding Your Window of Tolerance',
    metaDescription: 'A trauma-informed look at how our nervous systems regulate emotions and why we sometimes feel overwhelmed.',
    keywords: ['trauma', 'regulation', 'nervous system', 'psychology'],
    category: Category.TRAUMA,
    content: `
      <h2>The Physiology of Overwhelm</h2>
      <p>The "Window of Tolerance" is a term coined by Dr. Dan Siegel to describe the optimal zone of arousal where we can effectively manage and process emotions. When we are pushed outside this window, we enter states of hyperarousal (fight/flight) or hypoarousal (freeze/shut down).</p>
      <h3>Widening the Window</h3>
      <p>Trauma often narrows this window, making small stressors feel catastrophic. Through therapeutic techniques and mindfulness, we can slowly widen our window, allowing us to stay present even during challenging emotional states.</p>
    `,
    datePublished: getRelativeDate(2),
    dateModified: getRelativeDate(2),
    imageAlt: 'A lighthouse in a storm',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/trauma-window-of-tolerance',
    imageUrl: 'https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '7',
    slug: 'depression-small-victories',
    title: 'Depression: The Healing Power of Small Victories',
    metaDescription: 'How celebrating tiny accomplishments can help break the cycle of depressive lethargy and build momentum.',
    keywords: ['depression', 'coping', 'motivation', 'mental health'],
    category: Category.DEPRESSION,
    content: `
      <h2>The Weight of Depressive Lethargy</h2>
      <p>Depression can make even the simplest tasks—like getting out of bed or taking a shower—feel like climbing a mountain. This lethargy creates a cycle of guilt and inactivity that deepens the depressive state.</p>
      <h3>The "Low Bar" Strategy</h3>
      <p>Break the cycle by setting "ridiculously low" bars for success. If you can't clean the whole room, pick up one item. If you can't walk for 30 minutes, stand outside for one. Celebrate these small wins as they are the building blocks of recovery.</p>
    `,
    datePublished: getRelativeDate(3),
    dateModified: getRelativeDate(3),
    imageAlt: 'A single green sprout in the sun',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/depression-small-victories',
    imageUrl: 'https://images.unsplash.com/photo-1485841890310-6a055c88698a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '8',
    slug: 'sleep-hygiene-for-mental-clarity',
    title: 'Sleep Hygiene: The Foundation of Mental Clarity',
    metaDescription: 'Practical tips to improve your sleep quality and support your emotional regulation.',
    keywords: ['sleep', 'insomnia', 'clarity', 'recovery'],
    category: Category.DAILY_GUIDE,
    content: `
      <h2>The Emotional Processing Lab</h2>
      <p>Sleep is when our brains process the emotional data of the day. Chronic sleep deprivation impairs the prefrontal cortex, the part of the brain responsible for logical reasoning, making us more reactive and anxious.</p>
      <h3>A Nightly Ritual</h3>
      <p>Dim the lights one hour before bed. Avoid screens, as blue light inhibits melatonin. Try a "brain dump" by writing down all your worries on a piece of paper to physically leave them outside your sleep space.</p>
    `,
    datePublished: getRelativeDate(3),
    dateModified: getRelativeDate(3),
    imageAlt: 'Comfortable bed with soft pillows',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/sleep-hygiene-for-mental-clarity',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '9',
    slug: 'journaling-emotional-processing',
    title: '5 Journaling Techniques for Emotional Processing',
    metaDescription: 'Move from ruminating to reflecting with these science-backed writing prompts.',
    keywords: ['journaling', 'emotions', 'writing', 'reflection'],
    category: Category.DAILY_GUIDE,
    content: `
      <h2>Why Writing Heals</h2>
      <p>Putting pen to paper externalizes our internal chaos. It allows us to view our thoughts as objects we can observe rather than absolute truths we must obey.</p>
      <h3>Techniques to Try</h3>
      <p>1. <strong>Stream of Consciousness:</strong> Write for 10 minutes without stopping. 2. <strong>Gratitude Audit:</strong> List three specific things that went well today. 3. <strong>Letters of Release:</strong> Write a letter to someone you're angry with, then safely discard it.</p>
    `,
    datePublished: getRelativeDate(4),
    dateModified: getRelativeDate(4),
    imageAlt: 'Notebook and fountain pen',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/journaling-emotional-processing',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '10',
    slug: 'setting-healthy-boundaries',
    title: 'Setting Boundaries: The Ultimate Act of Self-Care',
    metaDescription: 'Learn why saying "no" is essential for your mental health and how to do it guilt-free.',
    keywords: ['boundaries', 'self-care', 'relationships', 'anxiety'],
    category: Category.STRESS,
    content: `
      <h2>The Cost of People-Pleasing</h2>
      <p>Boundaries are the limits we set to protect our energy and mental health. Without them, we risk burnout and resentment. People-pleasing is often a trauma response or an anxiety-driven need for external validation.</p>
      <h3>How to Say No</h3>
      <p>Boundaries are not mean; they are clear. Use "I" statements: "I value our time together, but I need this evening to rest so I can show up fully tomorrow."</p>
    `,
    datePublished: getRelativeDate(5),
    dateModified: getRelativeDate(5),
    imageAlt: 'A sign in a peaceful garden',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/setting-healthy-boundaries',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200'
  }
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Mental Health', path: '/category/Anxiety Management' },
  { label: 'Emotional Wellness', path: '/category/Mindfulness & Meditation' },
  { label: 'Daily Guides', path: '/category/Daily Guides' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' }
];

export const ADS_CONFIG = {
  header: 'AD_SLOT_HEADER',
  sidebar: 'AD_SLOT_SIDEBAR',
  inArticle: 'AD_SLOT_IN_ARTICLE',
  footer: 'AD_SLOT_FOOTER'
};
