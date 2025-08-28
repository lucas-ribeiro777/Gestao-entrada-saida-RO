using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("professores")]
    public class Professor
    {
        [Key]
        [Column("id_professores")]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [EmailAddress]
        [Column("email")]
        public string? Email { get; set; }

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 6)]
        [Column("senha")]
        public string Senha { get; set; } = null!;

        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; }

        
        [Column("id_nome_curso")]
        public int IdCurso { get; set; }

        [ForeignKey("IdCurso")]
        public Curso Curso { get; set; } = null!;

        [JsonIgnore]
        public List<QrCodeRegistro> QrCodes { get; set; } = new();

        public ICollection<ProfessorCursos> ProfessorCursos { get; set; } = new List<ProfessorCursos>();
    }
}
