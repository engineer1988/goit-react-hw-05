import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ arrayMovies }) => {
  const location = useLocation();
  return (
    <ul className={css.movie_list_ul}>
      {arrayMovies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
