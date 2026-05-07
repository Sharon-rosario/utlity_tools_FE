import { useState, useMemo } from 'react';
import ToolPageLayout from '../../../components/ToolPageLayout';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Settings, 
  Building2, 
  Briefcase,
  Building,
  User,
  Calendar,
  Zap,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

const InvoiceGenerator = () => {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Consulting Services', quantity: 1, price: 500 }
  ]);
  const [taxRate, setTaxRate] = useState(10);
  const [businessName, setBusinessName] = useState('My Awesome Business');
  const [clientName, setClientName] = useState('John Doe');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: 'New Item', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  }, [items, taxRate]);

  const handleDownload = () => {
    window.print();
  };

  const seoContent = {
    blog: {
      title: "How to Create Professional Invoices That Get Paid Faster",
      content: "Sending a professional invoice is the final step in a successful project. A clear, well-structured invoice with itemized costs, tax breakdowns, and clear payment terms builds trust with your clients. Our generator helps you build these in seconds, ensuring you never miss a billing detail."
    },
    faqs: [
      { question: "Is this tool free?", answer: "Yes, our invoice generator is completely free to use for freelancers and small businesses." },
      { question: "Can I save my invoices?", answer: "Currently, we process everything in your browser for privacy. You can print or save as PDF directly from the interface." }
    ]
  };

  return (
    <ToolPageLayout
      title="Professional Invoice Maker"
      tagline="Create and download invoices"
      description="Quickly create professional invoices for your clients and download them as PDF."
      icon={<FileText size={40} />}
      seoContent={seoContent}
      fullWidth={true}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 print:block">
        {/* SETTINGS & INPUTS */}
        <div className="lg:col-span-5 space-y-8 print:hidden">
          <div className="bg-bg-primary/50 border border-border-strong rounded-[32px] p-8 space-y-8 shadow-2xl">
            <div className="flex items-center gap-3 pb-4 border-b border-border-light">
              <Briefcase size={18} className="text-accent-primary" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Invoice Details</h3>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Building size={12} className="text-accent-primary" /> Your Business
                  </label>
                  <input 
                    type="text" 
                    value={businessName} 
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <User size={12} className="text-accent-primary" /> Client Name
                  </label>
                  <input 
                    type="text" 
                    value={clientName} 
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Calendar size={12} className="text-accent-primary" /> Invoice #
                  </label>
                  <input 
                    type="text" 
                    value={invoiceNumber} 
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-text-muted flex items-center gap-2">
                    <Zap size={12} className="text-accent-primary" /> Tax Rate (%)
                  </label>
                  <input 
                    type="number" 
                    value={taxRate} 
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full bg-bg-surface border border-border-strong rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:border-accent-primary transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-border-light">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Line Items</h4>
                <button 
                  onClick={addItem}
                  className="flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 text-accent-primary rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-accent-primary hover:text-white transition-all"
                >
                  <Plus size={14} /> Add Item
                </button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
                {items.map(item => (
                  <div key={item.id} className="p-4 bg-bg-surface border border-border-strong rounded-2xl space-y-4 relative group/item">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-2 text-text-muted hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                    <input 
                      type="text" 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Description"
                      className="w-full bg-transparent border-b border-border-light text-xs font-bold text-white outline-none focus:border-accent-primary pb-1"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[8px] font-black text-text-muted uppercase">Qty</label>
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-full bg-bg-primary/50 border border-border-light rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-accent-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black text-text-muted uppercase">Price</label>
                        <input 
                          type="number" 
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                          className="w-full bg-bg-primary/50 border border-border-light rounded-lg px-2 py-1 text-xs font-bold text-white outline-none focus:border-accent-primary"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full py-5 bg-white text-black rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-accent-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Download size={18} /> Download PDF / Print
            </button>
          </div>

          <div className="p-6 rounded-[24px] bg-accent-primary/5 border border-accent-primary/20 flex items-start gap-4">
            <ShieldCheck size={20} className="text-accent-primary shrink-0" />
            <p className="text-[10px] text-text-secondary font-bold uppercase leading-relaxed tracking-widest">
              Privacy First: All billing data remains in your browser. We never see your invoices.
            </p>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="lg:col-span-7 print:w-full print:m-0 print:p-0">
          <div className="bg-white text-black p-12 md:p-16 rounded-[40px] shadow-2xl min-h-[800px] flex flex-col print:rounded-none print:shadow-none print:min-h-0">
            <div className="flex justify-between items-start border-b-4 border-black pb-10 mb-12">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white">
                  <FileText size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">{businessName}</h2>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Official Tax Invoice</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Invoice Number</div>
                <div className="text-xl font-black">{invoiceNumber}</div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-4">Issue Date</div>
                <div className="text-sm font-bold">{new Date().toLocaleDateString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-16">
              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Bill To</h4>
                <div className="text-xl font-black">{clientName}</div>
              </div>
              <div className="text-right">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Payable To</h4>
                <div className="text-xl font-black">{businessName}</div>
              </div>
            </div>

            <div className="flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-black">
                    <th className="py-4 text-[10px] font-black uppercase tracking-widest">Description</th>
                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Qty</th>
                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right">Price</th>
                    <th className="py-4 text-[10px] font-black uppercase tracking-widest text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map(item => (
                    <tr key={item.id}>
                      <td className="py-6 text-sm font-bold break-words max-w-[150px] md:max-w-[300px]">{item.description}</td>
                      <td className="py-6 text-sm font-bold text-center">{item.quantity}</td>
                      <td className="py-6 text-sm font-bold text-right">${item.price.toLocaleString()}</td>
                      <td className="py-6 text-sm font-black text-right">${(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-12 pt-12 border-t-4 border-black">
              <div className="flex justify-end">
                <div className="w-64 space-y-4">
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-black">${totals.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <span>Tax ({taxRate}%)</span>
                    <span className="text-black">${totals.taxAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-black">
                    <span className="text-xs font-black uppercase tracking-widest">Total Amount</span>
                    <span className="text-3xl font-black">${totals.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 flex items-center gap-4 p-8 bg-gray-50 rounded-3xl border border-gray-100 print:bg-white print:border-black">
              <CheckCircle size={24} className="text-emerald-500" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest">Payment Terms</p>
                <p className="text-xs font-medium text-gray-500">Please settle this invoice within 14 days of the issue date. Thank you for your business!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
};

export default InvoiceGenerator;
