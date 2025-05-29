namespace SolicitacoesAPI.Models
{
    public class Solicitacao
    {
        public int Id { get; set; }
        public string AlunoNome { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
        public string Tipo { get; set; } = "Saída"; // ou "Entrada"
        public string Motivo { get; set; } = string.Empty;
        public string Status { get; set; } = "Pendente"; // Pendente, Aprovada, Recusada
    }
}
