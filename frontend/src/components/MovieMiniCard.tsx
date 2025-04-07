import { useEffect, useState } from 'react';
import { fetchMovies } from '../api/MovieAPI';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types/Movie';

function MovieMiniCard() {
  const [movie, setMovie] = useState<Movie[]>([]);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getPosterUrl = (title: string) =>
    `https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(title.trim())}.jpg`;

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies();

        setMovie(data.movies);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <p>Loading Movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {movie.map((m) => (
        <div key={m.show_id} className="movie-mini-card">
          <h5>{m.title}</h5>
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
    </>
  );
}

export default MovieMiniCard;
