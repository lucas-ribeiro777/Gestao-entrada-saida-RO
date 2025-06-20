using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("coordenadores")]
    public class Coordenador
    {
        [Key]
        [Column("id_coordenador")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome pode ter no máximo 100 caracteres.")]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        [Column("email")]
        public string Email { get; set; } = null!;

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        [Column("senha")]
        public string Senha { get; set; } = null!;

        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; }
    }
}
