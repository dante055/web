import axios from 'axios';

const baseURL = 'http://127.0.0.1:3000/api/v1';

export const axiosInstance = axios.create({
  baseURL,
});
