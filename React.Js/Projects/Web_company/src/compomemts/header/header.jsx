import "./header.css";
import { Link } from "react-router-dom";
const Header=()=>{
  return(
    <nav className="header">
     {/* <div className="nav_right">
       <h1>W</h1>
     </div>
     <div className="nav_midle">
       <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Portfolio</Link></li>
        <li><Link  to="/footer">Clients</Link></li>
       </ul>
     </div>
     <div className="nav_left">
        <h2>Contact me</h2>
     </div> */}

<nav className="navbar">
              <div className="img"><img src="./logo.svg" alt="" /></div>
              
              <div className="nav-items">
                <input type="checkbox" id="menu-toggle" />
              <label htmlFor="menu-toggle" id="hamburger-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" width="40">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </label>
              <ul className="links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/skills">Capabilities</a></li>
                <li><a href="/portfolio">Solution</a></li>
                <li><a href="/services">Work</a></li>
                <li><a href="/contact">Resources</a></li>
                <li><a href="/contact" className="button">Let's Talk!</a></li>
              </ul>
              </div>
              
            </nav>
    </nav>
  );
}

export default Header;