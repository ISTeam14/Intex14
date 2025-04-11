import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { pingAuth, fetchUserRecsByEmail } from '../api/MovieAPI';
import CategoryRow from './CategoryRow';

interface Props {
  onSelect: (show_id: string) => void;
}

function UserRecsRow({ onSelect }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecs() {
      const auth = await pingAuth();
      if (auth.ok && auth.email) {
        try {
          const recs = await fetchUserRecsByEmail(auth.email);
          setMovies(recs);
        } catch (err) {
          console.error('Error fetching recommendations:', err);
        }
      }
      setLoading(false);
    }

    fetchRecs();
  }, []);

  if (loading || movies.length === 0) return null;

  // ✅ 1. Top 10 overall
  const top10 = movies.slice(0, 10);

  // ✅ 2. Group by genre flag fields
  const genreBuckets: Record<string, Movie[]> = {
    Action: [],
    Dramas: [],
    Adventure: [],
    Comedies: [],
  };

  for (const movie of movies) {
    if (movie.action && genreBuckets.Action.length < 10) {
      genreBuckets.Action.push(movie);
    }
    if (movie.dramas && genreBuckets.Dramas.length < 10) {
      genreBuckets.Dramas.push(movie);
    }
    if (movie.adventure && genreBuckets.Adventure.length < 10) {
      genreBuckets.Adventure.push(movie);
    }
    if (movie.comedies && genreBuckets.Comedies.length < 10) {
      genreBuckets.Comedies.push(movie);
    }
  }

  // ✅ 3. Custom ordered carousel layout
  const orderedSections = [
    { label: 'Recommended for You', key: 'all' },
    { label: 'Recommended Action', key: 'Action' },
    { label: 'Recommended Dramas', key: 'Dramas' },
    { label: 'Recommended Adventure', key: 'Adventure' },
    { label: 'Recommended Comedies', key: 'Comedies' },
  ];

  return (
    <>
      {orderedSections.map(({ label, key }, i) => (
        <div key={label}>
          {i === 2 && (
            <div style={{ padding: '2rem 0', textAlign: 'center' }}>
            </div>
          )}

          <CategoryRow
            title={label}
            movies={key === 'all' ? top10 : genreBuckets[key] || []}
            onSelect={onSelect}
          />
        </div>
      ))}
    </>
  );
}

export default UserRecsRow;
