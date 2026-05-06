import React from 'react';
import { ChevronLeft, Shield, Zap, Activity, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ToolPageLayoutProps {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  fullWidth?: boolean;
  seoContent: {
    blog: {
      title: string;
      content: string;
    };
    faqs: {
      question: string;
      answer: string;
    }[];
  };
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  title,
  tagline,
  description,
  icon,
  children,
  fullWidth = false,
  seoContent
}) => {
  return (
    <div className="min-h-screen selection:bg-accent-primary selection:text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-border-light bg-bg-primary/50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">
            <Link to="/" className="hover:text-accent-primary transition-colors flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-bg-surface border border-border-light hover:border-accent-primary">
                <ChevronLeft size={14} />
              </div>
              UtilFactory
            </Link>
            <span className="text-white/20">/</span>
            <Link to="/tools" className="hover:text-white transition-colors">Tools</Link>
            <span className="text-white/20">/</span>
            <span className="text-accent-primary">{title}</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active System</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="relative mb-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-6 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <Zap size={12} className="text-accent-primary" /> Verified Utility
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] text-gradient">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-text-secondary font-medium tracking-tight leading-relaxed">
                {tagline}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 rounded-[24px] bg-bg-surface border border-border-light flex items-center gap-4 shadow-xl">
                <Activity size={20} className="text-accent-primary" />
                <div>
                  <span className="text-[10px] font-black uppercase text-text-muted block">Processing Time</span>
                  <span className="text-sm font-bold text-white">Instant</span>
                </div>
              </div>
              <div className="px-6 py-4 rounded-[24px] bg-bg-surface border border-border-light flex items-center gap-4 shadow-xl">
                <Shield size={20} className="text-emerald-500" />
                <div>
                  <span className="text-[10px] font-black uppercase text-text-muted block">Security</span>
                  <span className="text-sm font-bold text-white">Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tool Interaction Area */}
        <div className={`mb-32 ${fullWidth ? '' : 'max-w-4xl mx-auto'}`}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-[42px] blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-bg-surface border border-border-strong rounded-[32px] md:rounded-[40px] p-6 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
               {/* Ambient Background for Tool */}
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none" />
               <div className="relative z-10">
                {children}
               </div>
            </div>
          </div>
        </div>

        {/* Knowledge & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-16">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">{seoContent.blog.title}</h2>
              </div>
              <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:text-white max-w-none">
                <p className="text-text-secondary leading-relaxed text-xl whitespace-pre-line font-medium opacity-80">
                  {seoContent.blog.content}
                </p>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Common Questions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {seoContent.faqs.map((faq, index) => (
                  <div key={index} className="group p-8 rounded-[32px] bg-bg-surface border border-border-light hover:border-accent-primary/50 transition-all duration-500 shadow-xl">
                    <h3 className="text-xl font-black text-white mb-4 leading-tight group-hover:text-accent-primary transition-colors">{faq.question}</h3>
                    <p className="text-text-secondary leading-relaxed font-medium opacity-80">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              <div className="p-8 rounded-[40px] bg-gradient-to-br from-bg-surface to-bg-primary border border-border-strong shadow-2xl">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-text-muted mb-8 flex items-center gap-3">
                  <Shield size={14} className="text-accent-primary" /> Privacy & Security
                </h4>
                <ul className="space-y-6">
                  {[
                    'Lightning fast processing',
                    'Your data is never saved',
                    'Industry-standard security',
                    'Optimized for all devices'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm font-bold text-text-secondary group">
                      <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all flex items-center justify-center gap-3">
                  Start Using Now <ArrowRight size={14} />
                </button>
              </div>

              <div className="p-8 rounded-[40px] border border-dashed border-border-strong text-center bg-bg-surface/30 backdrop-blur-sm">
                <div className="flex justify-center -space-x-4 mb-6">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-bg-surface bg-bg-primary flex items-center justify-center text-xs font-black text-text-muted overflow-hidden ring-2 ring-accent-primary/10">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-bg-surface bg-accent-primary flex items-center justify-center text-[10px] font-black text-white ring-2 ring-accent-primary/10">
                    10K+
                  </div>
                </div>
                <p className="text-xs text-text-muted font-bold uppercase tracking-widest">Used by professionals worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer System Info */}
      <footer className="px-6 py-12 border-t border-border-light bg-bg-surface">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-black italic">AG</div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">UtilFactory Station</p>
              <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Professional Utility Tools</p>
            </div>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted">
            © 2026 NEURAL-SCRIBE SYSTEMS. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ToolPageLayout;
