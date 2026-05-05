import { useState, useEffect } from 'react';
import { 
  UserCheck, 
  MessageCircle, 
  Globe, 
  Search, 
  BookOpen, 
  TrendingUp, 
  PieChart,
  Smartphone,
  Lightbulb,
  Users,
  Gift,
  Award,
  Menu,
  X,
  Video,
  Camera,
  FileText,
  LayoutList
} from 'lucide-react';

const EfficiencyGauge = ({ range, percentage, color }: { range: string, percentage: number, color: string }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-bg-surface border border-border-light p-4 rounded-2xl mt-6 w-fit shadow-sm">
      <div className="relative flex items-center justify-center w-12 h-12">
        <svg className="w-full h-full -rotate-90">
          <circle className="text-border-light fill-transparent" strokeWidth="3" stroke="currentColor" cx="24" cy="24" r={radius} />
          <circle 
            className="fill-transparent transition-all duration-1000 ease-out" 
            strokeWidth="3"
            strokeLinecap="round"
            cx="24" 
            cy="24" 
            r={radius} 
            stroke={color}
            style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset }}
          />
        </svg>
        <span className="absolute text-[10px] font-black text-text-primary">{percentage}%</span>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-black text-text-primary leading-tight">{range}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Manual Hours Saved</span>
      </div>
    </div>
  );
};

const Blog = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isSidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isSidebarOpen]);

  const handleLinkClick = () => { if (window.innerWidth < 1024) setSidebarOpen(false); };

  const colors = {
    proposal: '#ef4444', scope: '#3b82f6', hiring: '#8b5cf6', tweet: '#ec4899',
    domain: '#06b6d4', idea: '#f97316', exam: '#14b8a6', trading: '#f59e0b',
    investment: '#10b981', video: '#a855f7', profile: '#f43f5e'
  };

  const marketingColors = {
    seo: '#3b82f6', reels: '#ec4899', user: '#f59e0b',
    referral: '#10b981', free: '#06b6d4', brand: '#8b5cf6'
  };

  const tools = [
    { id: 'proposal', name: 'Proposal Generator', icon: <FileText size={32} />, color: colors.proposal, range: '4h - 10h', percentage: 58, problem: 'Writing professional proposals is intensely time-consuming and often yields low conversion rates.', impact: 'Directly impacts user income. High-ROI document generation for freelancers.', inputs: ['Client requirements', 'Budget constraints', 'Industry context'], processing: ['Industry standards analysis', 'Persuasive copy generation', 'Logical pricing breakdowns', 'Timeline formulation'], outputs: ['Full proposal document', 'Pricing breakdown', 'Project timeline', 'Editable Template View'] },
    { id: 'scope', name: 'Scope Breakdown Tool', icon: <LayoutList size={32} />, color: colors.scope, range: '2h - 4h', percentage: 25, problem: 'Clients request "just small work" which inevitably balloons into huge, unpaid scope creep.', impact: 'Saves hours of negotiation and prevents financial loss for freelancers.', inputs: ['Vague client requirements (text/notes)'], processing: ['Conversion to technical language', 'Automatic hidden task identification (QA/Testing)'], outputs: ['Structured Scope of Work document', 'SRS generator baseline', 'Quotation generator'] },
    { id: 'hiring', name: 'Hiring Decision Tool', icon: <UserCheck size={32} />, color: colors.hiring, range: '4h - 8h', percentage: 50, problem: 'Bad hires are incredibly expensive. Screening is tedious and prone to bias.', impact: 'Dramatically reduces hiring friction for small teams.', inputs: ['Job Description', 'Bulk resumes (PDFs)'], processing: ['Mass resume parsing', 'Skill matching algorithm', 'Candidate risk analysis', 'Salary benchmarking'], outputs: ['Hire / Reject signals', 'Risk analysis report', 'Salary recommendations'] },
    { id: 'tweet', name: 'Tweet Generator for X', icon: <MessageCircle size={32} />, color: colors.tweet, range: '1h - 2h', percentage: 12, problem: 'Maintaining a high-engagement X profile requires constant trend-watching and hook engineering.', impact: 'Automates growth for influencers and brands.', inputs: ['Niche', 'Goal', 'Tone'], processing: ['Trend scraping (X/Reddit)', 'Viral hook synthesis', 'Niche-specific adaptation'], outputs: ['10 Ready-to-post tweets', 'Viral hooks', 'Image concepts'] },
    { id: 'domain', name: 'Domain Finder Tool', icon: <Globe size={32} />, color: colors.domain, range: '1h - 3h', percentage: 16, problem: 'Finding brandable, available domains is a nightmare of "Taken" messages.', impact: 'Accelerates new project launches.', inputs: ['Niche', 'Brand Vibe'], processing: ['AI brandable generation', 'Real-time API availability checks', 'Trademark filtering'], outputs: ['Available domains list', 'Risk report', 'Registrar links'] },
    { id: 'validator', name: 'Startup Idea Validator', icon: <Search size={32} />, color: colors.idea, range: '6h - 12h', percentage: 75, problem: 'Founders spend months building products that nobody wants.', impact: 'Prevents years of wasted effort.', inputs: ['Idea description', 'Target market'], processing: ['Competitor research protocol', 'Historical failure analysis', 'TAM/SAM/SOM calculation'], outputs: ['Visual validation dashboard', 'Competitor report', 'Risk/Opportunity map'] },
    { id: 'exam', name: 'Exam Prep Analyzer', icon: <BookOpen size={32} />, color: colors.exam, range: '3h - 6h', percentage: 37, problem: 'Students study 100% of the book when only 20% of topics actually appear on the test.', impact: 'Optimizes study time for high grades.', inputs: ['Past exam papers (PDF)', 'Subject context'], processing: ['Semantic question clustering', 'Weightage detection', 'Pattern recognition'], outputs: ['Critical questions list', 'Generated mock papers', 'Flashcards/Cheat sheets'] },
    { id: 'trading', name: 'Trading Assistant', icon: <TrendingUp size={32} />, color: colors.trading, range: '1h - 2h', percentage: 12, problem: 'Emotional day trading leads to impulsive losses.', impact: 'Adds objective discipline to trading.', inputs: ['Ticker', 'Risk appetite', 'Mode'], processing: ['Technical indicator aggregation', 'Real-time signal check', 'Sentiment audit'], outputs: ['Go / No-Go signal', 'Risk evaluation'] },
    { id: 'investment', name: 'Investment Assistant', icon: <PieChart size={32} />, color: colors.investment, range: '5h - 10h', percentage: 62, problem: 'Long-term investors lack tools for deep fundamental Moat analysis.', impact: 'Professional-grade fundamental research for casuals.', inputs: ['Ticker', 'Horizon'], processing: ['Earnings/Debt parsing', 'Moat strength analysis', 'Macro-economic risk evaluation'], outputs: ['Fundamental score', 'Moat strength report', 'Portfolio suggestion'] },
    { id: 'video', name: 'Viral Video Auditor', icon: <Video size={32} />, color: colors.video, range: '2h - 4h', percentage: 25, problem: 'Creators post "dead" videos because they don\'t audit pacing and hooks.', impact: 'Saves hours of editing by preventing duds.', inputs: ['Video file/URL', 'Platform'], processing: ['Audio/Visual pacing audit', 'Hook strength scoring', 'SEO metadata generation'], outputs: ['Video score & fix suggestions', 'Viral title variations', 'Hashtag/Caption set'] },
    { id: 'profile', name: 'Social Profile Architect', icon: <Camera size={32} />, color: colors.profile, range: '3h - 5h', percentage: 33, problem: 'Setting up new niche accounts (Insta/TikTok) is a manual setup grind.', impact: 'Instant account "soul" and aesthetics.', inputs: ['Niche', 'Brand Vibe'], processing: ['Username availability check', 'Visual theme generation', 'Competitor benchmarking'], outputs: ['Verified usernames', 'Bio/Avatar concepts', 'Layout/Palette plan'] }
  ];

  return (
    <div className="flex h-auto bg-bg-primary text-text-primary font-inter overflow-x-hidden">
      {/* MOBILE HEADER */}
      <header className="lg:hidden fixed top-[73px] left-0 right-0 h-[60px] bg-bg-surface/80 backdrop-blur-xl border-b border-border-light z-[40] flex items-center justify-between px-6">
        <h2 className="text-sm font-black tracking-tighter">VISION <span className="text-accent-primary">DOC</span></h2>
        <button className="p-2" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`fixed inset-y-0 left-0 w-[300px] bg-bg-surface/95 backdrop-blur-2xl border-r border-border-light p-8 z-[50] transition-transform duration-500 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} pt-24 lg:pt-8`}>
        <div className="mb-10">
          <h2 className="text-2xl font-black tracking-tighter">UTILITY<span className="text-accent-primary">TOOL</span></h2>
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mt-1">Comprehensive Vision v3.0</p>
        </div>

        <nav className="space-y-8 overflow-y-auto h-[calc(100vh-180px)] pr-4 scrollbar-hide">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Business Concept</div>
            {['Executive Summary', 'Market Problem', 'The Solution & Platform', 'Core Value Proposition', 'Pricing & Revenue Model', 'Target Audience Categories', 'Backend Architecture'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="block py-2 text-sm font-semibold text-text-secondary hover:text-accent-primary transition-all hover:translate-x-1" onClick={handleLinkClick}>{item}</a>
            ))}
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Detailed Tool Specs</div>
            {tools.map((tool, idx) => (
              <a key={tool.id} href={`#tool-${tool.id}`} className="flex items-center gap-3 py-2 text-sm font-semibold text-text-secondary transition-all hover:translate-x-1 group" onClick={handleLinkClick}>
                <span className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ backgroundColor: tool.color }}></span>
                <span className="group-hover:text-text-primary whitespace-nowrap">{idx + 1}. {tool.name}</span>
              </a>
            ))}
          </div>
          
          <div className="space-y-1 pb-10">
            <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-4">Growth Strategy</div>
            {Object.entries(marketingColors).map(([key, color], idx) => (
              <a key={key} href={`#marketing-${key}`} className="flex items-center gap-3 py-2 text-sm font-semibold text-text-secondary transition-all hover:translate-x-1 group" onClick={handleLinkClick}>
                <span className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform" style={{ backgroundColor: color }}></span>
                <span className="group-hover:text-text-primary whitespace-nowrap">{idx + 1}. {key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 lg:ml-[300px] px-6 md:px-12 lg:px-20 py-24 lg:py-16 max-w-6xl mx-auto">
        <section id="executive-summary" className="mb-24">
          <div className="inline-block px-4 py-1.5 bg-accent-glow text-accent-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-8">Business Strategy & Vision</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-[0.85]">The "$1 Utility Tools Platform" Master Plan</h1>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-medium max-w-4xl">
            Welcome to the comprehensive vision for a disruptive micro-SaaS ecosystem. Each tool is designed to compress complex tasks from hours into seconds for just $1.
          </p>
        </section>

        {/* CORE CONCEPTS */}
        <div className="space-y-12 mb-32">
          <section id="market-problem" className="bg-bg-surface border border-border-light rounded-[40px] p-8 md:p-12 border-l-8 border-l-accent-secondary shadow-sm">
            <h2 className="text-3xl font-black mb-8 tracking-tight">The Market Problem</h2>
            <div className="space-y-6 text-text-secondary text-lg leading-relaxed font-medium">
              <p>1. <strong>Subscription Fatigue:</strong> Monthly $15-$30 recurring fees for tools only used occasionally.</p>
              <p>2. <strong>Raw AI Inefficiency:</strong> Generic LLMs require heavy prompting and output raw text that needs hours of manual formatting.</p>
            </div>
          </section>

          <section id="the-solution-&-platform" className="bg-bg-surface border border-border-light rounded-[40px] p-8 md:p-12 border-l-8 border-l-accent-primary shadow-sm">
            <h2 className="text-3xl font-black mb-8 tracking-tight">The Solution: The Platform Concept</h2>
            <p className="text-text-secondary text-lg leading-relaxed font-medium">
              A centralized arsenal of predefined workflows. We deliver <strong>structured outputs</strong> over raw generation. No prompting. Just inputs, processing, and finished documents.
            </p>
          </section>

          <section id="pricing-revenue-model" className="bg-bg-surface border border-border-light rounded-[40px] p-8 md:p-12 border-l-8 border-l-amber-500 shadow-sm relative overflow-hidden">
            <h2 className="text-3xl font-black mb-10 tracking-tight">Pricing & Revenue Model</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-5xl font-black text-amber-500 tracking-tighter">1 Credit = ~$1</div>
              <ul className="space-y-4 text-text-secondary font-bold text-sm">
                <li>• 60-day maximum validity</li>
                <li>• Zero monthly recurring costs</li>
                <li>• Impulse-buy micro-transactions</li>
              </ul>
            </div>
          </section>
        </div>

        {/* TOOL SPECIFICATIONS */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-16 leading-none">Tool Specifications</h1>
        <div className="space-y-12">
          {tools.map((tool, idx) => (
            <div key={tool.id} id={`tool-${tool.id}`} className="bg-bg-surface border border-border-light rounded-[40px] p-8 md:p-12 border-l-4" style={{ borderLeftColor: tool.color }}>
              <h3 className="text-3xl font-black mb-6 flex items-center gap-4" style={{ color: tool.color }}>
                {tool.icon} {idx + 1}. {tool.name}
              </h3>
              <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                <div className="space-y-8">
                  <p className="text-lg text-text-secondary font-medium italic border-b border-border-light pb-6">"{tool.problem}"</p>
                  <div className="grid sm:grid-cols-2 gap-8 text-sm">
                    <div>
                      <h4 className="font-black uppercase text-[10px] tracking-widest mb-4" style={{ color: tool.color }}>User Inputs</h4>
                      <ul className="text-text-secondary space-y-2">{tool.inputs.map(input => <li key={input}>• {input}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-black uppercase text-[10px] tracking-widest mb-4" style={{ color: tool.color }}>Backend Logic</h4>
                      <ul className="text-text-secondary space-y-2">{tool.processing.map(proc => <li key={proc}>• {proc}</li>)}</ul>
                    </div>
                  </div>
                </div>
                <EfficiencyGauge range={tool.range} percentage={tool.percentage} color={tool.color} />
              </div>
            </div>
          ))}
        </div>

        {/* GROWTH STRATEGY */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter mt-32 mb-16 leading-none">Growth Strategy</h1>
        <div className="grid gap-8">
          {[
            { id: 'seo', name: 'SEO-Led Growth', color: marketingColors.seo, icon: <Search/>, desc: 'Every tool is a keyword entry point. Compound domain authority via independent ranking pages.' },
            { id: 'reels', name: 'Short-Form Content', color: marketingColors.reels, icon: <Smartphone/>, desc: 'The "Anti-Brand" strategy. High volume, direct utility demos on TikTok, IG, and Shorts.' },
            { id: 'user', name: 'User-Driven Ideas', color: marketingColors.user, icon: <Lightbulb/>, desc: 'Decentralized brainstorming. Users suggest, vote, and valid the next set of tools.' },
            { id: 'referral', name: 'Referral Loop', color: marketingColors.referral, icon: <Users/>, desc: 'Credit-based sharing. Both parties get value, driving CAC toward zero.' },
            { id: 'free', name: 'Free Tool Layer', color: marketingColors.free, icon: <Gift/>, desc: 'Zero-friction entry. High-engagement free utilities that funnel into premium credits.' },
            { id: 'brand', name: 'Brand Positioning', color: marketingColors.brand, icon: <Award/>, desc: 'Utility over personality. Positioned as the professional industrial toolkit of 2026.' },
          ].map(pillar => (
            <div key={pillar.id} id={`marketing-${pillar.id}`} className="bg-bg-surface border border-border-light rounded-[32px] p-8 flex flex-col md:flex-row gap-8 items-start border-l-8 shadow-sm" style={{ borderLeftColor: pillar.color }}>
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center shrink-0" style={{ backgroundColor: pillar.color + '20', color: pillar.color }}>{pillar.icon}</div>
              <div>
                <h3 className="text-2xl font-black mb-3" style={{ color: pillar.color }}>{pillar.name}</h3>
                <p className="text-text-secondary leading-relaxed font-bold text-lg">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Blog;
