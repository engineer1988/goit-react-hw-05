import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../fetch_data';
// import Loader from '../../components/loader/Loader';
// import toast from 'react-hot-toast';
// import { IoMdNotifications } from 'react-icons/io';
// import ErrorMessage from '../../components/error_message/ErrorMessage';
import { Link } from 'react-router-dom';

// const notify = () =>
//   toast('Whoops, something went wrong! Please try reloading this page!', {
//     icon: <IoMdNotifications />,
//     style: {
//       borderRadius: '10px',
//       background: 'red',
//       color: '#fff',
//     },
//   });

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  const [movieDetails, setMovieDetails] = useState();
  const [imagePath, setImagePath] = useState();
  //   const url = 'https://image.tmdb.org/t/p/w300/';

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        // setLoading(true);
        const resData = await fetchMovieDetails(movieId);
        setMovieDetails(resData);
        setImagePath(resData.poster_path);

        // console.log(resData.original_title);
      } catch (error) {
        // setError(true);
        // notify();
      } finally {
        // setLoading(false);
      }
    };
    loadMovieDetails();
  }, [movieId]);

  const baseURL = 'https://image.tmdb.org/t/p/w300/';
  const fullURL = baseURL + imagePath;

  return (
    <div>
      <img src={fullURL} />
      <h2>{movieDetails && movieDetails.original_title}</h2>
      <h3>Overview</h3>
      <p>{movieDetails && movieDetails.overview}</p>
      <h3>Genres</h3>
      {/* {movieDetails &&
        movieDetails.genres.map(item => {
          <p>${item}</p>;
        })} */}
      <p></p>
      <p>Additional information</p>
      <ul>
        <li>
          <Link>Cast</Link>
        </li>
        <li>
          <Link>Reviews</Link>
        </li>
      </ul>
    </div>
  );
};
export default MovieDetailsPage;
