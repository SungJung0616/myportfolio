import React from 'react';

const initiatives = [
  { status: 'In progress', title: 'CareerOS', text: 'Building a verified source of truth for resumes, portfolio content, interview stories, and long-term career development.' },
  { status: 'Planning', title: 'WarehouseOS · Inbound Automation', text: 'Mapping a traceable inbound workflow with duplicate prevention, quantity validation, exception logging, and human review.' },
  { status: 'Planning', title: 'Market Intelligence Lab', text: 'Defining a testable Python data pipeline for explainable market analysis—focused on evidence, not stock prediction.' }
];

const About = () => (
  <section className="section now-section" id="now">
    <div className="section-heading split-heading"><div><p className="eyebrow">Now / build log</p><h2>Work in progress, shown honestly.</h2></div><p>This public view is intentionally curated. Detailed notes stay private; milestones will be updated only after they are verified.</p></div>
    <div className="now-grid">{initiatives.map(item => <article key={item.title}><span className={`status ${item.status === 'In progress' ? 'active' : ''}`}>{item.status}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    <div className="contact-card">
      <div><p className="eyebrow">Let’s work together</p><h2>Looking for someone who understands both the test and the system?</h2></div>
      <div className="contact-actions"><a className="button primary" href="mailto:sungjung0616@gmail.com?subject=Portfolio%20inquiry">Email Sung</a><a className="button secondary" href={`${process.env.PUBLIC_URL}/resume/Sung_Jung_Resume.pdf`} download="Sung_Jung_Resume.pdf">Download resume</a></div>
    </div>
  </section>
);

export default About;
