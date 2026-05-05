import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Terminal } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full pt-16">
        <Outlet />
      </main>
      
      <footer className="px-8 md:px-[8%] py-12 bg-bg-surface border-t border-border-light">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-border-strong flex items-center justify-center">
              <Terminal size={10} className="text-accent-primary" />
            </div>
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-[0.2em]">UtilityTool System © 2026</span>
          </div>
          
          <div className="flex gap-8 text-[10px] font-black text-text-muted uppercase tracking-widest">
            <Link to="/tools" className="hover:text-accent-primary transition-colors">Arsenal</Link>
            <Link to="/pricing" className="hover:text-accent-primary transition-colors">Pricing</Link>
            <Link to="/blog" className="hover:text-accent-primary transition-colors">Vision</Link>
            <a href="#" className="hover:text-emerald-500 transition-colors flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Live
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
