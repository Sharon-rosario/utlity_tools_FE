import React, { useState, useEffect } from 'react';
import './index.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on link click (mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="app-container">
      {/* MOBILE HEADER */}
      <header className="mobile-header">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>UTILITY<span style={{ color: 'var(--accent-primary)' }}>TOOL</span></h2>
        <button className="hamburger" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* SIDEBAR NAVIGATION */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '3rem', marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>UTILITY<span style={{ color: 'var(--accent-primary)' }}>TOOL</span></h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VISION v2.0 • 2026</p>
        </div>

        <nav>
          <div className="nav-group">
            <div className="nav-title">OVERVIEW</div>
            <a href="#vision" className="nav-link" onClick={handleLinkClick}>Platform Vision</a>
            <a href="#pricing" className="nav-link" onClick={handleLinkClick}>Revenue Model</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">TECHNICAL SPECS</div>
            <a href="#tweet-generator" className="nav-link" onClick={handleLinkClick}>Tweet Generator</a>
            <a href="#domain-finder" className="nav-link" onClick={handleLinkClick}>Domain Finder</a>
            <a href="#idea-validator" className="nav-link" onClick={handleLinkClick}>Idea Validator</a>
            <a href="#exam-prep" className="nav-link" onClick={handleLinkClick}>Exam Prep</a>
            <a href="#trading-assistant" className="nav-link" onClick={handleLinkClick}>Trading Tool</a>
            <a href="#investment-assistant" className="nav-link" onClick={handleLinkClick}>Investment Tool</a>
            <a href="#hiring-tool" className="nav-link" onClick={handleLinkClick}>Hiring Assistant</a>
            <a href="#scope-tool" className="nav-link" onClick={handleLinkClick}>Scope Breakdown</a>
            <a href="#proposal-generator" className="nav-link" onClick={handleLinkClick}>Proposal Generator</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">MARKETING</div>
            <a href="#marketing" className="nav-link" onClick={handleLinkClick}>Growth Pillars</a>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* VISION SECTION */}
        <section id="vision">
          <div className="badge">Platform Strategy</div>
          <h1 className="section-title">The "$1 Utility" Vision</h1>
          <p className="subtitle">
            A premium collection of high-value, single-use tools that compress hours of cognitive labor into a single click. 
            No friction. No subscriptions. Immediate action.
          </p>

          <div className="spec-box" style={{ padding: '3rem' }}>
            <h3 className="h3-title">Core Value Loop</h3>
            <div className="tech-grid" style={{ marginTop: '0' }}>
              <div className="tech-column">
                <h4>Effort Compression</h4>
                <p style={{ fontSize: '1.1rem', color: '#fff' }}>Save 2h – 48h per tool use.</p>
              </div>
              <div className="tech-column">
                <h4>Output Format</h4>
                <p style={{ fontSize: '1.1rem', color: '#fff' }}>Structured documents, not raw text.</p>
              </div>
              <div className="tech-column">
                <h4>Payment Logic</h4>
                <p style={{ fontSize: '1.1rem', color: '#fff' }}>Pay only when the value is delivered.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing">
          <h2 className="h2-title">Economic Model</h2>
          <div className="pricing-section">
            <p className="badge" style={{ marginBottom: '1rem' }}>Credit System</p>
            <div className="big-price">$1</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '2rem auto 0' }}>
              Standard tool access. Designed for the "one-time high-value" mental model.
            </p>
          </div>
        </section>

        {/* TOOL SPECIFICATIONS */}
        <section id="specs">
          <h2 className="h2-title">Technical Specifications</h2>
          <p className="subtitle">A deep dive into the inputs, backend processing, and final outputs for our engineering and AI teams.</p>

          {/* Tool 1 */}
          <div id="tweet-generator" className="spec-box">
            <h3 className="h3-title"><span>01</span> Tweet Generator for X</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Pulls real-time trending data to generate viral hooks and engagement-optimized content.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Niche & Target Audience</li>
                  <li>Goal (Growth/Engagement)</li>
                  <li>Tone & Image Needs</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Multi-source trend scraping</li>
                  <li>Viral hook pattern matching</li>
                  <li>AI Content Synthesis</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>10 formatted tweets</li>
                  <li>Hook/Image breakdown</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 2 */}
          <div id="domain-finder" className="spec-box">
            <h3 className="h3-title"><span>02</span> Domain Finder Tool</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>AI brand generation with integrated real-time availability and trademark risk checks.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Niche + Brand Style</li>
                  <li>Domain Extensions</li>
                  <li>Budget constraints</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Real-time WHOIS integration</li>
                  <li>Trademark API filtering</li>
                  <li>AI Name variations</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Available name list</li>
                  <li>Risk/Stability report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 3 */}
          <div id="idea-validator" className="spec-box">
            <h3 className="h3-title"><span>03</span> Idea Validator</h3>
            <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Converts a raw concept into a full-scale market research and ROI dashboard.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Idea Description</li>
                  <li>Target Market/Scale</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Multi-agent competitor research</li>
                  <li>Market gap/ROI analysis</li>
                  <li>Failure pattern analysis</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Market Opportunity Dashboard</li>
                  <li>Competitor/Failure Analysis</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 4 */}
          <div id="exam-prep" className="spec-box">
            <h3 className="h3-title"><span>04</span> Exam Prep Analyzer</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>3–5 Past Papers (PDF)</li>
                  <li>Subject/Pattern info</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Pattern/Topic weight analysis</li>
                  <li>Repeated question detection</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Mock Papers & Flashcards</li>
                  <li>High-weight Cheat Sheet</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 5 */}
          <div id="trading-assistant" className="spec-box" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
            <h3 className="h3-title"><span>05</span> Trading Tool (Short-Term)</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Trade details + SL/TP</li>
                  <li>Risk Appetite & Mode</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Technical indicator analysis</li>
                  <li>Real-time Sentiment Scraping</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Go/No-Go Signal</li>
                  <li>Immediate Strategy Suggestion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 6 */}
          <div id="investment-assistant" className="spec-box" style={{ borderLeft: '4px solid var(--accent-secondary)' }}>
            <h3 className="h3-title"><span>06</span> Investment Tool (Long-Term)</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Asset + Horizon (Years)</li>
                  <li>Risk Tolerance</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Fundamental analysis logic</li>
                  <li>Long-term trend forecasting</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Full Investment Report</li>
                  <li>Risk/Reward Timeline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 7 */}
          <div id="hiring-tool" className="spec-box">
            <h3 className="h3-title"><span>07</span> Hiring Decision Tool</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Job Role/Description</li>
                  <li>Bulk Resumes (Files)</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Skill matching & Gap analysis</li>
                  <li>Salary Market Benchmarking</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Hire/Reject Signal</li>
                  <li>Risk & Salary Report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 8 */}
          <div id="scope-tool" className="spec-box">
            <h3 className="h3-title"><span>08</span> Scope Breakdown Tool</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Vague Requirements</li>
                  <li>Project Niche</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Technical structure mapping</li>
                  <li>Automatic hidden task gen</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Technical SRS Document</li>
                  <li>Quotation Structure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tool 9 */}
          <div id="proposal-generator" className="spec-box">
            <h3 className="h3-title"><span>09</span> Proposal Generator</h3>
            <div className="tech-grid">
              <div className="tech-column">
                <h4>Inputs</h4>
                <ul>
                  <li>Client requirement</li>
                  <li>Budget & Niche</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend</h4>
                <ul>
                  <li>Persuasive copy engine</li>
                  <li>Pricing/Timeline logic</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Full Proposal Document</li>
                  <li><strong>Interactive Canva-style View</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MARKETING STRATEGY SECTION */}
        <section id="marketing">
          <h2 className="h2-title">Growth & Marketing</h2>
          <p className="subtitle">The pillars designed for organic, viral, and sustainable growth.</p>

          <div className="strategy-grid">
            
            <div className="strategy-card">
              <div className="icon-wrap">🔍</div>
              <h3>SEO-Led Growth</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Each tool is a landing page. One viral tool boosts the entire domain authority through internal linking.</p>
            </div>

            <div className="strategy-card">
              <div className="icon-wrap">📱</div>
              <h3>Short-Form Strategy</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Show the Problem → Show the Tool → Show Result. High-volume distribution on Reels, TikTok, and X.</p>
            </div>

            <div className="strategy-card">
              <div className="icon-wrap">🔗</div>
              <h3>Referral Loop</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Credit-based viral growth. Refer a friend, both get $1 credit. Lowers CAC to almost zero.</p>
            </div>

            <div className="strategy-card">
              <div className="icon-wrap">🆓</div>
              <h3>Free Layer Funnel</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Entry-level tools with zero backend cost. Builds trust and brings users into the paid ecosystem.</p>
            </div>

            <div className="strategy-card" style={{ gridColumn: 'span 2' }}>
              <div className="icon-wrap">🏷️</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>$1 Store Positioning</h3>
                <span className="badge">Brand DNA</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>The "Low Cost, High Utility" mental model makes adoption effortless. People are already conditioned to experiment with $1 products.</p>
            </div>

          </div>
        </section>

        <footer style={{ marginTop: '8rem', paddingBottom: '4rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
          <p>© 2026 Utility Tools Platform • Vision Document v2.0</p>
          <p style={{ marginTop: '0.5rem' }}>Confidential Proprietary Strategic Vision</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
