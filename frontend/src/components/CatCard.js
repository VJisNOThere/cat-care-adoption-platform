import React from 'react'; // Import React library
import { Link } from 'react-router-dom'; // Import Link component from React Router for navigation
import '../styles/CatCard.css'; // Import CSS file for styling

// CatCard functional component, receives a 'cat' prop
const CatCard = ({ cat }) => {
  return (
    <div className="cat-card"> {/* Main container for the cat card */}
      <img src={cat.image} alt={cat.name} className="cat-image" /> {/* Cat image */}
      <div className="cat-details"> {/* Container for cat details */}
        <h3>{cat.name}</h3> {/* Display cat's name */}
        <p><strong>Breed:</strong> {cat.breed}</p> {/* Display cat's breed */}
        <p><strong>Age:</strong> {cat.age} {cat.age > 1 ? 'years' : 'year'}</p> {/* Display cat's age, singular or plural */}
        <p><strong>Status:</strong> {cat.status}</p> {/* Display cat's status (e.g., available, adopted) */}
        <Link to={`/cats/${cat._id}`} className="view-details-button">View Details</Link> {/* Link to cat's details page */}
      </div>
    </div>
  );
};

export default CatCard; // Export the CatCard component for use in other parts of the application
