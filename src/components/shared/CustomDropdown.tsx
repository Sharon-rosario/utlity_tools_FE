import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-bg-surface border flex items-center justify-between rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
          isOpen ? 'border-accent-primary text-white shadow-accent-primary/10' : 'border-border-strong text-text-secondary hover:border-accent-primary/50'
        }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-accent-primary">{icon}</span>}
          {selectedOption?.label}
        </div>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-text-muted'}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-bg-surface border border-border-strong rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto scrollbar-hide">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center justify-between ${
                  value === option.value
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-text-secondary hover:bg-white/5 hover:text-white'
                }`}
              >
                {option.label}
                {value === option.value && <Check size={14} className="text-accent-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
