import axios from 'axios';

const API_URL = '/api/comments/';

// Get comments for news
const getCommentsForNews = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const commentsService = {
  getCommentsForNews,
};
export default commentsService;
