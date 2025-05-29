namespace ApiRO.Models
{
    public class Ocorrencia
    {
        public int Id { get; set; }
        public int AlunoId { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public DateTime Data { get; set; }
        public string Professor { get; set; } = string.Empty;
    }
}
