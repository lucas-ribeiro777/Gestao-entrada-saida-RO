using System.ComponentModel.DataAnnotations;

public class ResponsavelUploadDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    public string Nome { get; set; } = null!;

    [EmailAddress(ErrorMessage = "O email não é válido.")]
    public string? Email { get; set; }

    [RegularExpression(@"^\(?\d{2}\)?[\s\-]?\d{4,5}[\s\-]?\d{4}$", ErrorMessage = "O telefone não é válido.")]
    public string? Telefone { get; set; }

    // Validação para garantir que a data de nascimento não seja futura
    [DataType(DataType.Date)]
    public DateTime? DataNascimento { get; set; }

    public int? IdAluno { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(255, MinimumLength = 6, ErrorMessage = "A senha deve ter entre 6 e 255 caracteres.")]
    public string Senha { get; set; } = null!;

    public IFormFile? Assinatura { get; set; }
}

public class ResponsavelCreateDTO
{
    public string? Nome { get; internal set; }
    public string? Telefone { get; internal set; }
        
    }
