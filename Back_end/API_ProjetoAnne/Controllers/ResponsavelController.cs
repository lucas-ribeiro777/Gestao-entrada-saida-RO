using Microsoft.AspNetCore.Mvc;
using Api_Saida.Models;
using Api_Saida.DTOs; // Assumindo que existe um DTO para upload
using System.Threading.Tasks;
using System.IO;
using System;
using Api_Saida.Repository;

[ApiController]
[Route("api/[controller]")]
public class ResponsavelController : ControllerBase
{
    private readonly DbGestaoAnneContext _context;
    private readonly string _assinaturasPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

    public ResponsavelController(DbGestaoAnneContext context)
    {
        _context = context;

        if (!Directory.Exists(_assinaturasPath))
            Directory.CreateDirectory(_assinaturasPath);
    }

    [HttpPost]
    public async Task<ActionResult<Responsavel>> PostResponsavel([FromForm] ResponsavelUploadDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

#pragma warning disable CS8601 // Possible null reference assignment.
        var responsavel = new Responsavel
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Telefone = dto.Telefone,
            DataNascimento = dto.DataNascimento,
            IdAluno = dto.IdAluno,
            Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
        };
#pragma warning restore CS8601 // Possible null reference assignment.

        if (dto.Assinatura != null && dto.Assinatura.Length > 0)
        {
            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            var nomeUnico = $"assinatura_responsavel_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturasPath, nomeUnico);

            using var stream = new FileStream(caminhoCompleto, FileMode.Create);
            await dto.Assinatura.CopyToAsync(stream);

            responsavel.Assinatura = $"/assinaturas/{nomeUnico}";
        }

        _context.Responsaveis.Add(responsavel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetResponsavelResumo), new { id = responsavel.Id }, responsavel);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Responsavel>> GetResponsavelResumo(int id)
    {
        var responsavel = await _context.Responsaveis.FindAsync(id);
        if (responsavel == null)
            return NotFound();

        return responsavel;
    }
}