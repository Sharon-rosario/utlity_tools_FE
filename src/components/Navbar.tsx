import { Link } from 'react-router-dom';
import { Terminal, ArrowUpRight, Sun, Moon, CreditCard } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-[8%] h-16 bg-bg-glass backdrop-blur-xl border-b border-border-light">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group no-underline">
          <div className="w-6 h-6 rounded border border-accent-primary/30 flex items-center justify-center group-hover:border-accent-primary transition-colors">
            <Terminal size={12} className="text-accent-primary" />
          </div>
          <span className="text-sm font-black tracking-widest text-text-primary uppercase font-outfit">UtilityTool</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black text-text-muted tracking-[0.2em] uppercase mr-4">
          <Link to="/tools" className="hover:text-accent-primary transition-colors">Arsenal</Link>
          <Link to="/pricing" className="hover:text-accent-primary transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4 border-l border-border-light pl-8">
          {/* MINI CREDIT CARD */}
          <Link to="/pricing" className="relative hidden sm:flex items-center gap-3 bg-bg-surface border border-border-strong px-4 py-1.5 rounded-xl transition-all hover:border-accent-primary hover:shadow-lg group">
            <CreditCard size={14} className="text-accent-primary" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase text-text-muted leading-none tracking-widest">Balance</span>
              <span className="text-xs font-black text-text-primary leading-none mt-0.5">0.00</span>
            </div>
          </Link>

          <button 
            className="bg-bg-surface border border-border-light text-text-secondary p-2 rounded-lg hover:text-accent-primary hover:border-accent-primary transition-all" 
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
