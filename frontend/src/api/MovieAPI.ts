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

const API_URL =
  'https://intex14-backend-fpc2beauh7cmhfb6.eastus-01.azurewebsites.net';

export const fetchMovie = async (
  show_id: string
): Promise<FetchMovieResponse> => {
  try {
    const response = await fetch(`${API_URL}/Movie/GetMovie/${show_id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie: ', error);
    throw error;
  }
};

export const fetchUserRecs = async (user_id: number): Promise<Movie[]> => {
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
    const response = await fetch(`${API_URL}/Movie/GetMovies/${show_id}`, {
      credentials: 'include',
    });

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
    `${API_URL}/Movie/GetMoviesByGenre?genre=${genre}`,
    {
      credentials: 'include',
    }
  );
  if (!response.ok) throw new Error('Failed to fetch movies.');
  const data = await response.json();
  return data.movies;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const res = await fetch(
    `${API_URL}/Movie/SearchMovies?query=${encodeURIComponent(query)}`,
    {
      credentials: 'include',
    }
  );
  const data = await res.json();
  return data.movies;
};

export const getUserRating = async (
  show_id: string
): Promise<number | null> => {
  try {
    const response = await fetch(`${API_URL}/Movie/GetUserRating/${show_id}`, {
      credentials: 'include', // ensures authentication cookies are sent
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user rating');
    }
    const data = await response.json();
    return data.rating; // will be either a number or null
  } catch (error) {
    console.error('Error in getUserRating:', error);
    return null;
  }
};

export const fetchRecommendedMovies = async (
  show_id: string
): Promise<Movie[]> => {
  const response = await fetch(`${API_URL}/Movie/GetMovies/${show_id}`, {
    credentials: 'include',
  });

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
      `${API_URL}/Movie/GetMoviesByGenrePaged?genre=${genre}&page=${page}&pageSize=${pageSize}`,
      { credentials: 'include' }
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
      `${API_URL}/Movie/GetMoviePages?pageHowMany=${pageSize}&pageNum=${pageNum}`,
      {
        credentials: 'include',
      }
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
    const response = await fetch(`${API_URL}/Movie/DeleteMovie/${show_id}`, {
      method: 'DELETE',
      credentials: 'include',
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

    const response = await fetch(`${API_URL}/Movie/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
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
    const response = await fetch(`${API_URL}/Movie/UpdateMovie/${show_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      body: JSON.stringify(updatedMovie),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const fetchUserRecsByEmail = async (email: string): Promise<Movie[]> => {
  const res = await fetch(`${API_URL}/Movie/GetUserRecsByEmail?email=${encodeURIComponent(email)}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch user recommendations by email.');
  }

  const data = await res.json();
  return data.recommendations;
};


export async function pingAuth() {
  try {
    const response = await fetch(
      'https://intex14-backend-fpc2beauh7cmhfb6.eastus-01.azurewebsites.net/pingauth',
      {
        method: 'GET',
        credentials: 'include',
      }
    );
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format from server');
    }
    const data = await response.json();
    if (data.email) {
      return { ok: true, email: data.email, roles: data.roles ?? [] };
    } else {
      throw new Error('Invalid user session');
    }
  } catch (error) {
    console.error('Authorization error:', error);
    return { ok: false };
  }
}
