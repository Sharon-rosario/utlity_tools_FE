import { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { Sparkles, Code, Copy, Check, Palette, Layers } from 'lucide-react';

const Control = ({ label, value, onChange, min, max, icon: Icon, unit = 'px' }: any) => (
  <div className="space-y-6 p-6 bg-bg-surface border border-border-strong rounded-3xl shadow-lg group hover:border-accent-primary/30 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
          <Icon size={14} />
        </div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{label}</label>
      </div>
      <div className="flex items-center gap-1 bg-bg-primary/30 px-3 py-1.5 rounded-xl border border-border-light focus-within:border-accent-primary/50 transition-all">
        <input 
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          className="bg-transparent text-sm font-black text-white outline-none w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="text-[10px] font-black text-text-muted ml-1 uppercase">{unit}</span>
      </div>
    </div>
    <div className="relative pt-2">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-6 bg-transparent rounded-full appearance-none cursor-grab active:cursor-grabbing relative z-20"
      />
    </div>
  </div>
);

const GlassmorphismGen = () => {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(20);
  const [color, setColor] = useState('#ffffff');
  const [saturation, setSaturation] = useState(100);
  const [copied, setCopied] = useState(false);

  const glassStyle = {
    background: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const cssCode = `background: rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity / 100});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border-radius: 24px;
border: 1px solid rgba(255, 255, 255, 0.1);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoContent = {
    blog: {
      title: "Design Modern Websites with the Frosted Glass Effect",
      content: "The 'Glassmorphism' style has taken the design world by storm, seen in modern operating systems and premium websites. It creates a beautiful, multi-layered look that makes your interface feel light and modern. Our designer helps you create this look in seconds without writing a single line of code manually."
    },
    faqs: [
      {
        question: "How do I use this code?",
        answer: "Simply adjust the sliders to get the look you want, then click 'Copy Code' and paste it into your website's CSS file."
      },
      {
        question: "What is vividness?",
        answer: "Vividness (saturation) makes the background colors 'pop' more through the glass, making the effect look much richer."
      }
    ]
  };

  return (
    <ToolPageLayout
      title="Glass Effect Designer"
      tagline="Create a beautiful frosted glass look"
      description="Design modern 'glass' elements for your website and get the code instantly."
      icon={<Sparkles size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Palette size={12} /> Glass Color
                </label>
                <div className="flex items-center gap-3 bg-bg-primary border border-border-strong rounded-2xl p-2">
                  <input 
                    type="color" 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer border-none bg-transparent"
                  />
                  <span className="text-[11px] font-bold text-text-secondary uppercase">{color}</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Layers size={12} /> Opacity (%)
                </label>
                <div className="bg-bg-primary border border-border-strong rounded-2xl p-3 px-4">
                  <input 
                    type="number" 
                    value={opacity} 
                    onChange={(e) => setOpacity(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full bg-transparent text-sm font-bold text-accent-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>
            </div>

            <Control label="Blur Intensity" value={blur} onChange={setBlur} min={0} max={40} icon={Sparkles} unit="px" />
            <Control label="Color Vividness" value={saturation} onChange={setSaturation} min={0} max={200} icon={Palette} unit="%" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                  <Code size={12} /> Ready-to-use Code
                </label>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-[9px] font-black uppercase text-accent-primary hover:underline"
                >
                  {copied ? <Check size={10} /> : <Copy size={10} />}
                  {copied ? 'Copied' : 'Copy Code'}
                </button>
              </div>
              <div className="bg-bg-primary border border-border-strong rounded-[24px] p-6 text-[11px] font-mono text-text-secondary overflow-x-auto whitespace-pre shadow-inner">
                <code>{cssCode}</code>
              </div>
            </div>
          </div>

          <div className="relative rounded-[48px] overflow-hidden min-h-[400px] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div 
              style={glassStyle}
              className="w-3/4 p-10 shadow-2xl border border-white/20 animate-in zoom-in duration-700"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 mb-6 shadow-lg" />
              <h4 className="text-xl font-black text-white mb-2">Live Preview</h4>
              <p className="text-white/70 text-xs leading-relaxed font-medium">
                This is how your frosted glass element looks against a colorful background. Use the sliders to adjust the effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default GlassmorphismGen;
