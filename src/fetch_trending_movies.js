import axios from 'axios';

const fetchTrendingMovies = async () => {
  const options = {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjQ4OGE4YmJjNTJjYTViODJkNzUyMDcwNDFhOGYyNCIsInN1YiI6IjY2MTdjODUxYzA3MmEyMDE0OTkyZmIyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8tyGfWc2fS1mfL4nfMB993VT9YgWW0nZ24yM5obaNoQ',
    },
  };

  const URL = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

  const response = await axios.get(URL, options);
  return response.data;
};
export default fetchTrendingMovies;
