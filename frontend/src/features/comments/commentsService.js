import axios from 'axios';

const API_URL = '/api/comments/';

// Get comments for news
const getCommentsForNews = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Increment like counter
const incrementLikesCounter = async (id) => {
  const response = await axios.put(`${API_URL}increment/${id}`);
  return response.data;
};

// Decrement like counter
const decrementLikesCounter = async (id) => {
  const response = await axios.put(`${API_URL}decrement/${id}`);
  return response.data;
};

// Decrement like counter
const setCommentsForNews = async (id, commentData) => {
  const response = await axios.post(`${API_URL}${id}`, commentData);
  return response.data;
};

const deleteComment = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const commentsService = {
  getCommentsForNews,
  incrementLikesCounter,
  decrementLikesCounter,
  setCommentsForNews,
  deleteComment,
};
export default commentsService;
