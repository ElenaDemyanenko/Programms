using Microsoft.EntityFrameworkCore;
using MyNotes.DataAccess;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<NotesDbContext>();
builder.Services.AddDbContext<NotesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Database")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("https://localhost:5175/");
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<NotesDbContext>();
    await dbContext.Database.EnsureCreatedAsync();
}



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.MapControllers();

app.Run();
