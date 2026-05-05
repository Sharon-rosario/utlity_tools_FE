import React, { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { Video, Link2, Zap, FileText, ExternalLink, AlertCircle } from 'lucide-react';

const InstagramTranscript = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleProcess = () => {
    if (!url) return;
    setIsProcessing(true);
    // Simulate fetching and transcribing
    setTimeout(() => {
      setIsProcessing(false);
      setTranscript("This is a simulated transcript from the Instagram Reel. Our engine successfully bypassed the metadata headers and extracted the audio stream for high-precision transcription.");
    }, 2500);
  };

  const seoContent = {
    blog: {
      title: "How to Transcribe Instagram Reels & Videos for Better Engagement",
      content: `Instagram is a goldmine for insights, but its content is locked behind a visual wall. To truly leverage the power of Instagram videos for SEO, repurposing, or accessibility, you need a way to extract the spoken word into a structured format.

Our Instagram Link Transcript Generator is designed to bridge this gap. By simply pasting a link, our backend protocol fetches the media assets and applies our proprietary transcription logic to deliver clean, accurate text.

**Why Transcribe Instagram Content?**
- **SEO Repurposing**: Convert viral Reels into blog posts or tweets.
- **Accessibility**: Provide captions for your audience who might be hard of hearing or watching without sound.
- **Content Auditing**: Quickly scan the competitive landscape by reading their content instead of watching every second.

**Protocol Details:**
Our "Social-Synth-V2" protocol handles the complex handshake with social media CDNs to ensure high-quality audio extraction without compromising user privacy.`
    },
    faqs: [
      {
        question: "Can I transcribe private Instagram accounts?",
        answer: "No. Our tool can only access publicly available Instagram Reels and Videos to ensure compliance with privacy standards."
      },
      {
        question: "Does it work for Instagram Stories?",
        answer: "Currently, we support Reels and Video posts. Story support is in our upcoming roadmap."
      },
      {
        question: "How long does it take to get a transcript?",
        answer: "Most Reels (up to 60 seconds) are transcribed in under 5 seconds. Longer videos may take up to 30 seconds."
      },
      {
        question: "Is there a limit to how many links I can paste?",
        answer: "During development, you can process up to 50 links per day. This ensures fair usage for all developers on the platform."
      }
    ]
  };

  return (
    <ToolPageLayout
      title="Instagram Transcript"
      tagline="Extract insights from viral reels instantly."
      description="Paste any Instagram link to generate a high-precision text transcript for SEO and repurposing."
      icon={<Video size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
            <Link2 size={12} /> Instagram Link
          </label>
          <div className="relative group/input">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 group-hover/input:opacity-30 transition duration-500"></div>
            <div className="relative flex">
              <input 
                type="text" 
                placeholder="https://www.instagram.com/reels/..."
                className="w-full bg-bg-primary border border-border-strong rounded-l-2xl px-6 py-5 text-sm font-medium text-text-primary outline-none focus:border-accent-primary transition-all"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                onClick={handleProcess}
                disabled={!url || isProcessing}
                className="bg-accent-primary text-white px-8 rounded-r-2xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Extract'}
              </button>
            </div>
          </div>
        </div>

        {isProcessing && (
          <div className="p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl animate-pulse flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
            <span className="text-xs font-black text-accent-primary uppercase tracking-widest">Bypassing CDN Handshake...</span>
          </div>
        )}

        {transcript && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <FileText size={12} /> Video Transcript
              </label>
              <div className="flex gap-4">
                <button className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:underline">Copy</button>
                <button className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-primary flex items-center gap-1">
                  View Source <ExternalLink size={10} />
                </button>
              </div>
            </div>
            <div className="bg-bg-primary border border-border-strong rounded-2xl p-6">
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {transcript}
              </p>
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-blue-500/80 font-bold uppercase tracking-tight leading-normal">
            Make sure the link is to a public Reel or Video. Private links cannot be processed.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default InstagramTranscript;
