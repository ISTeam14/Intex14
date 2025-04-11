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

  return (
    <CategoryRow
      title="Recommended for You"
      movies={movies}
      onSelect={onSelect}
    />
  );
}

export default UserRecsRow;
