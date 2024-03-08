import axios from 'axios';

const API_BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = '4a5540e2d9246ac7abb682c777ca3a0f122768b571bc95c1b90628efbc6a690c'; 

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TOKEN}`
  }
});
