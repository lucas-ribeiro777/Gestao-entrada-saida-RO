using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("alunos")]
    public class Aluno
    {
        [Key]
        [Column("id_alunos")]
        public int IdAlunos { get; set; }

        [Required]
        [StringLength(100)]
        [Column("nome")]
        public string Nome { get; set; } = null!;

        [Required]
        [EmailAddress]
        [StringLength(255)]
        [Column("email")]
        public string Email { get; set; } = null!;

        [Required]
        [Column("data_nasc")]
        public DateTime DataNascimento { get; set; }

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
        [StringLength(20)]
        [Column("telefone")]
        public string? Telefone { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 6)]
        [Column("senha")]
        public string Senha { get; set; } = null!; 

        [StringLength(255)]
        [Column("imagem")]
        public string? Imagem { get; set; }

        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; }

        
        public ICollection<AlunoResponsavel> AlunosResponsaveis { get; set; } = new List<AlunoResponsavel>();

        [JsonIgnore]
        public ICollection<Solicitacao> Solicitacoes { get; set; } = new List<Solicitacao>();

        [JsonIgnore]
        public ICollection<QrCodeRegistro> QrCodes { get; set; } = new List<QrCodeRegistro>();
    }
}


