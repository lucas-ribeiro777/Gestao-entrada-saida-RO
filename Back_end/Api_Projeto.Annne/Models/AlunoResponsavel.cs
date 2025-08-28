using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("aluno_responsavel")]
    public class AlunoResponsavel
    {
        [Column("id_alunos")]
        public int IdAlunos { get; set; }
        public Aluno Aluno { get; set; } = null!;

        [Column("id_responsavel")]
        public int IdResponsavel { get; set; }
        public Responsavel Responsavel { get; set; } = null!;
    }
}
