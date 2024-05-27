// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchCaseDetails = () => api.get('/case');
export const fetchMessages = () => api.get('/messages');
export const sendMessage = (message) => api.post('/messages', message);

export default api;
