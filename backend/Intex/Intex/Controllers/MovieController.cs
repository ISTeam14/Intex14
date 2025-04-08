using Intex.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private MovieDbContext _context;

        public MovieController(MovieDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("GetMovie/{show_id}")]
        public IActionResult GetMovie(string show_id)
        {
            var movie = _context.movies_titles.Find(show_id);
            return Ok(new { movie });
        }

        [HttpGet("GetMovies")]
        public IActionResult GetMovies(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _context.movies_titles.AsQueryable();

            var movies = query
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            var totalNumMovies = query.Count();

            return Ok(new { movies, totalNumMovies });
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] movies_titles newMovie)
        {
            try
            {
                var allIds = _context.movies_titles
                    .Where(m => m.show_id != null && m.show_id.StartsWith("s"))
                    .Select(m => m.show_id)
                    .ToList();

                var maxId = allIds
                    .Select(id =>
                    {
                        var numberPart = id.Length > 1 ? id.Substring(1) : "0";
                        return int.TryParse(numberPart, out var num) ? num : 0;
                    })
                    .DefaultIfEmpty(0)
                    .Max();

                var newId = $"s{maxId + 1}";
                newMovie.show_id = newId;

                _context.movies_titles.Add(newMovie);
                _context.SaveChanges();

                return Ok(newMovie);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"ERROR adding movie: {ex.Message}");
                return StatusCode(500, $"Backend Error: {ex.Message}");
            }
        }

        [HttpDelete("DeleteMovie/{show_id}")]
        public IActionResult DeleteMovie(string show_id)
        {
            var existingMovie = _context.movies_titles.Find(show_id);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }

            _context.movies_titles.Remove(existingMovie);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpPut("UpdateMovie/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] movies_titles updatedMovie)
        {
            var existingMovie = _context.movies_titles.Find(show_id);
            if (existingMovie == null)
            {
                return NotFound();
            }

            // Update core fields
            existingMovie.type = updatedMovie.type;
            existingMovie.title = updatedMovie.title;
            existingMovie.director = updatedMovie.director;
            existingMovie.cast = updatedMovie.cast;
            existingMovie.country = updatedMovie.country;
            existingMovie.release_year = updatedMovie.release_year;
            existingMovie.rating = updatedMovie.rating;
            existingMovie.duration = updatedMovie.duration;
            existingMovie.description = updatedMovie.description;

            // Update genre flags
            existingMovie.action = updatedMovie.action;
            existingMovie.adventure = updatedMovie.adventure;
            existingMovie.anime_series_international_tv_shows = updatedMovie.anime_series_international_tv_shows;
            existingMovie.british_tv_shows_docuseries_international_tv_shows = updatedMovie.british_tv_shows_docuseries_international_tv_shows;
            existingMovie.children = updatedMovie.children;
            existingMovie.comedies = updatedMovie.comedies;
            existingMovie.comedies_dramas_international_movies = updatedMovie.comedies_dramas_international_movies;
            existingMovie.comedies_international_movies = updatedMovie.comedies_international_movies;
            existingMovie.comedies_romantic_movies = updatedMovie.comedies_romantic_movies;
            existingMovie.crime_tv_shows_docuseries = updatedMovie.crime_tv_shows_docuseries;
            existingMovie.documentaries = updatedMovie.documentaries;
            existingMovie.documentaries_international_movies = updatedMovie.documentaries_international_movies;
            existingMovie.docuseries = updatedMovie.docuseries;
            existingMovie.dramas = updatedMovie.dramas;
            existingMovie.dramas_international_movies = updatedMovie.dramas_international_movies;
            existingMovie.dramas_romantic_movies = updatedMovie.dramas_romantic_movies;
            existingMovie.family_movies = updatedMovie.family_movies;
            existingMovie.fantasy = updatedMovie.fantasy;
            existingMovie.horror_movies = updatedMovie.horror_movies;
            existingMovie.international_movies_thrillers = updatedMovie.international_movies_thrillers;
            existingMovie.international_tv_shows_romantic_tv_shows_tv_dramas = updatedMovie.international_tv_shows_romantic_tv_shows_tv_dramas;
            existingMovie.kids_tv = updatedMovie.kids_tv;
            existingMovie.language_tv_shows = updatedMovie.language_tv_shows;
            existingMovie.musicals = updatedMovie.musicals;
            existingMovie.nature_tv = updatedMovie.nature_tv;
            existingMovie.reality_tv = updatedMovie.reality_tv;
            existingMovie.spirituality = updatedMovie.spirituality;
            existingMovie.tv_action = updatedMovie.tv_action;
            existingMovie.tv_comedies = updatedMovie.tv_comedies;
            existingMovie.talk_shows_tv_comedies = updatedMovie.talk_shows_tv_comedies;
            existingMovie.thrillers = updatedMovie.thrillers;

            _context.movies_titles.Update(existingMovie);
            _context.SaveChanges();

            return Ok(existingMovie);
        }
    }
}
