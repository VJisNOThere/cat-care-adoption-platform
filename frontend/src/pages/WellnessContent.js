//WellnessContent.js

import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/WellnessContent.css'; // Import CSS styles for this component

const WellnessContent = () => {
  // State to hold the fetched articles
  const [articles, setArticles] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState('');

  // useEffect to fetch wellness content when the component mounts
  useEffect(() => {
    const fetchWellnessContent = async () => {
      try {
        // Make a GET request to the API to fetch wellness articles
        const response = await axios.get('/api/wellness-contents');
        // Update the articles state with the fetched data
        setArticles(response.data);
      } catch (err) {
        // If there's an error, update the error state and log it
        setError('Error fetching wellness content');
        console.error(err);
      } finally {
        // Set loading to false after the fetch attempt
        setLoading(false);
      }
    };

    fetchWellnessContent(); // Call the function to fetch content
  }, []); // Empty dependency array means this effect runs once on mount

  // Render loading message while data is being fetched
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <p className="error">{error}</p>;
  }

  // Render the wellness articles once they are loaded successfully
  return (
    <div className="wellness-content">
      <h1>Cat Wellness Tips & Articles</h1>
      <div className="articles">
        {articles.map((article) => (
          <div key={article._id} className="article-card"> {/* Use _id as the key for each article */}
            <h2>{article.title}</h2> {/* Render article title */}
            <p>{article.description}</p> {/* Render article description */}
            <a href={`/wellness-content/${article._id}`} className="read-more"> {/* Link to the article details page */}
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WellnessContent; // Export the component for use in other parts of the application
