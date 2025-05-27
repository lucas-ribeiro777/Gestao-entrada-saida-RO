using Microsoft.EntityFrameworkCore;
using SaidaAlunosSenai.Models;

namespace SaidaAlunosSenai.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Diretor> Diretores { get; set; }
        public DbSet<SaidaAntecipada> SaidasAntecipadas { get; set; }
        public DbSet<Autorizacao> Autorizacoes { get; set; }
        public DbSet<RegistroOcorrencia> RegistrosOcorrencias { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
    }
}
