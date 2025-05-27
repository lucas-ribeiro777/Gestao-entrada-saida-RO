namespace SaidaAlunosSenai.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Email { get; set; }

        public string Senha { get; set; }

        // Tipo de usuário: admin, diretor, professor etc.
        public string Tipo { get; set; }
    }
}
