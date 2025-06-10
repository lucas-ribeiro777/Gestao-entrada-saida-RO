using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;

namespace Api_Projeto.Annne.Repository
{

    public class DbGestaoAnneContext(DbContextOptions<DbGestaoAnneContext> options) : DbContext(options)
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Coordenador> Coordenadores { get; set; }
        public DbSet<Solicitacao> Solicitacoes { get; set; }
        public DbSet<RegistroOcorrencia> RegistroOcorrencia { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }

    }

    
}
