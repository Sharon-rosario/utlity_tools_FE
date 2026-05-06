import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Search, 
  FileText, 
  BarChart, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  BookOpen, 
  TrendingUp, 
  Settings,
  Target,
  LineChart as LineIcon
} from 'lucide-react';

const KeywordDensity = () => {
  const [text, setText] = useState('');
  const [stopWords, setStopWords] = useState('the,and,a,to,of,in,is,it,that,for,on,with,as,this,be,at,by,not,are,was,or,from');
  const [ngram, setNgram] = useState(1);

  const stats = useMemo(() => {
    if (!text.trim()) return { freq: [], readingEase: 0, wordCount: 0 };
    
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0);
    
    const wordCount = words.length;
    const stopWordsList = stopWords.split(',').map(w => w.trim().toLowerCase());
    
    // N-gram generation
    let ngrams: string[] = [];
    for (let i = 0; i <= words.length - ngram; i++) {
      ngrams.push(words.slice(i, i + ngram).join(' '));
    }

    const filteredNgrams = ngrams.filter(n => {
      const parts = n.split(' ');
      return parts.every(p => !stopWordsList.includes(p) && p.length > 2);
    });

    const freqMap: Record<string, number> = {};
    filteredNgrams.forEach(n => freqMap[n] = (freqMap[n] || 0) + 1);
    
    const freq = Object.entries(freqMap)
      .map(([phrase, count]) => ({
        phrase,
        count,
        density: (count / (wordCount - ngram + 1)) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Simplified Readability logic
    const sentences = text.split(/[.!?]+/).length || 1;
    const syllables = wordCount * 1.5; 
    const readingEase = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / Math.max(1, wordCount));

    return { freq, readingEase: Math.max(0, Math.min(100, readingEase)), wordCount };
  }, [text, stopWords, ngram]);

  const seoContent = {
    blog: {
      title: "How to Optimize Your Content for Better Google Rankings",
      content: "Keyword density is a crucial part of SEO. If you use a word too many times, search engines might penalize you for 'keyword stuffing.' If you use it too little, they might not know what your page is about. Our analyzer helps you find the perfect balance while also checking how easy your text is to read."
    },
    faqs: [
      { question: "What are word combinations?", answer: "These are groups of 2 or 3 words that appear together often, helping you track long-tail keywords." },
      { question: "What is a good readability score?", answer: "A score above 60 is generally considered good for a general audience, meaning the text is easy to read and understand." }
    ]
  };

  return (
    <ToolPageLayout
      title="SEO Keyword Analyzer"
      tagline="Check how often your keywords appear"
      description="Analyze your article for keyword stuffing and readability to rank better on Google."
      icon={<Search size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* CONTROL & INPUT */}
          <div className="md:col-span-7 lg:col-span-8 space-y-6">
            <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <FileText size={12} /> Your Article
                </label>
                <div className="flex items-center gap-4 bg-bg-surface p-1 rounded-xl border border-border-strong">
                  {[1, 2, 3].map(n => (
                    <button 
                      key={n} 
                      onClick={() => setNgram(n)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${ngram === n ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                    >
                      {n}-Word Group
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                className="w-full h-96 bg-bg-surface border border-border-strong rounded-2xl p-8 text-sm font-medium text-text-primary focus:border-accent-primary outline-none transition-all placeholder:text-text-muted/20 resize-none leading-relaxed shadow-inner"
                placeholder="Paste your article here to check keywords..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>

          {/* ANALYTICS SIDEBAR */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 space-y-8 shadow-xl">
              <div className="flex items-center gap-3">
                <Target size={16} className="text-accent-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-primary">SEO Score</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase text-text-muted">
                    <span>Readability Score</span>
                    <span className="text-accent-primary">{Math.round(stats.readingEase)}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-surface rounded-full overflow-hidden">
                    <div className="h-full bg-accent-primary transition-all duration-1000" style={{ width: `${stats.readingEase}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-bg-surface border border-border-strong rounded-2xl">
                    <div className="text-[8px] font-black text-text-muted uppercase mb-1">Word Count</div>
                    <div className="text-lg font-black text-text-primary">{stats.wordCount}</div>
                  </div>
                  <div className="p-4 bg-bg-surface border border-border-strong rounded-2xl">
                    <div className="text-[8px] font-black text-text-muted uppercase mb-1">Stuffing Risk</div>
                    <div className={`text-lg font-black ${stats.freq.some(f => f.density > 3) ? 'text-red-500' : 'text-emerald-500'}`}>
                      {stats.freq.some(f => f.density > 3) ? 'High' : 'Low'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-light">
                <h4 className="text-[9px] font-black text-text-muted uppercase mb-6 tracking-[0.2em]">Most Used Phrases</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto scrollbar-hide">
                  {stats.freq.map((item, i) => (
                    <div key={i} className="group cursor-default">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-text-secondary uppercase truncate pr-4">{item.phrase}</span>
                        <span className={`text-[10px] font-black ${item.density > 3 ? 'text-red-500' : 'text-accent-primary'}`}>{item.density.toFixed(1)}%</span>
                      </div>
                      <div className="h-1 w-full bg-bg-surface rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-1000 ${item.density > 3 ? 'bg-red-500' : 'bg-accent-primary'}`} style={{ width: `${Math.min(item.density * 20, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                  {stats.freq.length === 0 && <div className="text-center py-8 opacity-20 italic text-[10px]">Waiting for text...</div>}
                </div>
              </div>
            </div>

            <div className="p-6 bg-bg-primary border border-border-strong rounded-2xl space-y-4">
              <div className="flex items-center gap-2 text-text-primary">
                <Settings size={14} className="text-accent-primary" />
                <span className="text-[9px] font-black uppercase">Ignore Common Words</span>
              </div>
              <input 
                type="text" 
                value={stopWords}
                onChange={(e) => setStopWords(e.target.value)}
                className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-[10px] font-bold text-accent-primary outline-none focus:border-accent-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default KeywordDensity;
