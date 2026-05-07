import React, { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Zap, 
  Smartphone, 
  Copy, 
  Check, 
  RefreshCw,
  Sparkles,
  Search,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Video,
  MessageCircle,
  Briefcase
} from 'lucide-react';

const HookGenerator = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'reels' | 'x' | 'linkedin'>('youtube');
  const [tone, setTone] = useState<'educational' | 'controversial' | 'storytelling' | 'benefit'>('educational');
  const [results, setResults] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const hookTemplates = {
    youtube: {
      educational: [
        "Why [TOPIC] is actually easier than you think...",
        "The secret to mastering [TOPIC] in 5 minutes.",
        "Stop doing [TOPIC] the wrong way. Do this instead."
      ],
      controversial: [
        "[TOPIC] is dead. Here's what's replacing it.",
        "Everything you've heard about [TOPIC] is a lie.",
        "I tried [TOPIC] so you don't have to (it failed)."
      ],
      storytelling: [
        "How I went from 0 to 100 with [TOPIC]...",
        "The moment I realized [TOPIC] was a game changer.",
        "I almost quit [TOPIC], until this happened."
      ],
      benefit: [
        "The only 3 things you need for [TOPIC].",
        "Save 10 hours a week with this [TOPIC] hack.",
        "How to double your results with [TOPIC] today."
      ]
    },
    reels: {
      educational: [
        "Steal my [TOPIC] strategy for 2026.",
        "Quick hack for [TOPIC] you didn't know.",
        "3 tools for [TOPIC] that feel illegal to know."
      ],
      controversial: [
        "Unpopular opinion: [TOPIC] is overrated.",
        "Don't start [TOPIC] until you see this.",
        "Why most people fail at [TOPIC]."
      ],
      storytelling: [
        "Watch me build [TOPIC] in 30 seconds.",
        "This [TOPIC] mistake cost me $1000.",
        "Day 1 of [TOPIC] - here's the result."
      ],
      benefit: [
        "Get better at [TOPIC] with this one trick.",
        "Your [TOPIC] will never be the same after this.",
        "Instantly improve your [TOPIC] work."
      ]
    },
    x: {
      educational: [
        "Thread: How to master [TOPIC] in 10 simple steps. 🧵",
        "I've spent 1000 hours on [TOPIC]. Here's the 1% advice.",
        "[TOPIC] 101: A masterclass for beginners."
      ],
      controversial: [
        "Most people are wrong about [TOPIC]. Here's why.",
        "[TOPIC] is the biggest scam in the industry.",
        "If you still do [TOPIC], you're losing money."
      ],
      storytelling: [
        "My [TOPIC] journey started with a failure...",
        "What [TOPIC] taught me about life.",
        "From beginner to expert in [TOPIC]: My story."
      ],
      benefit: [
        "Want to fix your [TOPIC]? Read this.",
        "The [TOPIC] cheat sheet you've been waiting for.",
        "How to automate [TOPIC] for free."
      ]
    },
    linkedin: {
      educational: [
        "What I learned from leading a [TOPIC] team.",
        "5 industry insights about [TOPIC] for 2026.",
        "The future of [TOPIC] in the modern workspace."
      ],
      controversial: [
        "The uncomfortable truth about [TOPIC] in corporate.",
        "Why the traditional approach to [TOPIC] is broken.",
        "Stop hiring for [TOPIC]. Hire for this instead."
      ],
      storytelling: [
        "After 10 years in [TOPIC], I've realized one thing...",
        "My biggest [TOPIC] win started with a 'No'.",
        "How our company pivoted to [TOPIC] successfully."
      ],
      benefit: [
        "Improving your [TOPIC] output by 50% is simple.",
        "The executive guide to [TOPIC] efficiency.",
        "How to lead a [TOPIC] revolution in your team."
      ]
    }
  };

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    setTimeout(() => {
      const selectedHooks = hookTemplates[platform][tone];
      const customHooks = selectedHooks.map(hook => hook.replace(/\[TOPIC\]/g, topic));
      setResults(customHooks);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const seoContent = {
    blog: {
      title: "The Psychology of Viral Hooks: How to Stop the Scroll",
      content: "In 2026, you only have 3 seconds to capture attention. Whether it's a YouTube thumbnail, a Reel's first frame, or a LinkedIn headline, your 'hook' determines your reach. Using psychological triggers like curiosity, controversy, and clear benefits is the fastest way to grow your audience."
    },
    faqs: [
      { question: "What is a hook?", answer: "A hook is the opening line or visual that grabs a viewer's attention and makes them want to keep watching or reading." },
      { question: "Can these hooks be used for ads?", answer: "Absolutely. These templates are based on high-converting ad copy principles." }
    ]
  };

  return (
    <ToolPageLayout
      title="Viral Hook Generator"
      tagline="Write better video hooks"
      description="Get viral hooks and titles for your YouTube, Reels, and TikTok videos."
      icon={<Zap size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUT PANEL */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={64} />
              </div>

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Search size={12} className="text-accent-primary" /> Your Topic
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Content Marketing, Coding, Fitness"
                    className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all placeholder:text-text-muted/20"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Smartphone size={12} className="text-accent-primary" /> Select Platform
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'youtube', icon: <Video size={14} />, label: 'YouTube' },
                      { id: 'reels', icon: <Smartphone size={14} />, label: 'Reels/TikTok' },
                      { id: 'x', icon: <MessageCircle size={14} />, label: 'X (Twitter)' },
                      { id: 'linkedin', icon: <Briefcase size={14} />, label: 'LinkedIn' }
                    ].map(p => (
                      <button 
                        key={p.id}
                        onClick={() => setPlatform(p.id as any)}
                        className={`p-4 rounded-2xl flex items-center gap-3 border transition-all ${platform === p.id ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border-border-strong text-text-muted hover:text-white'}`}
                      >
                        {p.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <TrendingUp size={12} className="text-accent-primary" /> Select Tone
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['educational', 'controversial', 'storytelling', 'benefit'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setTone(t as any)}
                        className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${tone === t ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border-border-strong text-text-muted hover:text-white'}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={!topic || isGenerating}
                  className="w-full py-5 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-accent-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 group"
                >
                  {isGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Zap size={18} />}
                  {isGenerating ? 'Analyzing Trends...' : 'Generate Hooks'}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
              <ShieldCheck size={20} className="text-accent-primary shrink-0" />
              <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
                AI Powered: Our templates are updated monthly based on trending content architectures.
              </p>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-12 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-12 pb-6 border-b border-border-light">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Viral Hooks</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Status: {isGenerating ? 'Generating...' : results.length > 0 ? 'Ready' : 'Awaiting Topic'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                {isGenerating ? (
                  <div className="h-full flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
                    <div className="w-20 h-20 border-4 border-accent-primary/10 border-t-accent-primary rounded-full animate-spin" />
                    <span className="text-xs font-black text-white uppercase tracking-[0.3em]">Refining Attention Triggers</span>
                  </div>
                ) : results.length > 0 ? (
                  results.map((hook, idx) => (
                    <div key={idx} className="group/result relative p-8 bg-bg-surface border border-border-light rounded-[32px] hover:border-accent-primary transition-all animate-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 100}ms` }}>
                      <p className="text-xl md:text-2xl font-bold text-white leading-relaxed pr-16">{hook}</p>
                      <button 
                        onClick={() => handleCopy(hook, idx)}
                        className="absolute top-8 right-8 p-3 rounded-xl bg-bg-primary border border-border-strong text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all"
                      >
                        {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center gap-6 opacity-10 italic py-20 text-center grayscale">
                    <Zap size={64} className="animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-[0.4em]">Initialize Hook Kernel</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default HookGenerator;
