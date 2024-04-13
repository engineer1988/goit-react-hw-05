import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home_page/HomePage';
import MoviesPage from '../pages/movies_page/MoviesPage';
import NotFoundPage from '../pages/not_found_page/NotFoundPage';
import Navigation from '../components/navigation/Navigation';
import MovieDetailsPage from '../pages/movie_details_page/MovieDetailsPage';
import MovieCast from './movie_cast/MovieCast';
import MovieReviews from './movie_reviews/MovieReviews';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
