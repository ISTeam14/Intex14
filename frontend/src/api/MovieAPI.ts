import { Movie } from '../types/Movie';

interface FetchMovieResponse {
  movie: Movie;
}

interface FetchMoviesResponse {
  movies: Movie[];
}

const API_URL = 'https://localhost:5000/Movie';

export const fetchMovie = async (
  show_id: string
): Promise<FetchMovieResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetMovie/${show_id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch movie.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie: ', error);
    throw error;
  }
};

export const fetchMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetMovies`);

    if (!response.ok) {
      throw new Error('Failed to fetch movie.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie: ', error);
    throw error;
  }
};

export const fetchMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  const response = await fetch(
    `https://localhost:5000/Movie/GetMoviesByGenre?genre=${genre}`
  );
  if (!response.ok) throw new Error('Failed to fetch movies.');
  const data = await response.json();
  return data.movies;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(
    `https://localhost:5000/Movie/SearchMovies?query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.movies;
};
