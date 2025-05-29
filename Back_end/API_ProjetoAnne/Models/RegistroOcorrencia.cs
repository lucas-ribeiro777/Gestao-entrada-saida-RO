namespace SolicitacoesAPI.Models
{
    public class RegistroOcorrencia
    {
        public int Id { get; set; }
        public string AlunoNome { get; set; } = string.Empty;
        public string ProfessorNome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public DateTime DataHora { get; set; } = DateTime.Now;
    }
}
