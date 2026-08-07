import React from 'react';
import { Link } from 'react-router-dom';

const LayrdCaseStudy = () => (
  <article className="case-study-page">
    <header className="case-study-hero layrd-hero">
      <Link className="back-link" to="/">← Selected work</Link>
      <p className="eyebrow">Case study 04 · Business operations</p>
      <h1>Operating the systems<br /><span>behind LAYRD.</span></h1>
      <p className="case-study-lede">Owning the operational, technical, financial, and administrative work that helps a small Shopify business move from customer order to reliable delivery.</p>
      <dl className="case-facts"><div><dt>Role</dt><dd>Owner · Operations &amp; Systems</dd></div><div><dt>Business</dt><dd>LAYRD</dd></div><div><dt>Started</dt><dd>July 2025</dd></div><div><dt>Platform</dt><dd>Shopify · UPS</dd></div></dl>
    </header>

    <section className="case-story compact-story"><aside><p className="eyebrow">The business</p></aside><div><h2>A real storefront with real operational consequences.</h2><p>LAYRD is an independent home and tableware brand selling through a Shopify storefront and local retail partnerships. Running it reinforced that customer experience depends on more than the website: fulfillment, shipping, returns, records, and administration all have to work together.</p></div></section>

    <section className="case-story role-story"><aside><p className="eyebrow">Role clarity</p></aside><div><h2>Ownership with a defined operating scope.</h2><p>I legally own LAYRD and operate the business with a partner. My work centers on storefront systems, fulfillment support, shipping labels, returns, financial records, CPA preparation, and trademark administration. Product sourcing, inventory, brand content, advertising, and customer communication are led by my operating partner.</p><div className="role-note">The business is collaborative. This case study focuses only on the work I personally perform.</div></div></section>

    <section className="workflow-panel layrd-flow"><p className="eyebrow">Order-to-operations flow</p><div className="workflow-steps"><span>Shopify Order</span><i>→</i><span>Review</span><i>→</i><span>Fulfillment</span><i>→</i><span>UPS Label</span><i>→</i><span>Delivery</span><i>→</i><span>Return</span></div></section>

    <section className="case-story action-section"><aside><p className="eyebrow">What I own</p></aside><div><h2>The infrastructure around the storefront.</h2><div className="step-list"><div><span>01</span><h3>Storefront systems</h3><p>Configured the custom domain and supported Shopify setup, third-party connections, and customer-facing functionality.</p></div><div><span>02</span><h3>Technical troubleshooting</h3><p>Investigated and corrected storefront issues, including broken buttons and interactions that interrupted the purchase experience.</p></div><div><span>03</span><h3>Shipping and returns</h3><p>Share order fulfillment responsibilities and take primary ownership of shipping-label creation and returns processing.</p></div><div><span>04</span><h3>Financial administration</h3><p>Maintain transaction and expense records and prepare the supporting business documentation used for CPA review.</p></div></div></div></section>

    <section className="case-story trademark-story"><aside><p className="eyebrow">Learning a new system</p></aside><div><h2>Taking the trademark process from research to registration.</h2><p>I independently researched and completed the LAYRD trademark application process, using AI-assisted research to understand documentation and administrative requirements. The work required learning an unfamiliar process, tracking details carefully, and following it through to registration.</p><p className="disclaimer-note">This describes business administration work, not the provision of legal advice.</p></div></section>

    <section className="channels-panel"><div><p className="eyebrow">Where LAYRD operates</p><h2>Online commerce with local touchpoints.</h2></div><div className="channel-grid"><div><strong>Shopify</strong><span>Direct-to-consumer storefront</span></div><div><strong>CLAEDO</strong><span>Consignment at ROW DTLA</span></div><div><strong>Baking Room</strong><span>Display, consignment, and local pickup</span></div></div></section>

    <section className="case-story lesson-story"><aside><p className="eyebrow">What I learned</p></aside><div><h2>The interface is only one part of the customer experience.</h2><p>LAYRD strengthened my ability to think across connected systems. A working storefront still depends on accurate handoffs, reliable fulfillment, usable shipping flows, clear financial records, and a return process that works after the sale.</p></div></section>

    <section className="brand-links-panel"><div><p className="eyebrow">See the business</p><h2>Visit LAYRD.</h2></div><div><a className="button primary" href="https://layrd-shop.com/" target="_blank" rel="noreferrer">Visit the store ↗</a><a className="button secondary" href="https://www.instagram.com/layrd.shop" target="_blank" rel="noreferrer">Instagram ↗</a></div></section>
  </article>
);

export default LayrdCaseStudy;
