import React from 'react';
import PortfolioCard from './PortfolioCard';
import shoppingmall from '../assets/shopping_Mall.png';
import fridge from '../assets/fridge.png';
import sungFlix from '../assets/sungFlix.png';
import todoApp from '../assets/todo.png';
import cityWeather from '../assets/cityWeatherapp.png';
import diceGame from '../assets/diceGame.png';
import handbattle from '../assets/handBattle.png';
import simonGame from '../assets/simonGame.png';

const projects = [
  {
    title: "What's in your fridge (Frontend), (Backend)",
    description: 'What’s in your fridge is a website where users can browse various recipes and easily purchase the necessary ingredients.',
    imgSrc: fridge,
    link: 'https://github.com/SungJung0616/cooking-recipe-fe/tree/master',
    liveLink: 'https://whats-is-your-fridge.netlify.app/',
    type: 'Group Project'
  },
  {
    title: "SJ Shopping Mall (Frontend, Backend)",
    description: 'SJ is a website where users can conveniently purchase a variety of clothes.',
    imgSrc: shoppingmall,
    link: 'https://github.com/SungJung0616/shoppin-mall-fe',
    liveLink: 'https://sj-shopping-mall.netlify.app/account/profile',
    type: 'Individual Project'
  },
  {
    title: 'ToDo App (Frontend, Backend)',
    description: 'A Todo List application built using JavaScript, React, Bootstrap, and CSS. This application allows users to register, log in, and manage their tasks efficiently. Users can add, edit, delete, and filter tasks, with tasks being stored securely on the backend.',
    imgSrc: todoApp,
    link: 'https://github.com/SungJung0616/toDo-fe',
    liveLink: 'https://sj-todo-demo.netlify.app/',
    type: 'Individual Project'
  },
  {
    title: 'Netflix Demo',
    description: 'SUNGFLIX is a website where you can view various movie information at a glance.',
    imgSrc: sungFlix,
    link: 'https://github.com/SungJung0616/netflix-demo',
    liveLink: 'https://sj-sungflix-demo.netlify.app/',
    type: 'Individual Project'
  },
  {
    title: 'City Weather App',
    description: "A Weather App project created using JavaScript, React, and CSS. The app fetches weather data for the user's current location or a searched city and displays the current weather conditions, including temperature, humidity, and wind speed.",
    imgSrc: cityWeather,
    link: 'https://github.com/SungJung0616/cityweatherapp',
    liveLink: 'https://sj-cityweatherapp.netlify.app/',
    type: 'Individual Project'
  },
  {
    title: 'Dice Game',
    description: "A game project called Dice Game made using JavaScript, React, and CSS. Two players roll dice and compete to see who gets the higher number. The player with the higher number wins, and the game can be replayed as many times as desired.",
    imgSrc: diceGame,
    link: 'https://github.com/SungJung0616/diceGame',
    liveLink: 'https://sj-diceplay.netlify.app/',
    type: 'Individual Project'
  },
  {
    title: 'Hand Battle',
    description: 'A game project called Hand Battle made using JavaScript, React, and CSS. It follows the same rules as the classic Rock, Paper, Scissors game. Users can select one of the items (Rock, Paper, Scissors), and the computer randomly selects one item. The outcome can be Win, Lose, or Tie. If the result is Win, the user scores 1 point. Scores can be reset at any time using the Reset button.',
    imgSrc: handbattle,
    link: 'https://github.com/SungJung0616/handbattle',
    liveLink: 'https://sj-handbattle.netlify.app/',
    type: 'Individual Project'
  },
  {
    title: 'Simon Game',
    description: 'A game project called Simon Game made using JavaScript, React, and CSS. The game follows the classic Simon Game rules where users need to memorize and replicate the sequence of colors displayed. The game gets progressively more challenging as the sequence grows longer. The score increases with each level, and players can track their best score.',
    imgSrc: simonGame,
    link: 'https://github.com/SungJung0616/simongameapp',
    liveLink: 'https://sj-simongame.netlify.app/',
    type: 'Individual Project'
  }
];

const MyProjects = () => {
  return (
    <div className="portfolio" id="portfolio">
      <div className="header">
        <div className="info">
          <h5>Recent Projects</h5>
          <h3>My Portfolio</h3>
        </div>
      </div>
      <div className="portfo-items">
        {projects.map((project, index) => (
          <PortfolioCard
            key={index}
            title={project.title}
            description={project.description}
            imgSrc={project.imgSrc}
            link={project.link}
            liveLink={project.liveLink}
            type={project.type}
          />
        ))}
      </div>
    </div>
  )
}

export default MyProjects;
