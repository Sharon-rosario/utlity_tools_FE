import { useState } from 'react';
import { Gift, Copy, Check, Share2, Users } from 'lucide-react';

const ReferralCard = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "UT-SHARON-2026";

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://utilitytool.ai/join?ref=${referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-bg-surface border border-border-light p-8 rounded-[40px] shadow-xl relative overflow-hidden group border-l-8 border-l-emerald-500">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center">
            <Gift size={20} />
          </div>
          <h3 className="text-2xl font-black tracking-tight">Share the Wealth</h3>
        </div>

        <p className="text-text-secondary mb-8 leading-relaxed">
          Invite a friend to the Tool Factory. When they buy their first credits, <strong>both of you get 10 Extra Credits</strong> ($10 value) for free.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-bg-primary border border-border-strong p-2 pl-4 rounded-xl">
            <span className="text-sm font-mono text-text-muted flex-1 truncate">utilitytool.ai/join?ref={referralCode}</span>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-bg-surface text-text-primary hover:bg-border-light'}`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-[#1DA1F2] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Share2 size={16} /> X / Twitter
            </button>
            <button className="flex-1 bg-[#0077B5] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Users size={16} /> LinkedIn
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-light flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-border-strong border-2 border-bg-surface"></div>
              ))}
            </div>
            <span className="text-xs font-bold text-text-muted tracking-tight">12 friends already joined</span>
          </div>
          <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">+120 Credits Earned</span>
        </div>
      </div>
    </div>
  );
};

export default ReferralCard;
