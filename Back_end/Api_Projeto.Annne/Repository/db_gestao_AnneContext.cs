using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;

namespace Api_Projeto.Annne.Repository
{

    public class DbGestaoAnneContext : DbContext
    {
        public DbGestaoAnneContext(DbContextOptions<DbGestaoAnneContext> options)
            : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; } 
        public DbSet<Responsavel> Responsaveis { get; set; } 
        public DbSet<Professor> Professores { get; set; } 
        public DbSet<Coordenador> Coordenadores { get; set; } 
        public DbSet<Solicitacoes> Solicitacoes { get; set; }
        public DbSet<RegistroOcorrencia> RegistroDeROs { get; set; }
    }

    
}
