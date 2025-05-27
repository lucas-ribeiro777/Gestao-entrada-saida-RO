using System;
using SaidaAlunosSenai.Data;

namespace SaidaAlunosSenai.Models
{
    public class Aluno
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; }

        // Relacionamentos
        public List<SaidaAntecipada> Saidas { get; set; }
        public List<RO> Ocorrencias { get; set; }
    }
}
