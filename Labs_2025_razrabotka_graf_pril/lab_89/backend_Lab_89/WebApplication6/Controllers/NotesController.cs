using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using System.Linq.Expressions;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    public NotesController(NotesDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new DbNote(request.Title, request.Description);
        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var query = _dbContext.Notes.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(n => n.Title.ToLower().Contains(request.Search.ToLower()));
        }

        query = (request.SortItem?.ToLower(), request.SortOrder?.ToLower()) switch
        {
            ("date", "desc") => query.OrderByDescending(n => n.CreatedAt),
            ("date", _) => query.OrderBy(n => n.CreatedAt),
            ("title", "desc") => query.OrderByDescending(n => n.Title),
            ("title", _) => query.OrderBy(n => n.Title),
            (_, "desc") => query.OrderByDescending(n => n.Id),
            _ => query.OrderBy(n => n.Id)
        };

        var noteDtos = await query
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(ct);

        return Ok(new GetNotesResponse(noteDtos));
    }
}