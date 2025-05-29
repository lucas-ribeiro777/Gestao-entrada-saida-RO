using Models;
using Repositories;
using DTOs;
using System.Collections.Generic;

public class ResponsavelService
{
    private readonly ResponsavelRepository _repository;

    public ResponsavelService(ResponsavelRepository repository)
    {
        _repository = repository;
    }

    public Responsavel Cadastrar(CreateResponsavelDTO dto)
    {
        return _repository.Adicionar(new Responsavel
        {
            Nome = dto.Nome,
            Email = dto.Email
        });
    }

    public bool VincularAluno(int responsavelId, int alunoId)
    {
        return _repository.VincularAluno(responsavelId, alunoId);
    }

    public List<Responsavel> ConsultarTodos()
    {
        return _repository.ObterTodos();
    }
}