namespace APIautorizacao.Models
{
    public class Ocorrencia
    {
        public int Id { get; set; }
        public int AlunoId { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }
    }
}
