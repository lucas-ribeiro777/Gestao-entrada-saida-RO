using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;

namespace Api_Projeto.Annne.Data
{
    public class GestaoAnneContext : DbContext
    {
        public GestaoAnneContext(DbContextOptions<GestaoAnneContext> options)
            : base(options) { }

        public DbSet<Aluno> Alunos { get; set; } = null!;
        public DbSet<Responsavel> Responsaveis { get; set; } = null!;
        public DbSet<AlunoResponsavel> AlunosResponsaveis { get; set; } = null!;
        public DbSet<Professor> Professores { get; set; } = null!;
        public DbSet<Coordenador> Coordenadores { get; set; } = null!;
        public DbSet<Curso> Cursos { get; set; } = null!;
        public DbSet<ProfessorCursos> ProfessorCursos { get; set; } = null!;
        public DbSet<Solicitacao> Solicitacoes { get; set; } = null!;
        public DbSet<QrCodeRegistro> QrCodeRegistros { get; set; } = null!;
        public DbSet<Grafico> Graficos { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        
            // Aluno
            
            modelBuilder.Entity<Aluno>(entity =>
            {
                entity.ToTable("alunos");
                entity.HasKey(a => a.IdAlunos);

                entity.Property(a => a.IdAlunos).HasColumnName("id_alunos");
                entity.Property(a => a.Nome).HasColumnName("nome");
                entity.Property(a => a.Email).HasColumnName("email");

              
                entity.HasIndex(a => a.Email).IsUnique();

                entity.HasMany(a => a.AlunosResponsaveis)
                      .WithOne(ar => ar.Aluno)
                      .HasForeignKey(ar => ar.IdAlunos)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(a => a.Solicitacoes)
                      .WithOne(s => s.Aluno)
                      .HasForeignKey(s => s.IdAlunos)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            
            // Responsável
           
            modelBuilder.Entity<Responsavel>(entity =>
            {
                entity.ToTable("responsaveis");
                entity.HasKey(r => r.Id);

                entity.Property(r => r.Id).HasColumnName("id_responsaveis");
                entity.Property(r => r.Nome).HasColumnName("nome");
                entity.Property(r => r.Email).HasColumnName("email");

                // Índice único no e-mail
                entity.HasIndex(r => r.Email).IsUnique();

                entity.HasMany(r => r.AlunosResponsaveis)
                      .WithOne(ar => ar.Responsavel)
                      .HasForeignKey(ar => ar.IdResponsavel)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            
            // AlunoResponsavel
        
            modelBuilder.Entity<AlunoResponsavel>(entity =>
            {
                entity.ToTable("aluno_responsavel");
                entity.HasKey(ar => new { ar.IdAlunos, ar.IdResponsavel });

                entity.Property(ar => ar.IdAlunos).HasColumnName("id_alunos");
                entity.Property(ar => ar.IdResponsavel).HasColumnName("id_responsavel");
            });

           
            // Professor
            
            modelBuilder.Entity<Professor>(entity =>
            {
                entity.ToTable("professores");
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Id).HasColumnName("id_professores");
                entity.Property(p => p.Nome).HasColumnName("nome");
                entity.Property(p => p.Email).HasColumnName("email");

                // Índice único no e-mail
                entity.HasIndex(p => p.Email).IsUnique();

                entity.HasMany(p => p.ProfessorCursos)
                      .WithOne(pc => pc.Professor)
                      .HasForeignKey(pc => pc.IdProfessor)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            
            // ProfessorCurso
           
            modelBuilder.Entity<ProfessorCursos>(entity =>
            {
                entity.ToTable("professor_curso");
                entity.HasKey(pc => new { pc.IdProfessor, pc.IdNomeCurso });

                entity.Property(pc => pc.IdProfessor).HasColumnName("id_professores");
                entity.Property(pc => pc.IdNomeCurso).HasColumnName("id_nome_curso");

                entity.HasOne(pc => pc.Professor)
                      .WithMany(p => p.ProfessorCursos)
                      .HasForeignKey(pc => pc.IdProfessor);

                entity.HasOne(pc => pc.Curso)
                      .WithMany(c => c.ProfessorCursos)
                      .HasForeignKey(pc => pc.IdNomeCurso);
            });

           
            // Coordenador
           
            modelBuilder.Entity<Coordenador>(entity =>
            {
                entity.ToTable("coordenadores");
                entity.HasKey(c => c.Id);

                entity.Property(c => c.Id).HasColumnName("id_coordenador");
                entity.Property(c => c.Nome).HasColumnName("nome");
                entity.Property(c => c.Email).HasColumnName("email");

                
                entity.HasIndex(c => c.Email).IsUnique();
            });


            // Curso
           
            modelBuilder.Entity<Curso>(entity =>
            {
                entity.ToTable("cursos");
                entity.HasKey(c => c.IdNomeCurso);
            });

            
            // Sollicitacao
            
            modelBuilder.Entity<Solicitacao>(entity =>
            {
                entity.ToTable("solicitacao");
                entity.HasKey(s => s.IdSolicitacao);

                entity.HasOne(s => s.Aluno)
                      .WithMany(a => a.Solicitacoes)
                      .HasForeignKey(s => s.IdAlunos)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(s => s.Curso)
                      .WithMany(c => c.Solicitacoes)
                      .HasForeignKey(s => s.IdNomeCurso)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.Property(s => s.IdSolicitacao).HasColumnName("id_solicitacao");
                entity.Property(s => s.IdAlunos).HasColumnName("id_alunos");
                entity.Property(s => s.IdNomeCurso).HasColumnName("id_nome_curso");
                entity.Property(s => s.Tipo).HasColumnName("tipo");
                entity.Property(s => s.Motivo).HasColumnName("motivo");
                entity.Property(s => s.DataHora).HasColumnName("data_hora");
                entity.Property(s => s.Retorno).HasColumnName("retorno");
                entity.Property(s => s.StatusProfessor).HasColumnName("status_professor");
                entity.Property(s => s.StatusResponsavel).HasColumnName("status_responsavel");
                entity.Property(s => s.StatusCoordenador).HasColumnName("status_coordenador");
            });

            
            // QrCodeRegistro
        
            modelBuilder.Entity<QrCodeRegistro>(entity =>
            {
                entity.ToTable("qrcode");
                entity.HasKey(q => q.IdQrcode);

                entity.Property(q => q.IdQrcode).HasColumnName("id");
                entity.Property(q => q.IdAlunos).HasColumnName("id_alunos");
                entity.Property(q => q.IdNomeCurso).HasColumnName("id_nome_curso");
                entity.Property(q => q.StatusProfessor).HasColumnName("status_professor");
                entity.Property(q => q.StatusResponsavel).HasColumnName("status_responsavel");
                entity.Property(q => q.StatusCoordenador).HasColumnName("status_coordenador");
                entity.Property(q => q.CaminhoArquivo).HasColumnName("caminhoarquivo");
                entity.Property(q => q.DataHora).HasColumnName("datahora");
            });

          
            // Grafico
            modelBuilder.Entity<Grafico>(entity =>
            {
                entity.ToTable("grafico");
                entity.HasKey(g => g.Id);

                entity.Property(g => g.Id).HasColumnName("id");
                entity.Property(g => g.IdNomeCurso).HasColumnName("id_nome_curso");
                entity.Property(g => g.Hora).HasColumnName("hora");
                entity.Property(g => g.Motivo).HasColumnName("motivo");

                entity.HasOne(g => g.Curso)
                      .WithMany(c => c.Graficos)
                      .HasForeignKey(g => g.IdNomeCurso)
                      .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
