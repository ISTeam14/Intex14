import './GenreFilter.css';

interface GenreFilterProps {
  selectedGenres: string[];
  setSelectedGenres: React.Dispatch<React.SetStateAction<string[]>>;
}

const genres = [
  'action',
  'adventure',
  'anime_series_international_tv_shows',
  'british_tv_shows_docuseries_international_tv_shows',
  'children',
  'comedies',
  'comedies_dramas_international_movies',
  'comedies_international_movies',
  'comedies_romantic_movies',
  'crime_tv_shows_docuseries',
  'documentaries',
  'documentaries_international_movies',
  'docuseries',
  'dramas',
  'dramas_international_movies',
  'dramas_romantic_movies',
  'family_movies',
  'fantasy',
  'horror_movies',
  'international_movies_thrillers',
  'international_tv_shows_romantic_tv_shows_tv_dramas',
  'kids_tv',
  'language_tv_shows',
  'musicals',
  'nature_tv',
  'reality_tv',
  'spirituality',
  'tv_action',
  'tv_comedies',
  'talk_shows_tv_comedies',
  'thrillers',
];

function GenreFilter({ selectedGenres, setSelectedGenres }: GenreFilterProps) {
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="genre-filter-wrapper">
      <div className="genre-filter">
        <button
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('.genre-options')?.classList.toggle('open');
          }}
        >
          Filter by Genre ⏷
        </button>
        <div className="genre-options">
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              {genre.replace(/_/g, ' ')}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;
