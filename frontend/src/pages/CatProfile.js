//CatProfile.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from '../components/CommentSection';
import Rating from '../components/Rating';
import '../styles/CatProfile.css';

const CatProfile = () => {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch cat details using the ID from URL params
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await axios.get(`/api/cats/${id}`);
        setCat(response.data);
      } catch (err) {
        setError('Error fetching cat details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCat();
  }, [id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!cat) {
    return <p className="no-cat">Cat not found.</p>;
  }

  return (
    <div className="cat-profile">
      <div className="cat-info">
        <img src={cat.image} alt={cat.name} className="cat-image" />
        <div className="cat-details">
          <h1>{cat.name}</h1>
          <p><strong>Breed:</strong> {cat.breed}</p>
          <p><strong>Age:</strong> {cat.age} years</p>
          <p><strong>Gender:</strong> {cat.gender}</p>
          <p><strong>Description:</strong> {cat.description}</p>
          <Rating rating={cat.rating} />
        </div>
      </div>

      <CommentSection catId={cat._id} />
    </div>
  );
};

export default CatProfile;
