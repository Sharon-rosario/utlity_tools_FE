import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  BarChart2, 
  Activity, 
  ArrowUpRight, 
  Target,
  PieChart as ChartIcon,
  Table as TableIcon,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

const sliderStyles = `
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #6366f1;
    cursor: grab;
    border: 4px solid #0a0a0a;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
    margin-top: -10px;
  }
  input[type=range]::-webkit-slider-thumb:active {
    cursor: grabbing;
    transform: scale(1.1);
  }
  input[type=range]::-moz-range-thumb {
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: #6366f1;
    cursor: grab;
    border: 4px solid #0a0a0a;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #1a1a1a;
    border-radius: 3px;
  }
`;

const InputSlider = ({ label, value, onChange, min, max, step, icon: Icon, unit }: any) => (
  <div className="space-y-6 p-8 rounded-[32px] bg-bg-surface/50 border border-border-strong shadow-xl group hover:border-accent-primary/50 transition-all duration-500">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary group-hover:scale-110 transition-transform">
          <Icon size={16} />
        </div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{label}</label>
      </div>
      <div className="flex items-center gap-1 bg-bg-primary/30 px-3 py-1.5 rounded-xl border border-border-light focus-within:border-accent-primary/50 transition-all">
        {unit === '$' && <span className="text-sm font-black text-text-muted">$</span>}
        <input 
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          className="bg-transparent text-xl font-black text-white tracking-tighter outline-none w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit !== '$' && <span className="text-sm font-black text-text-muted ml-1">{unit}</span>}
      </div>
    </div>
    <div className="relative pt-6 pb-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-6 bg-transparent rounded-full appearance-none cursor-grab active:cursor-grabbing transition-all relative z-20"
      />
    </div>
    <div className="flex justify-between text-[8px] font-black text-text-muted uppercase tracking-widest opacity-50">
      <span>Min: {unit === '$' ? `$${min}` : `${min}${unit}`}</span>
      <span>Max: {unit === '$' ? `$${max.toLocaleString()}` : `${max}${unit}`}</span>
    </div>
  </div>
);

const SipForecaster = () => {
  const [monthlySip, setMonthlySip] = useState<number>(5000);
  const [years, setYears] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [stepUp, setStepUp] = useState<number>(10);
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const yearlyData = useMemo(() => {
    let data = [];
    let maturityValue = 0;
    let totalInvested = 0;
    let currentMonthly = monthlySip;

    for (let year = 1; year <= years; year++) {
      let yearlyInvestment = 0;
      for (let month = 1; month <= 12; month++) {
        totalInvested += currentMonthly;
        yearlyInvestment += currentMonthly;
        maturityValue = (maturityValue + currentMonthly) * (1 + (rate / 100 / 12));
      }
      data.push({
        year,
        maturityValue,
        totalInvested,
        yearlyInvestment,
        wealthGained: maturityValue - totalInvested
      });
      currentMonthly = currentMonthly * (1 + (stepUp / 100));
    }
    return data;
  }, [monthlySip, years, rate, stepUp]);

  const results = yearlyData[yearlyData.length - 1] || { maturityValue: 0, totalInvested: 0, wealthGained: 0 };

  const seoContent = {
    blog: {
      title: "Understanding Growth: How Monthly Saving Builds Your Future",
      content: "Saving a small amount every month is one of the most powerful ways to build wealth. Our calculator helps you see exactly how your money can grow over time. By increasing your monthly savings just a little bit each year (Step-Up), you can reach your financial goals much faster.\\n\\nThis tool uses standard compound interest calculations to give you a clear and accurate picture of your future savings."
    },
    faqs: [
      { question: "What is a 'Yearly Increase'?", answer: "It's when you increase your monthly saving amount by a small percentage every year as your income grows." },
      { question: "How is the profit calculated?", answer: "We calculate interest every month, just like a bank or mutual fund would, to give you the most accurate result." }
    ]
  };

  return (
    <ToolPageLayout
      title="Investment Growth"
      tagline="How your money grows"
      description="See how small monthly savings can turn into a large wealth over time with smart planning."
      icon={<TrendingUp size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <style>{sliderStyles}</style>
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* PARAMETERS */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-10 space-y-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                <Target size={80} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                  <Zap size={18} className="text-accent-primary" /> Enter your details
                </h3>
                
                <div className="space-y-6">
                  <InputSlider label="Monthly Saving" value={monthlySip} onChange={setMonthlySip} min={0} max={200000} step={500} icon={DollarSign} unit="$" />
                  <InputSlider label="Total Years" value={years} onChange={setYears} min={0} max={50} step={1} icon={Calendar} unit="Yrs" />
                  <InputSlider label="Yearly Increase" value={stepUp} onChange={setStepUp} min={0} max={100} step={1} icon={ArrowUpRight} unit="%" />
                  
                  <div className="p-8 rounded-[32px] bg-bg-surface/50 border border-border-strong shadow-xl space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity size={16} className="text-accent-primary" />
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Expected Yearly Return</label>
                      </div>
                      <div className="flex items-center gap-1 bg-bg-primary/30 px-3 py-1.5 rounded-xl border border-border-light focus-within:border-accent-primary/50 transition-all">
                        <input 
                          type="number"
                          value={rate}
                          step={0.5}
                          onChange={(e) => setRate(Math.min(40, Math.max(0, Number(e.target.value))))}
                          className="bg-transparent text-xl font-black text-accent-primary tracking-tighter outline-none w-16 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-sm font-black text-text-muted">%</span>
                      </div>
                    </div>
                    <div className="relative pt-6 pb-2">
                      <input type="range" min={0} max={40} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full h-6 bg-transparent rounded-full appearance-none cursor-grab active:cursor-grabbing transition-all relative z-20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-[32px] bg-accent-primary/5 border border-accent-primary/20 flex items-center gap-6 shadow-xl">
              <div className="w-14 h-14 rounded-2xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-widest mb-1">Calculator Verified</p>
                <p className="text-[10px] text-text-secondary font-medium leading-relaxed">We use accurate math to show you how your money grows over time.</p>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-7 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Wealth', value: Math.round(results.maturityValue), color: 'text-white' },
                { label: 'Money Put In', value: Math.round(results.totalInvested), color: 'text-accent-primary' },
                { label: 'Profit Earned', value: Math.round(results.wealthGained), color: 'text-emerald-500' }
              ].map((res, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-bg-primary/50 border border-border-strong shadow-2xl text-center group hover:scale-105 transition-all">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-muted block mb-4">{res.label}</span>
                  <div className={`text-3xl font-black tracking-tighter ${res.color}`}>
                    ${res.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-bg-primary/50 border border-border-strong rounded-[48px] shadow-[0_0_80px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col min-h-[500px]">
              <div className="px-10 py-8 border-b border-border-light flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex bg-bg-surface p-1.5 rounded-2xl border border-border-light">
                    <button onClick={() => setView('chart')} className={`p-3 rounded-xl transition-all ${view === 'chart' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}>
                      <ChartIcon size={20} />
                    </button>
                    <button onClick={() => setView('table')} className={`p-3 rounded-xl transition-all ${view === 'table' ? 'bg-accent-primary text-white shadow-lg' : 'text-text-muted hover:text-white'}`}>
                      <TableIcon size={20} />
                    </button>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">
                    {view === 'chart' ? 'Growth Chart' : 'Yearly Breakdown'}
                  </h3>
                </div>
                
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                  <BarChart2 size={12} /> Live Simulation
                </div>
              </div>

              <div className="flex-1 p-10">
                {view === 'chart' ? (
                  <div className="h-full flex items-end gap-1.5 min-h-[350px]">
                    {yearlyData.filter((_, i) => i % Math.max(1, Math.floor(years/20)) === 0).map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                        <div className="w-full relative transition-all group-hover:scale-x-110">
                          <div 
                            className="w-full bg-accent-primary/20 rounded-t-xl transition-all duration-1000 delay-[i*50ms] group-hover:bg-accent-primary/30" 
                            style={{ height: `${Math.max(10, (d.maturityValue / results.maturityValue) * 300)}px` }}
                          >
                            <div 
                              className="absolute inset-0 bg-accent-primary w-full rounded-t-xl transition-all duration-1000 shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
                              style={{ height: `${(d.totalInvested / d.maturityValue) * 100}%`, bottom: 0, top: 'auto' }} 
                            />
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[10px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap shadow-2xl z-10">
                            ${Math.round(d.maturityValue/1000)}k
                          </div>
                        </div>
                        <span className="text-[8px] font-black text-text-muted uppercase tracking-widest">Yr {d.year}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto max-h-[400px] scrollbar-hide">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                      <thead>
                        <tr className="text-[10px] font-black uppercase text-text-muted tracking-widest">
                          <th className="px-6 pb-2">Year</th>
                          <th className="px-6 pb-2">Total Value</th>
                          <th className="px-6 pb-2">Money Put In</th>
                          <th className="px-6 pb-2 text-right">Profit</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs font-bold text-text-secondary">
                        {yearlyData.map(d => (
                          <tr key={d.year} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 bg-bg-surface/50 rounded-l-2xl border-y border-l border-border-light group-hover:text-white transition-colors">Year {d.year}</td>
                            <td className="px-6 py-4 bg-bg-surface/50 border-y border-border-light text-white">${Math.round(d.maturityValue).toLocaleString()}</td>
                            <td className="px-6 py-4 bg-bg-surface/50 border-y border-border-light">${Math.round(d.totalInvested).toLocaleString()}</td>
                            <td className="px-6 py-4 bg-bg-surface/50 rounded-r-2xl border-y border-r border-border-light text-emerald-500 text-right">+${Math.round(d.wealthGained).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-10 rounded-[48px] bg-gradient-to-r from-bg-surface to-bg-primary border border-border-strong flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl group cursor-pointer hover:border-accent-primary/50 transition-all">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-2xl font-black text-white tracking-tighter group-hover:text-accent-primary transition-colors">Ready to start saving?</h4>
                <p className="text-xs text-text-muted font-medium uppercase tracking-widest">A small step today makes a big difference tomorrow.</p>
              </div>
              <button className="px-10 py-5 rounded-[24px] bg-white text-black font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-accent-primary hover:text-white transition-all shadow-xl active:scale-95">
                Start Now <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default SipForecaster;
