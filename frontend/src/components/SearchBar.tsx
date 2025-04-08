import { useState } from 'react';
import { searchMovies } from '../api/MovieAPI';
import { Movie } from '../types/Movie';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const sanitizeFilename = (title: string) =>
    title.replace(/[\\\/&:.()'"*!?<>|\-]+/g, '').trim();

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="search-results">
        {results.map((movie) => (
          <div
            key={movie.show_id}
            className="movie-mini-card"
            onClick={() =>
              navigate('/movie', { state: { show_id: movie.show_id } })
            }
          >
            <img
              src={`https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(
                sanitizeFilename(movie.title)
              )}.jpg`}
              alt={movie.title}
              className="movie-poster"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/posters/default.jpg';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
