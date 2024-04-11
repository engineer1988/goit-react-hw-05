// import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home_page/HomePage';
import MoviesPage from '../pages/movies_page/MoviesPage';
import NotFoundPage from '../pages/not_found_page/NotFoundPage';
import Navigation from '../components/navigation/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
