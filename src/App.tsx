import React from 'react';
import './index.css';

const App = () => {
  return (
    <>
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container animate-fade-in">
          <div className="hero-pill">Investor & Team Vision Document</div>
          <h1>
            The <span className="text-gradient">$1 Utility Tools</span> Platform
          </h1>
          <p className="animate-fade-in delay-1">
            A collection of high-value, single-use tools that save hours (or days) of work in one click. 
            No subscriptions. No friction. Just instant, structured outputs for a dollar.
          </p>
        </div>
      </section>

      {/* CORE VALUE & PRICING */}
      <section className="section">
        <div className="container animate-fade-in delay-2">
          <div className="pricing-box">
            <h2 style={{ fontSize: '2rem', marginBottom: '24px' }}>The Core Proposition</h2>
            <div className="price">
              $1 <span>/ credit</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
              Pay $1 to save hours of work. Most tools cost exactly 1 credit.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'left' }}>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '12px', color: '#fff' }}>Massive Time Savings</h4>
                <p style={{ fontSize: '0.9rem' }}>Save 2 hours to 2 days of effort per single use.</p>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '12px', color: '#fff' }}>Structured Delivery</h4>
                <p style={{ fontSize: '0.9rem' }}>Clean, ready-to-use results (reports, dashboards). Not raw AI text.</p>
              </div>
              <div className="card" style={{ padding: '24px' }}>
                <h4 style={{ marginBottom: '12px', color: '#fff' }}>No Subscriptions</h4>
                <p style={{ fontSize: '0.9rem' }}>Pay only when needed. Removing the psychological barrier of monthly fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT LINEUP */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-fade-in delay-3">
            <h2>Initial Tool Lineup</h2>
            <p>Our initial offering targets specific pain points across business, professional, and educational niches.</p>
          </div>

          <div className="card-grid animate-fade-in delay-4">
            
            {/* Tool 1 */}
            <div className="card">
              <div className="card-icon">🔥</div>
              <span className="badge badge-pink">Top Tier</span>
              <span className="badge badge-blue">Business</span>
              <h3>Proposal Generator</h3>
              <p>Writing proposals is time-consuming with low conversion. Input client requirements, budget, and niche to instantly generate a full proposal, pricing breakdown, timeline, and persuasive copy.</p>
              <ul className="feature-list">
                <li>Directly impacts user income</li>
                <li>Users will pay daily for this</li>
                <li>Editable template view like Canva</li>
              </ul>
            </div>

            {/* Tool 2 */}
            <div className="card">
              <div className="card-icon">🎯</div>
              <span className="badge badge-purple">Professional</span>
              <h3>Scope Breakdown Tool</h3>
              <p>Prevents scope creep for freelancers and agencies. Converts vague client requirements into a structured scope of work, automatically adding hidden tasks.</p>
              <ul className="feature-list">
                <li>Saves hours & prevents loss</li>
                <li>Generates SRS & proposals</li>
              </ul>
            </div>

            {/* Tool 3 */}
            <div className="card">
              <div className="card-icon">🤝</div>
              <span className="badge badge-blue">Business</span>
              <h3>Hiring Decision Tool</h3>
              <p>Bad hires are expensive. Input a role and bulk resumes to receive instant hire/reject signals, risk analysis, and salary benchmarks.</p>
              <ul className="feature-list">
                <li>Instant screening</li>
                <li>Risk mitigation for HR</li>
              </ul>
            </div>

            {/* Tool 4 */}
            <div className="card">
              <div className="card-icon">🌐</div>
              <span className="badge badge-purple">Startup</span>
              <h3>Domain Finder Tool</h3>
              <p>AI-powered tool to generate brandable domain names with real-time availability, trademark filters, and risk checks.</p>
              <ul className="feature-list">
                <li>Real-time availability</li>
                <li>Non-generic, premium names</li>
              </ul>
            </div>

            {/* Tool 5 */}
            <div className="card">
              <div className="card-icon">💡</div>
              <span className="badge badge-purple">Startup</span>
              <h3>Startup Idea Validator</h3>
              <p>Transforms a raw idea into a complete research dashboard. Analyzes competitors, past failures, market size, risks, and ROI.</p>
              <ul className="feature-list">
                <li>Multi-agent research backend</li>
                <li>Clean dashboard output</li>
              </ul>
            </div>

            {/* Tool 6 */}
            <div className="card">
              <div className="card-icon">📚</div>
              <span className="badge badge-green">Education</span>
              <h3>Exam Prep Analyzer</h3>
              <p>Last-minute study tool. Upload 3-5 previous year papers. Detects repeated questions, extracts high-weight topics, and generates mock papers & cheat sheets.</p>
            </div>

            {/* Tool 7 */}
            <div className="card">
              <div className="card-icon">📈</div>
              <span className="badge badge-green">Finance</span>
              <h3>Trading & Investment Assistant</h3>
              <p>Smart decision-making tool. Input trade details and risk appetite to get a clear go/no-go signal based on technical and fundamental analysis.</p>
            </div>

            {/* Tool 8 */}
            <div className="card">
              <div className="card-icon">🐦</div>
              <span className="badge badge-pink">Social</span>
              <h3>Tweet Generator for X</h3>
              <p>Pulls trending topics from X, Reddit, and YouTube to generate 10 ready-to-post tweets with strong hooks and clean formatting based on your niche.</p>
            </div>

          </div>
        </div>
      </section>

      {/* MARKETING STRATEGY */}
      <section className="section" style={{ backgroundColor: 'rgba(21, 26, 40, 0.3)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Growth & Marketing Engine</h2>
            <p>A compounding system where accessibility and value lead to engagement and monetization.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '900px', margin: '0 auto' }}>
            
            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div className="card-icon" style={{ flexShrink: 0, background: 'rgba(59, 130, 246, 0.15)' }}>🔍</div>
              <div>
                <h3 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>SEO-Led Growth (Utility-First)</h3>
                <p>Individual tools act as entry points. If one tool ranks or goes viral, it brings organic traffic. Internal linking creates a compounding effect, boosting overall domain authority.</p>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div className="card-icon" style={{ flexShrink: 0, background: 'rgba(236, 72, 153, 0.15)' }}>📱</div>
              <div>
                <h3 style={{ color: '#f472b6', marginBottom: '8px' }}>Short-Form Reels Distribution</h3>
                <p>Convert every tool into a simple, engaging demo video for LinkedIn, X, Instagram, and Reddit. Show the problem → show the tool → show the instant result. Volume over perfection.</p>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div className="card-icon" style={{ flexShrink: 0, background: 'rgba(16, 185, 129, 0.15)' }}>🎁</div>
              <div>
                <h3 style={{ color: '#34d399', marginBottom: '8px' }}>Free Tool Funnel & Referral Loop</h3>
                <p>Offer a layer of completely free tools to remove friction, build trust, and drive traffic. Pair this with a credit-based referral system (invite friends = earn credits) for viral growth.</p>
              </div>
            </div>

            <div className="card" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
              <div className="card-icon" style={{ flexShrink: 0, background: 'rgba(139, 92, 246, 0.15)' }}>🧠</div>
              <div>
                <h3 style={{ color: '#a78bfa', marginBottom: '8px' }}>User-Driven Expansion</h3>
                <p>Allow users to suggest and vote on new tools. This creates a continuous idea pipeline validated by real demand, fostering ownership and retention.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <h2 style={{ fontFamily: 'Outfit', color: 'var(--text-primary)', marginBottom: '16px' }}>The "$1 Store" Mental Model</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '32px' }}>
            Affordable, accessible, utility-first tools. Familiar pricing psychology reduces hesitation, encourages repeat usage, and makes the platform easy to market and adopt at scale.
          </p>
          <p style={{ fontSize: '0.875rem', opacity: 0.5 }}>© 2026 Utility Tools Platform Vision Document. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default App;
