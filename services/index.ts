import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://zapei-api.herokuapp.com/store/pastello/",
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;


