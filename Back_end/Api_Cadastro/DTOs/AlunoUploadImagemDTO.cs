using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Api_Saida.DTOs
{
    public class AlunoUploadImagemDTO
    {
        [Required(ErrorMessage = "O nome do aluno é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome pode ter no máximo 100 caracteres.")]
        public string Nome { get; set; } = null!;

        [Required(ErrorMessage = "O email do aluno é obrigatório.")]
        [EmailAddress(ErrorMessage = "Email inválido.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "O ID do responsável é obrigatório.")]
        public int IdResponsavel { get; set; }

        [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres.")]
        public string Senha { get; set; } = string.Empty;

        [Required(ErrorMessage = "A imagem é obrigatória.")]
        public IFormFile Imagem { get; set; } = null!;

        [Required(ErrorMessage = "A assinatura é obrigatória.")]
        public IFormFile Assinatura { get; set; } = null!;
    }
}
