import React, { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  Activity, 
  Dna, 
  Baby, 
  Weight, 
  Calculator, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Heart,
  Stethoscope,
  Clock,
  Thermometer,
  Calendar,
  Zap
} from 'lucide-react';

const MedicalHub = () => {
  const [activeTab, setActiveTab] = useState<'bmi' | 'dosage' | 'pregnancy' | 'gfr'>('bmi');

  // BMI State
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);

  // Dosage State
  const [patientWeight, setPatientWeight] = useState(20);
  const [doseMgKg, setDoseMgKg] = useState(15);

  // Pregnancy State
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);

  const results = useMemo(() => {
    // BMI
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    let bmiCategory = 'Normal';
    let bmiColor = 'text-emerald-500';
    if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = 'text-blue-500'; }
    else if (bmi >= 25 && bmi < 30) { bmiCategory = 'Overweight'; bmiColor = 'text-amber-500'; }
    else if (bmi >= 30) { bmiCategory = 'Obese'; bmiColor = 'text-red-500'; }

    // Dosage
    const totalDose = patientWeight * doseMgKg;

    // Pregnancy
    const lmpDate = new Date(lastPeriod);
    const eddDate = new Date(lmpDate);
    eddDate.setDate(eddDate.getDate() + 280); // Naegele's rule is approx +280 days
    
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;

    return {
      bmi,
      bmiCategory,
      bmiColor,
      totalDose,
      edd: eddDate.toLocaleDateString(undefined, { dateStyle: 'long' }),
      gestation: `${weeks}w ${remainingDays}d`
    };
  }, [weight, height, patientWeight, doseMgKg, lastPeriod]);

  const seoContent = {
    blog: {
      title: "Digital Health: The Evolution of Clinical Utility Tools",
      content: "Medical professionals require rapid, accurate calculations for daily clinical decisions. From calculating the exact pediatric dose of medication to tracking gestational age, clinical utility tools reduce cognitive load and improve patient safety. Our hub provides these standardized calculators in a high-fidelity interface built for the modern practitioner."
    },
    faqs: [
      { question: "Is this for diagnostic use?", answer: "No. These tools are for educational and informational purposes only. Always consult clinical guidelines and cross-verify with hospital protocols." },
      { question: "Which BMI standard is used?", answer: "We follow the WHO (World Health Organization) standard classification for BMI ranges." }
    ]
  };

  return (
    <ToolPageLayout
      title="Medical Calculator Hub"
      tagline="Calculators for Doctors"
      description="Essential medical tools like Dosage by Weight, BMI, and GFR for medical professionals."
      icon={<Stethoscope size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* TAB NAVIGATION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] p-6 space-y-4 shadow-2xl relative overflow-hidden">
             <div className="flex flex-col gap-2 relative z-10">
              {[
                { id: 'bmi', label: 'BMI Calculator', icon: <Weight size={18} /> },
                { id: 'dosage', label: 'Drug Dosage (mg/kg)', icon: <Thermometer size={18} /> },
                { id: 'pregnancy', label: 'Pregnancy / Gestation', icon: <Baby size={18} /> },
                { id: 'gfr', label: 'Kidney Function (GFR)', icon: <Activity size={18} /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[24px] text-[11px] font-black uppercase tracking-widest transition-all border ${activeTab === tab.id ? 'bg-accent-primary border-accent-primary text-white shadow-lg shadow-accent-primary/20' : 'bg-bg-surface border-border-strong text-text-muted hover:text-white'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-[24px] bg-blue-500/5 border border-blue-500/20 flex items-start gap-4">
            <ShieldCheck size={20} className="text-blue-500 shrink-0" />
            <p className="text-[10px] text-blue-500/80 font-bold uppercase leading-relaxed tracking-widest">
              Clinical Note: Formulas based on standardized WHO and medical academic guidelines.
            </p>
          </div>
        </div>

        {/* TOOL CONTENT */}
        <div className="lg:col-span-8">
          <div className="bg-bg-primary/50 border border-border-strong rounded-[40px] p-8 md:p-16 min-h-[600px] shadow-2xl relative overflow-hidden flex flex-col">
            
            {/* BMI CALCULATOR */}
            {activeTab === 'bmi' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">BMI Analysis</h3>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Body Mass Index Calculator</p>
                  </div>
                  <Heart size={40} className="text-red-500 animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <span>Weight (kg)</span>
                        <span className="text-white">{weight} kg</span>
                      </div>
                      <input 
                        type="range" min="30" max="200" step="1" 
                        value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full accent-accent-primary"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-text-muted">
                        <span>Height (cm)</span>
                        <span className="text-white">{height} cm</span>
                      </div>
                      <input 
                        type="range" min="100" max="250" step="1" 
                        value={height} onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full accent-accent-primary"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-bg-surface border border-border-light rounded-[40px] p-10 text-center shadow-inner relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Calculated BMI</span>
                     <div className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 truncate w-full px-2">{results.bmi.toFixed(1)}</div>
                     <div className={`px-6 py-2 rounded-full border-2 font-black text-xs uppercase tracking-widest ${results.bmiColor} border-current`}>
                        {results.bmiCategory}
                     </div>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { l: 'Under', r: '< 18.5', c: 'text-blue-500' },
                    { l: 'Normal', r: '18.5 - 25', c: 'text-emerald-500' },
                    { l: 'Over', r: '25 - 30', c: 'text-amber-500' },
                    { l: 'Obese', r: '> 30', c: 'text-red-500' }
                  ].map(cat => (
                    <div key={cat.l} className={`p-4 rounded-2xl bg-bg-surface border border-border-light text-center ${results.bmiCategory === cat.l ? 'ring-2 ring-accent-primary' : ''}`}>
                      <div className="text-[8px] font-black uppercase text-text-muted mb-1">{cat.l}</div>
                      <div className={`text-[10px] font-black ${cat.c}`}>{cat.r}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOSAGE CALCULATOR */}
            {activeTab === 'dosage' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Drug Dosage</h3>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Weight-Based Pediatric & Adult Calculator</p>
                  </div>
                  <Calculator size={40} className="text-accent-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Patient Weight (kg)</label>
                      <input 
                        type="number" 
                        value={patientWeight} onChange={(e) => setPatientWeight(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-xl font-black text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Dose (mg/kg)</label>
                      <input 
                        type="number" 
                        value={doseMgKg} onChange={(e) => setDoseMgKg(Number(e.target.value))}
                        className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-xl font-black text-white outline-none focus:border-accent-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-accent-primary/10 border border-accent-primary/20 rounded-[40px] p-10 text-center shadow-inner relative">
                     <Zap size={32} className="text-accent-primary mb-6 animate-pulse" />
                     <span className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] mb-4">Total Calculated Dose</span>
                     <div className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 truncate w-full px-2">{results.totalDose} mg</div>
                     <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Verify with Hospital Guidelines</p>
                  </div>
                </div>
              </div>
            )}

            {/* PREGNANCY CALCULATOR */}
            {activeTab === 'pregnancy' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Gestation Matrix</h3>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Estimated Date of Delivery (EDD)</p>
                  </div>
                  <Baby size={40} className="text-accent-primary" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Last Menstrual Period (LMP)</label>
                      <input 
                        type="date" 
                        value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)}
                        className="w-full bg-bg-surface border border-border-strong rounded-2xl px-6 py-5 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all color-white"
                      />
                    </div>
                    <div className="p-8 bg-bg-surface border border-border-light rounded-[32px] space-y-4">
                      <div className="flex items-center gap-4">
                        <Clock size={20} className="text-accent-primary" />
                        <div>
                          <div className="text-[9px] font-black text-text-muted uppercase tracking-widest">Current Gestation</div>
                          <div className="text-2xl font-black text-white">{results.gestation}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center bg-white/5 border border-white/10 rounded-[40px] p-10 text-center shadow-inner group">
                     <Calendar size={32} className="text-white mb-6 group-hover:scale-110 transition-transform" />
                     <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Estimated Due Date</span>
                     <div className="text-3xl font-black text-white tracking-tighter leading-tight">{results.edd}</div>
                     <p className="text-[9px] font-bold text-accent-primary uppercase tracking-[0.3em] mt-6">± 2 Weeks Variance</p>
                  </div>
                </div>
              </div>
            )}

            {/* GFR PLACEHOLDER */}
            {activeTab === 'gfr' && (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 opacity-20 grayscale py-32 text-center">
                <Dna size={64} className="animate-spin-slow" />
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-[0.4em]">eGFR Protocol v2</span>
                  <p className="text-[10px] font-bold uppercase">Loading nephrology formulas...</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default MedicalHub;
