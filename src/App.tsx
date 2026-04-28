import React from 'react';
import './index.css';

const App = () => {
  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>UTILITY<span style={{ color: 'var(--accent-primary)' }}>TOOL</span></h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>VISION v1.0</p>
        </div>

        <nav>
          <div className="nav-group">
            <div className="nav-title">Introduction</div>
            <a href="#vision" className="nav-link">Platform Vision</a>
            <a href="#core-concept" className="nav-link">Core Concept</a>
            <a href="#pricing" className="nav-link">Pricing Model</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">Tool Specifications</div>
            <a href="#tweet-generator" className="nav-link">Tweet Generator</a>
            <a href="#domain-finder" className="nav-link">Domain Finder</a>
            <a href="#idea-validator" className="nav-link">Startup Idea Validator</a>
            <a href="#exam-prep" className="nav-link">Exam Prep Analyzer</a>
            <a href="#trading-assistant" className="nav-link">Trading Assistant</a>
            <a href="#investment-assistant" className="nav-link">Investment Assistant</a>
            <a href="#hiring-tool" className="nav-link">Hiring Decision Tool</a>
            <a href="#scope-tool" className="nav-link">Scope Breakdown Tool</a>
            <a href="#proposal-generator" className="nav-link">Proposal Generator</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">Marketing Strategy</div>
            <a href="#seo-growth" className="nav-link">SEO-Led Growth</a>
            <a href="#content-strategy" className="nav-link">Short-Form Content</a>
            <a href="#referral" className="nav-link">Referral Loop</a>
            <a href="#free-layer" className="nav-link">Free Tool Layer</a>
            <a href="#positioning" className="nav-link">Brand Positioning</a>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* VISION SECTION */}
        <section id="vision">
          <h1 className="section-title">The Vision Document</h1>
          <p className="subtitle">
            A "$1 Utility Tools Platform" — a collection of high-value, single-use tools that save hours (or days) of work in one click.
          </p>

          <div className="spec-box">
            <h3 className="h3-title">Core Value Proposition</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '1rem' }}>🚀 <strong>Save 2 hours to 2 days</strong> of effort per use.</li>
              <li style={{ marginBottom: '1rem' }}>📊 <strong>Deliver structured, ready-to-use outputs</strong> (not raw AI responses).</li>
              <li style={{ marginBottom: '1rem' }}>💳 <strong>No subscriptions</strong> — pay only when needed.</li>
              <li style={{ marginBottom: '1rem' }}>⚡ <strong>Focus on speed + structured delivery</strong> over raw generation.</li>
            </ul>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing">
          <h2 className="h2-title">Revenue & Pricing Model</h2>
          <div className="pricing-card">
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', color: 'var(--accent-primary)' }}>Flat Pricing</p>
            <div className="price-tag">$1<span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}> / Credit</span></div>
            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
              1 Credit = ~$1. Most tools cost 1 credit per use.
              Advanced tools may cost more based on complexity.
            </p>
          </div>
        </section>

        {/* TOOL SPECIFICATIONS */}
        <section id="specs">
          <h2 className="h2-title">Technical Tool Specifications</h2>
          <p className="subtitle">Detailed breakdown of inputs, backend logic, and outputs for the engineering team.</p>

          {/* 1. Tweet Generator */}
          <div id="tweet-generator" className="spec-box">
            <h3 className="h3-title">1. Tweet Generator for X</h3>
            <p>Generates high-engagement tweets by pulling trending topics and identifying viral hooks.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Niche (AI, entrepreneurship, etc.)</li>
                  <li>Target audience</li>
                  <li>Content type (informative, storytelling, etc.)</li>
                  <li>Goal (growth / authority / engagement)</li>
                  <li>Tone (witty, professional, bold)</li>
                  <li>Image requirement (yes/no)</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Pulls trending topics from Google Trends, YouTube, Reddit, and X</li>
                  <li>Identifies viral hooks and content formats</li>
                  <li>Uses AI to generate high-engagement tweets</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>10 ready-to-post tweets</li>
                  <li>Strong hooks + clean formatting</li>
                  <li>Optional image ideas per tweet</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Domain Finder */}
          <div id="domain-finder" className="spec-box">
            <h3 className="h3-title">2. Domain Finder Tool</h3>
            <p>AI-powered tool to generate brandable domain names with real-time availability and risk checks.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Business niche + keywords</li>
                  <li>Brand style (premium, catchy, techy, etc.)</li>
                  <li>Domain extension (.com, .ai, .io, etc.)</li>
                  <li>Budget / preferred length</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Real-time domain availability checks</li>
                  <li>AI-generated unique, non-generic names</li>
                  <li>Trademark and existing business filtering</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Available domain names (ready to buy)</li>
                  <li>Brand-style variations</li>
                  <li>Quick risk and availability report</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Idea Validator */}
          <div id="idea-validator" className="spec-box">
            <h3 className="h3-title">3. Startup Idea Validator</h3>
            <p>Transforms a raw idea into a complete research dashboard.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Startup idea description</li>
                  <li>Target market / audience</li>
                  <li>Budget / scale preference</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Multi-agent research (idea, competitors, failures, market size)</li>
                  <li>Pulls real-world data and trends</li>
                  <li>Analyzes risks, ROI, and market gaps</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Clean dashboard with key insights</li>
                  <li>Competitor and failure analysis</li>
                  <li>Market opportunity and monetization breakdown</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Exam Prep */}
          <div id="exam-prep" className="spec-box">
            <h3 className="h3-title">4. Exam Prep Analyzer</h3>
            <p>Last-minute study tool that identifies patterns from past exam papers.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>3–5 previous year papers (Upload)</li>
                  <li>Exam format / pattern</li>
                  <li>Subject</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Detects repeated questions and patterns</li>
                  <li>Extracts high-weight topics</li>
                  <li>Generates practice material</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Important and repeated questions</li>
                  <li>2–3 mock papers</li>
                  <li>Cheat sheet, flashcards, and quizzes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Trading Assistant */}
          <div id="trading-assistant" className="spec-box" style={{ borderLeft: '4px solid #f59e0b' }}>
            <h3 className="h3-title">5. Trading Assistant (Short-Term)</h3>
            <p>Smart decision-making tool for day trading or swing trading. Focuses on immediate volatility and signals.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Trade details (asset, amount)</li>
                  <li>Stop Loss / Take Profit targets</li>
                  <li>Risk appetite</li>
                  <li>Mode (Day / Swing trading)</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Technical indicators analysis</li>
                  <li>Short-term signal generation</li>
                  <li>Real-time News and Sentiment analysis</li>
                  <li>Short-term risk evaluation</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Clear decision signal (Go / No-Go)</li>
                  <li>Short-term market insights</li>
                  <li>Immediate strategy improvement suggestions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. Investment Assistant */}
          <div id="investment-assistant" className="spec-box" style={{ borderLeft: '4px solid #10b981' }}>
            <h3 className="h3-title">6. Investment Assistant (Long-Term)</h3>
            <p>Strategic tool for long-term investing. Focuses on fundamentals, growth trends, and historical stability.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Investment asset / amount</li>
                  <li>Risk appetite</li>
                  <li>Investment horizon (Years)</li>
                  <li>Mode (Long-term investing)</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Fundamental analysis of the asset</li>
                  <li>Long-term trend forecasting</li>
                  <li>Macro-economic sentiment analysis</li>
                  <li>Historical stability vs volatility check</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Detailed Long-term Investment Report</li>
                  <li>Risk vs Reward analysis over time</li>
                  <li>Portfolio impact and trend alignment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. Hiring Tool */}
          <div id="hiring-tool" className="spec-box">
            <h3 className="h3-title">7. Hiring Decision Tool</h3>
            <p>Reduces the cost of bad hires by providing objective risk analysis and benchmarking.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Target Job Description / Role</li>
                  <li>Bulk resumes received (PDF/Text)</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Resume parsing and skill matching</li>
                  <li>Risk analysis (Experience gaps, job hopping)</li>
                  <li>Salary benchmarking against market data</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Hire / Reject signal</li>
                  <li>Detailed risk analysis report</li>
                  <li>Salary benchmark suggestion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 8. Scope Tool */}
          <div id="scope-tool" className="spec-box">
            <h3 className="h3-title">8. Scope Breakdown Tool</h3>
            <p>Prevents scope creep by converting vague client requirements into structured technical documents.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Vague client requirements / meeting notes</li>
                  <li>Project niche</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>Converts vague text into structured scope</li>
                  <li><strong>Automatically adds hidden tasks</strong> (QA, deployment, documentation)</li>
                  <li>Estimates complexity</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Full SRS (Software Requirement Specification)</li>
                  <li>Quotation Generator</li>
                  <li>Detailed Proposal Structure</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 9. Proposal Generator */}
          <div id="proposal-generator" className="spec-box">
            <h3 className="h3-title">9. Proposal Generator</h3>
            <p>Increases conversion rates by generating persuasive, high-quality proposals instantly.</p>
            
            <div className="tech-grid">
              <div className="tech-column">
                <h4>User Inputs</h4>
                <ul>
                  <li>Client requirement</li>
                  <li>Budget range</li>
                  <li>Niche / Industry</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Backend Logic</h4>
                <ul>
                  <li>AI drafting based on niche-specific pain points</li>
                  <li>Pricing breakdown calculation</li>
                  <li>Timeline estimation logic</li>
                  <li>Persuasive copy generation</li>
                </ul>
              </div>
              <div className="tech-column">
                <h4>Output</h4>
                <ul>
                  <li>Full formatted Proposal</li>
                  <li>Pricing breakdown</li>
                  <li>Visual Timeline</li>
                  <li><strong>Editable Canva-like View</strong>: Template based with moving elements</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MARKETING STRATEGY SECTION */}
        <section id="marketing">
          <h2 className="h2-title">Marketing & Growth Strategy</h2>
          <p className="subtitle">The four pillars of compounding growth designed for viral adoption.</p>

          <div className="strategy-list">
            
            <div id="seo-growth" className="strategy-item">
              <div className="strategy-icon">🔍</div>
              <div className="strategy-content">
                <h3>1. SEO-LED Growth (Utility-First)</h3>
                <p>Individual tools act as entry points. If even one tool ranks well or goes viral, it brings consistent organic traffic to the domain. One successful tool boosts overall domain authority.</p>
              </div>
            </div>

            <div id="content-strategy" className="strategy-item">
              <div className="strategy-icon">🎥</div>
              <div className="strategy-content">
                <h3>2. Short-Form Content (Reels Strategy)</h3>
                <p>Convert every tool into simple, engaging demo content. <strong>Show the problem → show the tool → show instant result.</strong> Focus on LinkedIn, X, Instagram, and Reddit. Consistency is key: volume + clarity over perfection.</p>
              </div>
            </div>

            <div id="referral" className="strategy-item">
              <div className="strategy-icon">🔗</div>
              <div className="strategy-content">
                <h3>3. Referral Loop (Credit-Based)</h3>
                <p>Incentivize users to invite others. Both the referrer and the new user receive extra credits. Purpose: Encourage organic sharing and reduce customer acquisition cost (CAC).</p>
              </div>
            </div>

            <div id="user-driven" className="strategy-item">
              <div className="strategy-icon">💡</div>
              <div className="strategy-content">
                <h3>4. User-Driven Idea Generation</h3>
                <p>Feature allowing users to suggest new tools. Creates a continuous idea pipeline validated by real demand. Evolution: Voting system for most requested tools.</p>
              </div>
            </div>

            <div id="free-layer" className="strategy-item">
              <div className="strategy-icon">🆓</div>
              <div className="strategy-content">
                <h3>5. Free Tool Layer</h3>
                <p>Tools with zero backend/API cost act as friction-less entry points. Build trust by delivering immediate value at no cost. Funnel: Free tools → Platform exploration → Paid tool usage.</p>
              </div>
            </div>

            <div id="positioning" className="strategy-item">
              <div className="strategy-icon">🏷️</div>
              <div className="strategy-content">
                <h3>6. Brand Positioning ($1 Store)</h3>
                <p>Built around a powerful mental model: <strong>"Affordable, accessible, utility-first."</strong> Familiar pricing psychology reduces hesitation and encourages experimentation.</p>
              </div>
            </div>

          </div>
        </section>

        <footer style={{ marginTop: '6rem', paddingBottom: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>© 2026 Utility Tools Platform. Vision Document for Technical Team and Investors.</p>
          <p>Confidential Proprietary Information.</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
