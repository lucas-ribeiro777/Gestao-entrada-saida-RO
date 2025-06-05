using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Saida.Models
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

      [Required(ErrorMessage = "O email do aluno é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        [Column("email")]
        public string Email { get; set; } = null!;

        [Phone(ErrorMessage = "Telefone inválido.")]
        [StringLength(20)]
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        [Column("senha")]
        public string Senha { get; set; } = null!;

        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; }  // Caminho do arquivo da assinatura no servidor
    }
}