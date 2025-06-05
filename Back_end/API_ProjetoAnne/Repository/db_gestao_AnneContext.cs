using System.Collections.Generic;
using Api_Saida.Models;
using Microsoft.EntityFrameworkCore;
using SolicitacoesAPI.Models;

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
        public DbSet<Solicitacao> Solicitacoes { get; set; }

        public DbSet<RegistroOcorrencia> Ocorrencias { get; set; } // se a model se chama RegistroOcorrencia
        public DbSet<Autorizacao> Autorizacoes { get; set; }       // se você tiver a model Autorizacao.cs
        public DbSet<Devolutiva> Devolutivas { get; set; }         // idem para Devolutiva.cs
    }

    public class Devolutiva
    {
    }

    public class Autorizacao
    {
    }
}
