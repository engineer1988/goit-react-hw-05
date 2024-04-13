import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../fetch_data';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';
import { IoMdNotifications } from 'react-icons/io';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import css from './MovieCast.module.css';

const notify = () =>
  toast('Whoops, something went wrong! Please try reloading this page!', {
    icon: <IoMdNotifications />,
    style: {
      borderRadius: '10px',
      background: 'red',
      color: '#fff',
    },
  });

const MovieCast = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieCast, setMovieCast] = useState();

  useEffect(() => {
    const loadMovieCast = async () => {
      try {
        setLoading(true);
        const resData = await fetchMovieCast(movieId);
        setMovieCast(resData);
      } catch (error) {
        setError(true);
        notify();
      } finally {
        setLoading(false);
      }
    };
    loadMovieCast();
  }, [movieId]);

  return (
    <div className={css.movie_cast_general}>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {movieCast &&
          movieCast.cast.map(item => {
            return (
              <li key={item.id}>
                <div className={css.movie_cast_img}>
                  <img
                    src={
                      movieCast &&
                      'https://image.tmdb.org/t/p/w200/' + item.profile_path
                    }
                  />
                </div>
                <p className={css.movie_cast_name}>{item.name}</p>
                <p className={css.movie_cast_general_character}>
                  Character: {item.character}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default MovieCast;
