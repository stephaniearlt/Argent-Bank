import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (info) => {
  const response = await apiClient.post('/login', info);
  return response.data;
};
