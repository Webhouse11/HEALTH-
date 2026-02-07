
import { Category, Article } from './types';

const getRelativeDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const NEW_ARTICLES: Article[] = [
  // 1. ANXIETY MANAGEMENT
  {
    id: 'anx-1',
    slug: '10-quick-techniques-calm-anxiety',
    title: '10 Quick Techniques to Calm Anxiety in Less Than 5 Minutes',
    metaDescription: 'Panic or high anxiety can strike anytime. Master these 10 rapid grounding tools to regain control of your nervous system in minutes.',
    keywords: ['anxiety relief', 'grounding', 'panic attack', 'mental health'],
    category: Category.ANXIETY,
    content: `<h2>Mastering the 5-Minute Reset</h2><p>In our fast-paced world, anxiety often arrives without warning. When your heart starts racing and your thoughts begin to spiral, you need tools that work immediately. Here are 10 techniques backed by clinical psychology.</p><h3>1. The 4-7-8 Breath</h3><p>Inhale for 4 seconds, hold for 7, and exhale forcefully for 8. This specific rhythm forces the heart rate to slow down and engages the vagus nerve.</p><h3>2. Cold Water Shock</h3><p>Splashing ice-cold water on your face triggers the 'Mammalian Dive Reflex,' which naturally lowers the heart rate and resets the nervous system.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Calm person with closed eyes',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/10-quick-techniques-calm-anxiety',
    imageUrl: 'https://images.unsplash.com/photo-1515377662630-cd4967f7f373?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'anx-2',
    slug: 'stop-anxiety-controlling-your-day',
    title: 'How to Stop Anxiety From Controlling Your Day: Expert Tips',
    metaDescription: 'Don’t let worry dictate your schedule. Learn how to compartmentalize anxiety and reclaim your productivity.',
    keywords: ['anxiety management', 'productivity', 'mental focus'],
    category: Category.ANXIETY,
    content: `<h2>Reclaiming Your Autonomy</h2><p>Anxiety is a loud roommate, but it doesn't have to be the landlord of your life. Expert tips for compartmentalizing worry include 'Worry Time'—scheduling 15 minutes a day to feel anxious so it doesn't leak into the rest of your hours.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Sunrise over a mountain',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/stop-anxiety-controlling-your-day',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'anx-3',
    slug: 'link-between-diet-and-anxiety',
    title: 'The Link Between Diet and Anxiety: What You Need to Know',
    metaDescription: 'Your gut is your second brain. Discover which foods fuel anxiety and which ones help calm your mind.',
    keywords: ['nutrition', 'gut-brain axis', 'anxiety diet'],
    category: Category.ANXIETY,
    content: `<h2>The Gut-Brain Connection</h2><p>Emerging research in nutritional psychiatry shows that high-sugar diets can mimic and exacerbate anxiety symptoms. Focus on fermented foods and Omega-3 fatty acids to support a calmer mind.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Healthy bowl of food',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/link-between-diet-and-anxiety',
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'anx-4',
    slug: 'breathing-exercises-anxiety-relief',
    title: 'Breathing Exercises That Really Work for Anxiety Relief',
    metaDescription: 'Not all breathing is equal. These four specific patterns are scientifically proven to reduce acute stress.',
    keywords: ['breathing', 'pranayama', 'stress reduction'],
    category: Category.ANXIETY,
    content: `<h2>The Science of Respiration</h2><p>Diaphragmatic breathing is more than a relaxation tool; it is a physiological command to your brain to stop the production of stress hormones.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Person breathing in forest',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/breathing-exercises-anxiety-relief',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200'
  },

  // 2. DEPRESSION COPING
  {
    id: 'dep-1',
    slug: 'small-daily-habits-lift-depression',
    title: 'Small Daily Habits That Can Help Lift Depression Naturally',
    metaDescription: 'When everything feels heavy, small habits matter most. Build a foundation for recovery with these tiny steps.',
    keywords: ['depression help', 'habits', 'wellness'],
    category: Category.DEPRESSION,
    content: `<h2>The Power of Micro-Movements</h2><p>Depression thrives on inertia. Breaking the cycle doesn't require a marathon; it starts with opening the blinds or making the bed.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Morning coffee by window',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/small-daily-habits-lift-depression',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dep-2',
    slug: 'support-loved-one-depression',
    title: 'How to Support a Loved One Struggling with Depression',
    metaDescription: 'Learn the right words to say and the boundaries to keep when someone you love is in a dark place.',
    keywords: ['support', 'caregiving', 'empathy'],
    category: Category.DEPRESSION,
    content: `<h2>Being the Anchor</h2><p>Supporting someone with depression isn't about 'fixing' them. It's about 'holding space' and offering consistent, non-judgmental presence.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Two people holding hands',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/support-loved-one-depression',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dep-3',
    slug: 'science-of-depression-understanding-stuck',
    title: 'The Science of Depression: Understanding Why You Feel Stuck',
    metaDescription: 'Depression isn’t just a mood—it’s a biological state. Understand the neurobiology of why you feel "stuck" in a cycle of sadness.',
    keywords: ['neuroscience', 'depression science', 'biology'],
    category: Category.DEPRESSION,
    content: `<h2>The Neurobiology of Inertia</h2><p>Understanding the role of the prefrontal cortex and the amygdala can help remove the shame associated with depressive symptoms.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Brain abstract art',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/science-of-depression-understanding-stuck',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dep-4',
    slug: 'self-care-strategies-combat-depression',
    title: 'Self-Care Strategies That Really Help Combat Depression',
    metaDescription: 'Effective self-care for depression goes beyond bubble baths. Focus on biological rhythms and social connection.',
    keywords: ['self-care', 'depression relief', 'wellness routines'],
    category: Category.DEPRESSION,
    content: `<h2>Self-Care as Survival</h2><p>True self-care for depression involves maintaining a consistent sleep schedule and ensuring at least 15 minutes of sunlight exposure daily.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Person walking in nature',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/self-care-strategies-combat-depression',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200'
  },

  // 3. STRESS & BURNOUT
  {
    id: 'str-1',
    slug: '5-warning-signs-burnout',
    title: '5 Warning Signs You’re on the Verge of Burnout',
    metaDescription: 'Burnout doesn’t happen overnight. Recognize these five early warning signs before you reach a breaking point.',
    keywords: ['burnout', 'work stress', 'exhaustion'],
    category: Category.STRESS,
    content: `<h2>Recognizing the Red Flags</h2><p>Cynicism, physical exhaustion, and a feeling of reduced professional efficacy are the hallmarks of impending burnout.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Stressed office worker',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/5-warning-signs-burnout',
    imageUrl: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'str-2',
    slug: 'daily-routines-reduce-work-stress',
    title: 'Simple Daily Routines to Reduce Stress at Work',
    metaDescription: 'Small shifts in how you manage your workday can drastically lower your cortisol levels. Try these office-friendly routines.',
    keywords: ['workplace wellness', 'stress management', 'routines'],
    category: Category.STRESS,
    content: `<h2>The Mindful Workday</h2><p>Implementing 'Pomodoro' breaks and desk stretches can prevent the accumulation of physical and mental tension.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Neat workspace',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/daily-routines-reduce-work-stress',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'str-3',
    slug: 'rest-days-essential-prevent-burnout',
    title: 'Why Rest Days Are Essential for Preventing Burnout',
    metaDescription: 'Rest is not a reward for productivity; it is a prerequisite. Learn the science of why your brain needs true downtime.',
    keywords: ['recovery', 'rest', 'productivity science'],
    category: Category.STRESS,
    content: `<h2>Rest as a Strategy</h2><p>Your brain consolidates information and repairs neural pathways during rest. Without it, your cognitive performance eventually plateaus and crashes.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Hammock in the shade',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/rest-days-essential-prevent-burnout',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'str-4',
    slug: 'connection-between-sleep-and-stress',
    title: 'The Connection Between Sleep and Stress Management',
    metaDescription: 'Sleep is your primary stress recovery tool. Discover how quality rest buffers you against the challenges of the day.',
    keywords: ['sleep', 'stress', 'emotional regulation'],
    category: Category.STRESS,
    content: `<h2>Sleep: The Stress Shield</h2><p>Lack of sleep makes the amygdala more reactive, meaning small stressors feel like major crises. Quality sleep restores emotional balance.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Cozy bedroom',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/connection-between-sleep-and-stress',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200'
  },

  // 4. TRAUMA & REGULATION
  {
    id: 'tra-1',
    slug: 'understanding-trauma-affects-mind-body',
    title: 'Understanding Trauma: How It Affects Your Mind and Body',
    metaDescription: 'Trauma isn’t just in your head; it’s in your body. Explore the physical imprint of traumatic experiences.',
    keywords: ['trauma', 'somatic healing', 'PTSD'],
    category: Category.TRAUMA,
    content: `<h2>The Body Keeps the Score</h2><p>Trauma changes the setting of the nervous system, often keeping it in a permanent state of high alert long after the danger has passed.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Abstract ripple on water',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/understanding-trauma-affects-mind-body',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'tra-2',
    slug: 'grounding-techniques-regulate-emotions',
    title: 'Grounding Techniques to Regulate Emotions After Trauma',
    metaDescription: 'Stay present when triggers occur. These somatic grounding techniques help pull you back into the safety of the now.',
    keywords: ['grounding', 'trauma regulation', 'mental health'],
    category: Category.TRAUMA,
    content: `<h2>Anchoring in the Present</h2><p>Using the five senses to ground yourself is a vital skill for managing post-traumatic triggers and dissociation.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Feet on green grass',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/grounding-techniques-regulate-emotions',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'tra-3',
    slug: 'healing-childhood-trauma-practical-steps',
    title: 'Healing from Childhood Trauma: Practical Steps to Start',
    metaDescription: 'The past doesn’t have to dictate the future. Discover how to begin the journey of reparenting and healing your inner child.',
    keywords: ['childhood trauma', 'inner child', 'recovery'],
    category: Category.TRAUMA,
    content: `<h2>Breaking the Cycle</h2><p>Healing childhood wounds involves recognizing 'inherited' patterns and learning to offer yourself the safety you lacked in youth.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Child looking at sunset',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/healing-childhood-trauma-practical-steps',
    imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'tra-4',
    slug: 'role-of-therapy-trauma-recovery',
    title: 'The Role of Therapy in Trauma Recovery and Emotional Regulation',
    metaDescription: 'Explore different therapeutic modalities like EMDR and Somatic Experiencing that are specifically designed for trauma.',
    keywords: ['therapy', 'EMDR', 'trauma therapy'],
    category: Category.TRAUMA,
    content: `<h2>Beyond Talk Therapy</h2><p>Traditional talk therapy is useful, but specialized trauma modalities like EMDR can help reprocess memories at a deeper neurological level.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Professional therapy office',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/role-of-therapy-trauma-recovery',
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200'
  },

  // 5. MINDFULNESS & MEDITATION
  {
    id: 'min-1',
    slug: '5-minute-mindfulness-exercises',
    title: '5-Minute Mindfulness Exercises You Can Do Anywhere',
    metaDescription: 'Mindfulness doesn’t require a retreat. Use these 5-minute drills to stay centered during your commute or workday.',
    keywords: ['mindfulness', 'meditation', 'mental peace'],
    category: Category.MINDFULNESS,
    content: `<h2>The On-The-Go Mindset</h2><p>Mindfulness is a portable skill. Practice it while washing dishes, walking to your car, or waiting for a meeting to start.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Cup of steaming tea',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/5-minute-mindfulness-exercises',
    imageUrl: 'https://images.unsplash.com/photo-1544787210-282ce9214802?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'min-2',
    slug: 'how-meditation-changes-your-brain',
    title: 'How Meditation Changes Your Brain for the Better',
    metaDescription: 'The physical benefits of silence. See how consistent meditation literally reshapes your gray matter.',
    keywords: ['neuroscience', 'meditation', 'brain health'],
    category: Category.MINDFULNESS,
    content: `<h2>Rewiring for Resilience</h2><p>Studies show that 8 weeks of consistent meditation can increase the density of the hippocampus and reduce the size of the amygdala.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Person meditating in nature',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/how-meditation-changes-your-brain',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'min-3',
    slug: 'mindfulness-tips-beginners-cant-sit-still',
    title: 'Mindfulness Tips for Beginners Who Can’t Sit Still',
    metaDescription: 'Think you can’t meditate? Try "Moving Mindfulness" and other active techniques for busy minds.',
    keywords: ['active meditation', 'mindfulness for beginners', 'busy brain'],
    category: Category.MINDFULNESS,
    content: `<h2>Mindfulness for the Restless</h2><p>You don't have to be still to be mindful. Walking meditation and mindful movement are perfect alternatives for high-energy individuals.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Person walking on beach',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/mindfulness-tips-beginners-cant-sit-still',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'min-4',
    slug: 'using-mindful-breathing-manage-daily-stress',
    title: 'Using Mindful Breathing to Manage Daily Stress',
    metaDescription: 'Learn how to use your breath as an anchor during chaotic moments of your daily life.',
    keywords: ['breathing', 'stress management', 'calm'],
    category: Category.MINDFULNESS,
    content: `<h2>Your Portable Sanctuary</h2><p>The breath is the only part of our autonomic nervous system we can consciously control. Use it to dial down your stress response at will.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Leaves in the sun',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/using-mindful-breathing-manage-daily-stress',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200'
  },

  // 6. MEN'S MENTAL HEALTH
  {
    id: 'men-1',
    slug: 'why-men-avoid-therapy',
    title: 'Why Men Avoid Therapy and How to Change That',
    metaDescription: 'Societal expectations often stop men from seeking help. Discover the myths of "masculine strength" and how to overcome them.',
    keywords: ['mens health', 'stigma', 'therapy for men'],
    category: Category.MEN_HEALTH,
    content: `<h2>The Silent Stigma</h2><p>Understanding the barriers men face—from fear of weakness to lack of emotional vocabulary—is key to fostering a culture of wellness.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Man thinking by water',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/why-men-avoid-therapy',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'men-2',
    slug: 'daily-practices-stronger-emotional-resilience-men',
    title: 'Daily Practices for Stronger Emotional Resilience in Men',
    metaDescription: 'Resilience is a muscle. Build it with daily vulnerability, physical movement, and community connection.',
    keywords: ['resilience', 'mens wellness', 'emotional strength'],
    category: Category.MEN_HEALTH,
    content: `<h2>Building the Inner Core</h2><p>Resilience isn't about not feeling pain; it's about having the framework to process it and return to a state of balance.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Man hiking',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/daily-practices-stronger-emotional-resilience-men',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'men-3',
    slug: 'breaking-stigma-mens-mental-health-matters',
    title: 'Breaking the Stigma: Men’s Mental Health Matters',
    metaDescription: 'A call to action for men to prioritize their minds. Vulnerability is the ultimate mark of strength.',
    keywords: ['stigma', 'mens health', 'mental advocacy'],
    category: Category.MEN_HEALTH,
    content: `<h2>A New Definition of Strength</h2><p>It's time to retire the 'strong and silent' trope. Real strength is the courage to admit when you're struggling and to seek support.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Man smiling outside',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/breaking-stigma-mens-mental-health-matters',
    imageUrl: 'https://images.unsplash.com/photo-1503919919749-6462c469d352?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'men-4',
    slug: 'recognizing-depression-in-men-signs-overlooked',
    title: 'Recognizing Depression in Men: Signs Often Overlooked',
    metaDescription: 'Depression in men often looks like anger or withdrawal. Learn the non-traditional symptoms to watch out for.',
    keywords: ['mens depression', 'symptoms', 'mental health'],
    category: Category.MEN_HEALTH,
    content: `<h2>The Mask of Irritability</h2><p>In men, depression often manifests as increased irritability, workaholism, or social isolation rather than traditional sadness.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Man looking out window',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/recognizing-depression-in-men-signs-overlooked',
    imageUrl: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200'
  },

  // 7. WOMEN'S MENTAL HEALTH
  {
    id: 'wom-1',
    slug: 'how-hormones-affect-womens-mood',
    title: 'How Hormones Affect Women’s Mood and Mental Health',
    metaDescription: 'Navigate the complex interplay between estrogen, progesterone, and your emotional wellbeing.',
    keywords: ['hormones', 'womens wellness', 'mood swings'],
    category: Category.WOMEN_HEALTH,
    content: `<h2>The Hormonal Landscape</h2><p>Understanding your cycle can offer valuable context for your emotional experiences and help you plan self-care more effectively.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Nature close up',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/how-hormones-affect-womens-mood',
    imageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'wom-2',
    slug: 'self-care-routines-boost-womens-emotional-wellbeing',
    title: 'Self-Care Routines That Boost Women’s Emotional Wellbeing',
    metaDescription: 'From boundary setting to social connection, discover routines that actually support the female psyche.',
    keywords: ['self-care', 'womens health', 'wellbeing'],
    category: Category.WOMEN_HEALTH,
    content: `<h2>Holistic Self-Care</h2><p>Effective self-care for women involves balancing social connection with periods of deep rest and creative expression.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Woman reading book',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/self-care-routines-boost-womens-emotional-wellbeing',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'wom-3',
    slug: 'recognizing-anxiety-in-women-symptoms',
    title: 'Recognizing Anxiety in Women: Symptoms You Shouldn’t Ignore',
    metaDescription: 'Women are twice as likely to experience anxiety. Learn the subtle physical and emotional signs of chronic worry.',
    keywords: ['womens anxiety', 'symptoms', 'health advocacy'],
    category: Category.WOMEN_HEALTH,
    content: `<h2>The Anxiety Gap</h2><p>Women often experience anxiety as physical symptoms like headaches or digestive issues. Early recognition is key to management.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Woman looking at sky',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/recognizing-anxiety-in-women-symptoms',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'wom-4',
    slug: 'impact-motherhood-mental-health-coping',
    title: 'The Impact of Motherhood on Mental Health and Coping Strategies',
    metaDescription: 'The transition to motherhood is a massive identity shift. Learn how to navigate the challenges of the "Matrescence" period.',
    keywords: ['motherhood', 'maternal health', 'postpartum'],
    category: Category.WOMEN_HEALTH,
    content: `<h2>Matrescence: A New Birth</h2><p>Motherhood is a profound transformation. Offering yourself grace and seeking community support are vital for maternal mental health.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Mother and child',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/impact-motherhood-mental-health-coping',
    imageUrl: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?auto=format&fit=crop&q=80&w=1200'
  },

  // 8. DAILY GUIDES
  {
    id: 'dai-1',
    slug: 'daily-mental-health-check-in-questions',
    title: 'Your Daily Mental Health Check-In: 5 Questions to Ask Yourself',
    metaDescription: 'Take 5 minutes to audit your internal state. These five questions ensure you stay connected to your wellness goals.',
    keywords: ['check-in', 'self-awareness', 'daily wellness'],
    category: Category.DAILY_GUIDE,
    content: `<h2>The Internal Audit</h2><p>Ask yourself daily: What is my energy level? What am I feeling in my body? What is one thing I can do for myself today?</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Notebook on desk',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/daily-mental-health-check-in-questions',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dai-2',
    slug: 'morning-habits-positive-tone-day',
    title: 'Morning Habits That Set a Positive Tone for the Day',
    metaDescription: 'Win the morning, win the day. Discover the "Low-Stimulation" morning routine that prevents early morning anxiety.',
    keywords: ['morning routine', 'habits', 'wellness'],
    category: Category.DAILY_GUIDE,
    content: `<h2>Crafting Your First Hour</h2><p>Avoid your phone for the first 30 minutes. Focus on light exposure, hydration, and one intentional thought to anchor your day.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Sun streaming through window',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/morning-habits-positive-tone-day',
    imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dai-3',
    slug: 'evening-routine-reduce-stress-before-bed',
    title: 'A Simple Evening Routine to Reduce Stress Before Bed',
    metaDescription: 'Transition from work to rest with ease. Use these three steps to decompress and ensure a night of high-quality sleep.',
    keywords: ['sleep hygiene', 'evening routine', 'stress relief'],
    category: Category.DAILY_GUIDE,
    content: `<h2>The Winding Down Protocol</h2><p>An evening routine acts as a signal to your brain that the day's tasks are done. Try a 'Brain Dump' and 15 minutes of screen-free time.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Nightstand with lamp',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/evening-routine-reduce-stress-before-bed',
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'dai-4',
    slug: 'daily-mindfulness-tips-improve-focus-calm',
    title: 'Daily Mindfulness Tips to Improve Focus and Calm',
    metaDescription: 'Stay sharp and centered. Integrate these tiny mindfulness beats into your busiest days for sustained clarity.',
    keywords: ['focus', 'mindfulness', 'daily tips'],
    category: Category.DAILY_GUIDE,
    content: `<h2>Mindfulness in Motion</h2><p>Pick one ordinary task—like washing your hands or walking to the elevator—to do with 100% sensory focus. It resets your baseline.</p>`,
    datePublished: getRelativeDate(0),
    dateModified: getRelativeDate(0),
    imageAlt: 'Zen garden',
    author: 'HealthScope Editorial',
    canonicalUrl: '/#/article/daily-mindfulness-tips-improve-focus-calm',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  ...NEW_ARTICLES,
  {
    id: '1',
    slug: 'understanding-anxiety-roots',
    title: 'Understanding the Roots of Daily Anxiety',
    metaDescription: 'Discover the physiological and psychological triggers of daily anxiety and how to manage them effectively with evidence-based techniques.',
    keywords: ['anxiety', 'mental health', 'stress triggers', 'CBT'],
    category: Category.ANXIETY,
    content: `
      <h2>The Anatomy of Modern Anxiety</h2>
      <p>Anxiety is often misunderstood as a simple feeling of nervousness. In reality, it is a sophisticated survival mechanism—the "fight or flight" response—that has evolved over millions of years.</p>
    `,
    datePublished: getRelativeDate(5),
    dateModified: getRelativeDate(5),
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
      <p>Burnout is often the result of this chronic overstimulation, where the boundary between work and rest is completely eroded by digital devices.</p>
    `,
    datePublished: getRelativeDate(6),
    dateModified: getRelativeDate(6),
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
      <p>Mindfulness is the simple act of being present. It is not about emptying the mind, but about observing thoughts without judgment.</p>
    `,
    datePublished: getRelativeDate(7),
    dateModified: getRelativeDate(7),
    imageAlt: 'Zen stones stacked by water',
    author: 'HealthScope Editorial Team',
    canonicalUrl: '/#/article/mindfulness-beginners-guide',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&q=80&w=1200'
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
