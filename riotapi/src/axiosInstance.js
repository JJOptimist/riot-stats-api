// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://euw1.api.riotgames.com/lol', 
});

instance.interceptors.request.use((config) => {
  const API_KEY = 'RGAPI-ae235f93-b430-454e-9037-3ab9074f1d0a'; 
  config.params = config.params || {};
  config.params['api_key'] = API_KEY;
  config.params['count'] = 10; 


  if (config.url.includes('/match/v5/matches')) {
    config.baseURL = 'https://europe.api.riotgames.com/lol'; 
  }

  return config;
});

export default instance;
