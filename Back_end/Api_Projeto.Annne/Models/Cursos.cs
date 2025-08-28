using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("cursos")]
    public class Curso
    {
        [Key]                     
        [Column("id_nome_curso")]  
        public int IdNomeCurso { get; set; }

        [Required]
        [Column("nome_curso")]
        [StringLength(255)]
        public string NomeCurso { get; set; } = string.Empty;

        [Column("codigo")]
        [StringLength(50)]
        public string? Codigo { get; set; }

        [Column("periodo")]
        [StringLength(50)]
        public string? Periodo { get; set; }

        [Column("dias_de_aula")]
        [StringLength(100)]
        public string? DiasDeAula { get; set; }

        public ICollection<Solicitacao> Solicitacoes { get; set; } = new List<Solicitacao>();
        public ICollection<QrCodeRegistro> QrCodes { get; set; } = new List<QrCodeRegistro>();
        public ICollection<Grafico> Graficos { get; set; } = new List<Grafico>();

        [JsonIgnore]
        public ICollection<ProfessorCursos> ProfessorCursos { get; set; } = new List<ProfessorCursos>();
    }
}
