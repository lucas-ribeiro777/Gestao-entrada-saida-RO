using Microsoft.EntityFrameworkCore;
using ApiRO.Models; // Namespace correto da classe Ocorrencia
namespace ApiRO.Models
  // Ajuste esse namespace conforme o seu projeto
{
    public class AppDbContext : DbContext
    {
        // Construtor que recebe opções para configurar o contexto
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // DbSet para mapear a tabela Ocorrencias
        public DbSet<Ocorrencia> Ocorrencias { get; set; }
    }
}
