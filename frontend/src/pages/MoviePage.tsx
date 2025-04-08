import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

function MoviePage() {
  const location = useLocation();

  // Use route state as the initial value if it's passed
  const initialShowId = location.state?.show_id || 's12';
  const [selectedShowId, setSelectedShowId] = useState<string>(initialShowId);

  // Update only if navigating again with a new show_id
  useEffect(() => {
    if (location.state?.show_id && location.state.show_id !== selectedShowId) {
      setSelectedShowId(location.state.show_id);
    }
  }, [location.state?.show_id, selectedShowId]);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <MovieCard show_id={selectedShowId} setShowId={setSelectedShowId} />
    </div>
  );
}

export default MoviePage;
