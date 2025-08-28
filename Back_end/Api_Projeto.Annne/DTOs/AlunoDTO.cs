
namespace Api_Projeto.Annne.DTOs
{
    public class AlunoDTO
    {
        public int IdAlunos { get; set; }
        public string Nome { get; set; } = null!;
        public string? Email { get; set; }
        public string? Telefone { get; set; }
        public string? Imagem { get; set; }
        public string? Assinatura { get; set; }
          public DateTime? DataNascimento { get; set; } 
          public List<int> IdResponsaveis { get; internal set; }
    }
}