import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../fetch_data';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';
import { IoMdNotifications } from 'react-icons/io';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import css from './MovieReviews.module.css';

const notify = () =>
  toast('Whoops, something went wrong! Please try reloading this page!', {
    icon: <IoMdNotifications />,
    style: {
      borderRadius: '10px',
      background: 'red',
      color: '#fff',
    },
  });

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieReviews, setMovieReviews] = useState();

  useEffect(() => {
    const loadMovieReviews = async () => {
      try {
        setLoading(true);
        const resData = await fetchMovieReviews(movieId);
        setMovieReviews(resData);
      } catch (error) {
        setError(true);
        notify();
      } finally {
        setLoading(false);
      }
    };
    loadMovieReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.movie_reviews_ul}>
        {movieReviews &&
          movieReviews.results.map(item => {
            return (
              <li key={item.id}>
                <p className={css.movie_reviews_author}>
                  Author: {item.author}
                </p>
                <p className={css.movie_reviews_content}>{item.content}</p>
              </li>
            );
          })}
        {movieReviews &&
          movieReviews.results.length === 0 &&
          'We do not have any reviews for this movie.'}
      </ul>
    </div>
  );
};
export default MovieReviews;
