using Microsoft.AspNetCore.Mvc;
using ApiRO.Models;  // Namespace correto da classe Ocorrencia
using System.Linq;

[ApiController]
[Route("[controller]")]
public class OcorrenciasController : ControllerBase
{
    private readonly AppDbContext _context;

    public OcorrenciasController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var lista = _context.Ocorrencias.ToList();
        return Ok(lista);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var ocorrencia = _context.Ocorrencias.Find(id);
        if (ocorrencia == null)
            return NotFound();

        return Ok(ocorrencia);
    }

    [HttpPost]
    public IActionResult Post(Ocorrencia novaOcorrencia)
    {
        _context.Ocorrencias.Add(novaOcorrencia);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetById), new { id = novaOcorrencia.Id }, novaOcorrencia);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Ocorrencia ocorrenciaAtualizada)
    {
        var ocorrencia = _context.Ocorrencias.Find(id);
        if (ocorrencia == null)
            return NotFound();

        ocorrencia.AlunoId = ocorrenciaAtualizada.AlunoId;
        ocorrencia.Descricao = ocorrenciaAtualizada.Descricao;
        ocorrencia.Data = ocorrenciaAtualizada.Data;
        ocorrencia.Professor = ocorrenciaAtualizada.Professor;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var ocorrencia = _context.Ocorrencias.Find(id);
        if (ocorrencia == null)
            return NotFound();

        _context.Ocorrencias.Remove(ocorrencia);
        _context.SaveChanges();
        return NoContent();
    }
}
    