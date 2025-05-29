using Microsoft.AspNetCore.Mvc;
using Api_Saida.Models;
using Api_Saida.DTOs;
using Microsoft.EntityFrameworkCore;
using Api_Saida.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System;

[ApiController]
[Route("api/[controller]")]
public class AlunosController : ControllerBase
{
    private readonly DbGestaoAnneContext _context;
    private readonly string _imagePath;
    private readonly string _assinaturaPath;

    public AlunosController(DbGestaoAnneContext context)
    {
        _context = context;

        // Caminhos separados para imagens e assinaturas
        _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
        _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

        // Criar pastas se não existirem
        if (!Directory.Exists(_imagePath))
            Directory.CreateDirectory(_imagePath);

        if (!Directory.Exists(_assinaturaPath))
            Directory.CreateDirectory(_assinaturaPath);
    }

    // POST api/alunos
    [HttpPost]
    public async Task<ActionResult<Aluno>> PostAluno([FromForm] AlunoUploadImagemDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var aluno = new Aluno
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Telefone = dto.Telefone,
            DataNascimento = dto.DataNascimento,
            IdResponsavel = dto.IdResponsavel,
            Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
        };

        // Salvar imagem (foto do aluno)
        if (dto.Imagem != null && dto.Imagem.Length > 0)
        {
            var extensao = Path.GetExtension(dto.Imagem.FileName);
            var nomeUnico = $"imagem_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_imagePath, nomeUnico);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Imagem.CopyToAsync(stream);
            }

            aluno.Imagem = $"/images/{nomeUnico}";
        }

        // Salvar assinatura (arquivo)
        if (dto.Assinatura != null && dto.Assinatura.Length > 0)
        {
            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            var nomeUnico = $"assinatura_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturaPath, nomeUnico);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Assinatura.CopyToAsync(stream);
            }

            aluno.Assinatura = $"/assinaturas/{nomeUnico}";
        }

        _context.Alunos.Add(aluno);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAluno), new { id = aluno.Id }, aluno);
    }

    // GET api/alunos/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Aluno>> GetAluno(int id)
    {
        var aluno = await _context.Alunos.FindAsync(id);

        if (aluno == null)
            return NotFound();

        return aluno;
    }

    // GET api/alunos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Aluno>>> GetAlunos()
    {
        return await _context.Alunos.ToListAsync();
    }
}
