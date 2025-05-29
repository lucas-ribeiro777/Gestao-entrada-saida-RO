using System.Collections.Generic;

public class Responsavel
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }

    public List<Aluno> Alunos { get; set; } = new();
}