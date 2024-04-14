import { Outlet, useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../fetch_data';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';
import { IoMdNotifications } from 'react-icons/io';
import ErrorMessage from '../../components/error_message/ErrorMessage';
import { Link } from 'react-router-dom';
import css from './MovieDetailsPage.module.css';
import { HiOutlineArrowLongLeft } from 'react-icons/hi2';

const notify = () =>
  toast('Whoops, something went wrong! Please try reloading this page!', {
    icon: <IoMdNotifications />,
    style: {
      borderRadius: '10px',
      background: 'red',
      color: '#fff',
    },
  });

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [movieDetails, setMovieDetails] = useState();
  const [locationMovieList, setLocationMovieList] = useState('');
  const location = useLocation();
  const backLinkHref = locationMovieList ?? '/movies';

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setLoading(true);
        const resData = await fetchMovieDetails(movieId);
        setMovieDetails(resData);
        setLocationMovieList(location.state);
      } catch (error) {
        setError(true);
        notify();
      } finally {
        setLoading(false);
      }
    };
    loadMovieDetails();
  }, [movieId]);

  return (
    <div>
      <div className={css.movie_details_page_general}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        <div className={css.movie_details_page_img_block__title_block}>
          <div className={css.movie_details_page_img_block}>
            <div className={css.movie_details_page_go_back}>
              <Link to={backLinkHref}>
                <HiOutlineArrowLongLeft />
                Go back
              </Link>
            </div>
            <div className={css.movie_details_page_img}>
              <img
                src={
                  movieDetails &&
                  'https://image.tmdb.org/t/p/w300/' + movieDetails.poster_path
                }
              />
            </div>
          </div>
        </div>
        <div className={css.movie_details_page_title_block}>
          <h2 className={css.movie_details_page_title}>
            {movieDetails && movieDetails.original_title}
            <span className={css.movie_details_page_span}>
              ({movieDetails && movieDetails.release_date.slice(0, 4)})
            </span>
          </h2>
          <h3 className={css.movie_details_page_overview}>Overview</h3>
          <p className={css.movie_details_page_overview_text}>
            {movieDetails && movieDetails.overview}
          </p>
          <h3 className={css.movie_details_page_overview_genres}>Genres</h3>
          <ul className={css.movie_details_page_genres_ul}>
            {movieDetails &&
              movieDetails.genres.map(item => {
                return (
                  <li key={item.id}>
                    <p>{item.name}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className={css.movie_details_page_inform}>
        <p>Additional information</p>
        <ul className={css.movie_details_page_inform_ul}>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};
export default MovieDetailsPage;
