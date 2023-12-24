// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://eun1.api.riotgames.com/lol', 
});

instance.interceptors.request.use((config) => {
  const API_KEY = 'RGAPI-4278be8f-4e24-4ea3-bc98-2528230da0f5'; 
  config.params = config.params || {};
  config.params['api_key'] = API_KEY;
  config.params['count'] = 10; 


  if (config.url.includes('/match/v5/matches')) {
    config.baseURL = 'https://europe.api.riotgames.com/lol'; 
  }

  return config;
});

export default instance;
