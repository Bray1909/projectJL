import axios from 'axios';

const api = axios.create({
  baseURL: 'https://chp7rfq8li.execute-api.us-east-2.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;