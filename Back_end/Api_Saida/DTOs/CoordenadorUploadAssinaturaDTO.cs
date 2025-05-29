using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Api_Saida.DTOs
{
    public class CoordenadorUploadAssinaturaDTO
    {
        [Required(ErrorMessage = "O nome é obrigatório.")]
        public required string Nome { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        public required string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public required string Senha { get; set; }

        [Required(ErrorMessage = "A assinatura é obrigatória.")]
        public required IFormFile Assinatura { get; set; }
    }
}
