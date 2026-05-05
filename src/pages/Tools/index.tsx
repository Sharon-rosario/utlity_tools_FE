import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Video, 
  BookOpen, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  Cpu, 
  Layers,
  Activity,
  Terminal,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Calculator,
  FileText,
  Users,
  Code,
  Percent,
  Globe,
  LayoutList,
  MessageCircle,
  BarChart2,
  Repeat,
  Sparkles,
  Filter,
  DollarSign,
  Briefcase,
  Smartphone,
  Cpu as CpuIcon,
  Clock,
  Mic,
  Video as VideoIcon
} from 'lucide-react';

type Category = 'All' | 'Business' | 'Social' | 'Finance' | 'Education' | 'Engineering' | 'Marketing';
type AccessLevel = 'All' | 'Free' | 'Paid';
type StatusFilter = 'All' | 'Active' | 'Coming Soon';

interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pain: string;
  logic: string;
  category: Category;
  icon: React.ReactNode;
  keywords: string[];
  status: 'live' | 'coming_soon';
  savings: string;
  protocol: string;
  model?: string;
  cost: string;
  latency: string;
  depth: string;
  isFree?: boolean;
  usageCount?: number;
  isTrending?: boolean;
}

const toolsData: Tool[] = [
  {
    id: 'voice-to-text',
    name: 'Voice to Text',
    tagline: 'Neural-Grade Audio Transcription',
    description: 'Convert any audio file into clean, formatted text with high-precision timestamps.',
    pain: 'Hours spent manually transcribing audio for blogs and research.',
    logic: 'Whisper-based neural engine with social-media audio extraction protocol.',
    category: 'Social',
    icon: <Mic size={20} />,
    keywords: ['transcribe', 'voice', 'audio', 'ai'],
    status: 'live',
    savings: '1h per file',
    protocol: 'Neural-Scribe-V1',
    model: 'Whisper-Large-V3',
    cost: 'FREE',
    latency: '1.2s',
    depth: 'Full Audio Scan',
    usageCount: 4500,
    isTrending: true,
    isFree: true
  },
  {
    id: 'instagram-transcript',
    name: 'Instagram Transcript',
    tagline: 'Extract Insights from Reels',
    description: 'Paste any Instagram link to generate a high-precision text transcript for SEO.',
    pain: 'Watching reels 10x to write down notes for content repurposing.',
    logic: 'CDN bypass protocol + frequency-based audio isolation + transcription.',
    category: 'Social',
    icon: <VideoIcon size={20} />,
    keywords: ['instagram', 'reels', 'transcript', 'social'],
    status: 'live',
    savings: '10m per reel',
    protocol: 'Social-Synth-V2',
    model: 'Proprietary L-Engine',
    cost: 'FREE',
    latency: '2.5s',
    depth: 'High-Res Extraction',
    usageCount: 3200,
    isTrending: true,
    isFree: true
  },
  // --- INDUSTRIAL AI AGENTS ($1.00) - 40% (Target: 10) ---
  {
    id: 'proposal-generator',
    name: 'The Proposal Closer',
    tagline: 'High-Conversion Response Engine',
    description: 'Generates a full, data-backed business proposal using industry-specific pricing benchmarks.',
    pain: "6h manual formatting + guessing pricing psychology.",
    logic: 'Backend crawls competitor pricing + generates persuasive psychological copy.',
    category: 'Business',
    icon: <FileText size={20} />,
    keywords: ['freelance', 'sales', 'pitch'],
    status: 'coming_soon',
    savings: '6h saved',
    protocol: 'Sales-Psych-V4',
    model: 'Proprietary L-Engine',
    cost: '$1.00',
    latency: '1.2s',
    depth: 'Deep Market Crawl',
    usageCount: 1240,
    isTrending: true
  },
  {
    id: 'startup-validator',
    name: 'Startup Idea Validator',
    tagline: 'Recursive Market Research Matrix',
    description: 'Transforms a raw idea into a complete research dashboard with competitor and failure analysis.',
    pain: "Months of building products that nobody actually wants.",
    logic: 'Multi-agent research protocol analyzing competitors, TAM/SAM/SOM, and historical failures.',
    category: 'Business',
    icon: <BarChart2 size={20} />,
    keywords: ['startup', 'entrepreneur', 'research'],
    status: 'coming_soon',
    savings: '40h research',
    protocol: 'Validation-Core-V2',
    model: 'Industrial Scale Cluster',
    cost: '$1.00',
    latency: '2.5s',
    depth: 'Global Market Index',
    usageCount: 850,
    isTrending: true
  },
  {
    id: 'video-auditor',
    name: 'Viral Video Auditor',
    tagline: 'Hook & Retention Neural Audit',
    description: 'Complete audit of your hook, pacing, and metadata before you hit publish.',
    pain: "Posting 'dead' videos that fail to break the 200-view ceiling.",
    logic: 'Neural analysis of top 1% trending videos to score your retention potential.',
    category: 'Social',
    icon: <Video size={20} />,
    keywords: ['reels', 'tiktok', 'shorts'],
    status: 'coming_soon',
    savings: '4h saved',
    protocol: 'Retention-Neural-Net',
    model: 'Visual Logic Matrix',
    cost: '$1.00',
    latency: '3.4s',
    depth: '1M+ Viral Samples',
    usageCount: 2100,
    isTrending: true
  },
  {
    id: 'domain-finder',
    name: 'Domain Finder Tool',
    tagline: 'Brandable Availability Engine',
    description: 'AI-powered brandable domain generation with real-time availability and risk checks.',
    pain: "Wasting days searching for available .com domains.",
    logic: 'Real-time API availability checks + trademark filtering + AI semantic generation.',
    category: 'Business',
    icon: <Globe size={20} />,
    keywords: ['branding', 'domain', 'launch'],
    status: 'coming_soon',
    savings: '2h saved',
    protocol: 'Naming-Logic-V1',
    model: 'Proprietary L-Engine',
    cost: '$1.00',
    latency: '0.8s',
    depth: 'Real-time API'
  },
  {
    id: 'tweet-generator',
    name: 'Tweet Generator for X',
    tagline: 'Viral Hook & Authority Synthesis',
    description: 'Generates high-engagement tweets by pulling trending topics and viral hooks.',
    pain: "Staring at a blank screen trying to be 'viral'.",
    logic: 'Trend scraping from X/Reddit + AI hook engineering + niche adaptation.',
    category: 'Social',
    icon: <MessageCircle size={20} />,
    keywords: ['social', 'marketing', 'twitter'],
    status: 'coming_soon',
    savings: '2h saved',
    protocol: 'Engagement-V4',
    model: 'Proprietary L-Engine',
    cost: '$1.00',
    latency: '1.1s',
    depth: 'Live Trend Scraping',
    usageCount: 1800,
    isTrending: true
  },
  {
    id: 'scope-killer',
    name: 'Scope Creep Killer',
    tagline: 'Recursive Requirement Decomposition',
    description: 'Turns vague client emails into 50+ itemized technical tasks.',
    pain: "Unpaid 'small requests' ballooning into 20h project leaks.",
    logic: 'Recursive decomposition engine that identifies hidden tasks clients never mention.',
    category: 'Business',
    icon: <LayoutList size={20} />,
    keywords: ['agile', 'srs', 'freelance'],
    status: 'coming_soon',
    savings: '3h saved',
    protocol: 'Decomp-Logic-V2',
    model: 'Industrial Scale Cluster',
    cost: '$1.00',
    latency: '0.8s',
    depth: 'Hidden Task Detection',
    usageCount: 450
  },
  {
    id: 'talent-scalpel',
    name: 'Talent Scalpel',
    tagline: 'Cross-Referenced Skill Verification',
    description: 'Mass-parses resumes and gives you a "High-Risk" vs "High-Potential" score instantly.',
    pain: 'Manual CV fatigue leading to missing elite-tier talent.',
    logic: 'Multi-agent cross-referencing of skills against real-world project requirements.',
    category: 'Business',
    icon: <Users size={20} />,
    keywords: ['hr', 'recruiting', 'cv'],
    status: 'coming_soon',
    savings: '12h saved',
    protocol: 'Verification-Matrix',
    model: 'Deep Reasoning Synth',
    cost: '$1.00',
    latency: '4.5s',
    depth: 'Multi-Agent Consensus',
    usageCount: 920
  },
  {
    id: 'profile-architect',
    name: 'Social Profile Architect',
    tagline: 'Conversion-Optimized Persona Engine',
    description: 'Audits your LinkedIn or X profile to maximize high-ticket lead conversion.',
    pain: 'Traffic visiting your profile but never clicking your link.',
    logic: 'Visual and textual analysis of hooks, banners, and pinned content.',
    category: 'Social',
    icon: <Smartphone size={20} />,
    keywords: ['linkedin', 'personal brand', 'conversion'],
    status: 'coming_soon',
    savings: '10h research',
    protocol: 'Persona-Opt-V1',
    model: 'Neural Vision Layer',
    cost: '$1.00',
    latency: '5.2s',
    depth: 'Competitor Benchmark',
    usageCount: 610
  },
  {
    id: 'viral-threader',
    name: 'Viral Thread Synthesizer',
    tagline: 'Long-Form to X/LinkedIn Transmuter',
    description: 'Converts 20-minute videos or 3,000-word articles into high-engagement social threads.',
    pain: 'Wasting hours repurposing content that fails to get traction.',
    logic: 'Semantic extraction of core insights mapped to proven viral hook templates.',
    category: 'Marketing',
    icon: <Zap size={20} />,
    keywords: ['repurposing', 'content', 'growth'],
    status: 'coming_soon',
    savings: '4h per piece',
    protocol: 'Synthesis-Core-V4',
    model: 'Deep Context Engine',
    cost: '$1.00',
    latency: '2.1s',
    depth: 'Full Media Analysis',
    usageCount: 1540,
    isTrending: true
  },
  {
    id: 'comp-intel',
    name: 'Competitive Intelligence Bot',
    tagline: 'Strategic Blindspot Detector',
    description: 'Deep crawl of your competitors to find pricing gaps and marketing weaknesses.',
    pain: 'Being undercut by competitors you didn\'t even know existed.',
    logic: 'Multi-agent web scraping + SWOT analysis synthesis.',
    category: 'Business',
    icon: <TrendingUp size={20} />,
    keywords: ['marketing', 'strategy', 'analysis'],
    status: 'coming_soon',
    savings: '20h research',
    protocol: 'Market-Intel-V2',
    model: 'Deep Reasoning Cluster',
    cost: '$1.00',
    latency: '6.5s',
    depth: 'Global Crawl',
    usageCount: 780
  },

  // --- LOGIC ENGINES (FREE) - 60% (Target: 15) ---
  {
    id: 'json-to-ts',
    name: 'JSON to TS Scalpel',
    tagline: 'Recursive Type Definition Matrix',
    description: 'Instantly convert complex JSON blobs into clean, nested TypeScript interfaces.',
    pain: '30m manual typing and nested interface debugging.',
    logic: 'Pure recursive traversal algorithm with type-inference logic.',
    category: 'Engineering',
    icon: <Code size={20} />,
    keywords: ['dev', 'typescript', 'json'],
    status: 'coming_soon',
    savings: 'Zero errors',
    protocol: 'Logic-Matrix-V1',
    cost: 'FREE',
    isFree: true,
    latency: '< 2ms',
    depth: 'Recursive Depth Inf.',
    usageCount: 3200,
    isTrending: true
  },
  {
    id: 'compounding-engine',
    name: 'Wealth Compounding Engine',
    tagline: 'Multi-Variable Growth Simulator',
    description: 'Calculates true wealth projection using inflation-adjusted compounding logic.',
    pain: 'Static bank calculators that ignore real purchasing power loss.',
    logic: 'Pure mathematical algorithm: A = P(1 + r/n)^(nt) with real-time inflation deduction.',
    category: 'Finance',
    icon: <Calculator size={20} />,
    keywords: ['investment', 'savings', 'interest'],
    status: 'coming_soon',
    savings: 'Precision planning',
    protocol: 'Math-Core-V1',
    cost: 'FREE',
    isFree: true,
    latency: '< 10ms',
    depth: 'Mathematical Certainty'
  },
  {
    id: 'tax-logic',
    name: 'Freelancer Tax Logic',
    tagline: 'Project-Based Tax Projection',
    description: 'Logic-based tax estimator focused on project-based freelancer income.',
    pain: 'Unexpected tax bills at the end of the year.',
    logic: 'Dynamic tax bracket calculation based on current year-to-date project volume.',
    category: 'Finance',
    icon: <Percent size={20} />,
    keywords: ['accounting', 'tax', 'freelance'],
    status: 'coming_soon',
    savings: 'Financial peace',
    protocol: 'Accounting-V2',
    cost: 'FREE',
    isFree: true,
    latency: '< 5ms',
    depth: 'Bracket Precision'
  },
  {
    id: 'sip-forecaster',
    name: 'SIP Growth Forecaster',
    tagline: 'Geometric Progression Matrix',
    description: 'Visualize your wealth accumulation via SIP with interactive inflation and step-up toggles.',
    pain: "Static calculators don't account for annual salary hikes or inflation.",
    logic: 'Compounded geometric progression with variable step-up and tax-drag simulation.',
    category: 'Finance',
    icon: <TrendingUp size={20} />,
    keywords: ['investment', 'sip', 'mutual fund'],
    status: 'coming_soon',
    savings: 'Precision wealth mapping',
    protocol: 'Finance-Algo-V3',
    cost: 'FREE',
    isFree: true,
    latency: '< 2ms',
    depth: '30yr Projection'
  },
  {
    id: 'keyword-density',
    name: 'Keyword Density Auditor',
    tagline: 'SEO Content Over-Optimization Check',
    description: 'Analyzes content to identify keyword stuffing that triggers search engine penalties.',
    pain: "Guessing why a page is de-ranked despite 'perfect' content.",
    logic: 'Statistical n-gram distribution analysis against industry-safe thresholds.',
    category: 'Marketing',
    icon: <Search size={20} />,
    keywords: ['seo', 'content', 'marketing'],
    status: 'coming_soon',
    savings: 'Rank protection',
    protocol: 'SEO-Metric-V4',
    cost: 'FREE',
    isFree: true,
    latency: '150ms',
    depth: 'Full Text Scan',
    usageCount: 410
  },
  {
    id: 'glassmorphism-gen',
    name: 'Glassmorphism Spec Gen',
    tagline: 'Modern UI Frosted Spec Sheet',
    description: 'Generate CSS-perfect glassmorphism specs with real-time blur and opacity logic.',
    pain: 'Endless CSS tweaking to get the perfect "Frosted Glass" look.',
    logic: 'Visual parameter mapping to standard CSS-3 backdrop-filter specifications.',
    category: 'Engineering',
    icon: <Sparkles size={20} />,
    keywords: ['ui', 'design', 'css'],
    status: 'coming_soon',
    savings: 'Design speed',
    protocol: 'Visual-Logic-V2',
    cost: 'FREE',
    isFree: true,
    latency: '< 5ms',
    depth: 'Cross-Browser Spec'
  },
  {
    id: 'base-transmuter',
    name: 'Universal Base Transmuter',
    tagline: 'High-Precision Binary/Hex Matrix',
    description: 'Convert numbers across any base (Binary, Octal, Hex, Decimal) with absolute precision.',
    pain: 'Clunky online converters with ADs and low precision.',
    logic: 'BigInt recursive conversion algorithm for infinite numerical depth.',
    category: 'Engineering',
    icon: <Repeat size={20} />,
    keywords: ['developer', 'binary', 'hex'],
    status: 'coming_soon',
    savings: 'Zero conversion lag',
    protocol: 'Math-Core-V4',
    cost: 'FREE',
    isFree: true,
    latency: '< 1ms',
    depth: 'Infinite Bit Depth'
  },
  {
    id: 'amortization-scalpel',
    name: 'Loan Amortization Scalpel',
    tagline: 'Interactive Debt Visualizer',
    description: 'Visualize the impact of extra payments on your mortgage or loan interest.',
    pain: 'Paying thousands in hidden interest that could be saved.',
    logic: 'Standard amortization formulas with real-time principal deduction simulation.',
    category: 'Finance',
    icon: <Activity size={20} />,
    keywords: ['debt', 'mortgage', 'loan'],
    status: 'coming_soon',
    savings: 'Thousands in interest',
    protocol: 'Amortization-V2',
    cost: 'FREE',
    isFree: true,
    latency: '< 5ms',
    depth: 'Precise Interest Map'
  },
  {
    id: 'gst-global',
    name: 'Global GST/VAT Logic',
    tagline: 'Reverse Tax Transmuter',
    description: 'Instantly calculate reverse GST/VAT for 50+ countries with current tax law lookup.',
    pain: 'Messy manual tax calculations on international invoices.',
    logic: 'Local registry lookup of global tax rates + reverse arithmetic logic.',
    category: 'Finance',
    icon: <Globe size={20} />,
    keywords: ['tax', 'accounting', 'invoice'],
    status: 'coming_soon',
    savings: 'Accuracy & Speed',
    protocol: 'Global-Tax-V1',
    cost: 'FREE',
    isFree: true,
    latency: '< 2ms',
    depth: '50+ Jurisdictions'
  },
  {
    id: 'utm-builder',
    name: 'UTM Multi-Campaign Builder',
    tagline: 'Bulk Tracking Attribution Matrix',
    description: 'Generate 50+ UTM-tagged links at once for multi-platform campaign launches.',
    pain: 'Creating UTM links one-by-one is a slow, error-prone nightmare.',
    logic: 'String manipulation matrix mapping sources/mediums to a base URL list.',
    category: 'Marketing',
    icon: <LayoutList size={20} />,
    keywords: ['marketing', 'tracking', 'ads'],
    status: 'coming_soon',
    savings: '2h per campaign',
    protocol: 'Attribution-V2',
    cost: 'FREE',
    isFree: true,
    latency: '< 10ms',
    depth: 'Infinite Bulk Ops'
  },
  {
    id: 'contrast-auditor',
    name: 'WCAG Contrast Auditor',
    tagline: 'Accessibility Compliance Check',
    description: 'Check your entire brand palette for AA and AAA accessibility standards instantly.',
    pain: 'Designing "cool" sites that are actually unreadable for many users.',
    logic: 'Luminance contrast ratio algorithms mapping HEX to WCAG 2.1 specs.',
    category: 'Engineering',
    icon: <Users size={20} />,
    keywords: ['accessibility', 'design', 'ui'],
    status: 'coming_soon',
    savings: 'Compliance safety',
    protocol: 'A11y-Logic-V1',
    cost: 'FREE',
    isFree: true,
    latency: '< 1ms',
    depth: 'Standard AA/AAA'
  },
  {
    id: 'currency-arbitrage',
    name: 'Live Currency Arbitrage',
    tagline: 'Multi-API Rate Differential Check',
    description: 'Check for rate differences between 3+ public exchange rate APIs in real-time.',
    pain: 'Losing 2-3% on currency conversions due to poor timing or stale data.',
    logic: 'Fetch from multiple public nodes + local delta calculation.',
    category: 'Finance',
    icon: <Repeat size={20} />,
    keywords: ['forex', 'arbitrage', 'finance'],
    status: 'coming_soon',
    savings: '1-2% per txn',
    protocol: 'Arbitrage-Core-V1',
    cost: 'FREE',
    isFree: true,
    latency: '400ms',
    depth: 'Real-time API Delta'
  },
  {
    id: 'crypto-gas',
    name: 'Crypto Gas Price Auditor',
    tagline: 'Real-time Chain Congestion Check',
    description: 'Track real-time gas prices for ETH, Polygon, and BSC using public nodes.',
    pain: 'Paying 5x more in gas than necessary by transacting at peak hours.',
    logic: 'Direct fetch from public Infura/Etherscan nodes.',
    category: 'Engineering',
    icon: <Zap size={20} />,
    keywords: ['crypto', 'eth', 'gas'],
    status: 'coming_soon',
    savings: '80% gas costs',
    protocol: 'Gas-Tracker-V2',
    cost: 'FREE',
    isFree: true,
    latency: '300ms',
    depth: 'Multi-Chain Sync'
  },
  {
    id: 'mortgage-break-even',
    name: 'Mortgage Refinance Break-Even',
    tagline: 'Decision-Logic Amortization Matrix',
    description: 'Calculate exactly when your refinance savings will outweigh the closing costs.',
    pain: 'Refinancing based on low rates without realizing the upfront loss.',
    logic: 'Time-value-of-money algorithm comparing two amortization schedules.',
    category: 'Finance',
    icon: <Clock size={20} />,
    keywords: ['mortgage', 'refinance', 'loans'],
    status: 'coming_soon',
    savings: 'Financial certainty',
    protocol: 'Refi-Logic-V4',
    cost: 'FREE',
    isFree: true,
    latency: '< 10ms',
    depth: '30yr Delta Analysis'
  },
  {
    id: 'drip-visualizer',
    name: 'Dividend Reinvestment (DRIP) Visualizer',
    tagline: 'Yield-on-Cost Projection Engine',
    description: 'Visualize how dividend reinvestment accelerates wealth compared to cash payouts.',
    pain: 'Underestimating the "snowball effect" of long-term dividend growth.',
    logic: 'Recursive compounding engine with tax-drag and yield-growth variables.',
    category: 'Finance',
    icon: <TrendingUp size={20} />,
    keywords: ['dividends', 'stocks', 'compounding'],
    status: 'coming_soon',
    savings: 'Long-term clarity',
    protocol: 'DRIP-Matrix-V1',
    cost: 'FREE',
    isFree: true,
    latency: '< 5ms',
    depth: 'Recursive Snowball'
  }
];

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [sortBy, setSortBy] = useState<'caliber' | 'trending' | 'usage'>('caliber');
  const [expanded, setExpanded] = useState({ priority: true, access: true, market: true, status: true });

  const filteredTools = useMemo(() => {
    let result = toolsData.filter((tool) => {
      // Status Filter
      if (statusFilter === 'Active' && tool.status !== 'live') return false;
      if (statusFilter === 'Coming Soon' && tool.status !== 'coming_soon') return false;

      // Access Level Filter
      if (accessLevel === 'Paid' && tool.isFree) return false;
      if (accessLevel === 'Free' && !tool.isFree) return false;

      // Category Filter
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      if (!matchesCategory) return false;

      // Search Filter
      const query = searchQuery.toLowerCase().trim();
      if (query && !(
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(kw => kw.toLowerCase().includes(query))
      )) return false;

      return true;
    });

    // MIXING & SORTING LOGIC
    if (sortBy === 'trending') {
      return [...result].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    } else if (sortBy === 'usage') {
      return [...result].sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    } else {
      // Default: Caliber Mix (Premium Engines first, then Common Tools)
      return [...result].sort((a, b) => {
        if (a.isFree === b.isFree) return (b.usageCount || 0) - (a.usageCount || 0); // Within same tier, sort by usage
        return a.isFree ? 1 : -1;
      });
    }
  }, [searchQuery, activeCategory, accessLevel, sortBy]);

  const CATEGORIES: { name: Category; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Layers size={14} /> },
    { name: 'Business', icon: <Briefcase size={14} /> },
    { name: 'Social', icon: <Smartphone size={14} /> },
    { name: 'Finance', icon: <DollarSign size={14} /> },
    { name: 'Education', icon: <BookOpen size={14} /> },
    { name: 'Engineering', icon: <CpuIcon size={14} /> },
    { name: 'Marketing', icon: <TrendingUp size={14} /> },
  ];

  return (
    <div className="px-[8%] pt-10 pb-16 max-w-[1400px] mx-auto h-auto">

      <div className="relative z-10 flex flex-col lg:flex-row gap-16">
        <aside className="hidden lg:block lg:w-[280px] shrink-0 fixed top-24 bottom-10 overflow-y-auto scrollbar-hide space-y-10 pr-4">
          {/* SORT ORDER */}
          <div className="space-y-4">
            <button 
              onClick={() => setExpanded(prev => ({ ...prev, priority: !prev.priority }))}
              className="w-full py-2 flex items-center justify-between group hover:text-accent-primary transition-colors text-[10px] font-black uppercase text-text-muted tracking-[0.3em]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg border border-border-strong bg-bg-surface text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary transition-all">
                  <TrendingUp size={12} />
                </div>
                Priority Order
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded.priority ? '' : '-rotate-90'}`} />
            </button>
            
            {expanded.priority && (
              <div className="flex flex-col gap-2 p-1.5 bg-bg-surface border border-border-light rounded-[24px] shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                {(['caliber', 'trending'] as const).map(mode => (
                  <button 
                    key={mode}
                    onClick={() => setSortBy(mode)}
                    className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left whitespace-nowrap ${sortBy === mode ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-text-primary hover:bg-bg-surface-hover'}`}
                  >
                    {mode === 'caliber' ? 'Best Match' : 'Most Popular'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ACCESS LEVEL TOGGLE */}
          <div className="space-y-6">
            <button 
              onClick={() => setExpanded(prev => ({ ...prev, access: !prev.access }))}
              className="w-full py-2 flex items-center justify-between group hover:text-accent-primary transition-colors text-[10px] font-black uppercase text-text-muted tracking-[0.3em]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg border border-border-strong bg-bg-surface text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary transition-all">
                  <Filter size={12} />
                </div>
                Filter by Access
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded.access ? '' : '-rotate-90'}`} />
            </button>
            
            {expanded.access && (
              <div className="flex flex-wrap lg:flex-col gap-2 p-1.5 bg-bg-surface border border-border-light rounded-[24px] shadow-inner animate-in fade-in slide-in-from-top-2 duration-300">
                {(['All', 'Free', 'Paid'] as AccessLevel[]).map(lvl => (
                  <button 
                    key={lvl}
                    onClick={() => setAccessLevel(lvl)}
                    className={`flex-1 lg:flex-none text-center lg:text-left px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${accessLevel === lvl ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-text-primary hover:bg-bg-surface-hover'}`}
                  >
                    {lvl === 'All' ? 'All Tools' : lvl === 'Free' ? 'Free Tools' : 'Paid Tools'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <button 
              onClick={() => setExpanded(prev => ({ ...prev, market: !prev.market }))}
              className="w-full py-2 flex items-center justify-between group hover:text-accent-primary transition-colors text-[10px] font-black uppercase text-text-muted tracking-[0.3em]"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg border border-border-strong bg-bg-surface text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary transition-all">
                  <Briefcase size={12} />
                </div>
                Market Sectors
              </div>
              <ChevronDown size={14} className={`transition-transform duration-300 ${expanded.market ? '' : '-rotate-90'}`} />
            </button>
            
            {expanded.market && (
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide font-fira animate-in fade-in slide-in-from-top-2 duration-300">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.name}
                    className={`text-left px-5 py-4 rounded-2xl font-bold text-xs transition-all flex items-center justify-between group border-2 ${activeCategory === cat.name ? 'bg-accent-primary/10 text-accent-primary border-accent-primary shadow-lg shadow-accent-primary/5' : 'text-text-secondary bg-bg-surface border-border-light hover:border-accent-primary/50'}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    <div className="flex items-center gap-3">
                      <span className={activeCategory === cat.name ? 'text-accent-primary' : 'text-text-muted group-hover:text-accent-primary'}>
                        {cat.icon}
                      </span>
                      {cat.name}
                    </div>
                    <ChevronRight size={14} className={`transition-transform ${activeCategory === cat.name ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        <aside className="lg:hidden w-full space-y-10 mb-10">
          {/* MOBILE FILTERS (kept as normal flow) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-text-muted uppercase tracking-widest"><Filter size={12} /> Mobile Controls</div>
            <div className="flex flex-wrap gap-2 p-2 bg-bg-surface rounded-2xl border border-border-light">
               {(['All', 'Free', 'Paid'] as AccessLevel[]).map(lvl => (
                <button key={lvl} onClick={() => setAccessLevel(lvl)} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${accessLevel === lvl ? 'bg-accent-primary text-white' : 'text-text-muted bg-bg-primary'}`}>
                  {lvl}
                </button>
               ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:ml-[320px]">
          {/* TOP SEARCH BAR */}
          <div className="mb-16">
            <div className="relative group max-w-[800px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary rounded-full blur-md opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative flex items-center">
                <div className="absolute left-8 flex items-center gap-3 text-text-muted">
                  <Terminal className="group-hover:text-accent-primary transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="What problem are we solving today?"
                  className="w-full pl-16 pr-8 py-6 rounded-full border border-border-strong bg-bg-surface text-text-primary text-xl outline-none transition-all focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/10 shadow-2xl font-fira tracking-tight"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-3 mt-6 ml-4">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest flex items-center gap-2 mr-2">
                  <Activity size={10} /> Popular Signals:
                </span>
                {['Proposal', 'Tax Logic', 'SIP Forecast', 'SEO Audit', 'Runway'].map(tag => (
                  <button 
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-1.5 rounded-full bg-bg-surface-hover border border-border-strong text-[10px] font-black text-accent-primary hover:bg-accent-primary hover:text-white transition-all shadow-sm"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-8 pb-6 border-b border-border-light">
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                  Displaying <span className="text-accent-primary">{filteredTools.length}</span> tools
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                     <span className="text-[9px] font-black text-text-muted uppercase">Free Tool</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                     <span className="text-[9px] font-black text-text-muted uppercase">Premium Tool</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTools.length > 0 ? filteredTools.map(tool => (
              <Link 
                to={tool.status === 'live' ? `/tools/${tool.id}` : '#'} 
                key={tool.id} 
                className={`relative bg-bg-surface border border-border-light rounded-[40px] p-1 overflow-hidden group hover:border-accent-primary transition-all duration-500 shadow-xl hover:shadow-2xl hover:translate-y-[-4px] ${tool.status !== 'live' ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}
              >
                <div className="bg-bg-primary m-[1px] rounded-[39px] p-8 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent -translate-y-full group-hover:animate-[scan_3s_linear_infinite]"></div>
                  
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex flex-col gap-1">
                      <div className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${tool.isFree ? 'text-emerald-500' : 'text-accent-primary'}`}>
                        <Activity size={12} className={tool.status === 'live' ? 'animate-pulse' : ''} /> 
                        Status: {tool.status === 'live' ? 'Ready' : 'Coming Soon'}
                      </div>
                      <h3 className="text-3xl font-black text-text-primary tracking-tight group-hover:text-accent-primary transition-colors">{tool.name}</h3>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-inner border border-border-light transition-all duration-500 group-hover:scale-110 ${tool.isFree ? 'text-emerald-500 bg-emerald-500/5' : 'text-accent-primary bg-accent-primary/5'}`}>
                      {tool.icon}
                    </div>
                  </div>

                  <p className="text-xs font-bold text-text-muted mb-8 font-fira uppercase tracking-tight line-clamp-1">{tool.tagline}</p>

                  <div className="grid grid-cols-2 gap-4 mb-8 font-fira text-text-primary">
                    <div className="bg-bg-surface p-4 rounded-2xl border border-border-light group-hover:border-accent-primary/20 transition-colors">
                      <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase mb-2"><Cpu size={10} /> Model</div>
                      <div className="text-[11px] font-bold truncate">{tool.model || 'Zero-Cost Logic'}</div>
                    </div>
                    <div className="bg-bg-surface p-4 rounded-2xl border border-border-light group-hover:border-accent-primary/20 transition-colors">
                      <div className="flex items-center gap-2 text-[9px] font-black text-text-muted uppercase mb-2"><Layers size={10} /> Protocol</div>
                      <div className="text-[11px] font-bold truncate">{tool.protocol}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-12 flex-1">
                    <div className="relative group/pain border-l-4 border-red-500/20 pl-6 py-2 hover:border-red-500 transition-all duration-300">
                      <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1 flex items-center gap-2"><AlertTriangle size={10} /> The Problem</div>
                      <p className="text-[13px] text-text-secondary font-medium leading-relaxed italic">{tool.pain}</p>
                    </div>
                    
                    <div className="relative group/logic border-l-4 border-accent-primary/20 pl-6 py-2 hover:border-accent-primary transition-all duration-300">
                      <div className="text-[9px] font-black text-accent-primary uppercase tracking-widest mb-1 flex items-center gap-2"><ShieldCheck size={10} /> The Solution</div>
                      <p className="text-[13px] text-text-secondary font-medium leading-relaxed">{tool.logic}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-10 border-t border-border-light relative z-10">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-3xl font-black tracking-tighter ${tool.cost === 'FREE' ? 'text-emerald-500' : 'text-text-primary'}`}>{tool.cost}</span>
                        {tool.isFree && <Sparkles size={16} className="text-emerald-500 animate-pulse" />}
                      </div>
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Transaction Cost</span>
                    </div>
                    <button className={`font-black text-sm py-5 px-8 rounded-2xl flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group/btn shadow-xl ${tool.isFree ? 'bg-emerald-500 text-white hover:shadow-emerald-500/20' : 'bg-accent-primary text-white hover:shadow-accent-primary/30'}`}>
                      {tool.cost === 'FREE' ? 'Run Logic' : 'Deploy Engine'} <Zap size={18} className="group-hover:fill-current" />
                    </button>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-border-light rounded-[40px] bg-bg-surface/30">
                <Activity size={40} className="mx-auto text-text-muted mb-6 opacity-20" />
                <h3 className="text-xl font-black text-text-primary mb-2">No Instruments Matched.</h3>
                <p className="text-sm text-text-muted max-w-xs mx-auto">Try a different niche or clear your filters to explore the full arsenal.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); setAccessLevel('All'); }}
                  className="mt-8 text-xs font-black text-accent-primary uppercase tracking-widest underline decoration-accent-primary/20 underline-offset-8"
                >
                  Reset Terminal
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
      `}} />
    </div>
  );
};

export default Tools;