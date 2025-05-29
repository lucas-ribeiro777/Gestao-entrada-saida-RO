using Models;
using System.Collections.Generic;
using System.Linq;

public class ResponsavelRepository
{
    private static List<Responsavel> _responsaveis = new();
    private static List<Aluno> _alunos = new();

    public Responsavel Adicionar(Responsavel responsavel)
    {
        responsavel.Id = _responsaveis.Count + 1;
        _responsaveis.Add(responsavel);
        return responsavel;
    }

    public bool VincularAluno(int responsavelId, int alunoId)
    {
        var responsavel = _responsaveis.FirstOrDefault(r => r.Id == responsavelId);
        var aluno = _alunos.FirstOrDefault(a => a.Id == alunoId);
        if (responsavel == null || aluno == null) return false;

        responsavel.Alunos.Add(aluno);
        aluno.Responsaveis.Add(responsavel);
        return true;
    }

    public List<Responsavel> ObterTodos()
    {
        return _responsaveis;
    }
}