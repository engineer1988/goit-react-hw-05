import { useEffect, useState } from 'react';
import fetchTrendingMovies from '../../fetch_trending_movies';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  useEffect(() => {
    // if (!query) return;

    const loadTrendingMovies = async () => {
      try {
        // {
        //   page === 1 && setPhotos([]);
        // }
        // setLoading(true);
        const resData = await fetchTrendingMovies();
        setTrendingMovies(resData);
      } catch (error) {
        // setError(true);
        // notify();
      } finally {
        // setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  return <div>Home page</div>;
};
export default HomePage;
