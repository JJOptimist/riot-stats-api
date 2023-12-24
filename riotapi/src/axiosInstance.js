// axiosInstance.js

import axios from 'axios';

const API_BASE_URL = 'https://eun1.api.riotgames.com/lol'; 

const instance = axios.create({
  baseURL: API_BASE_URL,
});

export default instance;
