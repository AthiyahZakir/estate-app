import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-estate">ESTATE</span>
          <span className="logo-finder">FINDER</span>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Search
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/blog" 
              className={`navbar-link ${location.pathname === '/blog' ? 'active' : ''}`}
            >
              Blog
            </Link>
          </li>
        </ul>

        {/* Contact Button */}
        <div className="navbar-cta">
          <button className="contact-btn">Contact Us</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;