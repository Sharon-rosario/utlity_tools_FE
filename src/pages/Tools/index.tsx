import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Zap, 
  Layers,
  ChevronRight,
  Briefcase,
  Activity,
  Cpu,
  ShieldCheck,
  Sparkles,
  Smartphone,
  DollarSign,
  BookOpen,
  Search,
  LayoutGrid,
  Command,
  ArrowRight,
  X
} from 'lucide-react';
import { toolsData } from './toolsData';
import type { Category, AccessLevel, ToolStatus } from './toolsData';

const Tools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [statusFilter, setStatusFilter] = useState<ToolStatus>('All');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('All');
  const [sortBy, setSortBy] = useState<'caliber' | 'trending' | 'usage'>('caliber');

  const filteredTools = useMemo(() => {
    let result = toolsData.filter((tool) => {
      if (statusFilter === 'Active' && tool.status !== 'Active') return false;
      if (statusFilter === 'Coming Soon' && tool.status !== 'Coming Soon') return false;
      if (activeCategory !== 'All' && tool.category !== activeCategory) return false;
      if (accessLevel === 'Paid' && tool.isFree) return false;
      if (accessLevel === 'Free' && !tool.isFree) return false;

      const query = searchQuery.toLowerCase().trim();
      if (query && !(
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query) ||
        tool.keywords.some(kw => kw.toLowerCase().includes(query))
      )) return false;

      return true;
    });

    return [...result].sort((a, b) => {
      if (sortBy === 'trending' || sortBy === 'usage') {
        return (b.usageCount || 0) - (a.usageCount || 0);
      }
      if (a.isFree === b.isFree) return (b.usageCount || 0) - (a.usageCount || 0);
      return a.isFree ? 1 : -1;
    });
  }, [searchQuery, activeCategory, statusFilter, accessLevel, sortBy]);

  const hasFilters = searchQuery !== '' || activeCategory !== 'All' || statusFilter !== 'All' || accessLevel !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setStatusFilter('All');
    setAccessLevel('All');
  };

  const CATEGORIES: { name: Category; icon: React.ReactNode }[] = [
    { name: 'All', icon: <Layers size={14} /> },
    { name: 'Business', icon: <Briefcase size={14} /> },
    { name: 'Social', icon: <Smartphone size={14} /> },
    { name: 'Finance', icon: <DollarSign size={14} /> },
    { name: 'Education', icon: <BookOpen size={14} /> },
    { name: 'Engineering', icon: <Cpu size={14} /> },
    { name: 'Marketing', icon: <TrendingUp size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-accent-primary selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-secondary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-20">
        {/* Header System */}
        <header className="mb-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <Command size={14} className="text-accent-primary" /> Utility Workspace
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gradient leading-[0.85]">
                Digital <br /> Workstation
              </h1>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-6 py-4 rounded-[28px] bg-bg-surface border border-border-light flex items-center gap-4 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <span className="text-[9px] font-black uppercase text-text-muted block tracking-widest">System Status</span>
                  <span className="text-sm font-bold text-white uppercase">Online</span>
                </div>
              </div>
              <div className="px-6 py-4 rounded-[28px] bg-bg-surface border border-border-light flex items-center gap-4 shadow-2xl">
                <Activity size={18} className="text-accent-primary" />
                <div>
                  <span className="text-[9px] font-black uppercase text-text-muted block tracking-widest">Speed</span>
                  <span className="text-sm font-bold text-white uppercase">Lightning Fast</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Kernel */}
          <div className="relative group max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-[32px] blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-bg-surface border border-border-strong rounded-[28px] shadow-2xl overflow-hidden">
              <div className="absolute left-8 text-text-muted">
                <Search size={24} className="group-hover:text-accent-primary transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Search tools..."
                className="w-full pl-20 pr-8 py-8 bg-transparent text-white text-2xl font-bold outline-none placeholder:text-text-muted/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="hidden md:flex items-center gap-4 pr-8">
                <kbd className="px-3 py-1.5 rounded-lg bg-bg-primary border border-border-light text-[10px] font-black text-text-muted tracking-widest uppercase">ALT + K</kbd>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Sidebar Navigation */}
          <aside className="md:col-span-4 lg:col-span-3 space-y-12">
            <div className="space-y-8 sticky top-32">
              <div className="bg-bg-surface border border-border-light rounded-2xl overflow-hidden shadow-xl">
                <div className="px-6 py-4 bg-white/5 border-b border-border-light flex items-center justify-between">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em]">Total Tools</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-black text-accent-primary">{filteredTools.length}</span>
                    {hasFilters && (
                      <button 
                        onClick={clearFilters} 
                        className="text-text-muted hover:text-red-500 transition-colors bg-white/5 p-1.5 rounded-lg" 
                        title="Clear Filters"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <section className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted flex items-center gap-3">
                  <LayoutGrid size={14} className="text-accent-primary" /> Categories
                </h3>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat.name}
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full text-left px-6 py-4 rounded-2xl flex items-center justify-between transition-all group border-2 ${activeCategory === cat.name ? 'bg-accent-primary text-white border-accent-primary shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border-border-light text-text-secondary hover:border-accent-primary/30'}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={activeCategory === cat.name ? 'text-white' : 'text-text-muted group-hover:text-accent-primary'}>{cat.icon}</span>
                        <span className="text-sm font-bold">{cat.name}</span>
                      </div>
                      <ChevronRight size={14} className={`transition-transform ${activeCategory === cat.name ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted flex items-center gap-3">
                  <Zap size={14} className="text-accent-primary" /> Status Filter
                </h3>
                <div className="p-2 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                  {(['All', 'Active', 'Coming Soon'] as ToolStatus[]).map(status => (
                    <button 
                      key={status} 
                      onClick={() => setStatusFilter(status)} 
                      className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all ${statusFilter === status ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                    >
                      {status === 'All' ? 'Full Arsenal' : status}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted flex items-center gap-3">
                  <ShieldCheck size={14} className="text-accent-primary" /> Access Level
                </h3>
                <div className="p-2 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                  {(['All', 'Free', 'Paid'] as AccessLevel[]).map(level => (
                    <button 
                      key={level} 
                      onClick={() => setAccessLevel(level)} 
                      className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all ${accessLevel === level ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                    >
                      {level} Access
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-muted flex items-center gap-3">
                  <TrendingUp size={14} className="text-accent-primary" /> Sort By
                </h3>
                <div className="p-2 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                  {[
                    { id: 'caliber', label: 'Top Rated' },
                    { id: 'trending', label: 'Trending' },
                    { id: 'usage', label: 'Most Popular' }
                  ].map(option => (
                    <button 
                      key={option.id} 
                      onClick={() => setSortBy(option.id as any)} 
                      className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-left transition-all ${sortBy === option.id ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white hover:bg-white/5'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const ToolCard = ({ tool }: { tool: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Use a timeout for the hover to avoid flickering during fast mouse movements
  const hoverTimeout = React.useRef<any>(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 300); // 300ms delay like Netflix
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  return (
    <div 
      className={`relative w-full aspect-[4/3] md:aspect-auto md:h-[320px] transition-all duration-300 ${isHovered ? 'z-50' : 'z-10'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Card - Always strictly bounded by grid */}
      <div className={`absolute inset-0 glass-card p-6 flex flex-col bg-bg-surface/30 border-white/5 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <div className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${tool.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
              <Activity size={10} /> {tool.status}
            </div>
            <h3 className="text-xl font-black tracking-tight text-white">{tool.name}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-primary border border-white/10 shrink-0">
            {tool.icon}
          </div>
        </div>
        
        <div className="mb-4 flex-1">
          <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest mb-2">{tool.tagline}</div>
          <p className="text-xs text-text-secondary font-medium leading-relaxed line-clamp-3" title={tool.description}>{tool.description}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
          <span className="text-xl font-black tracking-tighter text-white">{tool.cost}</span>
          <div className="p-2 rounded-lg bg-white/5 text-text-muted group-hover:bg-accent-primary group-hover:text-white transition-colors">
            <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* Expanded Hover Overlay - Netflix Style */}
      <div 
        className={`absolute z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center ${isHovered ? 'opacity-100 scale-[1.15] pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ 
          width: '100%',
          top: isHovered ? '-20px' : '0',
          left: '0',
          filter: isHovered ? 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))' : 'none',
        }}
      >
        <Link 
          to={tool.status === 'Active' ? `/tools/${tool.id}` : '#'} 
          className={`block bg-[#050505] rounded-[40px] border border-accent-primary/50 shadow-2xl overflow-hidden cursor-pointer ${tool.status !== 'Active' ? 'grayscale' : ''}`}
        >
          {/* Top visual area */}
          <div className="p-8 bg-gradient-to-b from-accent-primary/10 to-transparent relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-50" />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="space-y-2">
                <div className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 ${tool.status === 'Active' ? 'text-emerald-500' : 'text-amber-500'}`}>
                  <Activity size={10} className={tool.status === 'Active' ? 'animate-pulse' : ''} /> 
                  {tool.status}
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white leading-none">
                  {tool.name}
                </h3>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-bg-surface flex items-center justify-center text-accent-primary border border-border-strong shadow-inner">
                {tool.icon}
              </div>
            </div>

            <p className="text-xs font-bold text-accent-primary uppercase tracking-widest leading-relaxed">
              {tool.tagline}
            </p>
          </div>

          {/* Details area */}
          <div className="p-8 pt-0 space-y-6">
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-bg-surface border border-border-light relative overflow-hidden group">
                <div className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Activity size={12} /> The Pain
                </div>
                <p className="text-xs text-text-secondary font-medium leading-relaxed">
                  {tool.pain}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-bg-surface border border-border-light relative overflow-hidden group">
                <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Sparkles size={12} /> The Solution
                </div>
                <p className="text-xs text-text-secondary font-medium leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                <div className="text-[8px] font-black uppercase text-text-muted tracking-widest flex items-center gap-1">
                  <ShieldCheck size={10} className="text-emerald-500" /> Cost
                </div>
                <div className="text-[10px] font-black text-white">{tool.cost}</div>
              </div>
              <div className="p-3 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                <div className="text-[8px] font-black uppercase text-text-muted tracking-widest flex items-center gap-1">
                  <Zap size={10} className="text-accent-primary" /> Speed
                </div>
                <div className="text-[10px] font-black text-white">{tool.latency}</div>
              </div>
              <div className="p-3 rounded-2xl bg-bg-surface border border-border-light flex flex-col gap-1">
                <div className="text-[8px] font-black uppercase text-text-muted tracking-widest flex items-center gap-1">
                  <TrendingUp size={10} className="text-emerald-500" /> Benefit
                </div>
                <div className="text-[10px] font-black text-white">{tool.savings}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-border-strong">
              <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest flex items-center gap-2">
                <LayoutGrid size={12} /> Category: {tool.category}
              </div>
              
              {tool.status === 'Active' ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all bg-accent-primary text-white hover:scale-105 shadow-lg shadow-accent-primary/20">
                  Open Tool
                  <ArrowRight size={14} className="animate-pulse" />
                </div>
              ) : (
                <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                  In Development
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Tools;
