using Microsoft.EntityFrameworkCore;
using APIautorizacao.Models;

namespace APIautorizacao.Data
{
    public class EscolaContext : DbContext
    {
        public EscolaContext(DbContextOptions<EscolaContext> options) : base(options) { }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Ocorrencia> Ocorrencias { get; set; }
    }
}
