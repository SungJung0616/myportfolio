import React from 'react';
import { Link } from 'react-router-dom';

const EternightsCaseStudy = () => (
  <article className="case-study-page">
    <header className="case-study-hero">
      <Link className="back-link" to="/">← Selected work</Link>
      <p className="eyebrow">Case study 01 · Game QA</p>
      <h1>Eternights:<br /><span>release-focused QA.</span></h1>
      <p className="case-study-lede">How repeatable checkpoints helped shorten regression cycles while supporting development and PlayStation release validation.</p>
      <dl className="case-facts"><div><dt>Role</dt><dd>QA Engineer</dd></div><div><dt>Company</dt><dd>Studio Sai</dd></div><div><dt>Period</dt><dd>Dec 2021 — May 2024</dd></div><div><dt>Arrangement</dt><dd>Remote from South Korea</dd></div></dl>
    </header>
    <section className="case-story"><aside><p className="eyebrow">Context</p><p className="aside-note">This case study describes my verified contribution and intentionally excludes confidential project details.</p></aside><div><h2>Testing a narrative action game across development and release.</h2><p>I supported the QA process for <em>Eternights</em>, combining hands-on gameplay testing, regression testing, bug reporting, and repeatable UI-focused validation. The work required careful coverage of issues that could appear across different game states while supporting a PlayStation release.</p></div></section>
    <section className="case-story"><aside><p className="eyebrow">Challenge</p></aside><div><h2>Regression could require replaying large portions of the game.</h2><p>Repeated validation of later scenarios could involve progressing through earlier content again. That made regression cycles slower and reduced the time available for focused verification of specific fixes and affected areas.</p></div></section>
    <section className="case-story action-section"><aside><p className="eyebrow">Approach</p></aside><div><h2>Make the path to each test state repeatable.</h2><div className="step-list"><div><span>01</span><h3>Use targeted checkpoints</h3><p>Worked with developer-provided save states and checkpoints to reach relevant scenarios without replaying the entire path from the beginning.</p></div><div><span>02</span><h3>Validate manually and repeatedly</h3><p>Combined focused manual testing and regression coverage with repeatable checks appropriate to the issue under review.</p></div><div><span>03</span><h3>Use available Unity testing support</h3><p>Used Unity Test Framework capabilities in the existing development environment for UI-focused automated validation and reviewed the resulting behavior.</p></div><div><span>04</span><h3>Report actionable findings</h3><p>Documented defects and test results so developers could reproduce issues and verify changes through subsequent regression passes.</p></div></div></div></section>
    <section className="result-panel"><div><p className="eyebrow">Observed result</p><strong>~8h → ~4h</strong></div><p>The improved regression workflow reduced an approximately eight-hour test cycle to about four hours by cutting repeated traversal—not by removing necessary validation.</p></section>
    <section className="case-story scope-section"><aside><p className="eyebrow">Contribution boundary</p></aside><div><h2>What I did—and what I do not claim.</h2><div className="scope-grid"><div><h3>My contribution</h3><ul><li>Manual and regression testing</li><li>Bug reporting and result review</li><li>PlayStation release QA support</li><li>UI-focused validation using available Unity Test Framework features</li><li>Checkpoint-based regression workflow improvement</li></ul></div><div><h3>Not represented as my work</h3><ul><li>Designing Unity Test Framework itself</li><li>Building the project’s complete automation framework</li><li>Owning CI integration</li><li>Sole ownership of the overall QA or release process</li></ul></div></div></div></section>
    <section className="case-next"><p className="eyebrow">Next</p><h2>Explore the rest of the portfolio.</h2><Link className="button primary" to="/">Return to selected work</Link></section>
  </article>
);

export default EternightsCaseStudy;
