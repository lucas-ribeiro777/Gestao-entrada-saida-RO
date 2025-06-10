using System.ComponentModel.DataAnnotations;

namespace Api_Projeto.Annne.DTOs
{
    public class RegistroOcorrenciaDTOs
    {
        [Required]
        [Range(1, 2, ErrorMessage = "Tipo inválido. Use 1 para Advertência ou 2 para Suspensão.")]
        public int Tipo { get; set; }

        [Required]
        public required string Motivo { get; set; }

        [Required]
        [Range(0, 1, ErrorMessage = "Encerramento inválido. Use 0 para Incompleto ou 1 para Completo.")]
        public int Encerramento { get; set; }

        public required string Curso { get; set; }
        public required string Turma { get; set; }
        public required string Observacao { get; set; }

        [Required]
        public int ProfessorId { get; set; }

        [Required]
        public int AlunoId { get; set; }

        public int? CoordenadorId { get; set; }
        public int? ResponsavelId { get; set; }
    }
}
