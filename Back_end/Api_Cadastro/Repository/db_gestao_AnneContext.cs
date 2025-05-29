using Api_Saida.Models;
using Microsoft.EntityFrameworkCore;

namespace Api_Saida.Repository
{
    public class DbGestaoAnneContext : DbContext
    {
        public DbGestaoAnneContext(DbContextOptions<DbGestaoAnneContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Coordenador> Coordenadores { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }
    }
}

