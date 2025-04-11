// MoviesPage.tsx
import { useState, useEffect, useRef, useContext } from 'react';
import { Movie } from '../types/Movie';
import Header from '../components/Header';
import CategoryRow from '../components/CategoryRow';
import { useNavigate } from 'react-router-dom';
import {
  fetchMoviesByGenrePaged,
  fetchHybridRecommendationsByEmail,
} from '../api/MovieAPI';
import AuthorizeView, { UserContext } from '../components/AuthorizeView';
import Footer from '../components/Footer';
import UserRecsRow from '../components/UserRecsRow';


function MoviesPage() {
  return (
    <AuthorizeView>
      <AuthorizedMoviesContent />
    </AuthorizeView>
  );
}

function AuthorizedMoviesContent() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  // State for genre-based carousels
  const [moviesByGenre, setMoviesByGenre] = useState<Record<string, Movie[]>>(
    {}
  );
  const [genrePages, setGenrePages] = useState<Record<string, number>>({});
  const [genreTotals, setGenreTotals] = useState<Record<string, number>>({});
  const [genreToPageNext, setGenreToPageNext] = useState<string | null>(null);
  const [loadedGenres, setLoadedGenres] = useState<string[]>([
    'action',
    'comedies',
  ]);
  const allGenres = [
    'action',
    'comedies',
    'documentaries',
    'dramas',
    'horror_movies',
    'family_movies',
    'fantasy',
  ];
  const [loading, setLoading] = useState(true);
  const [isPaging, setIsPaging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // New state for hybrid recommendations based on user watch history.
  const [hybridRecs, setHybridRecs] = useState<Movie[]>([]);
  const [loadingHybrid, setLoadingHybrid] = useState(true);

  // Compute if all movies have been loaded for every genre.
  const allLoaded =
    allGenres.length === loadedGenres.length &&
    allGenres.every((genre) => {
      const total = genreTotals[genre];
      const current = moviesByGenre[genre]?.length || 0;
      return typeof total === 'number' && current >= total;
    });

  // Trigger lazy-loading only after user scrolls.
  useEffect(() => {
    const onScroll = () => {
      if (!hasScrolled && window.scrollY > 0) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasScrolled]);

  // Load movies for each genre in loadedGenres.
  useEffect(() => {
    const loadGenres = async () => {
      setLoading(true);
      try {
        for (const genre of loadedGenres) {
          if (!(genre in moviesByGenre)) {
            const currentPage = genrePages[genre] || 1;
            const { movies, total } = await fetchMoviesByGenrePaged(
              genre,
              currentPage,
              10
            );
            setMoviesByGenre((prev) => ({ ...prev, [genre]: movies }));
            setGenrePages((prev) => ({ ...prev, [genre]: currentPage + 1 }));
            setGenreTotals((prev) => ({ ...prev, [genre]: total }));
          }
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, [loadedGenres]);

  // Lazy load additional genres or pages when needed.
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        if (!hasScrolled) return;
        if (allLoaded) {
          obs.disconnect();
          return;
        }
        const entry = entries[0];
        if (entry.isIntersecting && !isPaging && !genreToPageNext) {
          if (loadedGenres.length < allGenres.length) {
            const nextGenre = allGenres[loadedGenres.length];
            setLoadedGenres((prev) => [...prev, nextGenre]);
          } else {
            const genreForPaging = allGenres.find((g) => {
              const total = genreTotals[g] || 0;
              const current = moviesByGenre[g]?.length || 0;
              return current < total;
            });
            if (genreForPaging) {
              setGenreToPageNext(genreForPaging);
            }
          }
        }
      },
      { rootMargin: '100px' }
    );
    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }
    return () => {
      if (sentinel) observer.unobserve(sentinel);
    };
  }, [
    loading,
    hasScrolled,
    isPaging,
    genreToPageNext,
    loadedGenres,
    allGenres,
    genreTotals,
    moviesByGenre,
    allLoaded,
  ]);

  // Load next page for a genre when needed.
  useEffect(() => {
    if (!genreToPageNext) return;
    const loadNextPage = async () => {
      setIsPaging(true);
      try {
        const currentPage = genrePages[genreToPageNext] || 1;
        await new Promise((res) => setTimeout(res, 300)); // small delay for UX
        const { movies, total } = await fetchMoviesByGenrePaged(
          genreToPageNext,
          currentPage,
          10
        );
        setMoviesByGenre((prev) => ({
          ...prev,
          [genreToPageNext]: [...(prev[genreToPageNext] || []), ...movies],
        }));
        setGenrePages((prev) => ({
          ...prev,
          [genreToPageNext]: currentPage + 1,
        }));
        setGenreTotals((prev) => ({ ...prev, [genreToPageNext]: total }));
      } catch (err) {
        console.error('Error loading next page:', err);
      } finally {
        setIsPaging(false);
        setGenreToPageNext(null);
      }
    };
    loadNextPage();
  }, [genreToPageNext, genrePages]);

  // Use the hybrid recommender API to load recommendations based on user's watch history.
  useEffect(() => {
    const loadHybridRecs = async () => {
      if (user && user.email) {
        try {
          const recs = await fetchHybridRecommendationsByEmail(user.email);
          setHybridRecs(recs);
        } catch (error) {
          console.error('Error fetching hybrid recommendations:', error);
          setHybridRecs([]);
        } finally {
          setLoadingHybrid(false);
        }
      } else {
        // If there's no user info, simply set empty recs.
        setHybridRecs([]);
        setLoadingHybrid(false);
      }
    };
    loadHybridRecs();
  }, [user]);

  const handleSelect = (show_id: string) => {
    navigate('/movie', { state: { show_id } });
  };

  if (error) return <p>Error: {error}</p>;

  // Ensure the initial genres are ready before rendering carousels.
  const initialGenresReady = ['action', 'comedies'].every(
    (genre) => moviesByGenre[genre]
  );
  if (!initialGenresReady) {
    return (
      <p style={{ textAlign: 'center', color: '#ccc' }}>Loading movies...</p>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <Header />
      
      <UserRecsRow onSelect={handleSelect} />

      {/* New Hybrid Recommendations Carousel */}
      {loadingHybrid ? (
        <p style={{ textAlign: 'center', color: '#ccc' }}>
          Loading recommendations...
        </p>
      ) : hybridRecs.length > 0 ? (
        <CategoryRow
          key="hybridRecs"
          title="Based on Your Watch History"
          movies={hybridRecs}
          onSelect={handleSelect}
        />
      ) : (
        <p style={{ textAlign: 'center', color: '#ccc' }}>
          No watch history recommendations available.
        </p>
      )}

      {/* Existing Genre Carousels */}
      {loadedGenres.map((genre) => (
        <CategoryRow
          key={genre}
          title={genre
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())}
          movies={moviesByGenre[genre] || []}
          onSelect={handleSelect}
        />
      ))}

      {allLoaded && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '2rem' }}>
          🎉 You've reached the end!
        </p>
      )}

      <div ref={sentinelRef} />

      <Footer />
    </div>
  );
}

export default MoviesPage;
