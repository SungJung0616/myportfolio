import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const AppLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
       {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
