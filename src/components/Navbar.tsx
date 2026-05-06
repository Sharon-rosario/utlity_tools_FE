import { Link } from 'react-router-dom';
import { Terminal, Sun, Moon, CreditCard, LayoutGrid, Zap } from 'lucide-react';
const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-20 bg-bg-primary/50 backdrop-blur-2xl border-b border-white/5 px-8 md:px-[6%]">
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group no-underline">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-black font-black italic shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform">
              AG
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-[0.2em] text-white uppercase leading-none">Antigravity</span>
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mt-1">Utility OS</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 ml-10 pl-10 border-l border-white/5">
            <Link to="/tools" className="flex items-center gap-2 text-[10px] font-black text-text-muted hover:text-white uppercase tracking-[0.2em] transition-all">
              <LayoutGrid size={14} /> Arsenal
            </Link>
            <Link to="/pricing" className="flex items-center gap-2 text-[10px] font-black text-text-muted hover:text-white uppercase tracking-[0.2em] transition-all">
              <Zap size={14} /> Power Plan
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 px-5 py-2.5 rounded-2xl bg-bg-surface border border-white/5 shadow-xl group hover:border-accent-primary transition-all">
              <CreditCard size={16} className="text-accent-primary" />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-text-muted tracking-widest leading-none">Credits</span>
                <span className="text-xs font-black text-white leading-none mt-1">∞ Free</span>
              </div>
            </div>

          </div>

          <button className="hidden md:flex px-6 py-2.5 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all shadow-xl active:scale-95">
            Initialize Account
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
