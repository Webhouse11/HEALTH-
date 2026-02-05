
import React from 'react';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO title="Contact Us" description="Get in touch with the HealthScope Daily team." />
      <h1 className="text-5xl font-bold mb-8">Get in Touch</h1>
      <p className="text-xl text-slate-500 mb-12">Have questions, feedback, or a personal story you'd like to share? We're here to listen.</p>
      
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Full Name</label>
              <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900">Email Address</label>
              <input type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="jane@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-900">Message</label>
            <textarea className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all h-40" placeholder="How can we help you today?"></textarea>
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white font-bold py-5 rounded-2xl hover:bg-teal-700 transition-all shadow-lg text-lg">Send Message</button>
        </form>
      </div>
    </div>
  );
};
