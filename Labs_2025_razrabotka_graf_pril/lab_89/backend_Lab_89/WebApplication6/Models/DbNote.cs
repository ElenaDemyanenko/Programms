using System;
using System.ComponentModel.DataAnnotations;

namespace MyNotes.DataAccess
{
    public class DbNote
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }

        public DbNote(string title, string description)
        {
            Id = Guid.NewGuid();
            Title = title;
            Description = description;
            CreatedAt = DateTime.UtcNow;
        }
    }
}