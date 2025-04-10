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

        public DbSet<hybrid_recs> hybrid_recs { get; set; }

        public DbSet<wide_deep_recs> wide_deep_recs { get; set; }

        public DbSet<email_ids> email_ids { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<wide_deep_recs>()
                .HasNoKey()  // 👈 Tells EF Core this is a read-only, no-primary-key table
                .ToTable("wide_deep_recs");

            modelBuilder.Entity<wide_deep_recs>()
                .HasOne(w => w.Show)
                .WithMany()
                .HasForeignKey(w => w.ShowId)
                .HasPrincipalKey(m => m.show_id);
        }
    }
}



    
