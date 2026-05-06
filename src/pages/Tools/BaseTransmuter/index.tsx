import React, { useState, useEffect } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Repeat, 
  Hash, 
  Binary, 
  Code, 
  Terminal, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck,
  ChevronRight,
  Database,
  Layers,
  Search
} from 'lucide-react';

const BaseTransmuter = () => {
  const [decimal, setDecimal] = useState<string>('');
  const [binary, setBinary] = useState<string>('');
  const [hex, setHex] = useState<string>('');
  const [octal, setOctal] = useState<string>('');
  const [ascii, setAscii] = useState<string>('');

  const updateFromDecimal = (value: string) => {
    if (value === '') { clearAll(); return; }
    try {
      const num = BigInt(value);
      syncBases(num);
      setDecimal(value);
    } catch (e) {}
  };

  const updateFromBinary = (value: string) => {
    if (value === '') { clearAll(); return; }
    if (!/^[01]+$/.test(value)) return;
    try {
      const num = BigInt(`0b${value}`);
      syncBases(num);
      setBinary(value);
    } catch (e) {}
  };

  const updateFromHex = (value: string) => {
    if (value === '') { clearAll(); return; }
    if (!/^[0-9A-Fa-f]+$/.test(value)) return;
    try {
      const num = BigInt(`0x${value}`);
      syncBases(num);
      setHex(value.toUpperCase());
    } catch (e) {}
  };

  const syncBases = (num: bigint) => {
    setDecimal(num.toString(10));
    setBinary(num.toString(2).padStart(8, '0'));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
    try {
      const n = Number(num);
      if (n >= 32 && n <= 126) setAscii(String.fromCharCode(n));
      else setAscii('N/A');
    } catch (e) { setAscii('ERR'); }
  };

  const clearAll = () => {
    setDecimal(''); setBinary(''); setHex(''); setOctal(''); setAscii('');
  };

  const seoContent = {
    blog: {
      title: "Understanding Computer Numbers: Decimal, Hex, and Binary Explained",
      content: "Computers don't see numbers the same way we do. While we use decimal (0-9), computers use binary (0-1). Our Number Converter helps you translate between these different languages instantly. Whether you're a student learning computer science or a developer checking a value, this tool makes the conversion simple and accurate.\n\nYou can enter a standard number, a hex code, or binary code, and see the results update in real-time across all formats."
    },
    faqs: [
      { question: "What is Hexadecimal (Hex)?", answer: "Hex is a base-16 numbering system often used in web design (for colors) and programming to represent large numbers in a shorter format." },
      { question: "Why do we use Binary?", answer: "Binary is the fundamental language of computers, representing data as a series of switches that are either off (0) or on (1)." }
    ]
  };

  const InputField = ({ label, value, onChange, icon: Icon, placeholder, fira = true }: any) => (
    <div className="space-y-4 group">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2 group-hover:text-accent-primary transition-colors">
          <Icon size={12} /> {label}
        </label>
        {value && (
          <button onClick={() => navigator.clipboard.writeText(value)} className="text-[10px] font-black uppercase text-accent-primary hover:underline transition-all">Copy</button>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full bg-bg-surface/50 border border-border-strong rounded-2xl px-6 py-5 text-lg ${fira ? 'font-mono' : 'font-bold'} text-white focus:border-accent-primary outline-none transition-all placeholder:text-text-muted/30 shadow-inner`}
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
          <ChevronRight size={16} className="text-accent-primary" />
        </div>
      </div>
    </div>
  );

  return (
    <ToolPageLayout
      title="Number Converter"
      tagline="Convert numbers between different formats"
      description="Easily convert numbers like Decimal, Hex, and Binary with perfect accuracy."
      icon={<Repeat size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* MAIN TRANSFORMER */}
          <div className="md:col-span-7 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Database size={100} />
              </div>
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-4 pb-6 border-b border-border-light">
                  <div className="p-3 rounded-2xl bg-accent-primary/10 text-accent-primary">
                    <Layers size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Format Converter</h3>
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mt-1">High precision converter active</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <InputField label="Standard Number (Decimal)" value={decimal} onChange={updateFromDecimal} icon={Hash} placeholder="Enter a number..." fira={false} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Computer Format (Hex)" value={hex} onChange={updateFromHex} icon={Code} placeholder="0x00" />
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                        <Terminal size={12} className="text-accent-primary" /> Text equivalent
                      </label>
                      <div className="w-full bg-bg-surface/30 border border-border-strong rounded-2xl px-6 py-5 text-xl font-black text-emerald-500 h-[68px] flex items-center shadow-inner">
                        {ascii || <span className="opacity-10 tracking-widest">NULL</span>}
                      </div>
                    </div>
                  </div>

                  <InputField label="Digital Code (Binary)" value={binary} onChange={updateFromBinary} icon={Binary} placeholder="00000000" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Code Length', value: `${binary.length}-bit`, icon: Cpu },
                { label: 'Number Type', value: (binary.match(/1/g) || []).length % 2 === 0 ? 'Even' : 'Odd', icon: Activity },
                { label: 'Read Direction', value: 'Standard', icon: ShieldCheck }
              ].map((stat, i) => (stat.label === 'Numerical Parity' && !decimal) ? null : (
                <div key={i} className="p-8 rounded-[32px] bg-bg-surface/50 border border-border-light shadow-xl group hover:border-accent-primary/30 transition-all">
                  <stat.icon size={20} className="text-accent-primary mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="text-[9px] font-black uppercase text-text-muted mb-2 tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-black text-white tracking-tighter">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* BIT VISUALIZER */}
          <div className="md:col-span-5 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-10 space-y-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-primary/10 rounded-full blur-[60px]" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
                      <Binary size={18} />
                    </div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Digital Code Layout</h3>
                  </div>
                  <span className="text-[9px] font-black text-text-muted tracking-[0.4em]">Left to Right</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {(binary.padStart(8, '0')).split('').slice(-16).map((bit, i) => (
                    <div 
                      key={i}
                      className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${bit === '1' ? 'bg-accent-primary/20 border-accent-primary text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] scale-105' : 'bg-bg-surface border-border-strong text-text-muted opacity-30'}`}
                    >
                      <span className="text-[8px] font-black mb-1 opacity-50">{15-i}</span>
                      <span className="text-lg font-black">{bit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-border-light space-y-8">
                  <div className="flex items-center gap-3">
                    <Zap size={18} className="text-accent-primary" />
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Code Analysis</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="group/stat p-6 rounded-2xl bg-bg-surface/50 border border-border-light flex justify-between items-center hover:border-accent-primary/50 transition-all shadow-lg">
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Inverted Code</span>
                      <span className="text-lg font-mono font-bold text-accent-primary tracking-widest">0x{(~Number(decimal || 0) >>> 0).toString(16).toUpperCase()}</span>
                    </div>
                    <div className="group/stat p-6 rounded-2xl bg-bg-surface/50 border border-border-light flex justify-between items-center hover:border-accent-primary/50 transition-all shadow-lg">
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Shifted Code</span>
                      <span className="text-lg font-mono font-bold text-accent-primary tracking-widest">0x{(Number(decimal || 0) << 1).toString(16).toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-bg-surface border border-border-strong flex items-center gap-5 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-primary">
                <Search size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Search Context</p>
                <p className="text-xs text-text-muted font-medium leading-relaxed">Standard computer math rules applied for all calculations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default BaseTransmuter;
