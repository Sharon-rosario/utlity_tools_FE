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
  Radio,
  Zap,
  FileText,
  Lock,
  Calculator,
  MessageCircle,
  Video,
  LayoutList,
  BarChart2
} from 'lucide-react';
import SuggestionBox from '../../components/shared/SuggestionBox';
import ReferralCard from '../../components/shared/ReferralCard';

/* ─────────────────── TICKER ─────────────────── */
const TICKERS = [
  'MARKET DATA INDEXED', 'MULTI-AGENT SYNTHESIS', '47 TOOLS ACTIVE',
  'LIVE WEB SCRAPING', 'STRUCTURED OUTPUTS ONLY', 'NO SUBSCRIPTIONS',
  'DEEP RESEARCH ENGINE', '$1 PER EXECUTION', 'ZERO PROMPT ENGINEERING',
];

const Ticker = () => {
  const [offset, setOffset] = useState(0);
  const raf = useRef<number | null>(null);
  const speed = 0.6;

  useEffect(() => {
    const tick = () => {
      setOffset(prev => (prev - speed) % (TICKERS.length * 220));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const items = [...TICKERS, ...TICKERS, ...TICKERS];

  return (
    <div className="relative overflow-hidden border-y border-border-light bg-bg-surface h-10 flex items-center shadow-sm">
      <div className="absolute left-0 z-10 w-24 h-full bg-gradient-to-r from-bg-surface to-transparent pointer-events-none" />
      <div className="absolute right-0 z-10 w-24 h-full bg-gradient-to-l from-bg-surface to-transparent pointer-events-none" />
      <div
        className="flex gap-0 whitespace-nowrap will-change-transform"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-10 text-[10px] font-mono font-bold tracking-[0.25em] text-text-muted">
            <span className="w-1 h-1 rounded-full bg-accent-primary inline-block" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── LIVE CONSOLE ─────────────────── */
const CONSOLE_LINES = [
  { delay: 0,    color: '#3b82f6', text: '> INIT deep_search_engine v4.2.1' },
  { delay: 600,  color: '#94a3b8', text: '  loading tool manifests...' },
  { delay: 1100, color: '#94a3b8', text: '  connecting data streams [14/14]' },
  { delay: 1700, color: '#10b981', text: '  ✓ market feeds: ACTIVE' },
  { delay: 2200, color: '#10b981', text: '  ✓ web indexer: ACTIVE' },
  { delay: 2700, color: '#94a3b8', text: '  spawning agent cluster...' },
  { delay: 3400, color: '#f59e0b', text: '  [AGT-1] scraping competitor matrix' },
  { delay: 3900, color: '#f59e0b', text: '  [AGT-2] pulling patent filings' },
  { delay: 4400, color: '#f59e0b', text: '  [AGT-3] synthesizing market gaps' },
  { delay: 5100, color: '#10b981', text: '  ✓ structured report ready (2.1s)' },
  { delay: 5700, color: '#3b82f6', text: '> OUTPUT: 34-page analysis delivered' },
];

const LiveConsole = () => {
  const [visible, setVisible] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visible]);

  return (
    <div className="rounded-2xl border border-border-light bg-bg-surface overflow-hidden font-mono text-xs shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border-light bg-bg-surface-hover">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        <span className="ml-3 text-[10px] text-text-muted tracking-widest uppercase">Agent Runtime — Live</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-500 font-bold uppercase">Running</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="p-5 h-[260px] overflow-y-auto scrollbar-hide space-y-2"
      >
        {CONSOLE_LINES.slice(0, visible).map((line, i) => (
          <div key={i} className="leading-relaxed font-bold" style={{ color: line.color }}>
            {line.text}
            {i === visible - 1 && (
              <span className="inline-block w-1.5 h-3.5 ml-1 bg-current animate-pulse align-middle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────── STAT CARD ─────────────────── */
const StatCard = ({ icon, value, label, sub }: { icon: React.ReactNode; value: string; label: string; sub?: string }) => (
  <div className="flex flex-col gap-2 p-5 rounded-2xl border border-border-light bg-bg-surface hover:border-accent-primary/50 transition-all group shadow-sm">
    <div className="flex items-center justify-between mb-1">
      <div className="text-accent-primary group-hover:scale-110 transition-transform">{icon}</div>
      {sub && <span className="text-[10px] font-black text-accent-primary bg-accent-glow px-2 py-0.5 rounded uppercase tracking-tighter">{sub}</span>}
    </div>
    <div className="text-3xl font-black text-text-primary tracking-tight">{value}</div>
    <div className="text-[10px] text-text-muted font-black uppercase tracking-widest leading-none">{label}</div>
  </div>
);

/* ─────────────────── TOOL ROW ─────────────────── */
const TOOLS_PREVIEW = [
  { icon: <BarChart2 size={16} />,  name: 'Startup Idea Validator', category: 'Business', cost: '1 credit', color: '#3b82f6' },
  { icon: <FileText size={16} />,   name: 'Proposal Generator',      category: 'Professional', cost: '1 credit', color: '#f59e0b' },
  { icon: <Calculator size={16} />, name: 'Wealth Compounding Engine', category: 'Finance', cost: 'FREE', color: '#10b981' },
  { icon: <MessageCircle size={16} />, name: 'Tweet Intelligence',       category: 'Growth', cost: '1 credit', color: '#10b981' },
  { icon: <Video size={16} />,      name: 'Viral Video Auditor',     category: 'Social', cost: '1 credit', color: '#ef4444' },
  { icon: <LayoutList size={16} />, name: 'Scope Creep Killer',      category: 'Business', cost: '1 credit', color: '#8b5cf6' },
];

const ToolRow = ({ icon, name, category, cost, color }: typeof TOOLS_PREVIEW[0] & { index: number }) => (
  <div
    className="group flex items-center gap-4 px-6 py-5 border-b border-border-light hover:bg-bg-surface-hover transition-all cursor-pointer"
  >
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-primary border border-border-strong group-hover:border-current transition-colors" style={{ color }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="text-sm font-black text-text-primary group-hover:text-accent-primary transition-colors truncate uppercase tracking-tight">{name}</div>
    </div>
    <div className="hidden sm:block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border text-text-muted border-border-strong">
      {category}
    </div>
    <div className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded">
      {cost}
    </div>
    <ArrowUpRight size={14} className="text-border-strong group-hover:text-text-primary transition-colors" />
  </div>
);

/* ─────────────────── VS COMPARISON ─────────────────── */
const COMPARE = [
  { pain: 'Hours of prompt iteration',        gain: 'Single-click structured output' },
  { pain: 'Stale training data (2023)',         gain: 'Live web + API data scraping' },
  { pain: 'Raw text to manually format',       gain: 'Ready-to-send docs & reports' },
  { pain: '$20/mo generalist chatbot',        gain: '$1 per execution, no contract' },
];

const Landing = () => {
  return (
    <div className="h-auto overflow-x-hidden">
      {/* ── TICKER ── */}
      <Ticker />

      {/* ── HERO ── */}
      <section className="relative px-8 md:px-[8%] pt-28 pb-40 max-w-[1400px] mx-auto overflow-hidden">
        {/* Grid lines background */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none organic-grid" />

        <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            {/* Status pill */}
            <div className="inline-flex items-center gap-3 mb-12 px-5 py-2.5 rounded-full border border-border-strong bg-bg-surface text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary shadow-xl">
              <Radio size={12} className="text-emerald-500 animate-pulse" />
              Network Online — 47 Agents Active
              <span className="h-4 w-px bg-border-strong" />
              <span className="text-text-muted tracking-widest font-mono">AGENT_RUNTIME_STABLE</span>
            </div>

            <h1 className="font-outfit text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
              <span className="text-text-primary">Deep Research.</span><br />
              <span className="text-gradient">Structured Result.</span><br />
              <span className="text-text-muted">One Dollar.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[540px] mb-12 font-medium">
              Industrial-grade AI agents that scrape live data and deliver precision-formatted deliverables in seconds. Not a chatbot. <span className="text-accent-primary font-bold">An execution engine.</span>
            </p>

            <div className="flex flex-wrap gap-6 mb-20">
              <Link to="/tools"
                className="flex items-center gap-4 px-10 py-5 bg-accent-primary text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-accent-secondary transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-accent-glow"
              >
                <Terminal size={20} /> Access Arsenal
              </Link>
              <button className="flex items-center gap-4 px-10 py-5 bg-bg-surface text-text-primary border-2 border-border-strong rounded-2xl font-black text-lg uppercase tracking-widest hover:border-accent-primary transition-all">
                <Activity size={20} /> Live Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <StatCard icon={<Zap size={18} />}     value="4.8h"   label="Saved Avg."  sub="KPI" />
              <StatCard icon={<Cpu size={18} />}      value="47"     label="Agents"   />
              <StatCard icon={<Database size={18} />} value="$1"     label="Flat Cost"  sub="USD" />
              <StatCard icon={<Clock size={18} />}    value="< 3s"   label="Latency" />
            </div>
          </div>

          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <LiveConsole />
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              {[
                { label: 'Data Feeds', value: '14 Active' },
                { label: 'Intelligence', value: 'Proprietary' },
                { label: 'Output', value: 'Structured' },
                { label: 'Success', value: '99.9%' },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-1 p-5 rounded-xl border border-border-light bg-bg-surface/50 shadow-sm">
                  <span className="text-text-muted text-[9px] font-black uppercase tracking-widest">{label}</span>
                  <span className="text-accent-primary font-black uppercase">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOL MANIFEST PREVIEW ── */}
      <section className="px-8 md:px-[8%] py-32 max-w-[1400px] mx-auto bg-bg-surface/30 border-y border-border-light relative overflow-hidden">
        <div className="absolute inset-0 organic-grid opacity-[0.03] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <div className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] mb-4">// Production Manifest</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary leading-none">
              Precision <span className="text-gradient">Arsenal.</span>
            </h2>
          </div>
          <Link to="/tools" className="inline-flex items-center gap-4 px-8 py-4 bg-bg-surface border border-border-strong rounded-xl text-xs font-black uppercase tracking-widest text-text-primary hover:border-accent-primary transition-all shadow-md">
            View All 47 Tools <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="rounded-[40px] border border-border-strong overflow-hidden bg-bg-surface shadow-2xl relative z-10">
          <div className="hidden sm:flex items-center gap-4 px-8 py-5 bg-bg-surface-hover border-b border-border-strong text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
            <span className="w-8">ID</span>
            <span className="flex-1">ENGINE NAME</span>
            <span className="w-28 text-right">SECTOR</span>
            <span className="w-24 text-right">COST</span>
            <span className="w-8" />
          </div>
          {TOOLS_PREVIEW.map((tool, i) => (
            <ToolRow key={tool.name} {...tool} index={i} />
          ))}
          <div className="flex items-center justify-center p-8 bg-bg-primary/10">
            <Link to="/tools" className="text-[10px] font-black text-accent-primary hover:text-accent-secondary uppercase tracking-widest flex items-center gap-2 transition-colors">
              View Complete Manifest <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VS ANALYSIS ── */}
      <section className="px-8 md:px-[8%] py-40 max-w-4xl mx-auto">
        <div className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em] mb-4 text-center">// Differential Analysis</div>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-center mb-24 text-text-primary leading-none">
          Why Chatbots <span className="text-red-500 underline decoration-red-500/20 underline-offset-8">Fail.</span>
        </h2>

        <div className="rounded-[40px] border border-border-strong overflow-hidden shadow-2xl bg-bg-surface">
          <div className="grid grid-cols-2 text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="px-10 py-5 bg-red-500/10 border-b border-r border-border-strong text-red-500">General Purpose LLM</div>
            <div className="px-10 py-5 bg-emerald-500/10 border-b border-border-strong text-emerald-500">UtilityTool Network</div>
          </div>
          {COMPARE.map(({ pain, gain }, i) => (
            <div key={i} className="grid grid-cols-2 border-b border-border-light last:border-0 group">
              <div className="px-10 py-8 text-sm md:text-base text-text-secondary border-r border-border-light flex items-center gap-5 group-hover:bg-red-500/5 transition-colors font-medium">
                <span className="text-red-500 shrink-0 opacity-50 font-black">✕</span> {pain}
              </div>
              <div className="px-10 py-8 text-sm md:text-base text-text-primary flex items-center gap-5 group-hover:bg-emerald-500/5 transition-colors font-bold">
                <span className="text-emerald-500 shrink-0 font-black">✓</span> {gain}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMUNITY & CREDIT ── */}
      <section className="px-8 md:px-[8%] py-40 max-w-[1400px] mx-auto border-t border-border-light relative overflow-hidden">
        <div className="absolute inset-0 organic-grid opacity-[0.02] pointer-events-none" />
        <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-center">
          <div>
            <div className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] mb-4">// System Evolution</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary leading-none mb-10">
              Precision Driven by <span className="text-gradient">Feedback.</span>
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed mb-16 italic font-medium max-w-2xl">
              We don't build arbitrary features. We engineer high-precision solutions for the specific industrial pains reported by our network.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <SuggestionBox />
              <ReferralCard />
            </div>
          </div>
          
          <div className="relative">
            <div className="rounded-[40px] border border-border-strong bg-gradient-to-br from-bg-surface to-bg-primary p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent-primary/20 transition-all duration-1000"></div>
              
              <div className="flex justify-between items-start mb-16">
                <div>
                  <div className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-3">Network Credits</div>
                  <div className="text-8xl font-black text-text-primary tracking-tighter">42.00</div>
                  <div className="text-xs font-black text-accent-primary uppercase tracking-widest mt-4 flex items-center gap-2">
                    <Activity size={14} className="animate-pulse" /> Ready for Execution
                  </div>
                </div>
                <div className="w-20 h-20 rounded-2xl border border-border-strong bg-bg-surface flex items-center justify-center text-accent-primary shadow-inner">
                  <Lock size={40} />
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="h-2.5 w-full bg-border-light rounded-full overflow-hidden">
                  <div className="h-full bg-accent-primary w-2/3 shadow-lg shadow-accent-primary/50 transition-all duration-1000"></div>
                </div>
                <Link to="/pricing" className="w-full py-6 bg-text-primary text-bg-primary rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all text-center shadow-xl">
                  Initialize Refill
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-8 md:px-[8%] py-48 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none organic-grid" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-outfit text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] mb-16 text-text-primary">
            Stop Prompts.<br />
            <span className="text-gradient">Deploy Solutions.</span>
          </h2>
          <Link to="/tools" className="inline-flex items-center gap-8 px-14 py-7 bg-accent-primary text-white rounded-3xl font-black text-2xl uppercase tracking-widest hover:bg-accent-secondary transition-all shadow-2xl shadow-accent-glow group">
            Open the Arsenal <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
