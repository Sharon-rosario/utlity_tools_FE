import React from 'react';
import { ChevronRight, Shield, Zap, Clock, MessageSquare, HelpCircle } from 'lucide-react';

interface ToolPageLayoutProps {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
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
  seoContent
}) => {
  return (
    <div className="min-h-screen bg-bg-primary pt-10 pb-20 px-[5%] max-w-[1200px] mx-auto">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-12">
        <a href="/" className="hover:text-accent-primary transition-colors">Home</a>
        <ChevronRight size={12} />
        <a href="/tools" className="hover:text-accent-primary transition-colors">Tools</a>
        <ChevronRight size={12} />
        <span className="text-accent-primary">{title}</span>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-16 mb-20 items-center lg:items-start">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent-primary/5 border border-accent-primary/20 text-accent-primary text-[10px] font-black uppercase tracking-widest animate-in fade-in slide-in-from-bottom-2">
            <Zap size={14} /> Industrial Logic Engine
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-black text-text-primary tracking-tighter leading-[0.9]">
              {title}
            </h1>
            <p className="text-xl text-text-secondary font-medium tracking-tight max-w-[600px] mx-auto lg:mx-0">
              {tagline}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-bg-surface border border-border-light text-accent-primary">
                <Clock size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-text-muted">Latency</span>
                <span className="text-sm font-bold text-text-primary">~1.2s Real-time</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-bg-surface border border-border-light text-emerald-500">
                <Shield size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-text-muted">Security</span>
                <span className="text-sm font-bold text-text-primary">E2E Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[450px] shrink-0">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-bg-surface border border-border-strong rounded-[32px] p-8 shadow-2xl">
              <div className="absolute top-8 right-8 text-accent-primary/20 group-hover:text-accent-primary/40 transition-colors">
                {icon}
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* SEO & Blog Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 pt-20 border-t border-border-light">
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-6">
            <div className="flex items-center gap-4 text-accent-primary">
              <MessageSquare size={24} />
              <h2 className="text-3xl font-black tracking-tight">{seoContent.blog.title}</h2>
            </div>
            <div className="prose prose-invert prose-p:text-text-secondary prose-p:leading-relaxed prose-headings:text-text-primary max-w-none">
              <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-line">
                {seoContent.blog.content}
              </p>
            </div>
          </section>

          <section className="space-y-10">
             <div className="flex items-center gap-4 text-accent-primary">
              <HelpCircle size={24} />
              <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {seoContent.faqs.map((faq, index) => (
                <div key={index} className="bg-bg-surface p-8 rounded-[24px] border border-border-light hover:border-accent-primary/30 transition-all">
                  <h3 className="text-lg font-black text-text-primary mb-4 leading-tight">{faq.question}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / Backlinks / Social Proof */}
        <div className="space-y-12">
          <div className="bg-gradient-to-br from-bg-surface to-bg-primary border border-border-strong rounded-[32px] p-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-6 flex items-center gap-2">
              <Shield size={12} className="text-accent-primary" /> Why use this tool?
            </h4>
            <ul className="space-y-4">
              {[
                'Enterprise-grade accuracy',
                'No data retention policy',
                'Blazing fast processing',
                'Cross-platform compatibility'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-text-secondary">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-dashed border-border-strong rounded-[32px] text-center space-y-4">
            <h4 className="text-lg font-black text-text-primary">Trusted by 10k+ Devs</h4>
            <p className="text-xs text-text-muted font-medium">Join the community of developers building the future of automated utilities.</p>
            <div className="flex justify-center -space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-primary bg-bg-surface flex items-center justify-center text-[10px] font-black text-text-muted">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolPageLayout;
