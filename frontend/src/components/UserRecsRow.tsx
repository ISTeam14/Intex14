// src/components/UserRecsRow.tsx
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import { fetchUserRecs } from '../api/MovieAPI';
import CategoryRow from './CategoryRow';

interface UserRecsRowProps {
  userId: number;
  onSelect: (show_id: string) => void;
}

function UserRecsRow({ userId, onSelect }: UserRecsRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRecs(userId)
      .then(setMovies)
      .catch((err) => {
        console.error(err);
        setError('Failed to load recommendations');
      });
  }, [userId]);

  if (error || movies.length === 0) return null;

  return (
    <CategoryRow
      title="Recommended for You"
      movies={movies}
      onSelect={onSelect}
    />
  );
}

export default UserRecsRow;
