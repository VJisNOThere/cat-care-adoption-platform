import React from 'react'; // Importing React library to create the component
import { Link } from 'react-router-dom'; // Importing Link component for client-side navigation
import '../styles/Footer.css'; // Importing CSS styles for the footer

const Footer = () => { // Defining the Footer functional component
  return (
    <footer className="footer"> {/* Main footer element with className for styling */}
      <div className="footer-content"> {/* Container for footer content */}
        <div className="footer-logo"> {/* Logo section */}
          <Link to="/"> {/* Link to the home page */}
            <img src="/logo.png" alt="Cat Care and Adoption Platform" /> {/* Logo image */}
          </Link>
        </div>
        <div className="footer-links"> {/* Section for footer navigation links */}
          <ul> {/* Unordered list for the links */}
            <li><Link to="/about">About Us</Link></li> {/* Link to the About Us page */}
            <li><Link to="/contact">Contact</Link></li> {/* Link to the Contact page */}
            <li><Link to="/privacy">Privacy Policy</Link></li> {/* Link to the Privacy Policy page */}
            <li><Link to="/terms">Terms of Service</Link></li> {/* Link to the Terms of Service page */}
          </ul>
        </div>
        <div className="footer-social"> {/* Section for social media links */}
          <p>Follow Us:</p> {/* Heading for social media links */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> {/* Facebook link */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> {/* Twitter link */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> {/* Instagram link */}
        </div>
      </div>
      <div className="footer-bottom"> {/* Bottom section of the footer */}
        <p>&copy; {new Date().getFullYear()} Cat Care and Adoption Platform. All rights reserved.</p> {/* Copyright notice with dynamic year */}
      </div>
    </footer>
  );
};

export default Footer; // Exporting the Footer component for use in other parts of the application
