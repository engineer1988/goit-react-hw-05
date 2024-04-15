import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/not_found_page/NotFoundPage';
import Navigation from '../components/navigation/Navigation';
import Loader from './loader/Loader';

const HomePage = lazy(() => import('../pages/home_page/HomePage'));
const MoviesPage = lazy(() => import('../pages/movies_page/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('../pages/movie_details_page/MovieDetailsPage')
);
const MovieCast = lazy(() => import('./movie_cast/MovieCast'));
const MovieReviews = lazy(() => import('./movie_reviews/MovieReviews'));

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
