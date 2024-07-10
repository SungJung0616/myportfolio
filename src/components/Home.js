import React from 'react';
import cssLogo from '../assets/CSS.svg';
import jsLogo from '../assets/JavaScript.svg';
import HTMLLogo from '../assets/HTML.svg';
import NodeLogo from '../assets/NodeJS-Dark.svg';
import PythonLogo from '../assets/Python-Light.svg';
import ExpressLogo from '../assets/ExpressJS-Light.svg';
import GithubLogo from '../assets/Github-Light.svg';
import JqueryLogo from '../assets/JQuery.svg';
import ReactLogo from '../assets/React.svg';
import MongoDBLogo from '../assets/MongoDB.svg';
import NetlifyLogo from  '../assets/Netlify-Dark.svg';
import image from '../assets/profile.png';
import PostgresLogo from '../assets/PostgreSQL-Dark.svg';

const Home = () => {

    const handleHireMeClick = () => {
        window.location.href = "mailto:sungjung0616@gmail.com?subject=Job Opportunity";
      };

    const handleDownloadResumeClick = () => {
        window.open(`${process.env.PUBLIC_URL}/2024 Sung Resume.pdf`, '_blank');
    };

  return (
    <div className="home" id="home">
      <div className="main">
        <h4>Hi, I Am <span>Sung Jung</span> 👋</h4>
        <p className="title">FullStack Web Developer with QA Experience</p>
        <p className="subtitle">I build robust and user-friendly applications with a focus on quality and efficiency. I'm passionate about continuous learning and improving my skills.</p>        
      </div>

      <h5 className="seprator">Who I Am</h5>

      <div className="about-me">
        <img src={image} alt="Sung Jung" />
        <div className="info">
          <h3>About Me</h3>
          <p>
            I am a passionate FullStack Web Developer with 2 years of experience in QA and 7 years in e-commerce. My journey began in the warehouse, where I handled transportation logistics, receiving, sales, online sales, and data analysis. Through my experience in QA, I have developed a keen eye for detail and a commitment to quality. My goal is to create seamless, user-friendly applications that make a difference.
          </p>
          <div className='about-buttons'>
            <button className="hire-btn" onClick={handleHireMeClick}>Hire Me</button>
            <button className="download-btn" onClick={handleDownloadResumeClick}>Download Resume</button>
          </div>
        </div>
      </div>

      <h5 className="seprator">My Skills</h5>
      <div className="skills">
        <div className="left">
          <div className="info">
            <h3>What My Programming Skills Include</h3>
            <p>
              I develop simple, intuitive, and responsive user interfaces that help users get things done with less effort and time using the following technologies:
            </p>
          </div>
          <button className="hire-btn" onClick={handleHireMeClick}>Hire Me</button>          
        </div>

        <div className="right">
          <div className="item">
           <img src={PythonLogo} alt='python'/>
          </div>
          <div className="item">
           <img src={jsLogo} alt='js'/>
          </div>
          <div className="item">
            <img src={cssLogo} alt='css'/>
          </div>          
          <div className="item">
          <img src={HTMLLogo} alt='HTML'/>
          </div>
          <div className="item">
          <img src={ReactLogo} alt='react'/>
          </div>
          <div className="item">
          <img src={JqueryLogo} alt='Jquery'/>
          </div>
          <div className="item">
          <img src={NodeLogo} alt='node'/>
          </div>          
          <div className="item">
          <img src={ExpressLogo} alt='express'/>
          </div>       
          <div className="item">
          <img src={GithubLogo} alt='github'/>
          </div>
          <div className="item">
          <img src={MongoDBLogo} alt='mongo'/>
          </div>          
          <div className="item">
          <img src={PostgresLogo} alt='postgresl'/>
          </div>
          <div className="item">
          <img src={NetlifyLogo} alt='Netlify'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
