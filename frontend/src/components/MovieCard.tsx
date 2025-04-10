import { useEffect, useState } from 'react';
import { fetchMovie, getUserRating } from '../api/MovieAPI';
// import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';
import './MovieCard.css';
import MovieMiniCards from './MovieMiniCards';

interface MovieCardProps {
  show_id: string;
  setShowId: (id: string) => void;
}

function MovieCard({ show_id, setShowId }: MovieCardProps) {
  const [movie, setMovie] = useState<Movie | null>(null);
  //   const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'suggested' | 'details'>(
    'suggested'
  );
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);

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

  useEffect(() => {
    const loadUserRating = async () => {
      const rating = await getUserRating(show_id);
      setUserRating(rating);
    };

    loadUserRating();
  }, [show_id]);

  const renderStars = (rating: number) => {
    return (
      <span>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < Math.round(rating) ? '⭐' : '☆'}</span>
        ))}
      </span>
    );
  };

  const handleUserRate = async (rating: number) => {
    setUserRating(rating);

<<<<<<< HEAD
    try {
      await fetch(`https://localhost:5000/Movie/SubmitRating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure cookies are sent
        body: JSON.stringify({ show_id, rating }),
      });

      // Refresh the average rating after posting
      const res = await fetch(
        `https://localhost:5000/Movie/GetAverageRating/${show_id}`
      );
      const data = await res.json();
      setAverageRating(data.average);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
=======
    await fetch(`https://localhost:5000/Movie/SubmitRating`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ show_id, rating }),
      credentials: 'include',
    });

    // Refresh average
    const res = await fetch(
      `https://localhost:5000/Movie/GetAverageRating/${show_id}`,
      {
        credentials: 'include',
      }
    );
    const data = await res.json();
    setAverageRating(data.average);
>>>>>>> dawson6
  };

  const formatGenre = (genre: string) =>
    genre.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const sanitizeFilename = (title: string) =>
    title.replace(/[\\\/&:.()'"*!?<>|\-]+/g, '').trim();

  const getPosterUrl = (title: string) =>
    `https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(sanitizeFilename(title))}.jpg`;

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

  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Movie/GetAverageRating/${show_id}`,
          {
            credentials: 'include',
          }
        );
        const data = await response.json();
        setAverageRating(data.average);
      } catch (err) {
        console.error('Error fetching average rating:', err);
      }
    };

    fetchAverage();
  }, [show_id]);

  useEffect(() => {
    setUserRating(null);
  }, [show_id]);

  if (loading) return <p className="loading">Loading Movie...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!movie) return <p className="error">No movie found.</p>;

  return (
    <>
      <div className="movie-feature">
        <div
          className="background-image"
          style={{ backgroundImage: `url(${getPosterUrl(movie.title)})` }}
        ></div>

        <div className="content-wrapper">
          <div className="movie-content">
            <div className="movie-info-overlay">
              <h1 className="main-title">{movie.title}</h1>
              <p className="movie-meta">
                {movie.release_year} • {movie.duration} •{' '}
                {movie.rating || 'N/A'} •{' '}
                {formatGenre(getGenre(movie) ?? 'Unknown')}
                {averageRating !== null && (
                  <span>
                    {' '}
                    • {renderStars(averageRating)} ({averageRating})
                  </span>
                )}
              </p>
              <div className="user-rating-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    onClick={() => handleUserRate(i + 1)}
                  >
                    {userRating !== null && i < userRating ? '⭐' : '☆'}
                  </span>
                ))}
              </div>
              <p className="movie-description">{movie.description}</p>
              <div className="button-row">
                <button className="play-button">▶ Play</button>
                <button className="trailer-button">Trailer</button>
              </div>
            </div>
          </div>

          <div className="tabs">
            <button
              className={`tab ${activeTab === 'suggested' ? 'active' : ''}`}
              onClick={() => setActiveTab('suggested')}
            >
              Suggested
            </button>
            <button
              className={`tab ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
          </div>

          {activeTab === 'suggested' && (
            <section className="suggested-movies">
              <MovieMiniCards onSelect={setShowId} show_id={show_id} />
            </section>
          )}

          {activeTab === 'details' && (
            <section className="details-section">
              <div className="details-grid">
                <div>
                  <p>
                    <strong>Duration:</strong> {movie.duration || 'N/A'}
                  </p>
                  <p>
                    <strong>Release Date:</strong> {movie.release_year || 'N/A'}
                  </p>
                  <p>
                    <strong>Genre:</strong>{' '}
                    {formatGenre(getGenre(movie) ?? 'N/A')}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.rating || 'N/A'}
                  </p>
                  <p>
                    <strong>Director:</strong> {movie.director || 'N/A'}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Cast:</strong>
                  </p>
                  {(() => {
                    console.log('Cast string:', movie.cast);
                    return null;
                  })()}
                  <ul className="cast-list">
                    {movie.cast ? (
                      movie.cast
                        .split(/,|\|/)
                        .map((actor, idx) => <li key={idx}>{actor.trim()}</li>)
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieCard;
