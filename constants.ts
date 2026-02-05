
import { Category, Article } from './types';

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
    datePublished: '2026-01-01',
    dateModified: '2026-01-01',
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
    datePublished: '2026-01-02',
    dateModified: '2026-01-02',
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
    datePublished: '2026-01-03',
    dateModified: '2026-01-03',
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
    datePublished: '2026-01-04',
    dateModified: '2026-01-04',
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
    datePublished: '2026-01-05',
    dateModified: '2026-01-05',
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
    datePublished: '2026-01-06',
    dateModified: '2026-01-06',
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
    datePublished: '2026-01-07',
    dateModified: '2026-01-07',
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
    datePublished: '2026-01-08',
    dateModified: '2026-01-08',
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
    datePublished: '2026-01-09',
    dateModified: '2026-01-09',
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
    datePublished: '2026-01-10',
    dateModified: '2026-01-10',
    imageAlt: 'A sign in a peaceful garden',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/setting-healthy-boundaries',
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '11',
    slug: 'challenging-cognitive-distortions',
    title: 'Identifying Common Cognitive Distortions',
    metaDescription: 'Stop the cycle of "all-or-nothing" thinking with these CBT-based strategies.',
    keywords: ['CBT', 'thinking', 'distortions', 'mental health'],
    category: Category.ANXIETY,
    content: `
      <h2>Lies the Mind Tells</h2>
      <p>Cognitive distortions are irrational thought patterns that exaggerate reality in a negative way. Common examples include "Catastrophizing" (predicting the worst) and "Personalization" (blaming yourself for things outside your control).</p>
      <h3>The Evidence Test</h3>
      <p>When you catch a negative thought, ask yourself: "What evidence do I have that this is 100% true? Is there another way to look at this situation?"</p>
    `,
    datePublished: '2026-01-11',
    dateModified: '2026-01-11',
    imageAlt: 'Shattered glass on a dark background',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/challenging-cognitive-distortions',
    imageUrl: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '12',
    slug: 'breathwork-for-instant-calm',
    title: '3 Breathwork Techniques for Instant Calm',
    metaDescription: 'Hack your vagus nerve to reduce stress and anxiety in under 60 seconds.',
    keywords: ['breathwork', 'calm', 'vagus nerve', 'stress relief'],
    category: Category.DAILY_GUIDE,
    content: `
      <h2>The Biological Reset Button</h2>
      <p>Breathwork is the fastest way to communicate safety to your brain. By extending your exhales, you stimulate the vagus nerve and slow your heart rate.</p>
      <h3>Techniques to Master</h3>
      <p>1. <strong>Box Breathing:</strong> Inhale 4, Hold 4, Exhale 4, Hold 4. 2. <strong>4-7-8 Breath:</strong> Inhale 4, Hold 7, Exhale 8. 3. <strong>Sigh of Relief:</strong> Two quick inhales followed by one long, audible exhale.</p>
    `,
    datePublished: '2026-01-12',
    dateModified: '2026-01-12',
    imageAlt: 'Clouds in a soft blue sky',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/breathwork-for-instant-calm',
    imageUrl: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '13',
    slug: 'social-anxiety-navigation',
    title: 'Navigating Social Anxiety with Self-Compassion',
    metaDescription: 'Practical tips for re-entering social spaces with comfort and confidence.',
    keywords: ['social anxiety', 'introvert', 'confidence', 'compassion'],
    category: Category.ANXIETY,
    content: `
      <h2>The Fear of Judgment</h2>
      <p>Social anxiety isn't just shyness; it's a persistent fear of being watched or judged by others. This often leads to "safety behaviors" like avoiding eye contact or over-rehearsing conversations.</p>
      <h3>Gradual Exposure</h3>
      <p>Don't jump into a crowd immediately. Start with small, low-stakes interactions. Focus your attention outward on the other person rather than inward on your own physical sensations of anxiety.</p>
    `,
    datePublished: '2026-01-13',
    dateModified: '2026-01-13',
    imageAlt: 'People blurred in a coffee shop',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/social-anxiety-navigation',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '14',
    slug: 'seasonal-affective-disorder-tips',
    title: 'Managing Seasonal Affective Disorder',
    metaDescription: 'Evidence-based strategies for maintaining your mood during the winter months.',
    keywords: ['SAD', 'winter blues', 'depression', 'light therapy'],
    category: Category.DEPRESSION,
    content: `
      <h2>The Winter Blues</h2>
      <p>Seasonal Affective Disorder (SAD) is a type of depression that follows a seasonal pattern, usually occurring during the darker winter months. It's often linked to a disruption in our internal clock (circadian rhythm).</p>
      <h3>Managing the Dark</h3>
      <p>Light therapy (using a 10,000 lux lamp), increasing Vitamin D intake, and prioritizing outdoor time during daylight hours are effective ways to mitigate the symptoms of SAD.</p>
    `,
    datePublished: '2026-01-14',
    dateModified: '2026-01-14',
    imageAlt: 'Sunlight through snowy trees',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/seasonal-affective-disorder-tips',
    imageUrl: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '15',
    slug: 'long-term-resilience-framework',
    title: 'A Framework for Long-Term Emotional Resilience',
    metaDescription: 'Build the emotional fortitude to weather life\'s inevitable storms with this comprehensive guide.',
    keywords: ['resilience', 'mental strength', 'coping', 'framework'],
    category: Category.DAILY_GUIDE,
    content: `
      <h2>Resilience is a Skill</h2>
      <p>Resilience is not a personality trait you're born with; it's a set of behaviors, thoughts, and actions that can be learned and developed. It's about "bouncing forward"—integrating challenges into your growth rather than just surviving them.</p>
      <h3>The Pillars of Resilience</h3>
      <p>The four pillars are: Purpose (having meaning), Perspective (reframing challenges), Proactivity (taking action), and People (having a support system). By strengthening these pillars, you create an emotional safety net for the future.</p>
    `,
    datePublished: '2026-01-15',
    dateModified: '2026-01-15',
    imageAlt: 'A tree growing out of a rock',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/long-term-resilience-framework',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200'
  }
];

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Mental Health', path: '/category/Anxiety Management' },
  { label: 'Emotional Wellness', path: '/category/Mindfulness & Meditation' },
  { label: 'Daily Guides', path: '/category/Daily Guides' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Dashboard', path: '/dashboard' }
];

export const ADS_CONFIG = {
  header: 'AD_SLOT_HEADER',
  sidebar: 'AD_SLOT_SIDEBAR',
  inArticle: 'AD_SLOT_IN_ARTICLE',
  footer: 'AD_SLOT_FOOTER'
};
