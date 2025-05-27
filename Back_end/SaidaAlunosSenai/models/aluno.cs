// Models/Aluno.cs
namespace SaidaAlunosSenai.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public DateTime DataNascimento { get; set; }
        public string Turma { get; set; } = "";
        public int? ResponsavelId { get; set; }
        public Responsavel? Responsavel { get; set; }
    }
}
