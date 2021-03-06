import axios from 'axios';

const API_URL = '/api/news/';

//Get news
const getNews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//Get one news
const getOneNews = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

//Add news
const addNews = async (newsData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, newsData, config);
  return response.data;
};

//Edit news

const editNews = async (newsData, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}${id}`, newsData, config);
  return response.data;
};

//Delete news
const deleteNews = async (newsData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + newsData, config);
  return response.data;
};

const newsService = {
  getNews,
  getOneNews,
  addNews,
  editNews,
  deleteNews,
};
export default newsService;
