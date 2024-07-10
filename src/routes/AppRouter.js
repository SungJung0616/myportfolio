import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ContactPage from '../pages/ContactPage';
import AboutPage from '../pages/AboutPage';
import MyProjectPage from '../pages/MyProjectPage';
import WorkPage from '../pages/WorkPage';


const AppRouter = () => {
  return (
    <Routes> 
      <Route path="/" element={<HomePage />} />  
      <Route path="/myprojects" element={<MyProjectPage />} />
      <Route path="/works" element={<WorkPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />      
    </Routes>
  );
};

export default AppRouter;
