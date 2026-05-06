import { useState } from 'react';
import { Zap, CreditCard, ChevronRight, Activity, ShieldCheck, Cpu, Database, ArrowUpRight } from 'lucide-react';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(2);
  const [customAmount, setCustomAmount] = useState<string>('250');

  const plans = [
    { id: 1, credits: 10, price: 10, popular: false, savings: '0%', description: 'Starter Pack' },
    { id: 2, credits: 50, price: 45, popular: true, savings: '10%', description: 'Power User' },
    { id: 3, credits: 200, price: 160, popular: false, savings: '20%', description: 'Scale-up' },
  ];

  const calculateCustomPrice = (amount: string) => {
    const n = parseInt(amount) || 0;
    if (n < 50) return n;
    if (n < 150) return Math.floor(n * 0.9);
    return Math.floor(n * 0.8);
  };

  return (
    <div className="min-h-screen bg-bg-primary py-20 md:py-32 px-6 md:px-[8%] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 organic-grid opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-accent-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <header className="text-center mb-24 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-strong bg-bg-surface text-[10px] font-black uppercase tracking-[0.2em] text-accent-primary mb-8">
            <Database size={12} /> Resource Allocation Protocol
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.8]">
            Fuel Your <span className="text-gradient">Execution.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-secondary font-medium leading-relaxed italic max-w-2xl mx-auto">
            Industrial-grade tools require industrial-grade fuel. No monthly traps. No "cancel anytime" headaches. Buy what you need, use it when you're ready.
          </p>
          <div className="mt-8 flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-text-muted">
            <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Secure Checkout</span>
            <span className="flex items-center gap-2"><Cpu size={14} className="text-accent-primary" /> Instant Provisioning</span>
            <span className="flex items-center gap-2 text-red-500"><Activity size={14} /> 60-Day Expiry Cycle</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 lg:gap-20 items-start">
          <div className="space-y-12">
            {/* Standard Plans */}
            <div className="grid gap-6">
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-[0.3em] mb-2">// Pre-configured Bundles</div>
              {plans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => { setSelectedPlan(plan.id); setCustomAmount(''); }}
                  className={`group relative p-10 rounded-[40px] border-2 cursor-pointer transition-all duration-500 flex items-center justify-between ${selectedPlan === plan.id ? 'bg-bg-surface border-accent-primary shadow-2xl scale-[1.02]' : 'bg-bg-surface/30 border-border-light hover:border-border-strong hover:bg-bg-surface/50'}`}
                >
                  {plan.popular && (
                    <span className="absolute top-0 left-12 -translate-y-1/2 bg-accent-primary text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg shadow-accent-primary/50">Optimal Balance</span>
                  )}
                  
                  <div className="flex items-center gap-8">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-500 ${selectedPlan === plan.id ? 'bg-accent-primary text-white rotate-12' : 'bg-bg-primary text-text-muted group-hover:text-accent-primary'}`}>
                      <Zap size={40} fill={selectedPlan === plan.id ? "currentColor" : "none"} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-accent-primary uppercase tracking-widest mb-1">{plan.description}</div>
                      <h3 className="text-3xl font-black text-text-primary tracking-tighter">{plan.credits} <span className="text-text-secondary font-medium text-xl">Credits</span></h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl font-black text-text-primary tracking-tighter">${plan.price}</div>
                    <div className={`text-[10px] font-black uppercase tracking-widest mt-2 ${plan.id > 1 ? 'text-emerald-500' : 'text-text-muted'}`}>
                      {plan.id > 1 ? `Save ${plan.savings}` : 'Standard Rate'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Top-up */}
            <div className={`p-10 rounded-[40px] border-2 transition-all duration-500 ${selectedPlan === null ? 'bg-bg-surface border-accent-primary shadow-2xl' : 'bg-bg-surface/30 border-border-light'}`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div>
                  <div className="text-[10px] font-mono text-accent-primary uppercase tracking-[0.3em] mb-2">// On-Demand Provisioning</div>
                  <h3 className="text-3xl font-black text-text-primary tracking-tighter">Custom Refill</h3>
                </div>
                <div className="flex items-center gap-4 bg-bg-primary p-2 rounded-2xl border border-border-strong focus-within:border-accent-primary transition-colors">
                  <input 
                    type="number" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPlan(null);
                    }}
                    placeholder="Min 50"
                    className="bg-transparent text-2xl font-black text-text-primary w-28 px-4 outline-none placeholder:text-text-muted/30"
                  />
                  <span className="text-xs font-black text-text-muted uppercase tracking-widest pr-4 border-l border-border-strong pl-4">Credits</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border-light">
                <div>
                  <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Calculated Rate</div>
                  <div className="text-4xl font-black text-text-primary">${calculateCustomPrice(customAmount)}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-2">Bulk Discount</div>
                  <div className="text-2xl font-black text-emerald-500">
                    {parseInt(customAmount) >= 150 ? '20% OFF' : parseInt(customAmount) >= 50 ? '10% OFF' : '0%'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-32 space-y-8">
            {/* Credit Visualizer */}
            <div className="bg-gradient-to-br from-bg-surface to-bg-primary p-10 rounded-[50px] border border-border-strong shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-accent-primary/20 transition-all duration-1000"></div>
              
              <div className="flex justify-between items-start mb-16 relative z-10">
                <div className="p-4 bg-bg-primary rounded-2xl border border-border-strong">
                  <CreditCard size={28} className="text-accent-primary" />
                </div>
                <div className="text-[10px] font-mono text-text-muted tracking-widest uppercase">Agent_Credit_System</div>
              </div>

              <div className="mb-12 relative z-10">
                <div className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3">Live Balance</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-7xl font-black text-text-primary tracking-tighter">0.00</div>
                  <div className="text-lg font-bold text-accent-primary uppercase tracking-widest">Active</div>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="h-2 w-full bg-border-light rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[5%] shadow-lg shadow-red-500/50"></div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-red-500">Critical Low</span>
                  <span className="text-text-muted">Refill Required</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-bg-surface border border-border-strong rounded-[40px] p-10 shadow-2xl">
              <h4 className="text-2xl font-black mb-8 tracking-tighter uppercase underline decoration-accent-primary/20 underline-offset-8">Allocation Summary</h4>
              <div className="space-y-6 mb-12">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">Resources</span>
                  <span className="text-text-primary font-black text-xl">
                    {selectedPlan ? plans.find(p => p.id === selectedPlan)?.credits : customAmount || 0} Credits
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary font-medium">System Cost</span>
                  <span className="text-text-primary font-black text-xl">
                    ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.price : calculateCustomPrice(customAmount)}.00
                  </span>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-border-light">
                  <span className="text-text-primary font-black uppercase tracking-widest text-[10px]">Total USD</span>
                  <span className="text-accent-primary font-black text-3xl tracking-tighter">
                    ${selectedPlan ? plans.find(p => p.id === selectedPlan)?.price : calculateCustomPrice(customAmount)}
                  </span>
                </div>
              </div>

              <button className="w-full bg-text-primary text-bg-primary py-7 rounded-[30px] font-black text-xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-text-primary/10 group">
                Provision Credits <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="mt-8 text-[9px] text-text-muted font-bold text-center leading-relaxed uppercase tracking-[0.2em]">
                By proceeding, you acknowledge the <span className="text-red-500">60-day hardware allocation cycle</span>. Unused credits expire after 60 days of inactivity.
              </p>
            </div>
          </aside>
        </div>

        {/* Engineering FAQs */}
        <div className="mt-40 grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Zero Subscription Policy",
              content: "We don't believe in rent-seeking. You buy credits, you own the capacity. No recurring charges, ever.",
              icon: <ShieldCheck size={24} />
            },
            {
              title: "Flat Rate Architecture",
              content: "1 credit = 1 standard tool execution. No complex formulas or hidden 'computation units' to track.",
              icon: <Database size={24} />
            },
            {
              title: "Instant Scaling",
              content: "Add credits and they are immediately available across the entire agent network globally.",
              icon: <Activity size={24} />
            }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-3xl border border-border-light bg-bg-surface/20 group hover:border-accent-primary/30 transition-all">
              <div className="text-accent-primary mb-6 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
              <h5 className="text-xl font-black mb-4 tracking-tight">{item.title}</h5>
              <p className="text-sm text-text-secondary leading-relaxed font-medium">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
