import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
import MarketIntelligenceCaseStudy from './components/MarketIntelligenceCaseStudy';
import MemorialCaseStudy from './components/MemorialCaseStudy';
import './App.css';
import './CourtV2.css';
import './PlayerDashboard.css';
import CareerBoard, { RecentPlays } from './components/CareerBoard';
import CourtIntro from './components/CourtIntro';

const PortfolioHome = () => <><CourtIntro /><CareerBoard /><RecentPlays /><Home skillsOnly /><Work /><MyProjects /><About /></>;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

const App = () => (
  <div className="site-shell">
    <ScrollToTop />
    <NavBar />
    <main>
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/case-studies/eternights-qa" element={<EternightsCaseStudy />} />
        <Route path="/case-studies/gps-order-automation" element={<GPSOrderAutomation />} />
        <Route path="/case-studies/gps-3pl-operations" element={<GPSOperationsCaseStudy />} />
        <Route path="/case-studies/layrd-operations" element={<LayrdCaseStudy />} />
        <Route path="/case-studies/market-intelligence-lab" element={<MarketIntelligenceCaseStudy />} />
        <Route path="/case-studies/remembering-young-hoon" element={<MemorialCaseStudy />} />
      </Routes>
    </main>
    <Footer />
  </div>
);

export default App;
