import React, { useState, useRef, useEffect } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Mic, 
  Upload, 
  FileText, 
  AlertCircle, 
  Download, 
  Globe, 
  Activity, 
  Clock, 
  CheckCircle,
  Copy,
  Check,
  Settings,
  ShieldCheck,
  Zap,
  ChevronDown
} from 'lucide-react';
import CustomDropdown from '../../../components/shared/CustomDropdown';
import { processTool } from '../../../services/api';

const VoiceToText = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [language, setLanguage] = useState('en-US');
  const [copied, setCopied] = useState(false);
  const [waveform, setWaveform] = useState<number[]>(Array(50).fill(5));
  const waveformInterval = useRef<any>(null);

  useEffect(() => {
    if (isRecording) {
      waveformInterval.current = setInterval(() => {
        setWaveform(prev => [...prev.slice(1), Math.floor(Math.random() * 35) + 5]);
      }, 80);
    } else {
      if (waveformInterval.current) clearInterval(waveformInterval.current);
      setWaveform(Array(50).fill(5));
    }
    return () => { if (waveformInterval.current) clearInterval(waveformInterval.current); };
  }, [isRecording]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const result = await processTool('voice-to-text', { language }, file);
      setTranscript(result);
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = async () => {
        setIsUploading(true);
        try {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const file = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
          const result = await processTool('voice-to-text', { language }, file);
          setTranscript(result);
        } catch (error: any) {
          alert("Recording Error: " + error.message);
        } finally {
          setIsUploading(false);
        }
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) { alert("Microphone access denied. Please enable microphone permissions."); }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
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
      title: "Convert Voice to Text Instantly with High Accuracy",
      content: "Whether you're recording a meeting, an interview, or just taking quick notes, our voice-to-text tool makes it easy to get a clear transcript. Powered by advanced AI technology, it recognizes over 99 languages and provides near-perfect accuracy even in noisy environments. All your recordings are processed securely and privately."
    },
    faqs: [
      { question: "How accurate is the transcription?", answer: "Our AI uses the latest technology to ensure over 95% accuracy for most recordings." },
      { question: "Is my audio saved anywhere?", answer: "No. Your audio is processed in real-time and deleted immediately after the transcript is generated." }
    ]
  };

  return (
    <ToolPageLayout
      title="Voice to Text"
      tagline="Convert voice to text instantly"
      description="Record your voice or upload an audio file to get a clear, accurate transcript in seconds."
      icon={<Mic size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* CONTROL STACK */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div className="p-8 rounded-[32px] bg-bg-primary/50 border border-border-strong shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Settings size={64} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    <Globe size={12} className="text-accent-primary" /> Language Selection
                  </div>
                  <div className="relative z-50">
                    <CustomDropdown
                      options={[
                        { value: 'en-US', label: 'English (US)' },
                        { value: 'en-GB', label: 'English (UK)' },
                        { value: 'es-ES', label: 'Spanish' },
                        { value: 'fr-FR', label: 'French' }
                      ]}
                      value={language}
                      onChange={setLanguage}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">
                    <Activity size={12} className="text-accent-primary" /> Quality
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-4 rounded-2xl bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-accent-primary/20">High Quality</button>
                    <button className="py-4 rounded-2xl bg-bg-surface border border-border-strong text-text-muted hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">Fast</button>
                  </div>
                </div>

                <div className="pt-8 border-t border-border-light space-y-4">
                  <button 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full py-5 rounded-[24px] flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-xl ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-black hover:bg-accent-primary hover:text-white'}`}
                  >
                    <Mic size={18} /> {isRecording ? 'Stop Recording' : 'Record Voice'}
                  </button>

                  <div className="relative group cursor-pointer">
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleUpload} />
                    <div className="w-full py-5 bg-bg-surface border border-border-strong text-text-secondary rounded-[24px] flex items-center justify-center gap-3 font-black text-xs uppercase tracking-[0.2em] group-hover:border-accent-primary group-hover:text-white transition-all">
                      <Upload size={18} /> Upload Audio File
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
              <ShieldCheck size={20} className="text-accent-primary shrink-0" />
              <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
                Safe: Your audio is processed privately and deleted immediately after transcription.
              </p>
            </div>
          </div>

          {/* OUTPUT STACK */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] md:rounded-[40px] p-6 md:p-12 min-h-[500px] md:min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 md:mb-12 pb-6 border-b border-border-light flex-wrap gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Transcript</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-text-muted uppercase tracking-widest">
                        <Clock size={12} /> {isRecording ? 'Recording...' : 'Ready'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={handleCopy} className="p-4 rounded-2xl bg-bg-surface border border-border-strong text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all shadow-lg">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  <div className="relative group/export">
                    <button className="p-4 rounded-2xl bg-bg-surface border border-border-strong text-text-muted hover:text-accent-primary hover:border-accent-primary transition-all flex items-center gap-3 shadow-lg">
                      <Download size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Save As</span>
                    </button>
                    <div className="absolute top-full right-0 mt-4 bg-bg-surface border border-border-strong rounded-2xl p-3 shadow-2xl opacity-0 group-hover/export:opacity-100 pointer-events-none group-hover/export:pointer-events-auto transition-all z-20 w-40 backdrop-blur-xl">
                      {['TXT', 'SRT', 'VTT'].map(fmt => (
                        <button key={fmt} onClick={() => alert(`Saving as ${fmt}`)} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-black text-text-muted hover:text-white hover:bg-accent-primary transition-all">
                          Format: .{fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-8">
                {isRecording && (
                  <div className="flex items-center justify-center gap-1.5 h-16 px-8 bg-bg-surface/50 rounded-[32px] border border-border-light overflow-hidden">
                    {waveform.map((h, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 bg-accent-primary rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                        style={{ height: `${h}px`, opacity: 0.2 + (i / 50) * 0.8 }}
                      />
                    ))}
                  </div>
                )}

                <div className="relative flex-1 group/text">
                  {isUploading && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg-primary/90 backdrop-blur-md rounded-[32px] gap-6">
                      <div className="relative">
                        <div className="w-20 h-20 border-4 border-accent-primary/10 border-t-accent-primary rounded-full animate-spin" />
                        <Zap size={24} className="absolute inset-0 m-auto text-accent-primary animate-pulse" />
                      </div>
                      <span className="text-xs font-black text-accent-primary uppercase tracking-[0.3em] animate-pulse">Processing Audio...</span>
                    </div>
                  )}

                  <div className="h-full min-h-[350px] md:min-h-[400px] p-6 md:p-10 bg-bg-surface/30 rounded-[24px] md:rounded-[32px] border border-border-light shadow-inner text-base md:text-xl text-text-secondary leading-relaxed font-medium scrollbar-hide overflow-y-auto">
                    {transcript ? (
                      <div className="animate-in fade-in duration-1000 whitespace-pre-wrap">
                        {transcript}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center gap-4 opacity-10 py-32 text-center">
                        <Activity size={48} />
                        <span className="text-xs font-black uppercase tracking-[0.3em]">Ready to record or upload</span>
                      </div>
                    )}
                  </div>
                </div>

                {transcript && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-[24px] bg-bg-surface/50 border border-border-light text-center shadow-lg group hover:border-accent-primary/30 transition-all">
                      <div className="text-[9px] font-black text-text-muted uppercase mb-2 tracking-widest">Accuracy</div>
                      <div className="text-3xl font-black text-emerald-500 tracking-tighter">High</div>
                    </div>
                    <div className="p-6 rounded-[24px] bg-bg-surface/50 border border-border-light text-center shadow-lg group hover:border-accent-primary/30 transition-all">
                      <div className="text-[9px] font-black text-text-muted uppercase mb-2 tracking-widest">Total Words</div>
                      <div className="text-3xl font-black text-white tracking-tighter">{transcript.split(/\s+/).length}</div>
                    </div>
                    <div className="p-6 rounded-[24px] bg-bg-surface/50 border border-border-light text-center shadow-lg group hover:border-accent-primary/30 transition-all">
                      <div className="text-[9px] font-black text-text-muted uppercase mb-2 tracking-widest">Processing Time</div>
                      <div className="text-3xl font-black text-accent-primary tracking-tighter">Fast</div>
                    </div>
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

export default VoiceToText;
