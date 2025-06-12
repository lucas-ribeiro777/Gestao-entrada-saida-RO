using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;

namespace Api_Projeto.Annne.Repository
{
    public class DbGestaoAnneContext : DbContext
    {
        public DbGestaoAnneContext(DbContextOptions<DbGestaoAnneContext> options) : base(options)
        {
        }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }
        public DbSet<Professor> Professores { get; set; }
        public DbSet<Coordenador> Coordenadores { get; set; }
        public DbSet<Solicitacao> Solicitacoes { get; set; }
        public DbSet<RegistroOcorrencia> RegistroOcorrencia { get; set; }
        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<TokenRecuperacaoSenha> TokensRecuperacaoSenha { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TokenRecuperacaoSenha>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Token)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.DataCriacao)
                      .IsRequired();

                entity.Property(e => e.DataExpiracao)
                      .IsRequired();

                entity.Property(e => e.Usado)
                      .IsRequired();

                entity.HasOne(e => e.Usuario)
                      .WithMany()
                      .HasForeignKey(e => e.UsuarioId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Outras configurações de entidade, se precisar...
        }
    }
}
