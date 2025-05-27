namespace SaidaAlunosSenai.Models
{
    public class RegistroOcorrencia
    {
        public int Id { get; set; }

        public string Descricao { get; set; }

        public DateTime DataRegistro { get; set; }

        // Relações com Aluno, Professor ou outro modelo, se necessário:
        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
    }
}
