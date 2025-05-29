namespace ProjetoAPI.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Tipo { get; set; } = string.Empty; // "Aluno", "Responsável", "Professor", "Coordenador"
        public string Email { get; set; } = string.Empty;
    }
}
