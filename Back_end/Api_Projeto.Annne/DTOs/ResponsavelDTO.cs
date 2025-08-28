using System.Collections.Generic;

namespace Api_Projeto.Annne.DTOs
{
    public class ResponsavelDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Telefone { get; set; } = null!;
        public string? Assinatura { get; set; }
        public List<int>? IdsAlunos { get; set; } = new List<int>();
    }
}
