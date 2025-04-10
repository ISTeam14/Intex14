import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import GenreFilter from './GenreFilter';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() !== '' || selectedGenres.length > 0) {
      // Create a fake submit event to trigger the search logic
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSearch(fakeEvent);
    }
  }, [selectedGenres]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);
    try {
      let url = `https://intex14-backend-fpc2beauh7cmhfb6.eastus-01.azurewebsites.net/Movie/SearchMovies?query=${encodeURIComponent(query)}`;
      if (selectedGenres.length > 0) {
        url += `&genres=${selectedGenres.join(',')}`;
      }

      const res = await fetch(url, { credentials: 'include' });
      if (!res.ok) throw new Error('Bad response from search API');

      const data = await res.json();
      setResults(data.movies || []);
    } catch (error) {
      console.error('Search failed:', error);
      setResults([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
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

      <div className="filter-row">
        <GenreFilter
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
        />

        <div className="clear-filters">
          <button onClick={handleClearFilters} className="clear-button">
            Clear All Filters
          </button>
        </div>
      </div>

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
      {!loading && hasSearched && results.length === 0 && (
        <p className="no-results">No results found.</p>
      )}
    </div>
  );
}

export default SearchBar;
