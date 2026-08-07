import React from 'react';
import PythonLogo from '../assets/Python-Light.svg';
import jsLogo from '../assets/JavaScript.svg';
import HTMLLogo from '../assets/HTML.svg';
import cssLogo from '../assets/CSS.svg';
import ReactLogo from '../assets/React.svg';
import NodeLogo from '../assets/NodeJS-Dark.svg';
import PostgresLogo from '../assets/PostgreSQL-Dark.svg';
import GithubLogo from '../assets/Github-Light.svg';

const skills = [
  [PythonLogo, 'Python'], [jsLogo, 'JavaScript'], [HTMLLogo, 'HTML'],
  [cssLogo, 'CSS'], [ReactLogo, 'React'], [NodeLogo, 'Node.js'],
  [PostgresLogo, 'PostgreSQL'], [GithubLogo, 'GitHub']
];

const Home = () => (
  <>
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Gardena, California</p>
        <h1>QA discipline.<br /><span>Automation mindset.</span></h1>
        <p className="hero-lede">
          I bridge software quality, operational systems, and practical automation—turning repetitive workflows into reliable, testable processes.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
          <a className="button secondary" href={`${process.env.PUBLIC_URL}/resume/Sung_Jung_Resume.pdf`} download="Sung_Jung_Resume.pdf">Download resume</a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="Career highlights">
        <p className="panel-label">Selected impact</p>
        <div className="metric"><strong>8h → 4h</strong><span>Regression cycle improved with reusable save-state checkpoints</span></div>
        <div className="metric"><strong>3h → 30m</strong><span>Recurring data preparation and ERP upload workflow automated</span></div>
        <div className="metric"><strong>1 shipped title</strong><span>Eternights — development and PlayStation release QA</span></div>
      </aside>
    </section>

    <section className="section skills-section" id="skills">
      <div className="section-heading split-heading">
        <div><p className="eyebrow">Capabilities</p><h2>What My Programming Skills Include</h2></div>
        <p>I use code as a practical tool for validation, workflow automation, data handling, and building clear user experiences.</p>
      </div>
      <div className="skill-grid">
        {skills.map(([icon, label]) => <div className="skill-card" key={label}><img src={icon} alt="" /><span>{label}</span></div>)}
      </div>
      <div className="capability-row">
        <span>Manual & regression testing</span><span>Unity Test Framework</span><span>Google Apps Script</span><span>Selenium projects</span><span>Data validation</span><span>ERP / WMS operations</span>
      </div>
    </section>
  </>
);

export default Home;
