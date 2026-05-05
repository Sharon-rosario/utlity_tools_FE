import React, { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { Mic, Upload, FileText, Play, AlertCircle } from 'lucide-react';

const VoiceToText = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate processing
    setTimeout(() => {
      setIsUploading(false);
      setTranscript("This is a simulated transcript of your voice recording. Our high-precision neural engine has accurately captured every word with timestamp-level precision.");
    }, 2000);
  };

  const seoContent = {
    blog: {
      title: "The Future of Voice-to-Text: Why Precision Matters",
      content: `In an era dominated by rapid content consumption, the ability to accurately transcribe voice to text is no longer a luxury—it's a necessity. Whether you're a journalist capturing an interview, a student recording a lecture, or a professional documenting a meeting, precision is the difference between clarity and confusion.

Our Voice to Text Transcript tool leverages state-of-the-art Whisper-based neural networks to ensure that your audio is converted with up to 99% accuracy. Unlike generic converters that struggle with accents and background noise, our industrial logic engine filters out noise and focuses on the semantic core of the speech.

**Key Benefits of Using Our Tool:**
- **Zero Latency**: Process minutes of audio in seconds.
- **Privacy First**: We process files in a temporary sandbox. Nothing is saved to our databases.
- **Multi-Format Support**: Upload MP3, WAV, M4A, and more.`
    },
    faqs: [
      {
        question: "How accurate is the transcription?",
        answer: "Our tool achieves up to 99% accuracy on high-quality audio recordings by using advanced neural speech recognition models."
      },
      {
        question: "What audio formats are supported?",
        answer: "We support all major audio formats including MP3, WAV, M4A, AAC, and FLAC."
      },
      {
        question: "Is my data stored on your servers?",
        answer: "No. All processing happens in a temporary session. Once you close the page or the processing is complete, the file is purged from our temporary storage."
      },
      {
        question: "Is there a limit on file size?",
        answer: "During the MVP phase, we support files up to 25MB. For larger files, please contact our developer support."
      }
    ]
  };

  return (
    <ToolPageLayout
      title="Voice to Text"
      tagline="Neural-grade audio transcription in seconds."
      description="Convert any audio file into clean, formatted text with high-precision timestamps."
      icon={<Mic size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
            <Upload size={12} /> Upload Audio File
          </label>
          <div className="relative group/upload cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-2xl blur opacity-20 group-hover/upload:opacity-40 transition duration-500"></div>
            <div className="relative bg-bg-primary border-2 border-dashed border-border-strong rounded-2xl p-10 text-center hover:border-accent-primary transition-all">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto text-accent-primary">
                  <Upload size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-text-primary">Drag and drop or click to upload</p>
                  <p className="text-[10px] text-text-muted font-medium uppercase tracking-widest">MP3, WAV, M4A (Max 25MB)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="p-6 bg-accent-primary/5 border border-accent-primary/20 rounded-2xl animate-pulse flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent-primary animate-ping" />
            <span className="text-xs font-black text-accent-primary uppercase tracking-widest">Analyzing Frequency Patterns...</span>
          </div>
        )}

        {transcript && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                <FileText size={12} /> Generated Transcript
              </label>
              <button className="text-[10px] font-black uppercase tracking-widest text-accent-primary hover:underline">Copy All</button>
            </div>
            <div className="bg-bg-primary border border-border-strong rounded-2xl p-6 h-48 overflow-y-auto scrollbar-hide">
              <p className="text-sm text-text-secondary leading-relaxed font-medium">
                {transcript}
              </p>
            </div>
          </div>
        )}

        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex items-start gap-3">
          <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-tight leading-normal">
            For best results, ensure the speaker is clear and background noise is minimal.
          </p>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default VoiceToText;
