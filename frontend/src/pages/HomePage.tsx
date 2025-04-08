import { useNavigate } from 'react-router-dom';
import MovieMiniCards from '../components/MovieMiniCards';
import { useState } from 'react';
import Header from '../components/Header';

function MoviesPage() {
  const navigate = useNavigate();

  // Function to handle when a mini card is clicked
  const handleSelect = (show_id: string) => {
    navigate('/movie', { state: { show_id } });
  };

  return (
    <div>
      <Header />
      <MovieMiniCards onSelect={handleSelect} />
    </div>
  );
}

export default MoviesPage;
