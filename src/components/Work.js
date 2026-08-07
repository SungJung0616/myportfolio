import React from 'react';
import { Link } from 'react-router-dom';

const Work = () => (
  <section className="section" id="work">
    <div className="section-heading"><p className="eyebrow">Selected work</p><h2>Systems improved through testing and automation.</h2></div>
    <div className="case-grid">
      <article className="case-card featured">
        <div className="case-meta"><span>01</span><span>Game QA</span></div>
        <div><p className="case-kicker">Studio Sai · Eternights</p><h3>Faster regression without weakening coverage.</h3><p>Supported development and PlayStation release QA through manual and regression testing, bug reporting, and UI-focused validation with Unity Test Framework. Developer save states and checkpoints reduced repeat traversal during regression.</p><Link className="case-link" to="/case-studies/eternights-qa">Read case study <span>↗</span></Link></div>
        <div className="tags"><span>PlayStation QA</span><span>Regression</span><span>Unity</span></div>
      </article>
      <article className="case-card">
        <div className="case-meta"><span>02</span><span>Data + operations</span></div>
        <div><p className="case-kicker">GPS Logix</p><h3>Automation and workflow design across two roles.</h3><p>From Python-based order transformation to designing warehouse workflows supporting high-volume 3PL fulfillment.</p><div className="case-link-group"><Link className="case-link" to="/case-studies/gps-order-automation">Order automation <span>↗</span></Link><Link className="case-link" to="/case-studies/gps-3pl-operations">3PL operations <span>↗</span></Link></div></div>
        <div className="tags"><span>Python</span><span>Extensiv WMS</span><span>Workflow design</span></div>
      </article>
      <article className="case-card"><div className="case-meta"><span>03</span><span>Business systems</span></div><div><p className="case-kicker">LAYRD</p><h3>Operating the systems behind an independent brand.</h3><p>Own and support the operational and technical side of a Shopify-based home goods business, including storefront configuration, fulfillment, shipping, returns, financial records, and trademark administration.</p><Link className="case-link" to="/case-studies/layrd-operations">Read case study <span>↗</span></Link></div><div className="tags"><span>Shopify</span><span>Operations</span><span>Ownership</span></div></article>
    </div>
    <div className="experience-block">
      <div className="section-heading"><p className="eyebrow">Experience</p><h2>A career built across quality and operations.</h2></div>
      <div className="timeline">
        <div className="timeline-row"><span>2024 — Present</span><div><h3>Operations Manager</h3><p>GPS Logix · Account &amp; warehouse operations</p></div></div>
        <div className="timeline-row"><span>Dec 2021 — May 2024</span><div><h3>QA Engineer</h3><p>Studio Sai · Remote from South Korea</p></div></div>
        <div className="timeline-row"><span>Jun 2016 — Nov 2021</span><div><h3>Database Manager</h3><p>GPS Logix · California</p></div></div>
      </div>
    </div>
  </section>
);

export default Work;
