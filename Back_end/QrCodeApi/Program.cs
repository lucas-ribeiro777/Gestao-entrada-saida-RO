using Api.Data;
using Api.Repository;
using Api.Services;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// adiciona controllers e swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// banco de dados MySQL
builder.Services.AddDbContext<GestaoAnneContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 36))
    ));

// injeta serviços
builder.Services.AddScoped<QrCodeRepository>();
builder.Services.AddScoped<QrCodeService>();

// configura app
var app = builder.Build();

// se for ambiente de dev, ativa swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// habilita servir arquivos estáticos (como imagens dos QR Codes)


app.UseHttpsRedirection();
app.UseAuthorization();
app.UseStaticFiles();


app.MapControllers();
app.Run();
