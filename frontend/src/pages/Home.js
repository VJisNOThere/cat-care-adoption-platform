//Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CatCard from '../components/CatCard'; // Component for displaying individual cat information
import WellnessContent from './WellnessContent'; // Component for displaying wellness articles
import '../styles/Home.css'; // Importing styles for the Home component

const Home = () => {
  // State to hold featured cats data
  const [featuredCats, setFeaturedCats] = useState([]);
  // State to hold wellness articles data
  const [wellnessArticles, setWellnessArticles] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Fetching featured cats and wellness articles on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured cats from the API
        const catsResponse = await axios.get('/api/cats/featured');
        // Fetch recent wellness articles from the API
        const wellnessResponse = await axios.get('/api/wellness/recent');
        
        // Update state with the fetched data
        setFeaturedCats(catsResponse.data);
        setWellnessArticles(wellnessResponse.data);
      } catch (error) {
        // Log error if fetching data fails
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false after fetching data, regardless of success or failure
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Cat Care and Adoption</h1>
        <p>Your go-to platform for cat adoption and care tips</p>
      </header>

      {loading ? (
        <p className="loading">Loading...</p> // Show loading message while data is being fetched
      ) : (
        <>
          {/* Section for featured cats */}
          <section className="featured-cats">
            <h2>Featured Cats for Adoption</h2>
            <div className="cats-grid">
              {featuredCats.length > 0 ? (
                // Map over featured cats and display CatCard for each
                featuredCats.map((cat) => (
                  <CatCard key={cat._id} cat={cat} />
                ))
              ) : (
                <p>No cats available for adoption at the moment.</p> // Message if no cats are available
              )}
            </div>
          </section>

          {/* Section for wellness articles */}
          <section className="wellness-content">
            <h2>Recent Wellness Articles</h2>
            <div className="articles-list">
              {wellnessArticles.length > 0 ? (
                // Map over wellness articles and display WellnessContent for each
                wellnessArticles.map((article) => (
                  <WellnessContent key={article._id} article={article} />
                ))
              ) : (
                <p>No wellness articles available at the moment.</p> // Message if no articles are available
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Home; // Export the Home component for use in other parts of the application
