using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Services;
using Api_Projeto.Annne.Models;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Api_Projeto.Annne.Data;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<GestaoAnneContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddScoped<IPasswordHasher<Coordenador>, PasswordHasher<Coordenador>>();
builder.Services.AddScoped<IPasswordHasher<Aluno>, PasswordHasher<Aluno>>();
builder.Services.AddScoped<IPasswordHasher<Responsavel>, PasswordHasher<Responsavel>>();
builder.Services.AddScoped<IPasswordHasher<Professor>, PasswordHasher<Professor>>();

builder.Services.AddTransient<IEmailService, EmailServiceGmail>();
builder.Services.AddScoped<SolicitacaoService>();
builder.Services.AddScoped<GraficoService>();  
builder.Services.AddMemoryCache();
builder.Services.AddScoped<QrCodeService>();
builder.Services.AddScoped<ProfessorService>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirTodos", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.MaxDepth = 64;
    });


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.MapType<TimeSpan>(() => new OpenApiSchema
    {
        Type = "string",
        Example = new Microsoft.OpenApi.Any.OpenApiString("HH:mm:ss")
    });
    c.MapType<TimeSpan?>(() => new OpenApiSchema
    {
        Type = "string",
        Example = new Microsoft.OpenApi.Any.OpenApiString("HH:mm:ss")
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseCors("PermitirTodos");

app.UseAuthorization();
app.MapControllers();
app.UseStaticFiles();
app.Run();
