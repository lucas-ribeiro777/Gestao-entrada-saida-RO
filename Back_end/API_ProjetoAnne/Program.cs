using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Adiciona controladores
builder.Services.AddControllers();

// Ativa documentação e anotações do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API_ProjetoAnne",
        Version = "v1",
        Description = "API de controle de solicitações de entrada e saída."
    });

    c.EnableAnnotations(); // Suporte às anotações SwaggerOperation
});

var app = builder.Build();

// Middleware do Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API_ProjetoAnne v1");
    c.RoutePrefix = string.Empty; // Deixa o Swagger disponível em http://localhost:5282/
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
