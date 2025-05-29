using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations;

public class ResponsavelUploadDTO
{
    [Required]
    public string Nome { get; set; } = null!;

    [EmailAddress]
    public string? Email { get; set; }

    [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$")]
    public string? Telefone { get; set; }

    public DateTime? DataNascimento { get; set; }

    public int? IdAluno { get; set; }

    [Required]
    [StringLength(255, MinimumLength = 6)]
    public string Senha { get; set; } = null!;

    public IFormFile? Assinatura { get; set; } // arquivo da assinatura enviado no form-data
}
