import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header';

function MoviePage() {
  const location = useLocation();

  // Pull show_id from location only on initial mount
  const [selectedShowId, setSelectedShowId] = useState<string>(
    location.state?.show_id || 's12'
  );

  // ✅ Only update selectedShowId if a new one was passed through navigation
  useEffect(() => {
    if (location.state?.show_id && location.state.show_id !== selectedShowId) {
      setSelectedShowId(location.state.show_id);
    }
  }, [location.state?.show_id]);

  return (
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <MovieCard show_id={selectedShowId} setShowId={setSelectedShowId} />
    </div>
  );
}

export default MoviePage;
