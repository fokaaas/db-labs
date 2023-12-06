using Microsoft.EntityFrameworkCore;
using Action_REST_API.ActionDbContext;
using Action_REST_API.Filters;

var builder = WebApplication.CreateBuilder(args);

var connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<MydbContext>((options) => options.UseMySql(connection, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<CheckDbFilter>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
