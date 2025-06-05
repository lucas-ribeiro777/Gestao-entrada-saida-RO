using System.Collections.Generic;

namespace GestaoResponsaveisAPI.Models
{
    public class Responsavel
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Telefone { get; set; }
        public List<int> AlunosIds { get; set; } = new List<int>();
    }
}
