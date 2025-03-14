import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css'; // Assuming you have a CSS file for header styles

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>Sigma Insurance</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/service-offerings">Services</Link></li>
                    <li><Link to="/data-analysis">Data Analysis</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;