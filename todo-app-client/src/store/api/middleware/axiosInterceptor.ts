import axios from 'axios';
import { isAccessTokenValid } from '../../../components/validator/tokenValidator';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH,
});

instance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken && !config.url.includes('/auth/refresh')) {
    await isAccessTokenValid();

    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken',
    )}`;
  }

  return config;
});
