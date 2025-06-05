using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Projeto.Annne.Controllers
{
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
            _imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            if (!Directory.Exists(_imagePath))
                Directory.CreateDirectory(_imagePath);

            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        // POST api/alunos
        [HttpPost]
        public async Task<ActionResult<Aluno>> PostAluno([FromForm] AlunoUploadDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var aluno = new Aluno
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                DataNascimento = dto.DataNascimento,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            // Salvar imagem
            if (dto.Imagem != null && dto.Imagem.Length > 0)
            {
                var extensao = Path.GetExtension(dto.Imagem.FileName).ToLowerInvariant();
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                if (!Array.Exists(extensoesPermitidas, e => e == extensao))
                    return BadRequest("Extensão de imagem não permitida.");

                var nomeUnico = $"imagem_{Guid.NewGuid()}{extensao}";
                var caminhoCompleto = Path.Combine(_imagePath, nomeUnico);

                using var stream = new FileStream(caminhoCompleto, FileMode.Create);
                await dto.Imagem.CopyToAsync(stream);

                aluno.Imagem = $"/images/{nomeUnico}";
            }

            // Salvar assinatura
            if (dto.Assinatura != null && dto.Assinatura.Length > 0)
            {
                var extensao = Path.GetExtension(dto.Assinatura.FileName).ToLowerInvariant();
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                if (!Array.Exists(extensoesPermitidas, e => e == extensao))
                    return BadRequest("Extensão de assinatura não permitida.");

                var nomeUnico = $"assinatura_{Guid.NewGuid()}{extensao}";
                var caminhoCompleto = Path.Combine(_assinaturaPath, nomeUnico);

                using var stream = new FileStream(caminhoCompleto, FileMode.Create);
                await dto.Assinatura.CopyToAsync(stream);

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
        public async Task<ActionResult<List<Aluno>>> GetAlunos()
        {
            var alunos = await _context.Alunos.ToListAsync();
            return alunos;
        }
    }
}
