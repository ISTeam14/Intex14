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
            var recommendations = _context.content_recs
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



        //[HttpPost("SubmitRating")]
        //public IActionResult SubmitRating([FromBody] movies_ratings newRating)
        //{
        //    if (string.IsNullOrEmpty(newRating.show_id) || newRating.rating == null || string.IsNullOrEmpty(newRating.user_id))
        //        return BadRequest("Missing data.");

        //    var existing = _context.movies_ratings
        //        .FirstOrDefault(r => r.show_id == newRating.show_id && r.user_id == newRating.user_id);

        //    if (existing != null)
        //    {
        //        // Update the existing rating
        //        existing.rating = newRating.rating;
        //        _context.movies_ratings.Update(existing);
        //    }
        //    else
        //    {
        //        // Add new rating
        //        _context.movies_ratings.Add(newRating);
        //    }

        //    _context.SaveChanges();
        //    return Ok();
        //}

    }
}
