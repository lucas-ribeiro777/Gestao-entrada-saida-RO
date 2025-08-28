using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("professor_curso")]
    public class ProfessorCursos
    {
        [Column("id_professores")]
        public int IdProfessor { get; set; }
        public Professor Professor { get; set; } = null!;

       [Column("id_nome_curso")]
public int IdNomeCurso { get; set; }
public Curso Curso { get; set; } = null!;
    }
}
