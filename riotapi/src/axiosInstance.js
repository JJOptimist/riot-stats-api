// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://eun1.api.riotgames.com/lol', // Default base URL, adjust as needed
});

instance.interceptors.request.use((config) => {
  const API_KEY = 'RGAPI-4278be8f-4e24-4ea3-bc98-2528230da0f5'; // Replace with your actual API key
  config.params = config.params || {};
  config.params['api_key'] = API_KEY;
  config.params['count'] = 10; // Set the default count parameter

  // Adjust base URL for specific endpoints
  if (config.url.includes('/match/v5/matches/by-puuid')) {
    config.baseURL = 'https://europe.api.riotgames.com/lol'; // Adjust the base URL for this endpoint
  }

  return config;
});

export default instance;
