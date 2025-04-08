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
        public IActionResult GetMovies()
        {
            var query = _context.movies_titles.AsQueryable();

            var movies = query.Take(10).ToList();

            return Ok(new { movies });
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
