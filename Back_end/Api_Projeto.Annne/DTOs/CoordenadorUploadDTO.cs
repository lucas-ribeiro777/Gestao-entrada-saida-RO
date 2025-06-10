using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Api_Projeto.Annne.DTOs
{
    public class CoordenadorUploadAssinaturaDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public required string Nome { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        public required string Email { get; set; }

          [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        public required string Senha { get; set; }

        [Required(ErrorMessage = "A assinatura é obrigatória.")]
        public required IFormFile Assinatura { get; set; }
    }
}
