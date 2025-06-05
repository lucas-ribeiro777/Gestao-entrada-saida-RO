using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("responsaveis")]
    public class Responsavel
    {
        [Key]
        [Column("id_responsaveis")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome pode ter no máximo 100 caracteres.")]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "O email do responsável é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        [Column("email")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        [Column("telefone")]
        public string Telefone { get; set; } = null!;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        [Column("senha")]
        public string Senha { get; set; } = null!;

        [Column("data_nasc")]
        public DateTime? DataNascimento { get; set; }

        [Column("id_aluno")]
        public int? IdAluno { get; set; } // Se quiser permitir apenas 1 aluno

        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; } // Caminho/nome do arquivo salvo no servidor

        // Se quiser suportar vários alunos, descomente abaixo e use relacionamento:
        [NotMapped]
        public List<int> AlunosIds { get; set; } = new List<int>();
    }
}
