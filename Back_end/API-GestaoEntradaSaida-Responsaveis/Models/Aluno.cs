using System.Collections.Generic;

public class Aluno
{
    public int Id { get; set; }
    public string Nome { get; set; }

    public List<Responsavel> Responsaveis { get; set; } = new();
}