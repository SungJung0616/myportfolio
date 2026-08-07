import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const isHome = useLocation().pathname === '/';
  return (
    <header className="nav-wrap">
      <Link className="brand" to="/" aria-label="Sung Jung home"><span className="brand-mark">SJ</span><span>Sung Jung</span></Link>
      {isHome ? <nav aria-label="Primary navigation"><a href="#work">Work</a><a href="#skills">Skills</a><a href="#archive">Archive</a><a href="#now">Now</a></nav> : <nav aria-label="Case study navigation"><Link to="/">← Back to portfolio</Link></nav>}
      <a className="nav-cta" href="mailto:sungjung0616@gmail.com?subject=Portfolio%20inquiry">Let’s talk</a>
    </header>
  );
};

export default NavBar;
