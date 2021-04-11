import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://zapei-api.herokuapp.com",
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;


