using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api_Projeto.Annne.DTOs
{
    public class ProfessorUploadDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100)]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "O email é obrigatório.")]
        [EmailAddress]
        public string Email { get; set; } = null!;

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(6)]
        public string Senha { get; set; } = null!;

        
        
        [Required(ErrorMessage = "É necessário informar pelo menos um curso.")]
        public List<int> CursosIds { get; set; } = new();
    }
}
