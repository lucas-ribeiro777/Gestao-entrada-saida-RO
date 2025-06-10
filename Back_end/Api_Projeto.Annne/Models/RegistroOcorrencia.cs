using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("ocorrencias")]
    public class RegistroOcorrencia
    {
        [Key]
        [Column("id_ocorrencias")]
        public int Id { get; set; }

        [Column("id_professor")]
        public int ProfessorId { get; set; }

        [Column("id_alunos")]
        public int AlunoId { get; set; }

        [Column("id_coordenador")]
        public int? CoordenadorId { get; set; }

        [Column("id_responsavel")]
        public int? ResponsavelId { get; set; }

        [Required]
        [Column("tipo")]
        public int Tipo { get; set; } // 1 = Advertência, 2 = Suspensão

        [Required]
        [Column("motivo")]
        public string Motivo { get; set; } = string.Empty;

        [Column("datahora")]
        public DateTime DataHora { get; set; } = DateTime.Now;

        [Column("encerramento")]
        public bool Encerramento { get; set; } // 0 = Incompleto, 1 = Completo

        [Column("curso")]
        public string Curso { get; set; } = string.Empty;

        [Column("turma")]
        public string Turma { get; set; } = string.Empty;

        [Column("obs")]
        public string Observacao { get; set; } = string.Empty;
    }
}
