using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Repository;
using Api_Projeto.Annne.Models; // para Coordenador
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Configuração da string de conexão
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Configuração do DbContext com MySQL
builder.Services.AddDbContext<DbGestaoAnneContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Registrar PasswordHasher para Coordenador
builder.Services.AddScoped<IPasswordHasher<Coordenador>, PasswordHasher<Coordenador>>();

// Configuração CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("MinhaPoliticaCors", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Configura o controlador e adiciona suporte a ReferenceHandler.Preserve para evitar ciclos JSON
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Desativa o ReferenceHandler para evitar $id no JSON
        options.JsonSerializerOptions.ReferenceHandler = null;
        options.JsonSerializerOptions.MaxDepth = 64;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Aplicar política de CORS
app.UseCors("MinhaPoliticaCors");

app.MapControllers();

app.Run();
