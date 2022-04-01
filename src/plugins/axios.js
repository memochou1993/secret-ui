import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export const setInterceptors = () => {
  return new Promise((res) => {
    client.interceptors.request.use((config) => {
      //
      return config;
    });
    client.interceptors.response.use((r) => r, async (e) => {
      //
      return Promise.reject(e);
    });
    res();
  });
};

export default client;
