import axios from 'axios';

export const fetchTrendingMovies = async ({ abortController }) => {
  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjQ4OGE4YmJjNTJjYTViODJkNzUyMDcwNDFhOGYyNCIsInN1YiI6IjY2MTdjODUxYzA3MmEyMDE0OTkyZmIyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8tyGfWc2fS1mfL4nfMB993VT9YgWW0nZ24yM5obaNoQ',
    },
  };

  const URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  const response = await axios.get(URL, options, {
    signal: abortController.signal,
  });
  return response.data;
};

export const fetchMovieDetails = async movieId => {
  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjQ4OGE4YmJjNTJjYTViODJkNzUyMDcwNDFhOGYyNCIsInN1YiI6IjY2MTdjODUxYzA3MmEyMDE0OTkyZmIyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8tyGfWc2fS1mfL4nfMB993VT9YgWW0nZ24yM5obaNoQ',
    },
  };

  const URL = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

  const response = await axios.get(URL, options);
  return response.data;
};
