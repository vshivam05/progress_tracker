import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; 

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate  = useNavigate();

  const clear = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  }

  return (
    <header className="header">
      <div className="nav-container">
        <nav className="nav">
          <Link to="/dashboard" className="nav-link dashboard">Dashboard</Link>
          <Link to="/tasklist" className="nav-link task-list">Task list</Link>
        </nav>
        {token ? (
          <button type="button" className="signout-btn" onClick={clear}>Sign out</button>
        ) : (
          null
        )}
      </div>
    </header>
  );
};

export default Header;
