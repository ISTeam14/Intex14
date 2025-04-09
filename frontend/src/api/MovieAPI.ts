import { Movie } from '../types/Movie';

interface FetchMovieResponse {
  movie: Movie;
}

interface FetchMoviesResponse {
  movies: Movie[];
}

interface FetchPagesResponse {
  movies: Movie[];
  totalNumMovies: number; // Added this property
}

interface FetchMoviesByGenrePagedResponse {
  movies: Movie[];
  total: number;
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

export const fetchUserRecs = async (
  user_id: number
): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/GetUserRecs/${user_id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user recommendations.');
  }

  const data = await response.json();
  return data.recommendations;
};


export const fetchMovies = async (
  show_id: string
): Promise<FetchMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetMovies/${show_id}`);

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

export const fetchRecommendedMovies = async (
  show_id: string
): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/GetMovies/${show_id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recommended movies.');
  }

  const data = await response.json();
  return data.recommendedMovies;
};

export const fetchMoviesByGenrePaged = async (
  genre: string,
  page: number,
  pageSize: number
): Promise<FetchMoviesByGenrePagedResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/GetMoviesByGenrePaged?genre=${genre}&page=${page}&pageSize=${pageSize}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch paged movies by genre.');
    }

    const data = await response.json();
    return {
      movies: data.movies,
      total: data.total,
    };
  } catch (error) {
    console.error('Error fetching paged genre movies:', error);
    throw error;
  }
};

export const fetchPages = async (
  pageSize: number,
  pageNum: number
): Promise<FetchPagesResponse> => {
  try {
    const response = await fetch(
      `${API_URL}/GetMoviePages?pageHowMany=${pageSize}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movie.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie: ', error);
    throw error;
  }
};

export const deleteMovie = async (show_id: string): Promise<void> => {
  // Changed type to string
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    // Log the payload you're about to send
    console.log(' Sending movie to backend:', newMovie);

    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add Movie');
    }

    return await response.json();
  } catch (error) {
    console.error(' Error adding movie:', error);
    throw error;
  }
};

export const updateMovie = async (
  show_id: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};
