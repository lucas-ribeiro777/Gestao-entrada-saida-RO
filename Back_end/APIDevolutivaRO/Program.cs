var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte a Controllers e Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ativa o Swagger em desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

// Mapeia todos os controllers (como o seu ROController)
app.MapControllers();

app.Run();
