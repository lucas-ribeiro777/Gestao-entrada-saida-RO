using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using APIautorizacao.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<EscolaContext>(options =>
    options.UseInMemoryDatabase("EscolaDB"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo 
    { 
        Title = "APIautorizacao",
        Version = "v1",
        Description = "API para autorização de solicitações"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "APIautorizacao v1");
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
