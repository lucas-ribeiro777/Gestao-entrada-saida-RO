using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data
{
    public class GestaoAnneContext : DbContext
    {
        public DbSet<QrCode> QrCodes { get; set; }
        public DbSet<Solicitacao> Solicitacoes { get; set; }
        public DbSet<Coordenador> Coordenadores { get; set; }
        public DbSet<Responsavel> Responsaveis { get; set; }

        public GestaoAnneContext(DbContextOptions<GestaoAnneContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // garante que todas as entidades estão usando os nomes de tabela corretos (caso precise sobrescrever)
            modelBuilder.Entity<QrCode>().ToTable("qrcode");
            modelBuilder.Entity<Solicitacao>().ToTable("solicitacao");
            modelBuilder.Entity<Coordenador>().ToTable("coordenadores");
            modelBuilder.Entity<Responsavel>().ToTable("responsaveis");
        }
    }
}
