//Navbar.js

import React from 'react'; // Importing React library to use JSX
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom for navigation
import '../styles/Navbar.css'; // Importing CSS styles for the Navbar

// Navbar functional component
const Navbar = () => {
  return (
    <nav className="navbar"> {/* Main navigation container */}
      <div className="navbar-logo"> {/* Logo section */}
        <Link to="/"> {/* Link to the home page */}
          <img src="/logo.png" alt="Cat Care and Adoption Platform" /> {/* Logo image */}
        </Link>
      </div>
      <ul className="navbar-links"> {/* Unordered list for navigation links */}
        <li> {/* List item for the first link */}
          <Link to="../pages/Dashboard.js">Adoptable Cats</Link> {/* Link to the Adoptable Cats page */}
        </li>
        <li> {/* List item for the second link */}
          <Link to="../pages/WellnessContent.js">Wellness Resources</Link> {/* Link to Wellness Resources page */}
        </li>
        <li> {/* List item for the third link */}
          <Link to="../pages/Payment.js">Donate</Link> {/* Link to Donate page */}
        </li>
        <li> {/* List item for the fourth link */}
          <Link to="../pages/CatProfile.js">Profile</Link> {/* Link to Profile page */}
        </li>
        <li> {/* List item for the fifth link */}
          <Link to="../pages/Login.js">Login</Link> {/* Link to Login page */}
        </li>
      </ul>
    </nav>
  );
};

// Exporting the Navbar component to be used in other parts of the application
export default Navbar;
