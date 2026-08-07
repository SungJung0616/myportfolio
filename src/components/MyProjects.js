import React from 'react';
import PortfolioCard from './PortfolioCard';
import fridge from '../assets/fridge.png';
import shoppingmall from '../assets/shopping_Mall.png';
import todoApp from '../assets/todo.png';
import sungFlix from '../assets/sungFlix.png';
import cityWeather from '../assets/cityWeatherapp.png';
import diceGame from '../assets/diceGame.png';

const projects = [
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
      <div><p className="eyebrow">Project archive</p><h2>Where the building habit started.</h2></div>
      <p>Selected projects from my full-stack coursework and independent practice. They are kept here as an honest record of progression—not presented as production systems.</p>
    </div>
    <div className="archive-grid">{projects.map(project => <PortfolioCard key={project.title} {...project} />)}</div>
    <a className="text-link" href="https://github.com/SungJung0616" target="_blank" rel="noreferrer">View the complete GitHub archive <span>↗</span></a>
  </section>
);

export default MyProjects;
