import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  return (
    <div className="nav">
      <div className="logo">
        <FontAwesomeIcon icon={faCode} className='fa-code' />
      </div>
      <div className="links">
      <Link 
          to="home" 
          smooth={true} 
          duration={250} 
          className="nav-link" 
          activeClass="active"
        >
          Home
        </Link>
        <Link 
          to="works" 
          smooth={true} 
          duration={250} 
          className="nav-link" 
          activeClass="active"
        >
          Works
        </Link>
        <Link 
          to="projects" 
          smooth={true} 
          duration={250} 
          className="nav-link" 
          activeClass="active"
        >
          Projects
        </Link>
        <Link 
          to="about" 
          smooth={true} 
          duration={250} 
          className="nav-link" 
          activeClass="active"
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
