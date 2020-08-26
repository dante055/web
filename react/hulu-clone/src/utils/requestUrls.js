const API_KEY = process.env.REACT_APP_API_KEY;

const language = 'en-US';

const genreUrl = `/genre/movie/list?api_key=${API_KEY}&language=${language}`;
const getContentUrl = (
  id,
  page,
  trending_media_type,
  genre_media_type,
  time_window
) => {
  if (id === 'trending') {
    return `/trending/${trending_media_type}/${time_window}?api_key=${API_KEY}&language=${language}&page=${page}`;
  } else if (id === 'movie' || id === 'tv') {
    return `/${id}/top_rated?api_key=${API_KEY}&language=${language}&page=${page}`;
  } else if (id === 'person') {
    return `/person/popular?api_key=${API_KEY}&language=${language}&page=${page}`;
  } else {
    return `/discover/${genre_media_type}?api_key=${API_KEY}&with_genres=${id}&language=${language}&page=${page}`;
  }
};

export { genreUrl, getContentUrl };

// export const baseURL = 'https://api.themoviedb.org/3';
//&page=1

// const trendingUrl = (media_type, time_window) => {
//   // all, movie, tv, person
//   // day, week
//   return `/trending/${media_type}/${time_window}?api_key=${API_KEY}&language=${language}`;
// };
// const topRatedUrl = media_type => {
//   // movie, tv
//   return `/${media_type}/top_rated?api_key=${API_KEY}&language=${language}`;
// };
// const genreWiseUrl = (genreId, media_type) => {
//   return `/discover/${media_type}?api_key=${API_KEY}&with_genres=${genreId}&language=${language}`;
// };
