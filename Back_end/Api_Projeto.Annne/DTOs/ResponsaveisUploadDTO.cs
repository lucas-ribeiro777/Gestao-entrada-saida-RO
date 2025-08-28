using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api_Projeto.Annne.DTOs
{
    public class ResponsavelUploadDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100)]
        public string Nome { get; set; } = null!;

        [EmailAddress(ErrorMessage = "O email não é válido.")]
        public string? Email { get; set; }

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter entre 6 e 255 caracteres.")]
        public string Senha { get; set; } = null!;

        public List<string>? NomesAlunos { get; set; }
    }
}
