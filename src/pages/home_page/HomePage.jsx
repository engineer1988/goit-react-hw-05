import { useEffect, useState } from 'react';
import fetchTrendingMovies from '../../fetch_trending_movies';
import css from './HomePage.module.css';

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
        setTrendingMovies(resData.results);
      } catch (error) {
        // setError(true);
        // notify();
      } finally {
        // setLoading(false);
      }
    };
    loadTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {trendingMovies.length > 0 && (
        <ul className={css.home_page_ul}>
          {trendingMovies.map(movie => (
            <li key={movie.id}>
              <p>{movie.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default HomePage;
