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
    }
}
