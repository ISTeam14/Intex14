import { Movie } from '../types/Movie';

interface FetchMovieResponse {
  movie: Movie;
  totalNumMovies: number;
}

interface FetchPagesResponse {
  movies: Movie[];
  totalNumMovies: number; // Added this property
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

export const fetchPages = async (
    pageSize: number,
    pageNum: number,
    

): Promise<FetchPagesResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetMoviePages?pageHowMany=${pageSize}&pageNum=${pageNum}`);

    if (!response.ok) {
      throw new Error('Failed to fetch movie.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie: ', error);
    throw error;
  }

  
};

export const deleteMovie = async (show_id: string): Promise<void> => { // Changed type to string
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
      console.log(" Sending movie to backend:", newMovie);

      const response = await fetch(`${API_URL}/AddMovie`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMovie)
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


export const updateMovie = async (show_id: string, updatedMovie: Movie) : Promise<Movie> =>{
  try{   
      const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie)
  });

  return await response.json();

  }
  catch(error){
      console.error('Error updating project:', error);
      throw error
  }
};