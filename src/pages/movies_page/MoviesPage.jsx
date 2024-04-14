import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchSearchMovie } from '../../fetch_data';
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

const MoviesPage = () => {
  const [arrayMovies, setArrayMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadSearchMovie = async () => {
      try {
        setLoading(true);
        const resData = await fetchSearchMovie(search);
        setArrayMovies(resData.results);
      } catch (error) {
        setError(true);
        notify();
      } finally {
        setLoading(false);
      }
    };
    loadSearchMovie();
  }, [search]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ search: form.elements.search.value });
    form.reset();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="search" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {arrayMovies && <MovieList arrayMovies={arrayMovies} />}
      </div>
    </div>
  );
};
export default MoviesPage;
