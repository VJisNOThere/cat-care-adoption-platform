import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CommentSection.css'; 
const CommentSection = ({ contentId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch comments for the given content
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/content/${contentId}/comments`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [contentId]);

  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment.trim() === '') {
      return;
    }

    try {
      const response = await axios.post(`/api/content/${contentId}/comments`, {
        comment: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="comment-list">
              {comments.map((comment) => (
                <li key={comment._id} className="comment">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-text">{comment.comment}</p>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="4"
          required
        ></textarea>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
