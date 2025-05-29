using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Saida.Models
{
    [Table("alunos")]
    public class Aluno
    {
        [Key]
        [Column("id_alunos")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do aluno é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome pode ter no máximo 100 caracteres.")]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "O email do aluno é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        [Column("email")]
        public string Email { get; set; } = null!;

        // Melhor usar DateTime? para data em vez de string
        [Column("data_nasc", TypeName = "date")]
        public DateTime? DataNascimento { get; set; }

        [Column("id_responsavel")]
        public int? IdResponsavel { get; set; }

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Column("imagem")]
        public string Imagem { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        [Column("senha")]
        public string Senha { get; set; } = string.Empty;

        [Column("assinatura", TypeName = "text")]
        public string? Assinatura { get; set; }
    }
}
