import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Calculator, 
  Home, 
  TrendingUp, 
  DollarSign, 
  PieChart as ChartIcon, 
  ShieldCheck, 
  ChevronRight, 
  Activity, 
  Settings,
  Percent,
  Clock
} from 'lucide-react';

const RoiCalculator = () => {
  // Investment Details
  const [purchasePrice, setPurchasePrice] = useState(300000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(6000);

  // Income
  const [monthlyRent, setMonthlyRent] = useState(2500);
  const [otherIncome, setOtherIncome] = useState(0);

  // Expenses
  const [propertyTax, setPropertyTax] = useState(300);
  const [insurance, setInsurance] = useState(100);
  const [hoa, setHoa] = useState(0);
  const [repairsPct, setRepairsPct] = useState(5);
  const [vacancyPct, setVacancyPct] = useState(5);
  const [managementPct, setManagementPct] = useState(0);

  const results = useMemo(() => {
    const downPayment = (purchasePrice * downPaymentPct) / 100;
    const loanAmount = purchasePrice - downPayment;
    const monthlyInterest = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyMortgage = 
      (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    const grossMonthlyIncome = monthlyRent + otherIncome;
    const repairs = (monthlyRent * repairsPct) / 100;
    const vacancy = (monthlyRent * vacancyPct) / 100;
    const management = (monthlyRent * managementPct) / 100;

    const totalMonthlyExpenses = propertyTax + insurance + hoa + repairs + vacancy + management + monthlyMortgage;
    const monthlyNetCashFlow = grossMonthlyIncome - totalMonthlyExpenses;
    const annualNetCashFlow = monthlyNetCashFlow * 12;

    const totalCashInvested = downPayment + closingCosts;
    const cashOnCashRoi = (annualNetCashFlow / totalCashInvested) * 100;

    // Cap Rate = (Annual Net Operating Income / Purchase Price)
    // NOI = Annual Income - Annual Operating Expenses (Excluding Mortgage)
    const annualOperatingExpenses = (propertyTax + insurance + hoa + repairs + vacancy + management) * 12;
    const annualNoi = (grossMonthlyIncome * 12) - annualOperatingExpenses;
    const capRate = (annualNoi / purchasePrice) * 100;

    return {
      monthlyMortgage,
      grossMonthlyIncome,
      totalMonthlyExpenses,
      monthlyNetCashFlow,
      annualNetCashFlow,
      cashOnCashRoi,
      capRate,
      totalCashInvested,
      noi: annualNoi
    };
  }, [purchasePrice, downPaymentPct, interestRate, loanTerm, monthlyRent, otherIncome, propertyTax, insurance, hoa, repairsPct, vacancyPct, managementPct, closingCosts]);

  const seoContent = {
    blog: {
      title: "Real Estate ROI: How to Calculate True Property Profitability",
      content: "Evaluating a rental property goes beyond just looking at the monthly rent. Professional investors use Cap Rate and Cash-on-Cash ROI to compare deals. Cap Rate shows the return on a property if bought with cash, while Cash-on-Cash accounts for your leverage (mortgage). Our calculator helps you factor in repairs, vacancy, and management to find the true profit."
    },
    faqs: [
      { question: "What is a good Cap Rate?", answer: "Generally, a Cap Rate between 4% and 10% is considered healthy, depending on the location and risk profile." },
      { question: "What is Cash-on-Cash return?", answer: "It is the annual pre-tax cash flow divided by the total amount of cash you actually invested (down payment + closing costs)." }
    ]
  };

  return (
    <ToolPageLayout
      title="Rental Property ROI"
      tagline="Check property profitability"
      description="Calculate the Return on Investment (ROI) and Cash Flow for rental properties."
      icon={<Home size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* INPUTS PANEL */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 space-y-8 shadow-2xl">
              <div className="flex items-center gap-3 pb-4 border-b border-border-light">
                <Settings size={18} className="text-accent-primary" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Investment Data</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <DollarSign size={10} className="text-accent-primary" /> Purchase Price
                    </label>
                    <input 
                      type="number" 
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Percent size={10} className="text-accent-primary" /> Down Payment (%)
                    </label>
                    <input 
                      type="number" 
                      value={downPaymentPct}
                      onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                      className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Activity size={10} className="text-accent-primary" /> Interest Rate (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                      <Clock size={10} className="text-accent-primary" /> Term (Years)
                    </label>
                    <input 
                      type="number" 
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                </div>

                <div className="h-px bg-border-light/50" />

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Monthly Cash Flow</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Expected Rent</label>
                      <input 
                        type="number" 
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Property Tax</label>
                      <input 
                        type="number" 
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border-light/50" />

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Advanced Expenses</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Insurance/mo</label>
                      <input 
                        type="number" 
                        value={insurance}
                        onChange={(e) => setInsurance(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">HOA/mo</label>
                      <input 
                        type="number" 
                        value={hoa}
                        onChange={(e) => setHoa(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Repairs %</label>
                      <input 
                        type="number" 
                        value={repairsPct}
                        onChange={(e) => setRepairsPct(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Vacancy %</label>
                      <input 
                        type="number" 
                        value={vacancyPct}
                        onChange={(e) => setVacancyPct(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Mgmt %</label>
                      <input 
                        type="number" 
                        value={managementPct}
                        onChange={(e) => setManagementPct(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-text-muted">Closing Costs</label>
                    <input 
                      type="number" 
                      value={closingCosts}
                      onChange={(e) => setClosingCosts(Number(e.target.value))}
                      className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
              <ShieldCheck size={20} className="text-accent-primary shrink-0" />
              <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
                Professional: This calculator uses industry-standard leverage and NOI mapping protocols.
              </p>
            </div>
          </div>

          {/* OUTPUT PANEL */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 opacity-5">
                <ChartIcon size={120} />
              </div>

              <div className="relative z-10 space-y-12">
                <div className="grid grid-cols-2 gap-12">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block mb-3">Cash-on-Cash ROI</span>
                    <div className={`text-4xl md:text-5xl font-black tracking-tighter truncate ${results.cashOnCashRoi > 10 ? 'text-emerald-500' : results.cashOnCashRoi > 0 ? 'text-accent-primary' : 'text-red-500'}`}>
                      {results.cashOnCashRoi.toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-right truncate overflow-hidden">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted block mb-3">Cap Rate</span>
                    <div className="text-3xl md:text-4xl font-black text-white truncate">{results.capRate.toFixed(1)}%</div>
                  </div>
                </div>

                <div className="h-px bg-border-light/50" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted">
                      <span>Monthly Rent</span>
                      <span className="text-white">${results.grossMonthlyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted">
                      <span>Mortgage (P&I)</span>
                      <span className="text-red-500">-${Math.round(results.monthlyMortgage).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-text-muted">
                      <span>Op. Expenses</span>
                      <span className="text-red-400">-${Math.round(results.totalMonthlyExpenses - results.monthlyMortgage).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border-light">
                      <span className="text-xs font-black uppercase text-white">Net Monthly Cash Flow</span>
                      <span className={`text-xl font-black ${results.monthlyNetCashFlow > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                        ${Math.round(results.monthlyNetCashFlow).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-accent-primary/10 border border-accent-primary/20 rounded-[32px] p-8 text-center group-hover:scale-105 transition-transform shadow-xl">
                    <div className="w-12 h-12 rounded-full bg-accent-primary flex items-center justify-center text-white mb-4 shadow-lg shadow-accent-primary/30">
                      <TrendingUp size={24} />
                    </div>
                    <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest mb-1">Annual Profit</span>
                    <div className="text-2xl md:text-3xl font-black text-white truncate w-full px-2">${Math.round(results.annualNetCashFlow).toLocaleString()}</div>
                    <div className="text-[10px] font-bold text-text-muted uppercase mt-2 tracking-widest">After All Expenses</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-6 bg-bg-primary/50 border border-border-strong rounded-2xl flex flex-col gap-2 shadow-lg overflow-hidden">
                <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Total Cash Invested</div>
                <div className="text-xl font-black text-white truncate">${results.totalCashInvested.toLocaleString()}</div>
              </div>
              <div className="p-6 bg-bg-primary/50 border border-border-strong rounded-2xl flex flex-col gap-2 shadow-lg overflow-hidden">
                <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Net Operating Income</div>
                <div className="text-xl font-black text-white truncate">${Math.round(results.noi).toLocaleString()}</div>
              </div>
              <div className="p-6 bg-bg-primary/50 border border-border-strong rounded-2xl flex flex-col gap-2 shadow-lg overflow-hidden">
                <div className="text-[8px] font-black text-text-muted uppercase tracking-widest">Monthly Yield</div>
                <div className="text-xl font-black text-accent-primary truncate">{(results.monthlyNetCashFlow / results.totalCashInvested * 100).toFixed(2)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default RoiCalculator;
