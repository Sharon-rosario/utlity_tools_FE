import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Activity, 
  Table as TableIcon,
  PieChart as ChartIcon,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const InputSlider = ({ label, value, onChange, min, max, step, icon: Icon, unit }: any) => (
  <div className="space-y-6 p-6 bg-bg-surface border border-border-strong rounded-3xl shadow-lg group hover:border-accent-primary/30 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-accent-primary/10 text-accent-primary">
          <Icon size={14} />
        </div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">{label}</label>
      </div>
      <div className="flex items-center gap-1 bg-bg-primary/30 px-3 py-1.5 rounded-xl border border-border-light focus-within:border-accent-primary/50 transition-all">
        {unit === '$' && <span className="text-xs font-black text-text-muted">$</span>}
        <input 
          type="number"
          value={value}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value))))}
          className="bg-transparent text-sm font-black text-white outline-none w-20 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit !== '$' && <span className="text-xs font-black text-text-muted ml-1">{unit}</span>}
      </div>
    </div>
    <div className="relative pt-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-6 bg-transparent rounded-full appearance-none cursor-grab active:cursor-grabbing relative z-20"
      />
    </div>
  </div>
);

const CompoundingEngine = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [years, setYears] = useState<number>(20);
  const [rate, setRate] = useState<number>(8);
  const [inflation, setInflation] = useState<number>(3);
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const yearlyData = useMemo(() => {
    let data = [];
    let balance = principal;
    let adjustedBalance = principal;
    let totalInvested = principal;
    
    const monthlyRate = rate / 100 / 12;
    const monthlyInflation = inflation / 100 / 12;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = (balance + monthlyContribution) * (1 + monthlyRate);
        adjustedBalance = (adjustedBalance + monthlyContribution) * (1 + (monthlyRate - monthlyInflation));
        totalInvested += monthlyContribution;
      }
      data.push({
        year,
        balance,
        adjustedBalance,
        totalInvested,
        interest: balance - totalInvested
      });
    }
    return data;
  }, [principal, monthlyContribution, years, rate, inflation]);

  const results = yearlyData[yearlyData.length - 1] || { balance: 0, adjustedBalance: 0, totalInvested: 0, interest: 0 };

  const seoContent = {
    blog: {
      title: "The Magic of Compounding: How Small Savings Turn into Wealth",
      content: "Compound interest is often called the eighth wonder of the world. By reinvesting the interest you earn, your money starts making money on its own. Our calculator helps you visualize this growth over decades, while also accounting for the reality of inflation so you know exactly what your future wealth will be worth in today's terms."
    },
    faqs: [
      { question: "What is 'Today's Money'?", answer: "Inflation makes things more expensive over time. 'Today's money' shows you what your future savings would be able to buy at today's prices." },
      { question: "How does monthly saving help?", answer: "Adding even a small amount every month significantly speeds up the growth of your portfolio thanks to compounding." }
    ]
  };

  return (
    <ToolPageLayout
      title="Wealth Builder"
      tagline="Plan your financial future"
      description="See how your wealth grows over time while accounting for inflation and monthly savings."
      icon={<Calculator size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUTS */}
          <div className="md:col-span-5 lg:col-span-4 space-y-6">
            <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 space-y-6 shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-text-primary mb-6">Your Details</h3>
              <InputSlider label="Starting Amount" value={principal} onChange={setPrincipal} min={0} max={1000000} step={1000} icon={DollarSign} unit="$" />
              <InputSlider label="Monthly Saving" value={monthlyContribution} onChange={setMonthlyContribution} min={0} max={50000} step={100} icon={Activity} unit="$" />
              <InputSlider label="Total Years" value={years} onChange={setYears} min={1} max={50} step={1} icon={Calendar} unit="Yrs" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-bg-surface border border-border-strong rounded-xl space-y-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Return %</label>
                  <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full bg-transparent text-sm font-black text-text-primary outline-none" />
                </div>
                <div className="p-4 bg-bg-surface border border-border-strong rounded-xl space-y-1">
                  <label className="text-[8px] font-black uppercase text-text-muted">Inflation %</label>
                  <input type="number" value={inflation} onChange={(e) => setInflation(Number(e.target.value))} className="w-full bg-transparent text-sm font-black text-text-primary outline-none" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-start gap-4">
              <ShieldCheck size={18} className="text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-emerald-500/80 font-bold leading-relaxed uppercase tracking-tight">
                Privacy Locked: All financial projections are computed locally. No data leaves your workstation.
              </p>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 shadow-xl">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block mb-2">Total Value</span>
                <div className="text-2xl font-black text-text-primary">${Math.round(results.balance).toLocaleString()}</div>
              </div>
              <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 shadow-xl">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block mb-2">In Today's Money</span>
                <div className="text-2xl font-black text-accent-primary">${Math.round(results.adjustedBalance).toLocaleString()}</div>
              </div>
              <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 shadow-xl">
                <span className="text-[9px] font-black uppercase tracking-widest text-text-muted block mb-2">Interest Earned</span>
                <div className="text-2xl font-black text-emerald-500">${Math.round(results.interest).toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-bg-primary border border-border-strong rounded-[40px] shadow-2xl overflow-hidden flex flex-col min-h-[400px]">
              <div className="px-8 py-6 border-b border-border-light flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => setView('chart')} className={`p-3 rounded-xl transition-all ${view === 'chart' ? 'bg-accent-primary text-white' : 'bg-bg-surface text-text-muted hover:text-text-primary'}`}>
                    <ChartIcon size={18} />
                  </button>
                  <button onClick={() => setView('table')} className={`p-3 rounded-xl transition-all ${view === 'table' ? 'bg-accent-primary text-white' : 'bg-bg-surface text-text-muted hover:text-text-primary'}`}>
                    <TableIcon size={18} />
                  </button>
                  <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">{view === 'chart' ? 'Growth Chart' : 'Yearly Table'}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-500">
                  <ArrowUpRight size={16} />
                  <span className="text-[10px] font-black uppercase">Growth Tracking Active</span>
                </div>
              </div>

              <div className="flex-1 p-8">
                {view === 'chart' ? (
                  <div className="h-full flex items-end gap-1 min-h-[250px]">
                    {yearlyData.filter((_, i) => i % Math.max(1, Math.floor(years/15)) === 0).map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-accent-primary/10 rounded-t-lg relative transition-all group-hover:bg-accent-primary/20" style={{ height: `${(d.balance / results.balance) * 100}%` }}>
                          <div className="absolute inset-0 bg-accent-primary/40 w-full rounded-t-lg" style={{ height: `${(d.adjustedBalance / d.balance) * 100}%`, bottom: 0, top: 'auto' }} />
                        </div>
                        <span className="text-[8px] font-black text-text-muted">Yr {d.year}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto max-h-[300px] scrollbar-hide">
                    <table className="w-full text-left">
                      <thead className="sticky top-0 bg-bg-primary text-[9px] font-black uppercase text-text-muted">
                        <tr>
                          <th className="pb-4">Year</th>
                          <th className="pb-4">Balance</th>
                          <th className="pb-4">Adjusted</th>
                          <th className="pb-4">Invested</th>
                        </tr>
                      </thead>
                      <tbody className="text-[11px] font-medium text-text-secondary">
                        {yearlyData.map(d => (
                          <tr key={d.year} className="border-t border-border-light/30">
                            <td className="py-3 font-bold text-text-primary">Year {d.year}</td>
                            <td className="py-3">${Math.round(d.balance).toLocaleString()}</td>
                            <td className="py-3 text-accent-primary">${Math.round(d.adjustedBalance).toLocaleString()}</td>
                            <td className="py-3">${Math.round(d.totalInvested).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default CompoundingEngine;
