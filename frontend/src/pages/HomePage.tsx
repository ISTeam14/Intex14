import { useState, useEffect } from 'react';
import { fetchMoviesByGenre } from '../api/MovieAPI';
import { Movie } from '../types/Movie';
import Header from '../components/Header';
import CategoryRow from '../components/CategoryRow';
import { useNavigate } from 'react-router-dom';
import AuthorizeView from '../components/AuthorizeView';

function MoviesPage() {
  return (
    <AuthorizeView>
      <AuthorizedMoviesContent />
    </AuthorizeView>
  );
}

function AuthorizedMoviesContent() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedies, setComedies] = useState<Movie[]>([]);
  const [documentaries, setDocumentaries] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const [action, comedy, docs] = await Promise.all([
          fetchMoviesByGenre('action'),
          fetchMoviesByGenre('comedies'),
          fetchMoviesByGenre('documentaries'),
        ]);
        setActionMovies(action);
        setComedies(comedy);
        setDocumentaries(docs);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const handleSelect = (show_id: string) => {
    navigate('/movie', { state: { show_id } });
  };

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ paddingTop: '80px' }}>
      <Header />
      <CategoryRow
        title="Action"
        movies={actionMovies}
        onSelect={handleSelect}
      />
      <CategoryRow title="Comedies" movies={comedies} onSelect={handleSelect} />
      <CategoryRow
        title="Documentaries"
        movies={documentaries}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default MoviesPage;
