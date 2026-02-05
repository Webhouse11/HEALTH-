
import React from 'react';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO title="About Us" description="Learn about the mission and expertise behind HealthScope Daily." />
      <h1 className="text-5xl font-bold mb-8">Our Mission</h1>
      <div className="prose prose-xl prose-slate max-w-none">
        <p>HealthScope Daily was founded on a simple principle: everyone deserves access to compassionate, high-quality mental health information every single day.</p>
        <p>In an era of digital noise, we strive to be a sanctuary of clarity. Our content is curated by a blend of clinical expertise and advanced technology, ensuring that every article is both evidence-informed and deeply human.</p>
        <h2>The HealthScope Standard</h2>
        <p>We adhere to the highest standards of digital health publishing. Every article is crafted to provide actionable insights, grounding techniques, and emotional frameworks that you can apply immediately to your wellness journey.</p>
        <h3>Expert-Led, Human-Centered</h3>
        <p>While we leverage automation to ensure a daily publishing cadence, our editorial direction is set by human empathy. We tackle the tough subjects—trauma, chronic anxiety, and burnout—with the respect and nuance they deserve.</p>
      </div>
    </div>
  );
};
