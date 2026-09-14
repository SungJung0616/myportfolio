import React from 'react';
import PortfolioCard from './PortfolioCard';
import fridge from '../assets/fridge.png';
import shoppingmall from '../assets/shopping_Mall.png';
import todoApp from '../assets/todo.png';
import sungFlix from '../assets/sungFlix.png';
import cityWeather from '../assets/cityWeatherapp.png';
import diceGame from '../assets/diceGame.png';

const projects = [
  { title: 'Remembering Young Hoon', description: 'A bilingual memorial archive with reviewed submissions, private media storage, role-based administration, and AWS image processing. Independently led from planning through deployment with AI-assisted development.', link: 'https://github.com/SungJung0616/father-memorial-site', liveLink: 'https://father-memorial-test.netlify.app/', caseStudy: '/case-studies/remembering-young-hoon', type: 'Independent deployed project · AI-assisted' },
  { title: "What's in Your Fridge", description: 'A group-built recipe discovery experience connecting meal ideas with ingredient shopping.', imgSrc: fridge, link: 'https://github.com/SungJung0616/cooking-recipe-fe/tree/master', liveLink: 'https://whats-is-your-fridge.netlify.app/', type: 'Group full-stack project' },
  { title: 'SJ Shopping Mall', description: 'An end-to-end learning project for browsing and purchasing apparel online.', imgSrc: shoppingmall, link: 'https://github.com/SungJung0616/shoppin-mall-fe', liveLink: 'https://sj-shopping-mall.netlify.app/', type: 'Individual full-stack project' },
  { title: 'Task Manager', description: 'An authenticated task application with create, edit, delete, and filtering workflows.', imgSrc: todoApp, link: 'https://github.com/SungJung0616/toDo-fe', liveLink: 'https://sj-todo-demo.netlify.app/', type: 'Individual full-stack project' },
  { title: 'SungFlix', description: 'A responsive movie discovery interface built while learning React and external APIs.', imgSrc: sungFlix, link: 'https://github.com/SungJung0616/netflix-demo', liveLink: 'https://sj-sungflix-demo.netlify.app/', type: 'Frontend learning project' },
  { title: 'City Weather', description: 'Location and search-based weather data presented through a focused React interface.', imgSrc: cityWeather, link: 'https://github.com/SungJung0616/cityweatherapp', liveLink: 'https://sj-cityweatherapp.netlify.app/', type: 'Frontend learning project' },
  { title: 'Dice Game', description: 'A compact two-player React game exploring state, interaction, and replay logic.', imgSrc: diceGame, link: 'https://github.com/SungJung0616/diceGame', liveLink: 'https://sj-diceplay.netlify.app/', type: 'Frontend learning project' }
];

const MyProjects = () => (
  <section className="section archive-section" id="archive">
    <div className="section-heading split-heading">
      <div><p className="eyebrow">Project archive</p><h2>From learning projects to working systems.</h2></div>
      <p>A record of my building journey, from full-stack coursework and independent practice to deployed personal systems. Each project is labeled to distinguish learning work, team contributions, and end-to-end project ownership.</p>
    </div>
    <div className="archive-grid">{projects.map(project => <PortfolioCard key={project.title} {...project} />)}</div>
    <a className="text-link" href="https://github.com/SungJung0616" target="_blank" rel="noreferrer">View the complete GitHub archive <span>↗</span></a>
  </section>
);

export default MyProjects;
