import React from 'react';
import { Link } from 'react-router-dom';

const GPSOrderAutomation = () => (
  <article className="case-study-page">
    <header className="case-study-hero">
      <Link className="back-link" to="/">← Selected work</Link>
      <p className="eyebrow">Case study 02 · Order data automation</p>
      <h1>Three hours.<br /><span>Reduced to thirty minutes.</span></h1>
      <p className="case-study-lede">A Python-based workflow that transformed daily Coupang order files into validated, upload-ready shipping data—with human review retained at the final step.</p>
      <dl className="case-facts"><div><dt>Role</dt><dd>Database Manager</dd></div><div><dt>Company</dt><dd>GPS Logix</dd></div><div><dt>Period</dt><dd>Jun 2016 — Nov 2021</dd></div><div><dt>Stack</dt><dd>Python · openpyxl · Excel</dd></div></dl>
    </header>

    <section className="case-story compact-story"><aside><p className="eyebrow">The problem</p><p className="aside-note">Company templates and internal systems remain private.</p></aside><div><h2>Marketplace orders arrived in a format the shipping system could not use directly.</h2><p>Daily Coupang files required repeated cleanup, product mapping, validation, and restructuring before they could be uploaded to the GPS shipping system.</p></div></section>

    <section className="workflow-panel"><p className="eyebrow">The pipeline</p><div className="workflow-steps"><span>Import</span><i>→</i><span>Map</span><i>→</i><span>Normalize</span><i>→</i><span>Validate</span><i>→</i><span>Flag</span><i>→</i><span>Prepare for Upload</span></div></section>

    <section className="case-story action-section"><aside><p className="eyebrow">Reliability by design</p></aside><div><h2>Automation was useful only if the output could be trusted.</h2><div className="step-list"><div><span>01</span><h3>Mapped inconsistent source fields</h3><p>Located order fields by their headers and mapped marketplace product data to the structure required downstream.</p></div><div><span>02</span><h3>Standardized shipping data</h3><p>Converted recurring recipient, postal code, product-option, and quantity fields into consistent formats.</p></div><div><span>03</span><h3>Validated critical fields</h3><p>Checked required customs and contact values, product mappings, and conditions that needed manual review.</p></div><div><span>04</span><h3>Flagged exceptions before upload</h3><p>Separated incomplete or suspicious records into an error workbook instead of allowing them to silently enter the next step.</p></div></div></div></section>

    <section className="case-story scope-section"><aside><p className="eyebrow">What I owned</p></aside><div><h2>From workflow analysis to tested operational automation.</h2><p className="ownership-summary">I analyzed the existing manual workflow, identified repeatable transformation and validation steps, implemented the automation, tested output against the existing process, and refined exception handling based on real operational cases.</p><div className="scope-grid"><div><h3>My contribution</h3><ul><li>Manual workflow mapping</li><li>Python and Excel transformation logic</li><li>Product, option, and quantity mapping</li><li>Pre-upload validation and exception output</li><li>Testing against the existing daily process</li></ul></div><div><h3>Human and internal controls</h3><ul><li>Marketplace file download</li><li>Review of flagged records</li><li>Final upload to the GPS website</li><li>Internal address and customs validation</li><li>Final shipping decisions</li></ul></div></div><a className="case-link external-case-link" href="https://github.com/SungJung0616/AutomationCoupangOrder" target="_blank" rel="noreferrer">View the public code example <span>↗</span></a></div></section>

    <section className="result-panel"><div><p className="eyebrow">Approximate daily processing time</p><strong>~3h → ~30m</strong></div><p>The workflow handled repetitive preparation while I worked on other tasks. Human review remained at the final step, balancing speed with operational control.</p></section>

    <section className="case-story lesson-story"><aside><p className="eyebrow">Lesson</p></aside><div><h2>Reliable automation does not hide uncertainty.</h2><p>The strongest improvement was not simply faster file preparation. It was making exceptions visible early enough for a person to correct them before the data entered the shipping process.</p></div></section>

    <section className="case-next"><p className="eyebrow">Next GPS story</p><h2>From data workflow to warehouse operations.</h2><Link className="button primary" to="/case-studies/gps-3pl-operations">Read the 3PL case study</Link></section>
  </article>
);

export default GPSOrderAutomation;
