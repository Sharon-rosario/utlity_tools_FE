import { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Repeat, 
  Cpu, 
  Settings, 
  Activity, 
  Copy, 
  Check, 
  ShieldCheck,
  Layers,
  ChevronRight
} from 'lucide-react';

const unitData: Record<string, Record<string, number>> = {
  pressure: {
    Pascal: 1,
    Bar: 100000,
    PSI: 6894.76,
    Atmosphere: 101325,
    Torr: 133.322
  },
  energy: {
    Joule: 1,
    Kilojoule: 1000,
    Calorie: 4.184,
    BTU: 1055.06,
    'Watt-hour': 3600
  },
  power: {
    Watt: 1,
    Kilowatt: 1000,
    Horsepower: 745.7,
    'BTU/hr': 0.293071
  },
  digital: {
    Byte: 1,
    Kilobyte: 1024,
    Megabyte: 1048576,
    Gigabyte: 1073741824,
    Terabyte: 1099511627776
  },
  force: {
    Newton: 1,
    Kilonewton: 1000,
    'Pound-force': 4.44822,
    Dyne: 0.00001
  }
};

const UnitConverter = () => {
  const [category, setCategory] = useState('pressure');
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState('Bar');
  const [copied, setCopied] = useState<string | null>(null);

  const conversions = useMemo(() => {
    const units = unitData[category];
    const baseValue = value * units[fromUnit];
    return Object.entries(units).map(([unit, factor]) => ({
      unit,
      value: baseValue / factor
    }));
  }, [category, value, fromUnit]);

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 2000);
  };

  const seoContent = {
    blog: {
      title: "Precision Engineering: Why Unit Accuracy Matters",
      content: "In hardware and software engineering, a single decimal error in pressure or power conversion can lead to system failure. Whether you are calculating PSI for a pneumatic system or Gigabytes for a cloud storage migration, using a high-precision converter is essential for technical integrity."
    },
    faqs: [
      { question: "How precise is this converter?", answer: "We use high-precision floating point math for all physical and digital constants." },
      { question: "Do you support metric and imperial?", answer: "Yes, we include common standards like PSI (Imperial) and Bar (Metric) in our datasets." }
    ]
  };

  return (
    <ToolPageLayout
      title="Engineering Unit Hub"
      tagline="Convert technical units"
      description="Convert complex engineering units like Pressure, Voltage, Power, and more."
      icon={<Repeat size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* CONTROL PANEL */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Settings size={64} />
              </div>

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Layers size={12} className="text-accent-primary" /> Engineering Field
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.keys(unitData).map(cat => (
                      <button 
                        key={cat}
                        onClick={() => {
                          setCategory(cat);
                          setFromUnit(Object.keys(unitData[cat])[0]);
                        }}
                        className={`px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all text-left flex items-center justify-between ${category === cat ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border-border-strong text-text-muted hover:text-white'}`}
                      >
                        {cat}
                        <ChevronRight size={14} className={category === cat ? 'opacity-100' : 'opacity-0'} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-border-light">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Source Value</label>
                    <div className="relative group/input">
                       <input 
                        type="number" 
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-xl font-black text-white outline-none focus:border-accent-primary transition-all"
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-accent-primary uppercase tracking-widest">{fromUnit}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Convert From</label>
                    <select 
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-4 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all appearance-none"
                    >
                      {Object.keys(unitData[category]).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
              <ShieldCheck size={20} className="text-accent-primary shrink-0" />
              <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
                Precision: 64-bit floating point conversion mapping protocol active.
              </p>
            </div>
          </div>

          {/* RESULTS GRID */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-12 min-h-[600px] flex flex-col shadow-2xl relative overflow-hidden">
               <div className="flex items-center justify-between mb-12 pb-6 border-b border-border-light">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shadow-inner">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-widest">Conversion Matrix</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Field: {category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {conversions.map(({ unit, value: resultValue }) => (
                  <div key={unit} className="group relative p-8 bg-bg-surface border border-border-light rounded-[32px] hover:border-accent-primary transition-all animate-in zoom-in-95 duration-500">
                    <div className="space-y-1">
                      <div className="text-[9px] font-black text-accent-primary uppercase tracking-widest">{unit}</div>
                      <div className="text-2xl font-black text-white truncate pr-12">
                        {resultValue < 0.0001 || resultValue > 999999 ? resultValue.toExponential(4) : resultValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopy(resultValue.toString())}
                      className="absolute top-8 right-8 p-3 rounded-xl bg-bg-primary border border-border-strong text-text-muted hover:text-accent-primary transition-all opacity-0 group-hover:opacity-100"
                    >
                      {copied === resultValue.toString() ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-12 text-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-bg-surface border border-border-strong rounded-full text-[10px] font-black text-text-muted uppercase tracking-widest">
                  <Activity size={12} className="text-accent-primary animate-pulse" /> Precision Engine Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default UnitConverter;
