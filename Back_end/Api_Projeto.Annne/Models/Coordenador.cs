using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("coordenadores")]
    public class Coordenador
    {
        [Key]
        [Column("id_coordenador")]
        public int Id { get; set; }

         [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [Required]
        [EmailAddress]
        [Column("email")]
        public string Email { get; set; } = null!;

        [Required]
        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
        [Column("telefone")]
        public string Telefone { get; set; } = null!;

        [Required]
        [StringLength(255, MinimumLength = 6)]
        [Column("senha")]
        public string Senha { get; set; } = null!;

        [Column("assinatura")]
        public string? Assinatura { get; set; }


        [JsonIgnore]
        public List<QrCodeRegistro> QrCodes { get; set; } = new();
    }
}
