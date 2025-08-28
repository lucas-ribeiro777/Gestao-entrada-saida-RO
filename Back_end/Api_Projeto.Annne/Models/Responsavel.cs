using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("responsaveis")]
    public class Responsavel
    {
        [Key]
        [Column("id_responsaveis")]
        public int Id { get; set; }

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
        [StringLength(255, MinimumLength = 6)]
        [Column("senha")]
        public string Senha { get; set; } = null!; 

        [StringLength(255)]
        [Column("telefone")]
        public string? Telefone { get; set; }


        [StringLength(255)]
        [Column("assinatura")]
        public string? Assinatura { get; set; }

       
        [JsonIgnore] public ICollection<AlunoResponsavel> AlunosResponsaveis { get; set; } = new List<AlunoResponsavel>(); }

}
