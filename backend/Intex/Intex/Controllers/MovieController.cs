using System.Security.Claims;
using Intex.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Intex.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
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

        [HttpGet("GetMovies/{show_id}")]
        public IActionResult GetMovies(string show_id)
        {
            // Step 1: Get show_id for the given title
            var baseMovie = _context.movies_titles.Find(show_id);

            if (baseMovie == null)
            {
                return NotFound(new { message = "Movie not found." });
            }

            var baseShowId = baseMovie.show_id;

            // Step 2: Get recommended show_ids from content_recs
            var recommendations = _context.hybrid_recs
                .Where(r => r.base_show_id == baseShowId)
                .OrderByDescending(r => r.similarity_score)
                .Select(r => r.recommended_show_id)
                .ToList();

            // Step 3: Get movie info for those recommended show_ids
            var recommendedMovies = _context.movies_titles
                .Where(m => recommendations.Contains(m.show_id))
                .ToList();

            return Ok(new { recommendedMovies });
        }

        [HttpGet("GetMoviesByGenre")]
        public IActionResult GetMoviesByGenre([FromQuery] string genre)
        {
            var query = _context.movies_titles.AsQueryable();

            var movies = genre.ToLower() switch
            {
                "action" => query.Where(m => m.action == 1).Take(10).ToList(),
                "comedies" => query.Where(m => m.comedies == 1).Take(10).ToList(),
                "documentaries" => query.Where(m => m.documentaries == 1).Take(10).ToList(),
                _ => new List<movies_titles>()
            };

            return Ok(new { movies });
        }

        [HttpGet("GetMoviesByGenrePaged")]
        public IActionResult GetMoviesByGenrePaged(
            [FromQuery] string genre,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(genre))
                return BadRequest(new { message = "Genre is required." });

            var query = _context.movies_titles.AsQueryable();

            // Filter by genre dynamically
            query = genre.ToLower() switch
            {
                "action" => query.Where(m => m.action == 1),
                "comedies" => query.Where(m => m.comedies == 1),
                "documentaries" => query.Where(m => m.documentaries == 1),
                "dramas" => query.Where(m => m.dramas == 1),
                "horror_movies" => query.Where(m => m.horror_movies == 1),
                "fantasy" => query.Where(m => m.fantasy == 1),
                "family_movies" => query.Where(m => m.family_movies == 1),
                _ => Enumerable.Empty<movies_titles>().AsQueryable()
            };

            var total = query.Count();

            var movies = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { movies, total });
        }


        [HttpGet("GetAverageRating/{show_id}")]
        public IActionResult GetAverageRating(string show_id)
        {
            var avgRating = _context.movies_ratings
                .Where(r => r.show_id == show_id && r.rating.HasValue)
                .Average(r => (double?)r.rating) ?? 0;

            return Ok(new { average = Math.Round(avgRating, 1) });
        }

        [HttpGet("SearchMovies")]
        public IActionResult SearchMovies([FromQuery] string query, [FromQuery] string? genres)
        {
            var genreList = (genres ?? "")
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(g => g.ToLower())
                .ToList();

            var movies = _context.movies_titles.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query))
            {
                movies = movies.Where(m => m.title.ToLower().Contains(query.ToLower()));
            }

            if (genreList.Any())
            {
                movies = movies.Where(m =>
                    (genreList.Contains("action") && m.action == 1) ||
                    (genreList.Contains("comedies") && m.comedies == 1) ||
                    (genreList.Contains("documentaries") && m.documentaries == 1) ||
                    (genreList.Contains("dramas") && m.dramas == 1) ||
                    (genreList.Contains("family_movies") && m.family_movies == 1) ||
                    (genreList.Contains("fantasy") && m.fantasy == 1) ||
                    (genreList.Contains("horror_movies") && m.horror_movies == 1)
                );
            }

            return Ok(new { movies = movies.Take(50).ToList() });
        }

        [HttpGet("GetMoviePages")] // Updated route
        public IActionResult GetMoviePages(int pageHowMany = 10, int pageNum = 1)
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
        [Authorize(Roles = "Administrator")]
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
        [Authorize(Roles = "Administrator")]
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
        [Authorize(Roles = "Administrator")]
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

        [HttpGet("GetUserRating/{show_id}")]
        [Authorize] // Require authentication so we know who the user is
        public IActionResult GetUserRating(string show_id)
        {
            // Retrieve the user id string from the authenticated user
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(show_id) || string.IsNullOrEmpty(userIdString))
                return BadRequest("Missing data.");

            // Convert user id string to integer
            if (!int.TryParse(userIdString, out int parsedUserId))
            {
                return BadRequest("Invalid user id.");
            }

            // Query the database for the rating by the current user for this movie
            var rating = _context.movies_ratings
                .FirstOrDefault(r => r.show_id == show_id && r.user_id == parsedUserId)?.rating;

            return Ok(new { rating });
        }


        //[HttpPost("SubmitRating")]
        //[Authorize] // Ensure that only authenticated users can rate
        //public IActionResult SubmitRating([FromBody] movies_ratings newRating)
        //{
        //    // Retrieve the user id string from the authenticated user.
        //    // (You may need to adjust the claim type if your token uses a different one, e.g. "sub".)
        //    var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        //    // Check for missing data
        //    if (string.IsNullOrEmpty(newRating.show_id) || newRating.rating == null || string.IsNullOrEmpty(userIdString))
        //        return BadRequest("Missing data.");

        //    // Directly assign the string user id to the newRating object.
        //    newRating.user_id = userIdString;

        //    // Try to find an existing rating for this show_id by the current user.
        //    var existing = _context.movies_ratings
        //        .FirstOrDefault(r => r.show_id == newRating.show_id && r.user_id == userIdString);

        //    if (existing != null)
        //    {
        //        // Update the existing rating.
        //        existing.rating = newRating.rating;
        //        _context.movies_ratings.Update(existing);
        //    }
        //    else
        //    {
        //        // Add new rating.
        //        _context.movies_ratings.Add(newRating);
        //    }

        //    _context.SaveChanges();
        //    return Ok();
        //}

    }
}
