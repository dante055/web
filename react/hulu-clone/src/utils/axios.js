import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3';

export const axiosInstance = axios.create({
  baseURL: baseURL,
});
