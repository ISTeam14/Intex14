import { useState, useEffect } from "react";
import { Movie } from "../types/Movie";
import { updateMovie } from "../api/MovieAPI";

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

type MovieFormData = Movie & { genre: string };

const genres = [
  { label: "Action", value: "action" },
  { label: "Comedy", value: "comedies" },
  { label: "Drama", value: "dramas" },
  { label: "Adventure", value: "adventure" },
  { label: "Horror", value: "horror_movies" },
  { label: "Documentary", value: "documentaries" },
  { label: "Thriller", value: "thrillers" },
  { label: "Family", value: "family_movies" },
  { label: "Kids", value: "kids_tv" },
  { label: "Reality", value: "reality_tv" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Musical", value: "musicals" },
  { label: "Spirituality", value: "spirituality" },
  { label: "Nature", value: "nature_tv" },
  { label: "Talk Show", value: "talk_shows_tv_comedies" },
  { label: "Crime", value: "crime_tv_shows_docuseries" },
];

const genreToBinaryFields: { [key: string]: string[] } = {
  action: ["action"],
  comedies: ["comedies"],
  dramas: ["dramas"],
  adventure: ["adventure"],
  horror_movies: ["horror_movies"],
  documentaries: ["documentaries"],
  thrillers: ["thrillers"],
  family_movies: ["family_movies"],
  kids_tv: ["kids_tv"],
  reality_tv: ["reality_tv"],
  fantasy: ["fantasy"],
  musicals: ["musicals"],
  spirituality: ["spirituality"],
  nature_tv: ["nature_tv"],
  talk_shows_tv_comedies: ["talk_shows_tv_comedies"],
  crime_tv_shows_docuseries: ["crime_tv_shows_docuseries"],
};

const EditMovieForm = ({ movie, onSuccess, }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<MovieFormData>({ ...movie, genre: "" });

  // Infer the genre from the binary flags on mount
  useEffect(() => {
    for (const key in genreToBinaryFields) {
      if (genreToBinaryFields[key].some((field) => (movie as any)[field] === 1)) {
        setFormData((prev) => ({ ...prev, genre: key }));
        break;
      }
    }
  }, [movie]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = { ...formData };

    // Reset all binary fields to 0
    Object.values(genreToBinaryFields).flat().forEach((field) => {
      (updatedFormData as any)[field] = 0;
    });

    // Set the selected genre
    if (formData.genre && genreToBinaryFields[formData.genre]) {
      genreToBinaryFields[formData.genre].forEach((field) => {
        (updatedFormData as any)[field] = 1;
      });
    }

    const { genre, ...movieToSubmit } = updatedFormData;

    await updateMovie(formData.show_id, movieToSubmit); // Assumes updateMovie takes a Movie object
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form-container">
      <h2 className="movie-form-header h2">Edit Movie</h2>

      {[
        { label: "Type", name: "type", type: "text" },
        { label: "Title", name: "title", type: "text" },
        { label: "Director", name: "director", type: "text" },
        { label: "Cast", name: "cast", type: "text" },
        { label: "Country", name: "country", type: "text" },
        { label: "Release Year", name: "release_year", type: "number" },
        { label: "Duration", name: "duration", type: "text" },
        { label: "Description", name: "description", type: "text" },
        { label: "Rating", name: "rating", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name} className="form-row">
          <label className="form-label">{label}:</label>
          <input
            type={type}
            name={name}
            value={formData[name as keyof MovieFormData]}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      ))}

      <div className="form-row">
        <label className="form-label">Genre:</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          className="pill-button"
          type="submit"
        >
          Save Changes
        </button>
      
      </div>
    </form>
  );
};

export default EditMovieForm;




