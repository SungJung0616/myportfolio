import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import About from '../components/About';

const AboutPage = () => {
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
    <div>
      <About /> 

    </div>
  );
};

export default AboutPage;
