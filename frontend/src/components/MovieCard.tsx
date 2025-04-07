import { useEffect, useState } from 'react';
import { fetchMovie } from '../api/MovieAPI';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';
import './MovieCard.css';

interface MovieCardProps {
  show_id: string;
}

function MovieCard({ show_id }: MovieCardProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getGenre = (movie: any): string | null => {
    const possibleGenres = [
      'action',
      'adventure',
      'anime_series_international_tv_shows',
      'british_tv_shows_docuseries_international_tv_shows',
      'children',
      'comedies',
      'comedies_dramas_international_movies',
      'comedies_international_movies',
      'comedies_romantic_movies',
      'crime_tv_shows_docuseries',
      'documentaries',
      'documentaries_international_movies',
      'docuseries',
      'dramas',
      'dramas_international_movies',
      'dramas_romantic_movies',
      'family_movies',
      'fantasy',
      'horror_movies',
      'international_movies_thrillers',
      'international_tv_shows_romantic_tv_shows_tv_dramas',
      'kids_tv',
      'language_tv_shows',
      'musicals',
      'nature_tv',
      'reality_tv',
      'spirituality',
      'tv_action',
      'tv_comedies',
      'talk_shows_tv_comedies',
      'thrillers',
    ];

    const genre = possibleGenres.find((g) => movie[g] === 1);
    return genre || null;
  };

  const formatGenre = (genre: string) =>
    genre.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const getPosterUrl = (title: string) =>
    `https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(title.trim())}.jpg`;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovie(show_id);
        setMovie(data.movie);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [show_id]);

  if (loading) return <p className="loading">Loading Movie...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!movie) return <p className="error">No movie found.</p>;

  return (
    <div className="movie-feature">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${getPosterUrl(movie.title)})`,
        }}
      ></div>
      <div className="movie-info-overlay">
        <h1 className="main-title">{movie.title}</h1>
        <p className="movie-meta">
          {movie.release_year} • {movie.duration} •{' '}
          {formatGenre(getGenre(movie) ?? 'Unknown')}
        </p>
        <p className="movie-description">{movie.description}</p>
        <div className="button-row">
          <button className="play-button">▶ Play</button>
          <button className="trailer-button">Trailer</button>
        </div>
      </div>

      <div className="tabs">
        <button className="tab active">Suggested</button>
        <button className="tab">Details</button>
      </div>

      <section className="suggested-movies">
        {/* If you plan to fetch or show more movies here later */}
      </section>
    </div>
  );
}

export default MovieCard;
