using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SolicitacaoController : ControllerBase
{
    private readonly SolicitacaoService _service;

    public SolicitacaoController(SolicitacaoService service)
    {
        _service = service;
    }

   
    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] SolicitacaoCreateDTO solicitacao)
    {
        var nova = await _service.CriarSolicitacaoAsync(solicitacao);
        return Ok(nova);
    }

   
    [HttpPut("atualizar-status/{idSolicitacao}")]
    public async Task<IActionResult> AtualizarStatus(
        int idSolicitacao,
        [FromQuery] string? statusProfessor,
        [FromQuery] string? statusResponsavel,
        [FromQuery] string? statusCoordenador)
    {
        var solicitacao = await _service.AtualizarStatusAsync(idSolicitacao, statusProfessor, statusResponsavel, statusCoordenador);
        return Ok(solicitacao);
    }

   
    [HttpGet("periodo/7dias")]
    public async Task<IActionResult> GetUltimos7Dias()
    {
        return Ok(await _service.GetPorPeriodoAsync(7));
    }

   
    [HttpGet("periodo/15dias")]
    public async Task<IActionResult> GetUltimos15Dias()
    {
        return Ok(await _service.GetPorPeriodoAsync(15));
    }

    
    [HttpGet("periodo/1mes")]
    public async Task<IActionResult> GetUltimoMes()
    {
        return Ok(await _service.GetPorPeriodoAsync(30));
    }

    
    [HttpGet("aluno/{idAluno}")]
    public async Task<IActionResult> GetPorAluno(int idAluno)
    {
        var solicitacoes = await _service.GetPorAlunoAsync(idAluno);
        if (!solicitacoes.Any())
            return NotFound($"Nenhuma solicitação encontrada para o aluno {idAluno}.");

        return Ok(solicitacoes);
    }
}
