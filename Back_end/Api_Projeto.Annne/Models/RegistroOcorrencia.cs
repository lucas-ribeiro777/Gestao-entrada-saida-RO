using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("ocorrencia")]
    public class RegistroOcorrencia
    {
        public int Id { get; set; }

        [Column("id_ocorrencia")]
        public int OcorrenciaId { get; set; }

        [Column("id_professor")]
        public int ProfessorId { get; set; }

        [Column("id_aluno")]
        public int AlunoId { get; set; }

        [Column("id_coordenador")]
        public int CoordenadorId { get; set; }

        [Column("id_responsavel")]
        public int ResponsavelId { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; } = string.Empty;

        [Column("motivo")]
        public string Motivo { get; set; } = string.Empty;

        [Column("data_hora")]
        public DateTime DataHora { get; set; } = DateTime.Now;

        [Column("encerramento")]
        public DateTime? Encerramento { get; set; }  // Nullable caso não encerrado

        [Column("curso")]
        public string Curso { get; set; } = string.Empty;

        [Column("turma")]
        public string Turma { get; set; } = string.Empty;

        [Column("obs")]
        public string Observacao { get; set; } = string.Empty;
    }
}
