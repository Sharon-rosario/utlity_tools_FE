import { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Video, 
  Link2, 
  Zap, 
  FileText, 
  Globe, 
  Activity, 
  ShieldCheck,
  CheckCircle,
  Copy,
  Check,
  Smartphone,
  ChevronRight,
  Database
} from 'lucide-react';
import { processTool } from '../../../services/api';

const InstagramTranscript = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleProcess = async () => {
    if (!url) return;
    setIsProcessing(true);
    setTranscript(null);
    try {
      const result = await processTool('instagram-transcript', { url });
      setTranscript(result);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const seoContent = {
    blog: {
      title: "How to Turn Instagram Reels into Text for Better SEO",
      content: "Instagram Reels are a goldmine of information, but they are hard to search for. Our extractor turns any public Reel into clear text instantly. This makes it easy for you to repurpose your video content into blogs, social media posts, or search-friendly text without any manual typing."
    },
    faqs: [
      { question: "Does this work for private accounts?", answer: "No. For privacy reasons, we can only extract text from public Instagram posts." },
      { question: "How long does it take?", answer: "Most videos are converted to text in just a few seconds." }
    ]
  };

  return (
    <ToolPageLayout
      title="Reels Text Extractor"
      tagline="Get text from any Instagram Reel"
      description="Paste any public Instagram link to turn the video audio into clear, usable text."
      icon={<Video size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUT SECTION */}
          <div className="md:col-span-5 lg:col-span-5 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Database size={80} />
              </div>

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                    <Link2 size={12} className="text-accent-primary" /> Paste Reel Link
                  </label>
                  <div className="relative group/input">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 group-hover/input:opacity-40 transition duration-500"></div>
                    <input 
                      type="text" 
                      placeholder="https://www.instagram.com/reels/..."
                      className="relative w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all placeholder:text-text-muted/30 shadow-inner"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-bg-surface/50 rounded-2xl border border-border-light shadow-lg">
                    <div className="flex items-center gap-4">
                      <Globe size={16} className="text-accent-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Server Status</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-bg-surface/50 rounded-2xl border border-border-light shadow-lg">
                    <div className="flex items-center gap-4">
                      <Activity size={16} className="text-accent-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">Accuracy</span>
                    </div>
                    <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">High (AI-V2)</span>
                  </div>
                </div>

                <button 
                  onClick={handleProcess}
                  disabled={!url || isProcessing}
                  className="w-full py-5 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-accent-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-4 border-black/10 border-t-black rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={18} /> Get Text <ChevronRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-blue-500/5 border border-blue-500/20 flex items-start gap-6 shadow-xl">
              <ShieldCheck size={24} className="text-blue-500 shrink-0" />
              <p className="text-[10px] text-blue-500/80 font-bold uppercase leading-relaxed tracking-[0.1em]">
                Secure: Your links are processed privately and never stored after transcription.
              </p>
            </div>
          </div>

          {/* TRANSCRIPT PANEL */}
          <div className="md:col-span-7 lg:col-span-7 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-12 min-h-[500px] flex flex-col shadow-2xl relative overflow-hidden">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-primary/5 rounded-full blur-[100px] pointer-events-none" />
               
               <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-12 pb-6 border-b border-border-light flex-wrap gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-widest">Resulting Text</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                          {isProcessing ? 'Status: Extracting...' : 'Status: Ready'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {transcript && (
                    <button onClick={handleCopy} className="p-4 rounded-2xl bg-bg-surface border border-border-strong text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all shadow-lg">
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  {isProcessing ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-500">
                      <div className="relative">
                        <div className="w-24 h-24 border-4 border-accent-primary/10 border-t-accent-primary rounded-full animate-spin shadow-[0_0_40px_rgba(99,102,241,0.2)]" />
                        <Zap size={32} className="absolute inset-0 m-auto text-accent-primary animate-pulse" />
                      </div>
                      <div className="text-center space-y-3">
                        <p className="text-xs font-black text-white uppercase tracking-[0.3em]">Connecting to Instagram</p>
                        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Analyzing audio content...</p>
                      </div>
                    </div>
                  ) : transcript ? (
                    <div className="space-y-10 animate-in slide-in-from-top-4 duration-1000 flex flex-col flex-1">
                      <div className="flex-1 bg-bg-surface/30 border border-border-light/50 rounded-[32px] p-8 md:p-10 text-lg md:text-xl text-text-secondary leading-relaxed font-medium h-80 overflow-y-auto scrollbar-hide shadow-inner">
                        {transcript}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl shadow-lg">
                          <CheckCircle size={20} className="text-emerald-500" />
                          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Text Verified</span>
                        </div>
                        <div className="flex items-center gap-4 p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl shadow-lg">
                          <Smartphone size={20} className="text-accent-primary" />
                          <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">Ready to Copy</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 opacity-10 italic py-20 text-center">
                      <Video size={48} />
                      <span className="text-xs font-black uppercase tracking-[0.3em]">Enter a link above to start</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default InstagramTranscript;
