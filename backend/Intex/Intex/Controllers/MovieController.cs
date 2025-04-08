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

        [HttpGet("GetMovies/{title}")]
        public IActionResult GetMovies(string title)
        {
            // Step 1: Get show_id for the given title
            var baseMovie = _context.movies_titles.FirstOrDefault(m => m.title.ToLower() == title.ToLower());

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

    }
}
