import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  return (
    <footer>
      <a href="#">My Portfolio</a>
      <div className="socials">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="icon" />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </a>
      </div>
      <a className="online" href="#"><FontAwesomeIcon icon={faCircleSolid} className="fa-job" /> Available For Job</a>
    </footer>
  );
};

export default Footer;
