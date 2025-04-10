import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../img/uco-logo.png';
import profileIcon from '../img/profile-icon.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const content = (
        <div className="header-container">
          <div className="logo-title">
            <img src={logo} alt="UCO Logo" />
            <h1>Broncho Books</h1>
          </div>
          <div className="user-info">
            <h3>Guest User</h3>
            <img src={profileIcon} alt="Profile Icon" />
            <Link to="/addbook">
              <button>Add Book</button>
            </Link>
          </div>
        </div>
      );
    
      return content;
}

export default Header