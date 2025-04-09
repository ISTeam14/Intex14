import { useEffect, useState } from 'react';
import { fetchRecommendedMovies } from '../api/MovieAPI';
// import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';
import './MovieMiniCards.css';

interface MovieMiniCardsProps {
  show_id: string;
  onSelect: (show_id: string) => void;
}

function MovieMiniCards({ show_id, onSelect }: MovieMiniCardsProps) {
  const [movie, setMovie] = useState<Movie[]>([]);
  // const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const sanitizeFilename = (title: string) =>
    title.replace(/[\\\/&:.()'"*!?<>|\-]+/g, '').trim();

  const getPosterUrl = (title: string) =>
    `https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(sanitizeFilename(title))}.jpg`;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const recommended = await fetchRecommendedMovies(show_id);
        setMovie(recommended);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [show_id]);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="mini-card-grid">
        {movie.map((m) => (
          <div
            key={m.show_id}
            className="movie-mini-card"
            onClick={() => onSelect(m.show_id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={getPosterUrl(m.title)}
              alt={`${m.title} poster`}
              className="movie-poster"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/posters/default.jpg';
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieMiniCards;
