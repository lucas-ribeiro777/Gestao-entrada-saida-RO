using System.Collections.Generic;

namespace Api_Projeto.Annne.DTOs
{
    public class ProfessorDTO
    {
        public int IdProfessor { get; set; }
        public string Nome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Telefone { get; set; }
        public string? Assinatura { get; set; }

        public List<int> CursosIds { get; set; } = new List<int>();
    }
}

