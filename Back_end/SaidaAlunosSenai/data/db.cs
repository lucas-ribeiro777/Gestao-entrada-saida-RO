// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using SaidaAlunosSenai.Models;

namespace SaidaAlunosSenai.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Aluno> Alunos => Set<Aluno>();
        public DbSet<Responsavel> Responsaveis => Set<Responsavel>();
        public DbSet<Professor> Professores => Set<Professor>();
        public DbSet<Diretor> Diretores => Set<Diretor>();
        public DbSet<SaidaAntecipada> Saidas => Set<SaidaAntecipada>();
        public DbSet<Autorizacao> Autorizacoes => Set<Autorizacao>();
        public DbSet<RegistroOcorrencia> Registros => Set<RegistroOcorrencia>();
        public DbSet<Usuario> Usuarios => Set<Usuario>();
    }
}
