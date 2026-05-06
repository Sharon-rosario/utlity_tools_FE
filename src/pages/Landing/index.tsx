import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Terminal,
  Activity,
  Database,
  Cpu,
  Clock,
  ChevronRight,
  Zap,
  FileText,
  Lock,
  Calculator,
  MessageCircle,
  Video,
  LayoutList,
  BarChart2,
  ShieldCheck,
  Globe,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import SuggestionBox from '../../components/shared/SuggestionBox';
import ReferralCard from '../../components/shared/ReferralCard';

/* ─────────────────── TICKER ─────────────────── */
const TICKERS = [
  'NEURAL NETWORK ACTIVE', 'MULTI-AGENT SYNTHESIS', 'INDUSTRIAL LOGIC READY',
  'LIVE CDN BYPASSING', 'STRUCTURED OUTPUTS ONLY', 'ZERO SUBSCRIPTIONS',
  'DEEP RESEARCH ENGINE', '$1 PER EXECUTION', 'ZERO PROMPT ENGINEERING',
];

const Ticker = () => {
  const [offset, setOffset] = useState(0);
  const raf = useRef<number | null>(null);
  const speed = 0.8;

  useEffect(() => {
    const tick = () => {
      setOffset(prev => (prev - speed) % (TICKERS.length * 300));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-bg-primary/50 h-12 flex items-center backdrop-blur-md">
      <div className="flex gap-0 whitespace-nowrap will-change-transform" style={{ transform: `translateX(${offset}px)` }}>
        {[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-12 text-[10px] font-black tracking-[0.4em] text-text-muted uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── LIVE CONSOLE ─────────────────── */
const CONSOLE_LINES = [
  { delay: 0,    color: '#6366f1', text: '> INITIALIZING NEURAL_SCRIBE_CORE v2.4.0' },
  { delay: 400,  color: '#a1a1aa', text: '  [SYSTEM] Loading tool manifests...' },
  { delay: 800,  color: '#a1a1aa', text: '  [NETWORK] Connecting data nodes [14/14]' },
  { delay: 1200, color: '#10b981', text: '  [STATUS] Market feeds: SECURE' },
  { delay: 1600, color: '#10b981', text: '  [STATUS] Web indexer: SYNCHRONIZED' },
  { delay: 2000, color: '#a1a1aa', text: '  [SYSTEM] Spawning autonomous clusters...' },
  { delay: 2500, color: '#f59e0b', text: '  [NODE-A] Scraping competitive landscape' },
  { delay: 3000, color: '#f59e0b', text: '  [NODE-B] Pulling regulatory filings' },
  { delay: 3500, color: '#f59e0b', text: '  [NODE-C] Synthesizing market delta' },
  { delay: 4200, color: '#10b981', text: '  [STATUS] Structured payload ready (1.2s)' },
  { delay: 4800, color: '#6366f1', text: '> RESULT: Analysis deployed to workspace' },
];

const LiveConsole = () => {
  const [visible, setVisible] = useState<number>(0);
  useEffect(() => {
    const timeouts: any[] = [];
    CONSOLE_LINES.forEach((_, i) => {
      const t = setTimeout(() => setVisible(i + 1), _.delay);
      timeouts.push(t);
    });
    const loop = setTimeout(() => setVisible(0), 7000);
    timeouts.push(loop);
    return () => timeouts.forEach(clearTimeout);
  }, [visible === 0]);

  return (
    <div className="glass-card overflow-hidden font-mono text-[11px] shadow-[0_0_80px_rgba(0,0,0,0.5)] border-white/10">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        <span className="ml-4 text-[9px] text-text-muted tracking-[0.3em] font-black uppercase">Core Runtime — Live Feed</span>
      </div>
      <div className="p-8 h-[280px] overflow-y-auto scrollbar-hide space-y-3 bg-black/40">
        {CONSOLE_LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="leading-relaxed font-bold" style={{ color: line.color }}>
            {line.text}
            {i === visible - 1 && <span className="inline-block w-1.5 h-3.5 ml-1 bg-current animate-pulse align-middle" />}
          </div>
        ))}
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Ticker />

      {/* HERO SECTION */}
      <section className="relative px-6 pt-32 pb-48 max-w-[1400px] mx-auto overflow-visible">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-secondary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-7 space-y-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary shadow-2xl">
              <Activity size={14} className="text-emerald-500 animate-pulse" />
              Intelligence Network Online — v2.4
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black leading-[0.8] tracking-tighter text-gradient">
              Stop Prompts.<br />
              <span className="text-white">Execute Results.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[640px] font-medium opacity-80">
              Industrial-grade AI agents that scrape live data and deliver precision-mapped deliverables in milliseconds. <span className="text-white">No chat. Just logic.</span>
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/tools" className="group px-12 py-6 bg-white text-black rounded-3xl font-black text-lg uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-2xl flex items-center gap-4 active:scale-95">
                Initialize Arsenal <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/pricing" className="px-12 py-6 bg-bg-surface border border-white/5 text-white rounded-3xl font-black text-lg uppercase tracking-widest hover:border-white/20 transition-all backdrop-blur-md">
                View Pricing
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { icon: Zap, value: '1.2s', label: 'Avg Latency' },
                { icon: Cpu, value: '47', label: 'Active Agents' },
                { icon: Database, value: '$1', label: 'Flat Payload' },
                { icon: Globe, value: 'Global', label: 'CDN Reach' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <stat.icon size={16} className="text-accent-primary mb-1" />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-text-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <LiveConsole />
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Data Ingestion', value: '4.2 TB/Day' },
                { label: 'Uptime', value: '99.99%' },
                { label: 'Security', value: 'E2E Encrypted' },
                { label: 'Accuracy', value: '99.4%' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-[32px] bg-bg-surface/50 border border-white/5 shadow-xl">
                  <div className="text-[9px] font-black uppercase tracking-widest text-text-muted mb-2">{stat.label}</div>
                  <div className="text-sm font-black text-white uppercase">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ARSENAL PREVIEW */}
      <section className="py-48 bg-bg-surface/30 border-y border-white/5 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="space-y-4">
              <div className="text-[10px] font-black text-accent-primary uppercase tracking-[0.4em]">// System Catalog</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
                Precision <span className="text-gradient">Instruments.</span>
              </h2>
            </div>
            <Link to="/tools" className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white hover:border-accent-primary transition-all flex items-center gap-3">
              View All 47 Tools <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BarChart2, name: 'Market Validator', cost: '1 Credit', desc: 'Real-time competitive landscape synthesis.' },
              { icon: Calculator, name: 'Wealth Matrix', cost: 'Free', desc: 'Recursive compounding with step-up protocols.' },
              { icon: Video, name: 'Insta Scalpel', cost: '1 Credit', desc: 'Bypass CDNs for viral content extraction.' },
            ].map((tool, i) => (
              <div key={i} className="glass-card p-10 group hover:scale-[1.02] transition-all duration-500 flex flex-col gap-8">
                <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
                  <tool.icon size={28} />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{tool.cost}</div>
                  <h3 className="text-3xl font-black text-white">{tool.name}</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{tool.desc}</p>
                </div>
                <button className="mt-4 text-[10px] font-black uppercase tracking-widest text-accent-primary flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Access Engine <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-64 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white leading-[0.8] mb-12">
            Execute. <br />
            <span className="text-gradient">Don't Chat.</span>
          </h2>
          <Link to="/tools" className="inline-flex items-center gap-8 px-16 py-8 bg-white text-black rounded-[40px] font-black text-2xl uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-[0_0_100px_rgba(255,255,255,0.1)] active:scale-95 group">
            Open the Arsenal <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
