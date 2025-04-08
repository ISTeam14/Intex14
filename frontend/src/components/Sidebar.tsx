import './Sidebar.css';

interface SidebarProps {
  selectedGenre: string | null;
  setSelectedGenre: (genre: string | null) => void;
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

function Sidebar({ selectedGenre, setSelectedGenre }: SidebarProps) {
  return (
    <div className="sidebar">
      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li
            key={genre}
            className={selectedGenre === genre ? 'active' : ''}
            onClick={() =>
              setSelectedGenre(selectedGenre === genre ? null : genre)
            }
          >
            {genre.replace(/_/g, ' ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
