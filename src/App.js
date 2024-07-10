import React from 'react';
import { Element } from 'react-scroll';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Work from './components/Work';
import MyProjects from './components/MyProjects';
import About from './components/About';

const App = () => {
  return (
    <div>
      <NavBar />
      <Element name="home">
        <Home />
      </Element>
      <Element name="works">
        <Work />
      </Element>
      <Element name="projects">
        <MyProjects />
      </Element>
      <Element name="about">
        <About />
      </Element>      
      <Footer />
    </div>
  );
};

export default App;
