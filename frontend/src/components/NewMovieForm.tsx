import { useState } from "react";
import { Movie } from "../types/Movie";
import { addMovie } from "../api/MovieAPI";

interface NewMovieFormProps {
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

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<MovieFormData>({
    show_id: "",
    type: "",
    title: "",
    director: "",
    cast: "",
    country: "",
    release_year: 0,
    rating: "",
    duration: "",
    description: "",
    genre: "",
    action: 0,
    adventure: 0,
    anime_series_international_tv_shows: 0,
    british_tv_shows_docuseries_international_tv_shows: 0,
    children: 0,
    comedies: 0,
    comedies_dramas_international_movies: 0,
    comedies_international_movies: 0,
    comedies_romantic_movies: 0,
    crime_tv_shows_docuseries: 0,
    documentaries: 0,
    documentaries_international_movies: 0,
    docuseries: 0,
    dramas: 0,
    dramas_international_movies: 0,
    dramas_romantic_movies: 0,
    family_movies: 0,
    fantasy: 0,
    horror_movies: 0,
    international_movies_thrillers: 0,
    international_tv_shows_romantic_tv_shows_tv_dramas: 0,
    kids_tv: 0,
    language_tv_shows: 0,
    musicals: 0,
    nature_tv: 0,
    reality_tv: 0,
    spirituality: 0,
    tv_action: 0,
    tv_comedies: 0,
    talk_shows_tv_comedies: 0,
    thrillers: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = { ...formData };

    // ✅ Reset all binary genre fields to 0
    Object.values(genreToBinaryFields).flat().forEach((field) => {
      (updatedFormData as any)[field] = 0;
    });

    // ✅ Set selected genre fields to 1
    if (formData.genre && genreToBinaryFields[formData.genre]) {
      genreToBinaryFields[formData.genre].forEach((field) => {
        (updatedFormData as any)[field] = 1;
      });
    }

    const { genre, ...movieToSubmit } = updatedFormData; // remove genre before sending

    await addMovie(movieToSubmit);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form-container">
      <h2 className="movie-form-header h2">Add New Movie</h2>

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
      ].map(({ label, name, type, ...rest }) => (
        <div key={name} className="form-row">
          <label className="form-label">{label}:</label>
          <input
            type={type}
            name={name}
            value={formData[name as keyof MovieFormData]}
            onChange={handleChange}
            className="form-input"
            {...rest}
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

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <button
          className="pill-button"
          type="submit"
        >
          Add Movie
        </button>
        <button
          className="pill-button"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewMovieForm;
