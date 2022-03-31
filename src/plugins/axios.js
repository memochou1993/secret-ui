import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
});

export const setInterceptors = (auth) => {
  client.interceptors.request.use((config) => {
    const { token } = auth;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  client.interceptors.response.use(
    (res) => res,
    async (e) => {
      return Promise.reject(e);
    },
  );
};

export default client;
