import { Link } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ arrayMovies }) => {
  return (
    <ul className={css.movie_list_ul}>
      {arrayMovies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
