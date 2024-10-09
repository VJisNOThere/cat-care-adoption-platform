import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/Rating.css'; // Import CSS styles for the component

const Rating = ({ contentId }) => { // Functional component that takes contentId as a prop
  // State variables for rating, average rating, total ratings, and submission status
  const [rating, setRating] = useState(0); // Current rating submitted by the user
  const [averageRating, setAverageRating] = useState(0); // Average rating fetched from the server
  const [totalRatings, setTotalRatings] = useState(0); // Total number of ratings for the content
  const [submitted, setSubmitted] = useState(false); // Flag to indicate if the user has submitted a rating

  // Fetch the current average rating for the given content when the component mounts
  useEffect(() => {
    const fetchRating = async () => { // Asynchronous function to fetch rating data
      try {
        const response = await axios.get(`/api/content/${contentId}/rating`); // Make a GET request to fetch the rating
        setAverageRating(response.data.averageRating); // Set the average rating from response
        setTotalRatings(response.data.totalRatings); // Set the total ratings from response
      } catch (error) {
        console.error('Error fetching rating:', error); // Log error if fetching fails
      }
    };

    fetchRating(); // Call the function to fetch rating data
  }, [contentId]); // Dependency array, re-fetch if contentId changes

  // Handle rating submission
  const handleRatingSubmit = async (rate) => { // Function to handle rating submission
    try {
      await axios.post(`/api/content/${contentId}/rating`, { rating: rate }); // Make a POST request to submit the rating
      setSubmitted(true); // Mark as submitted
      setRating(rate); // Update the current rating state

      // Update average rating and total ratings locally
      const newTotalRatings = totalRatings + 1; // Increment total ratings
      const newAverageRating =
        (averageRating * totalRatings + rate) / newTotalRatings; // Calculate new average rating

      setAverageRating(newAverageRating); // Update average rating state
      setTotalRatings(newTotalRatings); // Update total ratings state
    } catch (error) {
      console.error('Error submitting rating:', error); // Log error if submission fails
    }
  };

  return (
    <div className="rating-section"> {/* Container for the rating component */}
      <h3>Rate This Content</h3> {/* Heading for the rating section */}
      <div className="stars"> {/* Container for star rating */}
        {[1, 2, 3, 4, 5].map((star) => ( // Map over an array to create star elements
          <span
            key={star} // Unique key for each star
            className={`star ${star <= rating ? 'selected' : ''} ${submitted ? 'disabled' : ''}`} // Class names based on rating and submission status
            onClick={() => !submitted && handleRatingSubmit(star)} // Handle click to submit rating if not already submitted
          >
            ★ {/* Star icon */}
          </span>
        ))}
      </div>
      <p className="average-rating">
        Average Rating: {averageRating.toFixed(1)} ({totalRatings} ratings) {/* Display average rating and total ratings */}
      </p>
      {submitted && <p className="thank-you">Thank you for your feedback!</p>} {/* Thank you message after submission */}
    </div>
  );
};

export default Rating; // Export the Rating component for use in other parts of the app
