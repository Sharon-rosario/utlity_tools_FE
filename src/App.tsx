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
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COMPREHENSIVE VISION v3.0</p>
        </div>

        <nav>
          <div className="nav-group">
            <div className="nav-title">BUSINESS CONCEPT</div>
            <a href="#exec-summary" className="nav-link" onClick={handleLinkClick}>Executive Summary</a>
            <a href="#the-problem" className="nav-link" onClick={handleLinkClick}>Market Problem</a>
            <a href="#the-solution" className="nav-link" onClick={handleLinkClick}>The Solution & Platform</a>
            <a href="#core-value" className="nav-link" onClick={handleLinkClick}>Core Value Proposition</a>
            <a href="#pricing-model" className="nav-link" onClick={handleLinkClick}>Pricing & Revenue Model</a>
            <a href="#target-audience" className="nav-link" onClick={handleLinkClick}>Target Audience Categories</a>
            <a href="#backend-architecture" className="nav-link" onClick={handleLinkClick}>Backend Architecture</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">DETAILED TOOL SPECS</div>
            <a href="#tool-proposal" className="nav-link" onClick={handleLinkClick}>1. Proposal Generator (Top Tier)</a>
            <a href="#tool-scope" className="nav-link" onClick={handleLinkClick}>2. Scope Breakdown Tool</a>
            <a href="#tool-hiring" className="nav-link" onClick={handleLinkClick}>3. Hiring Decision Tool</a>
            <a href="#tool-tweet" className="nav-link" onClick={handleLinkClick}>4. Tweet Generator for X</a>
            <a href="#tool-domain" className="nav-link" onClick={handleLinkClick}>5. Domain Finder Tool</a>
            <a href="#tool-validator" className="nav-link" onClick={handleLinkClick}>6. Startup Idea Validator</a>
            <a href="#tool-exam" className="nav-link" onClick={handleLinkClick}>7. Exam Prep Analyzer</a>
            <a href="#tool-trading" className="nav-link" onClick={handleLinkClick}>8. Trading Assistant (Short-term)</a>
            <a href="#tool-investment" className="nav-link" onClick={handleLinkClick}>9. Investment Assistant (Long-term)</a>
          </div>

          <div className="nav-group">
            <div className="nav-title">COMPREHENSIVE MARKETING</div>
            <a href="#marketing-seo" className="nav-link" onClick={handleLinkClick}>1. SEO-Led Growth</a>
            <a href="#marketing-reels" className="nav-link" onClick={handleLinkClick}>2. Short-Form Content (Reels)</a>
            <a href="#marketing-user" className="nav-link" onClick={handleLinkClick}>3. User-Driven Idea Generation</a>
            <a href="#marketing-referral" className="nav-link" onClick={handleLinkClick}>4. Referral Loop</a>
            <a href="#marketing-free" className="nav-link" onClick={handleLinkClick}>5. Free Tool Layer</a>
            <a href="#marketing-brand" className="nav-link" onClick={handleLinkClick}>6. Brand Positioning ($1 Store)</a>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main-content">
        
        {/* === SECTION: BUSINESS CONCEPT === */}
        <section id="exec-summary">
          <div className="badge">Business Strategy & Vision</div>
          <h1 className="section-title">The "$1 Utility Tools Platform" Master Plan</h1>
          <p className="subtitle" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            Welcome to the comprehensive vision for a disruptive micro-SaaS ecosystem. This document outlines a platform consisting of a collection of high-value, single-use utility tools. Each tool is painstakingly designed to take a complex task that normally takes hours—or even days—and compress it into a single, structured output for the cost of approximately one dollar.
          </p>
        </section>

        <section id="the-problem" className="spec-box">
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>The Market Problem</h2>
          <div className="text-content">
            <p>The modern digital worker faces two massive friction points when seeking solutions:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem' }}>
              <li style={{ marginBottom: '1rem' }}><strong>Subscription Fatigue:</strong> Every software solution demands a $15-$30/month recurring commitment, even if the user only needs to perform a specific task once or twice a year. Users hesitate to pull out their credit cards for a subscription they know they will forget to cancel.</li>
              <li style={{ marginBottom: '1rem' }}><strong>Raw AI Inefficiency:</strong> While generative AI models (like ChatGPT or Claude) are powerful, they require extensive prompt engineering to get a reliable result. Users receive raw text outputs that still require hours of formatting, validation, and restructuring to become actionable documents (like proposals, dashboards, or technical specs).</li>
            </ul>
          </div>
        </section>

        <section id="the-solution" className="spec-box">
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>The Solution: The Platform Concept</h2>
          <div className="text-content">
            <p>
              We are building a centralized platform where users can access different categories of utility tools (business, education, finance, social media, etc.). 
            </p>
            <p style={{ marginTop: '1rem' }}>
              Instead of forcing users to chat with an AI and hope for a good result, our platform uses <strong>predefined workflows</strong> behind the scenes. The user simply provides specific inputs (files, niche details, budgets), and the platform generates complete, polished outputs. We are delivering <strong>structured delivery over raw generation</strong>.
            </p>
          </div>
        </section>

        <section id="core-value" className="spec-box">
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>Core Value Proposition</h2>
          <div className="tech-grid" style={{ marginTop: '1.5rem' }}>
            <div className="tech-column">
              <div className="icon-wrap" style={{ marginBottom: '1rem' }}>⏱️</div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Massive Time Savings</h4>
              <p>Save 2 hours to 2 days of effort per use. We eliminate the busywork, research phase, and formatting phase entirely.</p>
            </div>
            <div className="tech-column">
              <div className="icon-wrap" style={{ marginBottom: '1rem' }}>📊</div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Structured, Ready-to-Use Outputs</h4>
              <p>We deliver clean results—reports, dashboards, visual timelines, and actionable suggestions. High-value insights designed for immediate action, requiring absolutely no further prompting.</p>
            </div>
            <div className="tech-column">
              <div className="icon-wrap" style={{ marginBottom: '1rem' }}>🔓</div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Zero Subscription Friction</h4>
              <p>No subscriptions. Pay only when needed. This completely removes the psychological barrier to entry.</p>
            </div>
          </div>
        </section>

        <section id="pricing-model" className="spec-box" style={{ background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(2, 6, 23, 0.9))', borderColor: 'var(--accent-primary)' }}>
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>Pricing & Revenue Model</h2>
          <div className="pricing-section" style={{ border: 'none', background: 'transparent', padding: '1rem 0' }}>
            <p className="badge" style={{ marginBottom: '1rem', background: 'rgba(59, 130, 246, 0.2)' }}>Credit-Based System</p>
            <div className="big-price">1 Credit = ~$1</div>
            <div className="text-content" style={{ textAlign: 'left', marginTop: '2rem' }}>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Base Pricing:</strong> Most tools on the platform cost exactly 1 credit per use.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Advanced Tools:</strong> Some highly complex tools (e.g., those requiring extensive multi-agent research or massive document parsing) may cost more credits based on backend complexity and API costs.</li>
                <li><strong>The Psychology:</strong> By keeping the base transaction at ~$1, we capitalize on impulse-buy psychology. The value delivered (hours of work saved) vastly outweighs the tiny monetary cost.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="target-audience" className="spec-box">
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>Target Audience & Tool Categories</h2>
          <div className="tech-grid" style={{ marginTop: '1.5rem' }}>
            <div className="tech-column">
              <h4 style={{ color: 'var(--accent-primary)' }}>Business Tools</h4>
              <p>Targeted at entrepreneurs, founders, and marketers. Examples: Domain finder, startup idea validator, tweet generators.</p>
            </div>
            <div className="tech-column">
              <h4 style={{ color: 'var(--accent-primary)' }}>Professional Tools</h4>
              <p>Targeted at freelancers, agencies, HR, and consultants. Examples: Proposal generators, scope breakdown tools, hiring decision tools, accounting analysis.</p>
            </div>
            <div className="tech-column">
              <h4 style={{ color: 'var(--accent-primary)' }}>Education & Hobby Tools</h4>
              <p>Targeted at students and casual users. Examples: Exam prep analyzers, document summaries, one-time use cases.</p>
            </div>
          </div>
        </section>

        <section id="backend-architecture" className="spec-box">
          <h2 className="h2-title" style={{ marginTop: '0', borderBottom: 'none', paddingBottom: '0' }}>Backend Architecture Concept</h2>
          <div className="text-content">
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>AI-Powered Processing:</strong> Utilizing a multi-model approach where needed (combining different LLMs based on their strengths for writing, logic, or data extraction).</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Chained Workflows:</strong> Instead of single prompts, the backend executes complex chains of logic to arrive at the final output.</li>
              <li><strong>Speed Optimization:</strong> A relentless focus on returning results quickly to maintain the "instant gratification" aspect of the $1 purchase.</li>
            </ul>
          </div>
        </section>


        {/* === SECTION: DETAILED TOOL SPECS === */}
        <h1 className="section-title" style={{ marginTop: '6rem' }}>Comprehensive Tool Specifications</h1>
        <p className="subtitle">An exhaustive breakdown of every proposed tool, detailing the exact problems solved, required user inputs, backend processing logic, and the final structured outputs.</p>

        {/* 1. Proposal Generator */}
        <div id="tool-proposal" className="spec-box" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', marginBottom: '1rem' }}>🔥 Top-Tier Idea</div>
          <h3 className="h3-title">1. Proposal Generator</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Problem:</strong> Writing professional proposals is intensely time-consuming and often yields low conversion rates.<br/><strong>Impact:</strong> This tool directly impacts user income. People will pay for this daily.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Client requirement (text or notes)</li>
                <li>Budget constraints / Range</li>
                <li>Niche / Industry details</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Analyzes requirements against industry standards</li>
                <li>Generates persuasive, high-converting copy</li>
                <li>Calculates logical pricing breakdowns</li>
                <li>Formulates realistic timelines</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Full, professional proposal document</li>
                <li>Detailed pricing breakdown</li>
                <li>Project timeline</li>
                <li>Persuasive copy sections</li>
                <li><strong>Editable View:</strong> Template-based with elements changing and moving functionality (similar to Canva).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Scope Breakdown Tool */}
        <div id="tool-scope" className="spec-box">
          <h3 className="h3-title">2. Scope Breakdown Tool</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Problem:</strong> Clients request "just small work" which inevitably balloons into huge, unpaid scope creep.<br/><strong>Impact:</strong> Saves hours of negotiation and prevents massive financial loss for freelancers/agencies.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Vague client requirements (text, meeting notes, or emails)</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Converts vague text into structured technical language</li>
                <li><strong>Automatically adds hidden tasks</strong> that clients forget (QA, testing, deployment, documentation, revisions)</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Structured Scope of Work document</li>
                <li>Can act as an SRS (Software Requirement Specification) generator</li>
                <li>Can act as a Quotation/Proposal generator baseline</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Hiring Decision Tool */}
        <div id="tool-hiring" className="spec-box">
          <h3 className="h3-title">3. Hiring Decision Tool</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Problem:</strong> Bad hires are incredibly expensive for companies. Screening is tedious.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Target Job Role / Description</li>
                <li>Bulk resumes received (PDFs/Docs)</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Parses resumes en masse</li>
                <li>Matches skills and experience against the role</li>
                <li>Conducts risk analysis on candidate history</li>
                <li>Pulls market data for salary benchmarking</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Clear Hire / Reject signal per candidate</li>
                <li>Detailed risk analysis report</li>
                <li>Salary benchmark recommendations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Tweet Generator */}
        <div id="tool-tweet" className="spec-box">
          <h3 className="h3-title">4. Tweet Generator for X</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> Generate highly engaging, viral-ready content tailored to specific niches.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
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
              <h4>Backend Processing</h4>
              <ul>
                <li>Pulls real-time trending topics from Google Trends, YouTube, Reddit, and X</li>
                <li>Identifies proven viral hooks and content formats</li>
                <li>Uses AI to synthesize and generate high-engagement text</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>10 ready-to-post tweets</li>
                <li>Strong hooks + clean formatting applied</li>
                <li>Optional image ideas per tweet</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Domain Finder */}
        <div id="tool-domain" className="spec-box">
          <h3 className="h3-title">5. Domain Finder Tool</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> AI-powered tool to generate brandable domain names with real-time availability and risk checks.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Business niche + keywords</li>
                <li>Brand style (premium, catchy, techy, etc.)</li>
                <li>Domain extension (.com, .ai, .io, etc.)</li>
                <li>Budget / preferred length</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>AI generation of unique, non-generic names based on brand style</li>
                <li>Real-time domain availability API checks</li>
                <li>Trademark and existing business filtering algorithms</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>List of available domain names (ready to buy immediately)</li>
                <li>Categorized brand-style variations</li>
                <li>Quick risk and availability report for selected names</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6. Idea Validator */}
        <div id="tool-validator" className="spec-box">
          <h3 className="h3-title">6. Startup Idea Validator</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> Transforms a raw, untested idea into a complete, data-backed research dashboard.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Startup idea description</li>
                <li>Target market / audience definition</li>
                <li>Budget / scale preference</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Multi-agent research protocol investigating the core idea, existing competitors, past startup failures, and total market size</li>
                <li>Pulls real-world data and market trends</li>
                <li>Analyzes potential risks, ROI, and identifies market gaps</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Clean, visual dashboard presenting key insights</li>
                <li>Detailed competitor and failure analysis report</li>
                <li>Market opportunity and monetization breakdown</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Exam Prep */}
        <div id="tool-exam" className="spec-box">
          <h3 className="h3-title">7. Exam Prep Analyzer</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> The ultimate last-minute study tool that reverse-engineers past exam papers to identify scoring patterns.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Upload 3–5 previous year exam papers</li>
                <li>Exam format / pattern details</li>
                <li>Subject context</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>OCR and parsing of complex exam documents</li>
                <li>Detects repeated questions, semantic similarities, and patterns</li>
                <li>Extracts high-weight topics statistically likely to appear</li>
                <li>Generates customized practice material based on findings</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>List of critical, important, and repeated questions</li>
                <li>2–3 generated mock papers mirroring the exact format</li>
                <li>Condensed cheat sheets, flashcards, and quick quizzes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. Trading Assistant */}
        <div id="tool-trading" className="spec-box" style={{ borderLeft: '4px solid #f59e0b' }}>
          <h3 className="h3-title">8. Trading Assistant (Short-Term Focus)</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> Smart decision-making tool utilizing specific logic tailored exclusively for day trading or swing trading.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Trade details (asset ticker, amount, Stop Loss / Take Profit targets)</li>
                <li>User's risk appetite</li>
                <li>Mode constraint: Day trading OR Swing trading</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Heavy emphasis on Technical Indicators</li>
                <li>Short-term signal aggregation</li>
                <li>Real-time news API checks for sudden volatility</li>
                <li>Short-term sentiment and risk evaluation</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Clear, unambiguous decision signal (Go / No-Go)</li>
                <li>Mode-specific short-term market insights</li>
                <li>Actionable strategy improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 9. Investment Assistant */}
        <div id="tool-investment" className="spec-box" style={{ borderLeft: '4px solid #10b981' }}>
          <h3 className="h3-title">9. Investment Assistant (Long-Term Focus)</h3>
          <p className="subtitle" style={{ marginBottom: '1.5rem', fontSize: '1rem' }}><strong>Concept:</strong> Distinct decision-making tool utilizing logic tailored exclusively for long-term investing horizons.</p>
          
          <div className="tech-grid">
            <div className="tech-column">
              <h4>Exact User Inputs</h4>
              <ul>
                <li>Investment details (asset ticker, capital amount)</li>
                <li>User's risk appetite</li>
                <li>Mode constraint: Long-term investing (years/decades)</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Backend Processing</h4>
              <ul>
                <li>Heavy emphasis on Fundamental Analysis (earnings, debt, moat)</li>
                <li>Evaluation of long-term macro-economic trends</li>
                <li>Broader market sentiment and systemic risk evaluation</li>
              </ul>
            </div>
            <div className="tech-column">
              <h4>Structured Output</h4>
              <ul>
                <li>Clear, unambiguous decision signal (Go / No-Go)</li>
                <li>Mode-specific long-term insights (compounding potential, moat strength)</li>
                <li>Portfolio construction and strategy improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>


        {/* === SECTION: COMPREHENSIVE MARKETING === */}
        <h1 id="marketing" className="section-title" style={{ marginTop: '6rem' }}>Comprehensive Marketing & Growth Engine</h1>
        <p className="subtitle" style={{ maxWidth: '1000px' }}>
          The growth strategy is a compounding system built on six meticulously designed pillars. Each new tool, user, and piece of content is engineered to contribute to the overall platform's exponential growth.
        </p>

        <div className="strategy-grid" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
          
          {/* Pillar 1 */}
          <div id="marketing-seo" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem' }}>🔍</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>1. SEO-Led Growth (Utility-First Approach)</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The core baseline strategy is to leverage SEO through the individual utility tools themselves. Each tool acts as an independent entry point into the platform. If even one single tool ranks well on Google or goes viral, it brings consistent, high-intent organic traffic to the domain.<br/><br/>
                Because all tools are hosted under the same ecosystem, a compounding effect occurs: users discovering one tool are naturally exposed to others via internal linking. One successful tool boosts overall domain authority, increasing the ranking power of every subsequent tool we launch.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div id="marketing-reels" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem' }}>📱</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>2. Short-Form Content Distribution (Reels Strategy)</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The primary active distribution channel will be short-form video content (TikTok, IG Reels, YouTube Shorts). Every tool built will be converted into simple, engaging demo content.<br/><br/>
                <strong>Execution approach:</strong> Show the problem → Show the tool → Show the instant result. Keep videos short, clear, and outcome-focused. Initially, there will be no heavy branding—the absolute focus is on utility and value demonstration.<br/><br/>
                <strong>Platforms:</strong> LinkedIn, Twitter (X), Instagram, Reddit (native video or clips). Consistency is the key driver. The goal is volume + clarity over perfection.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div id="marketing-user" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem' }}>💡</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3. User-Driven Idea Generation</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The platform will include a prominent feature allowing users to suggest new utility tools they desperately need. This creates a continuous idea pipeline without internal brainstorming bottlenecks, providing instant validation from real user demand.<br/><br/>
                It fosters higher engagement and a deep sense of ownership from the community. Over time, this evolves into a public voting system for the most requested tools, allowing us to build "requested by users" tools that guarantee high retention and identify high-demand niches much faster.
              </p>
            </div>
          </div>

          {/* Pillar 4 */}
          <div id="marketing-referral" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem' }}>🔗</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>4. Referral Loop (Credit-Based Growth)</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                A built-in referral system incentivizes users to aggressively invite others. <br/><br/>
                <strong>Mechanism:</strong> When a user signs up or uses a tool via a referral link, both the referrer and the new user receive extra free credits. <br/><br/>
                <strong>Purpose:</strong> This encourages organic sharing, drastically reduces Customer Acquisition Cost (CAC), and increases overall platform usage through injected credits. It engineers a viral loop: More users → More credits → More usage → More sharing.
              </p>
            </div>
          </div>

          {/* Pillar 5 */}
          <div id="marketing-free" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem' }}>🆓</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>5. Free Tool Layer (Zero-Cost Utilities for Traffic)</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                A strategic portion of the platform will consist of completely free utility tools. These are specifically tools that have little to no backend or API cost, relying on simple frontend/backend processing logic without expensive external dependencies.<br/><br/>
                <strong>Purpose:</strong> Remove all friction for new users, rapidly increase organic traffic and dwell time, and strengthen SEO through high engagement and repeat visits.<br/><br/>
                <strong>The Funnel Strategy:</strong> We use free tools as massive entry points into the ecosystem. Once inside, we internally guide users toward the premium/credit-based tools. We build immense trust by delivering immediate value at absolutely no cost. (Free tools → User trust → Platform exploration → Paid tool usage).
              </p>
            </div>
          </div>

          {/* Pillar 6 */}
          <div id="marketing-brand" className="strategy-card" style={{ flexDirection: 'row', alignItems: 'flex-start', gap: '2rem', borderColor: 'var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)' }}>
            <div className="icon-wrap" style={{ flexShrink: 0, width: '80px', height: '80px', fontSize: '2.5rem', background: 'var(--accent-primary)', color: '#fff' }}>🏷️</div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>6. Brand Positioning (Low-Cost, High-Utility Mental Model)</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                The entire platform is built around a brilliantly simple and powerful mental model: <strong>Affordable, accessible, utility-first tools — identical to the psychology of a "$1 store".</strong><br/><br/>
                <strong>Key Advantages:</strong> It is instantly understandable with zero complex explanations needed. It possesses incredibly strong recall value due to familiar pricing psychology. Users are already universally conditioned to associate "low-cost" with low-risk experimentation.<br/><br/>
                <strong>Psychological Impact:</strong> It actively reduces hesitation ("it's cheap, I'll just try it"), encourages repeat usage across multiple different tools, and permanently positions the platform as the go-to destination for quick, affordable solutions. This makes the product incredibly easy to market, easy to remember, and easy to adopt at massive scale.
              </p>
            </div>
          </div>

        </div>

        <section id="conclusion" className="spec-box" style={{ marginTop: '4rem', textAlign: 'center', background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Summary Conclusion</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            These pillars and tools reinforce a compounding system where <strong>accessibility + value → massive engagement → sustainable monetization.</strong> By solving the subscription fatigue problem and offering structured outputs instead of raw AI chat, the $1 Utility Tools platform is positioned for rapid, viral adoption.
          </p>
        </section>

        <footer style={{ marginTop: '8rem', paddingBottom: '4rem', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
          <p>© 2026 Utility Tools Platform • Master Vision Document v3.0</p>
          <p style={{ marginTop: '0.5rem' }}>Highly Confidential & Proprietary Strategic Vision</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
