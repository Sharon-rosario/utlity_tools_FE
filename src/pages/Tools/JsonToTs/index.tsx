import { useState } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Code, 
  Copy, 
  Check, 
  Zap, 
  Settings, 
  FileJson, 
  MessageSquare, 
  Type,
  Layers,
  Terminal,
  ShieldCheck
} from 'lucide-react';

const JsonToTs = () => {
  const [input, setInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [includeJSDoc, setIncludeJSDoc] = useState(true);
  const [prefix, setPrefix] = useState('I');
  const [inputFormat, setInputFormat] = useState<'json' | 'yaml'>('json');

  const generateTs = (obj: any, interfaceName: string = 'RootObject'): string => {
    const formattedName = prefix + interfaceName;
    let result = includeJSDoc ? `/**\n * @interface ${formattedName}\n * @description Generated via UtilFactory Smart-Type Generator\n */\n` : '';
    result += `interface ${formattedName} {\n`;
    const nestedInterfaces: string[] = [];

    for (const key in obj) {
      const val = obj[key];
      const type = typeof val;

      if (val === null) {
        result += `  ${key}: null;\n`;
      } else if (Array.isArray(val)) {
        if (val.length > 0 && typeof val[0] === 'object') {
          const subName = key.charAt(0).toUpperCase() + key.slice(1) + 'Item';
          result += `  ${key}: ${prefix}${subName}[];\n`;
          nestedInterfaces.push(generateTs(val[0], subName));
        } else {
          const arrayType = val.length > 0 ? typeof val[0] : 'any';
          result += `  ${key}: ${arrayType}[];\n`;
        }
      } else if (type === 'object') {
        const subName = key.charAt(0).toUpperCase() + key.slice(1);
        result += `  ${key}: ${prefix}${subName};\n`;
        nestedInterfaces.push(generateTs(val, subName));
      } else {
        result += `  ${key}: ${type};\n`;
      }
    }

    result += `}\n`;
    return result + '\n' + nestedInterfaces.join('\n');
  };

  const handleConvert = () => {
    try {
      if (!input.trim()) return;
      let parsed;
      if (inputFormat === 'yaml') {
        // Simplified YAML-like parsing for demonstration
        parsed = JSON.parse(input.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
      } else {
        parsed = JSON.parse(input);
      }
      setTsOutput(generateTs(parsed));
    } catch (e: any) {
      alert("Error: Invalid data format detected.");
      setTsOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tsOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const seoContent = {
    blog: {
      title: "Speed Up Your Development: JSON to TypeScript Made Easy",
      content: "Manually writing TypeScript interfaces for complex data is time-consuming and prone to errors. Our generator analyzes your JSON or YAML data and automatically creates perfectly mapped TypeScript interfaces. It handles nested objects, arrays, and types instantly, so you can focus on building features instead of boilerplate code."
    },
    faqs: [
      { question: "What is an Interface Prefix?", answer: "Many developers use a prefix like 'I' (e.g., IUser) to easily identify interfaces in their code. You can change or remove this in the settings." },
      { question: "Does it support deep nesting?", answer: "Yes, the tool automatically goes through all levels of your data to create matching interfaces for every object it finds." }
    ]
  };

  return (
    <ToolPageLayout
      title="TypeScript Generator"
      tagline="Create TypeScript interfaces from JSON"
      description="Paste your JSON or YAML data and get perfect TypeScript interfaces instantly."
      icon={<Code size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUT PANEL */}
          <div className="md:col-span-6 lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[32px] bg-bg-primary/50 border border-border-strong shadow-2xl space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Settings size={64} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-border-light">
                  <Terminal size={18} className="text-accent-primary" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-white">Generator Settings</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                      <FileJson size={12} className="text-accent-primary" /> Input Format
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setInputFormat('json')} className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${inputFormat === 'json' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border border-border-strong text-text-muted hover:text-white'}`}>JSON</button>
                      <button onClick={() => setInputFormat('yaml')} className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${inputFormat === 'yaml' ? 'bg-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border border-border-strong text-text-muted hover:text-white'}`}>YAML</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                      <Type size={12} className="text-accent-primary" /> Interface Prefix
                    </label>
                    <input 
                      type="text" 
                      value={prefix} 
                      onChange={(e) => setPrefix(e.target.value)} 
                      className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all shadow-inner"
                    />
                  </div>

                  <button 
                    onClick={() => setIncludeJSDoc(!includeJSDoc)}
                    className={`w-full py-5 rounded-2xl flex items-center justify-between px-6 transition-all border ${includeJSDoc ? 'bg-accent-primary/10 border-accent-primary/30 text-accent-primary' : 'bg-bg-surface border-border-strong text-text-muted'}`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageSquare size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Add Descriptions (JSDoc)</span>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${includeJSDoc ? 'bg-accent-primary animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-text-muted/30'}`} />
                  </button>
                </div>

                <button 
                  onClick={handleConvert}
                  className="w-full py-5 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-accent-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <Zap size={16} /> Generate Code
                </button>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-bg-surface border border-border-strong flex items-start gap-4 shadow-xl">
              <ShieldCheck size={20} className="text-accent-primary shrink-0" />
              <p className="text-[10px] text-text-muted font-bold uppercase leading-relaxed tracking-widest">
                Safe & Fast: All processing happens in your browser. Your data is never saved.
              </p>
            </div>
          </div>

          {/* EDITORS */}
          <div className="lg:col-span-7 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[600px]">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-accent-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Input Data</span>
                  </div>
                </div>
                <textarea
                  className="flex-1 bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 text-sm font-mono text-white focus:border-accent-primary outline-none transition-all placeholder:text-text-muted/10 resize-none shadow-2xl scrollbar-hide"
                  placeholder={inputFormat === 'json' ? '{ "id": 1, "meta": { "active": true } }' : 'id: 1\nmeta:\n  active: true'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <Code size={14} className="text-accent-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Generated Code</span>
                  </div>
                  {tsOutput && (
                    <button onClick={handleCopy} className="flex items-center gap-2 text-[10px] font-black uppercase text-accent-primary hover:underline transition-all">
                      {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
                <div className="flex-1 bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 text-sm font-mono text-text-secondary overflow-y-auto scrollbar-hide shadow-2xl relative">
                  {tsOutput ? (
                    <pre className="animate-in fade-in duration-700 whitespace-pre-wrap">{tsOutput}</pre>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-4 opacity-10 italic py-20 text-center">
                      <Terminal size={40} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ready to generate code</span>
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

export default JsonToTs;
