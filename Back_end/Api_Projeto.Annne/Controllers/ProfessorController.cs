using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository;
using Microsoft.AspNetCore.Mvc;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;
        private readonly string _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

        public ProfessorController(DbGestaoAnneContext context)
        {
            _context = context;

            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        [HttpPost]
        public async Task<ActionResult<Professor>> PostProfessor([FromForm] ProfessorUploadDTOs dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

#pragma warning disable CS8601 // Possible null reference assignment.
            var prof = new Professor
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
            };
#pragma warning restore CS8601 // Possible null reference assignment.

            if (dto.Assinatura != null && dto.Assinatura.Length > 0)
            {
                var extensao = Path.GetExtension(dto.Assinatura.FileName);
                var nomeArquivo = $"assinatura_professor_{Guid.NewGuid()}{extensao}";
                var caminhoCompleto = Path.Combine(_assinaturaPath, nomeArquivo);

                using var stream = new FileStream(caminhoCompleto, FileMode.Create);
                await dto.Assinatura.CopyToAsync(stream);

                prof.Assinatura = $"/assinaturas/{nomeArquivo}";
            }

            _context.Professores.Add(prof);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProfessor), new { id = prof.Id }, prof);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Professor>> GetProfessor(int id)
        {
            var prof = await _context.Professores.FindAsync(id);
            if (prof == null)
                return NotFound();

            return prof;
        }
    }
}