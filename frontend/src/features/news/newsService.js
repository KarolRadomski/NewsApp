import axios from 'axios'

const API_URL = '/api/news/';

//Get news
const getNews = async()=>{
    const response = await axios.get(API_URL);
    return response.data;
}

const newsService = {
    getNews,
}
export default newsService;