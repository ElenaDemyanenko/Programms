using Microsoft.EntityFrameworkCore;
using MyNotes.DataAccess;

namespace MyNotes.DataAccess
{
    public class NotesDbContext : DbContext 
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options)
            : base(options) 
        {
        }

        
        public DbSet<DbNote> Notes { get; set; } = null!; 

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); 
            modelBuilder.Entity<DbNote>().ToTable("Notes");
        }
    }
}