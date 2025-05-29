using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

public class ProfessorUploadDTO
{
    [Required]
    public string Nome { get; set; } = null!;

    [EmailAddress]
    public string? Email { get; set; }

    [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
    public string? Telefone { get; set; }

    [Required]
    [MinLength(6)]
    public string Senha { get; set; } = null!;

    public IFormFile? Assinatura { get; set; }  // arquivo enviado no form
}
