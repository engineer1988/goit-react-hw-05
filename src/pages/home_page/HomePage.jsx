import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../fetch_data';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';
import { IoMdNotifications } from 'react-icons/io';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import MovieList from '../../components/movie_list/MovieList';
const notify = () =>
  toast('Whoops, something went wrong! Please try reloading this page!', {
    icon: <IoMdNotifications />,
    style: {
      borderRadius: '10px',
      background: 'red',
      color: '#fff',
    },
  });

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadTrendingMovies = async () => {
      try {
        setLoading(true);
        const resData = await fetchTrendingMovies({
          abortController: controller,
        });
        setTrendingMovies(resData.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          notify();
        }
      } finally {
        setLoading(false);
      }
    };
    loadTrendingMovies();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {trendingMovies.length > 0 && <MovieList arrayMovies={trendingMovies} />}
    </div>
  );
};
export default HomePage;
