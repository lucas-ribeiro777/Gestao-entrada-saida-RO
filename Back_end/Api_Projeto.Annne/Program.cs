using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Repository;

var builder = WebApplication.CreateBuilder(args);

// Configuração da string de conexão
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<DbGestaoAnneContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// ADICIONE ESTA LINHA:
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ADICIONE ESTA LINHA:
app.MapControllers();

app.Run();
