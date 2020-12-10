import axios from 'axios';

// ----------- development url ----------------
// const baseURL = 'http://127.0.0.1:3000/api/v1';

// ---------- production -------------------
// this is the relative url, and works only beause the api and the url are use the same url
const baseURL = '/api/v1';

export const axiosInstance = axios.create({
  baseURL,
});
