import React from 'react';
import { Link } from 'react-router-dom';
import { SiFoodpanda } from 'react-icons/si';
import { MdExitToApp } from 'react-icons/md';

const Header = () => {

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="logo-link">
          <SiFoodpanda className="logo-icon" />
          <span className="logo-title">Kitchen Recipe Management</span>
        </Link>
      </div>

      <nav className="nav">
        <Link className="nav-link" activeClassName="active-link" to="foods">
          Home
        </Link>
        <Link className="nav-link" activeClassName="active-link" to="/about">
          About
        </Link>
        
        <Link to="/logout" className="logout-link">
          <MdExitToApp className="logout-icon" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;




