using Microsoft.EntityFrameworkCore;

namespace Intex.Data
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        {

        }

        public DbSet<movies_ratings> movies_ratings { get; set; }

        public DbSet<movies_titles> movies_titles { get; set; }

        public DbSet<movies_users> movies_users { get; set; }
    }
}
