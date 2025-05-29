using Microsoft.AspNetCore.Mvc;
using Services;
using DTOs;

[ApiController]
[Route("api/[controller]")]
public class ResponsavelController : ControllerBase
{
    private readonly ResponsavelService _service;

    public ResponsavelController(ResponsavelService service)
    {
        _service = service;
    }

    [HttpPost]
    public IActionResult Cadastrar(CreateResponsavelDTO dto)
    {
        var responsavel = _service.Cadastrar(dto);
        return CreatedAtAction(nameof(ConsultarTodos), new { id = responsavel.Id }, responsavel);
    }

    [HttpPut("{responsavelId}/vincular/{alunoId}")]
    public IActionResult VincularAluno(int responsavelId, int alunoId)
    {
        var sucesso = _service.VincularAluno(responsavelId, alunoId);
        return sucesso ? Ok() : NotFound();
    }

    [HttpGet]
    public IActionResult ConsultarTodos()
    {
        var lista = _service.ConsultarTodos();
        return Ok(lista);
    }
}