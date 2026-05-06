import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Percent, 
  DollarSign, 
  Calculator, 
  Info, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  PieChart as ChartIcon,
  Briefcase,
  Globe,
  Settings
} from 'lucide-react';
import CustomDropdown from '../../../components/shared/CustomDropdown';

const TaxLogic = () => {
  const [income, setIncome] = useState<number>(50000);
  const [expenses, setExpenses] = useState<number>(5000);
  const [region, setRegion] = useState('US');
  const [filingStatus, setFilingStatus] = useState('single');

  const calculateTax = (amount: number) => {
    let tax = 0;
    if (amount <= 11600) tax = amount * 0.10;
    else if (amount <= 47150) tax = 1160 + (amount - 11600) * 0.12;
    else if (amount <= 100525) tax = 5426 + (amount - 47150) * 0.22;
    else if (amount <= 191950) tax = 17168 + (amount - 100525) * 0.24;
    else tax = 39110 + (amount - 191950) * 0.32;
    return tax;
  };

  const results = useMemo(() => {
    const taxableIncome = Math.max(0, income - expenses);
    const federalTax = calculateTax(taxableIncome);
    const selfEmploymentTax = region === 'US' ? taxableIncome * 0.153 : 0;
    const totalTax = federalTax + selfEmploymentTax;
    const netIncome = taxableIncome - totalTax;
    
    return {
      federalTax,
      selfEmploymentTax,
      totalTax,
      netIncome,
      taxableIncome,
      effectiveRate: taxableIncome > 0 ? (totalTax / taxableIncome) * 100 : 0
    };
  }, [income, expenses, region]);

  const seoContent = {
    blog: {
      title: "How to Estimate Your Taxes as a Freelancer or Small Business",
      content: "Taxes can be confusing, especially when you work for yourself. You have to account for federal income tax and self-employment taxes. Our calculator simplifies this by showing you exactly how much you need to set aside from your earnings so you aren't surprised at the end of the year."
    },
    faqs: [
      { question: "What is net income?", answer: "This is the 'take-home' pay after you have subtracted all your business expenses and the taxes you owe." },
      { question: "Why is self-employment tax high?", answer: "When you are self-employed, you pay both the employer and employee portions of Social Security and Medicare taxes." }
    ]
  };

  return (
    <ToolPageLayout
      title="Quick Tax Calculator"
      tagline="Calculate how much tax you owe"
      description="Easily estimate your taxes based on your income and expenses."
      icon={<Percent size={40} />}
      seoContent={seoContent}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUT SECTION */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <div className="bg-bg-primary border border-border-strong rounded-[32px] p-8 space-y-8 shadow-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-border-light">
                <Settings size={18} className="text-accent-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-text-primary">Income Details</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                    <DollarSign size={10} className="text-accent-primary" /> Total Earnings
                  </label>
                  <div className="flex items-center gap-1 bg-bg-surface border border-border-strong rounded-xl px-4 py-1 focus-within:border-accent-primary transition-all">
                    <span className="text-sm font-black text-text-muted">$</span>
                    <input 
                      type="number" 
                      value={income} 
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full bg-transparent py-3 text-xl font-black text-text-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-text-muted flex items-center gap-2">
                    <Briefcase size={10} className="text-accent-primary" /> Work Expenses
                  </label>
                  <div className="flex items-center gap-1 bg-bg-surface border border-border-strong rounded-xl px-4 py-1 focus-within:border-accent-primary transition-all">
                    <span className="text-sm font-black text-text-muted">$</span>
                    <input 
                      type="number" 
                      value={expenses} 
                      onChange={(e) => setExpenses(Number(e.target.value))}
                      className="w-full bg-transparent py-3 text-sm font-black text-text-primary outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 relative z-50">
                    <label className="text-[8px] font-black uppercase text-text-muted">Country</label>
                    <div className="relative">
                      <CustomDropdown
                        options={[
                          { value: 'US', label: 'United States' },
                          { value: 'INT', label: 'Other (Flat 20%)' }
                        ]}
                        value={region}
                        onChange={setRegion}
                        icon={<Globe size={12} />}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[8px] font-black uppercase text-text-muted">Filing Status</label>
                    <CustomDropdown
                      options={[
                        { value: 'single', label: 'Single' },
                        { value: 'joint', label: 'Married' }
                      ]}
                      value={filingStatus}
                      onChange={setFilingStatus}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-accent-primary/5 border border-border-primary/20 rounded-2xl flex items-start gap-4">
              <ShieldCheck size={18} className="text-accent-primary shrink-0 mt-0.5" />
              <p className="text-[10px] text-accent-primary/80 font-bold leading-relaxed uppercase tracking-tight">
                Private: Your financial data is never saved or sent to any server. All math happens on your device.
              </p>
            </div>
          </div>

          {/* OUTPUT SECTION */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8">
            <div className="bg-bg-primary border border-border-strong rounded-[40px] p-10 relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                <Calculator size={120} />
              </div>
              
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block mb-2">Estimated Tax Owed</span>
                    <div className="text-6xl font-black text-red-500 tracking-tighter">${Math.round(results.totalTax).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black uppercase text-text-muted block mb-1">Effective Rate</span>
                    <div className="text-2xl font-black text-text-primary">{results.effectiveRate.toFixed(1)}%</div>
                  </div>
                </div>

                <div className="h-px bg-border-light/50" />

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted">
                      <span>Income Tax</span>
                      <span className="text-text-primary">${Math.round(results.federalTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted">
                      <span>Self-Employment Tax</span>
                      <span className="text-text-primary">${Math.round(results.selfEmploymentTax).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted pt-2 border-t border-border-light">
                      <span>Taxable Income</span>
                      <span className="text-text-primary">${Math.round(results.taxableIncome).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-emerald-500/10 border border-emerald-500/20 rounded-[32px] p-6 text-center group-hover:scale-105 transition-transform">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-3 shadow-lg shadow-emerald-500/20">
                      <TrendingUp size={20} />
                    </div>
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Money You Keep</span>
                    <div className="text-2xl font-black text-text-primary">${Math.round(results.netIncome).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-bg-primary border border-border-strong rounded-2xl flex items-center gap-4 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <ChartIcon size={20} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-text-muted uppercase">Monthly Savings</div>
                  <div className="text-lg font-black text-text-primary">${Math.round(results.totalTax / 12).toLocaleString()}</div>
                </div>
              </div>
              <div className="p-6 bg-bg-primary border border-border-strong rounded-2xl flex items-center gap-4 shadow-md">
                <div className="w-10 h-10 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                  <Activity size={20} />
                </div>
                <div>
                  <div className="text-[9px] font-black text-text-muted uppercase">Daily Cost</div>
                  <div className="text-lg font-black text-text-primary">${Math.round(results.totalTax / 365).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default TaxLogic;
