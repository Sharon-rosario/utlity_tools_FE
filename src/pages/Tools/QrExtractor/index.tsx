import React, { useState, useRef } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Scan, 
  Upload, 
  Link2, 
  Camera, 
  ExternalLink, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle,
  Copy,
  Check,
  Zap,
  Search
} from 'lucide-react';
import jsQR from 'jsqr';

const QrExtractor = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'paste'>('upload');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const requestRef = useRef<number>(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          decodeImage(img);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (context) {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setResult(code.data);
        setError(null);
      } else {
        setError('No QR code found in this image.');
        setResult(null);
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        setIsScanning(true);
        requestRef.current = requestAnimationFrame(scanFrame);
      }
    } catch (err) {
      setError('Could not access your camera.');
    }
  };

  const stopCamera = () => {
    setIsScanning(false);
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const scanFrame = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.height = videoRef.current.videoHeight;
        canvas.width = videoRef.current.videoWidth;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          setResult(code.data);
          setError(null);
          stopCamera();
          return;
        }
      }
    }
    if (isScanning) {
      requestRef.current = requestAnimationFrame(scanFrame);
    }
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => decodeImage(img);
            img.src = event.target?.result as string;
          };
          reader.readAsDataURL(blob);
        }
      }
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const seoContent = {
    blog: {
      title: "How to Scan QR Codes on Your Computer Without a Phone",
      content: "Sometimes you have a QR code as a screenshot or an image file on your computer. Our reader makes it easy to see what's inside without needing to pull out your phone. Just upload the image, paste it directly, or use your laptop's webcam. It works instantly and safely right in your browser."
    },
    faqs: [
      { question: "Is it safe to scan my QR codes here?", answer: "Yes. All the scanning happens inside your browser on your computer. We never send your images or the scanned data to any server." },
      { question: "What if the code is blurry?", answer: "Our smart reader uses advanced technology to try and fix blurry or damaged QR codes automatically." }
    ]
  };

  return (
    <ToolPageLayout
      title="QR Code Reader"
      tagline="Read any QR code instantly"
      description="Upload an image, use your camera, or paste a screenshot to see what's inside a QR code."
      icon={<Scan size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* INGESTION PANEL */}
        <div className="md:col-span-5 lg:col-span-4 space-y-6">
          <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 p-1 rounded-2xl bg-bg-surface border border-border-light">
              {(['upload', 'camera', 'paste'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (tab !== 'camera') stopCamera();
                    setError(null);
                  }}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-border-light rounded-[24px] bg-bg-surface/30 p-8 text-center group hover:border-accent-primary/50 transition-all">
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <Upload size={48} className="mx-auto text-text-muted group-hover:text-accent-primary transition-colors" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Upload Image</p>
                    <p className="text-[10px] text-text-muted font-bold uppercase mt-1">Select a QR code from your computer</p>
                  </div>
                  <input type="file" className="hidden" id="qr-upload" accept="image/*" onChange={handleFileUpload} />
                  <label htmlFor="qr-upload" className="inline-block px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest cursor-pointer hover:bg-accent-primary hover:text-white transition-all">
                    Browse Files
                  </label>
                </div>
              )}

              {activeTab === 'camera' && (
                <div className="w-full space-y-4">
                  {!isScanning ? (
                    <div className="space-y-4">
                      <Camera size={48} className="mx-auto text-text-muted group-hover:text-accent-primary transition-colors" />
                      <button onClick={startCamera} className="px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all">
                        Start Camera
                      </button>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent-primary/30">
                      <video ref={videoRef} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 border-2 border-accent-primary animate-pulse pointer-events-none opacity-50 m-12 rounded-2xl"></div>
                      <button onClick={stopCamera} className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                        Stop Camera
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'paste' && (
                <div className="space-y-4 w-full">
                  <Search size={48} className="mx-auto text-text-muted group-hover:text-accent-primary transition-colors" />
                  <div onPaste={handlePaste} className="w-full">
                    <p className="text-sm font-bold text-white uppercase tracking-widest">Paste Image</p>
                    <p className="text-[10px] text-text-muted font-bold uppercase mt-1">Click here and press CTRL+V</p>
                    <div className="mt-6 p-4 bg-bg-primary/50 border border-border-strong rounded-xl text-[9px] font-black text-accent-primary uppercase tracking-[0.2em] animate-pulse">
                      Waiting for image...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                <AlertCircle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{error}</span>
              </div>
            )}
          </div>

          <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
            <ShieldCheck size={20} className="text-accent-primary shrink-0" />
            <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
              Private: Your camera and images never leave your device.
            </p>
          </div>
        </div>

        {/* EXTRACTION RESULT */}
        <div className="md:col-span-7 lg:col-span-8 space-y-8">
          <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] md:rounded-[40px] p-6 md:p-12 min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-light">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                  <Link2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-widest">Result</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${result ? 'text-emerald-500' : 'text-text-muted'}`}>
                      {result ? 'Success' : 'Ready to scan'}
                    </span>
                  </div>
                </div>
              </div>

              {result && (
                <div className="flex items-center gap-2">
                  <button onClick={handleCopy} className="p-3 rounded-xl bg-bg-surface border border-border-strong text-text-muted hover:text-accent-primary transition-all">
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                  {result.startsWith('http') && (
                    <a href={result} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-accent-primary text-white shadow-lg shadow-accent-primary/20">
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {result ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-8 bg-bg-surface/50 border border-border-light rounded-[32px] shadow-inner text-xl md:text-2xl font-mono font-bold text-white break-all leading-relaxed">
                    {result}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-bg-surface/30 border border-border-light text-center">
                      <div className="text-[8px] font-black text-text-muted uppercase mb-1">Type</div>
                      <div className="text-[10px] font-black text-white uppercase tracking-widest">
                        {result.startsWith('http') ? 'LINK' : 'TEXT'}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-bg-surface/30 border border-border-light text-center">
                      <div className="text-[8px] font-black text-text-muted uppercase mb-1">Status</div>
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center justify-center gap-1">
                        <CheckCircle size={10} /> SCANNED
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-6 opacity-10 py-20 grayscale">
                  <Zap size={64} className="animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">Ready to scan</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default QrExtractor;
