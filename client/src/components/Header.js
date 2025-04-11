import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '../img/uco-logo.png';
import profileIcon from '../img/profile-icon.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const content = (
      <div className="header-container">
          <Link to ="/" className="logo-title">
            <img src={logo} alt="UCO Logo" />
            <h1>Broncho Books</h1>
          </Link>
          <div className="search-bar" style={{ flexGrow: 1, margin: '0 2rem' }}>
        <input
          type="text"
          placeholder="Search books..."
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ccc'
          }}
        />
      </div>
          <div className="user-info">
            <h3>Guest User</h3>
            <Link to="/addbook">
              <button>Add Book</button>
            </Link>
          </div>
        </div>
      );
    
      return content;
}

export default Header