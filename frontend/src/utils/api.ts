import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BaseURL, // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // We assert that headers exist and can be set
    config.headers!['x-auth-token'] = token;
  }
  return config;
});

export default api;