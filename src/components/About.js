import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import image from '../assets/profile.png';

const About = () => {
    const handleAvailableClick = (event) => {
        event.preventDefault();
        
        alert('Available for Job!');
      };
    
      const handleHireMeClick = () => {
        window.location.href = "mailto:sungjung0616@gmail.com?subject=Job Opportunity";
      };
    
      const handleCopyEmailClick = () => {
        navigator.clipboard.writeText('sungjung0616@gmail.com');
        alert('Email address copied to clipboard!');
      };

  return (
    <div className="about" id="about">
      <div className="left">
        <h3>Full Stack Web Developer with <span className="qa">QA</span> Experience</h3>
        <div className="info">
          <h2>I'm Sung Jung</h2>
          <p>
            I strive to be an authentic developer who values honesty, embraces others perspectives and blends ideas to move forward positively.
          </p>
          <div className="buttons">
            <button className="hire" onClick={handleHireMeClick}>
              Hire Me <FontAwesomeIcon icon={faPlus} />
            </button>
            <button className="email" onClick={handleCopyEmailClick}>
              Copy Email <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>
      </div>

      <div className="right">
        <a className="online" onClick={handleAvailableClick}>
          <FontAwesomeIcon icon={faCircleSolid} className="fa-job" /> Available For Job
        </a>
        <img src={image} alt="Profile" />
      </div>    
    </div>
  )
}

export default About
