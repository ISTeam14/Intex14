import { useRef, useState, useEffect } from 'react';
import { Movie } from '../types/Movie';
import './CategoryRow.css';

interface CategoryRowProps {
  title: string;
  movies: Movie[];
  onSelect: (show_id: string) => void;
}

function CategoryRow({ title, movies, onSelect }: CategoryRowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      container?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const sanitizeFilename = (title: string) =>
    title.replace(/[\\/&-:"*?<>|]+/g, '').trim();

  const getPosterUrl = (title: string) =>
    `https://large-assignments.s3.us-east-1.amazonaws.com/movie-images/${encodeURIComponent(sanitizeFilename(title))}.jpg`;

  return (
    <div className="category-row">
      <h2 className="category-title">{title}</h2>
      <div className="scroll-container">
        <button
          className="scroll-button left"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
        >
          ◀
        </button>

        <div className="category-scroll" ref={scrollRef}>
          {movies.map((m) => (
            <div
              key={m.show_id}
              className="movie-mini-card"
              onClick={() => onSelect(m.show_id)}
            >
              <img
                src={getPosterUrl(m.title)}
                alt={`${m.title} poster`}
                className="movie-poster"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/posters/default.jpg';
                }}
              />
            </div>
          ))}
        </div>

        <button
          className="scroll-button right"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

export default CategoryRow;
