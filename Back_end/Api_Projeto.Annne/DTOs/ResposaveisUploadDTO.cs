using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

public class ResponsavelUploadDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome pode ter no máximo 100 caracteres.")]
    public string Nome { get; set; } = null!;

    [EmailAddress(ErrorMessage = "O email não é válido.")]
    public string? Email { get; set; }

    [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "Telefone inválido. Ex: (11) 91234-5678")]
        public string? Telefone { get; set; }

    [DataType(DataType.Date)]
    [CustomValidation(typeof(ResponsavelUploadDTO), nameof(ValidarDataNascimento))]
    public DateTime? DataNascimento { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter entre 6 e 255 caracteres.")]
    public string Senha { get; set; } = null!;

    public IFormFile? Assinatura { get; set; }

    // Validação customizada para DataNascimento não ser futura
    public static ValidationResult? ValidarDataNascimento(DateTime? dataNascimento, ValidationContext context)
    {
        if (dataNascimento.HasValue && dataNascimento.Value.Date > DateTime.Today)
            return new ValidationResult("A data de nascimento não pode ser futura.");

        return ValidationResult.Success;
    }
}
