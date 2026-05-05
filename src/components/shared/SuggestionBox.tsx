import React, { useState } from 'react';
import { Lightbulb, Send, CheckCircle } from 'lucide-react';

const SuggestionBox = () => {
  const [submitted, setSubmitted] = useState(false);
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      setSubmitted(true);
      // Backend tracking logic would go here
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[32px] text-center animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black text-emerald-500 mb-2">Idea Captured!</h3>
        <p className="text-text-secondary">We've added your tool request to our engineering roadmap. If we build it, you'll get 50 free credits.</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold underline decoration-2 underline-offset-4">Submit another idea</button>
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-border-light p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
        <Lightbulb size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center">
            <Lightbulb size={20} />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Suggest a Utility Tool</h3>
        </div>

        <p className="text-text-secondary mb-8 leading-relaxed">
          Is there a manual task wasting your life? Tell us what to build. If your idea makes it into our factory, we'll fuel your account with <strong>50 Free Credits</strong>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            className="w-full bg-bg-primary border border-border-strong rounded-2xl p-4 text-text-primary outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-glow transition-all min-h-[120px]"
            placeholder="Describe the tool... (e.g., 'An AI that audits my taxes for mistakes')"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
          <button 
            type="submit"
            className="w-full bg-accent-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-lg transition-all active:translate-y-0"
          >
            Submit to Engineering <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestionBox;
