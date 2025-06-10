using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("solicitacao")]
    public class Solicitacao
    {
        [Key]
        [Column("id_solicitacao")]
        public int IdSolicitacao { get; set; }

        [Column("id_aluno")]
        public int IdAluno { get; set; }

        [Column("id_coordenador")]
        public int? IdCoordenador { get; set; } // Pode ser null

        [Column("id_responsavel")]
        public int? IdResponsavel { get; set; } // Pode ser null

        [Column("curso")]
        public string Curso { get; set; } = string.Empty;

        [Column("turma")]
        public int Turma { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty; // "Saída" ou "Entrada"

        [Column("datahora")]
        public DateTime DataHora { get; set; }

        [Column("retorno")]
        public bool Retorno { get; set; } // tinyint → bool mapeia corretamente no EF Core

        [Column("token")]
        public string Token { get; set; } = string.Empty;

        [Column("motivo")]
        public string Motivo { get; set; } = string.Empty;

        // Propriedades de navegação (opcional)
        // public Aluno Aluno { get; set; }
        // public Coordenador Coordenador { get; set; }
        // public Responsavel Responsavel { get; set; }
    }
}
