using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("graficoo")]
    public class Grafico
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("id_nome_curso")]
        public int IdNomeCurso { get; set; }

        [Column("hora")]
        public TimeSpan Hora { get; set; }

        [Column("motivo")]
        public string Motivo { get; set; } = string.Empty;

        public Curso? Curso { get; set; }
    }
}