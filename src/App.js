import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Work from './components/Work';
import MyProjects from './components/MyProjects';
import About from './components/About';
import Footer from './components/Footer';
import EternightsCaseStudy from './components/EternightsCaseStudy';
import GPSOrderAutomation from './components/GPSOrderAutomation';
import GPSOperationsCaseStudy from './components/GPSOperationsCaseStudy';
import LayrdCaseStudy from './components/LayrdCaseStudy';
import './App.css';

const PortfolioHome = () => <><Home /><Work /><MyProjects /><About /></>;

const App = () => (
  <div className="site-shell">
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/case-studies/eternights-qa" element={<EternightsCaseStudy />} />
        <Route path="/case-studies/gps-order-automation" element={<GPSOrderAutomation />} />
        <Route path="/case-studies/gps-3pl-operations" element={<GPSOperationsCaseStudy />} />
        <Route path="/case-studies/layrd-operations" element={<LayrdCaseStudy />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
