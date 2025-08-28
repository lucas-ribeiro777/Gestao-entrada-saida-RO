using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly GestaoAnneContext _context;
        private readonly string _imagemPath;
        private readonly string _assinaturaPath;
        private readonly string[] _extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };

        public AlunoController(GestaoAnneContext context)
        {
            _context = context;
            _imagemPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imagens");
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            if (!Directory.Exists(_imagemPath)) Directory.CreateDirectory(_imagemPath);
            if (!Directory.Exists(_assinaturaPath)) Directory.CreateDirectory(_assinaturaPath);
        }

        [HttpPost("cadastro")]
        public async Task<ActionResult<AlunoDTO>> PostAluno([FromForm] AlunoUploadDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var imagemRelativa = await SalvarArquivo(dto.Imagem, _imagemPath, "imagem_aluno");
            var assinaturaRelativa = await SalvarArquivo(dto.Assinatura, _assinaturaPath, "assinatura_aluno");

            var aluno = new Aluno
            {
                Nome = dto.Nome,
                Email = dto.Email,
                DataNascimento = dto.DataNascimento,
                Telefone = dto.Telefone,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Imagem = imagemRelativa,
                Assinatura = assinaturaRelativa
            };

            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();

            if (dto.IdsResponsaveis != null)
            {
                foreach (var idResp in dto.IdsResponsaveis)
                {
                    _context.AlunosResponsaveis.Add(new AlunoResponsavel
                    {
                        IdAlunos = aluno.IdAlunos, 
                        IdResponsavel = idResp
                    });
                }
                await _context.SaveChangesAsync();
            }

            var alunoComResp = await _context.Alunos
                .Include(a => a.AlunosResponsaveis)
                    .ThenInclude(ar => ar.Responsavel)
                .FirstOrDefaultAsync(a => a.IdAlunos == aluno.IdAlunos); 

            var alunoDTO = ConverterParaDTO(alunoComResp!);

            return CreatedAtAction(nameof(GetAluno), new { id = alunoDTO.IdAlunos }, alunoDTO); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlunoDTO>> GetAluno(int id)
        {
            var aluno = await _context.Alunos
                .Include(a => a.AlunosResponsaveis)
                    .ThenInclude(ar => ar.Responsavel)
                .FirstOrDefaultAsync(a => a.IdAlunos == id); 

            if (aluno == null) return NotFound();

            return ConverterParaDTO(aluno);
        }

        [HttpGet]
        public async Task<ActionResult<List<AlunoDTO>>> GetAlunos()
        {
            var alunos = await _context.Alunos
                .Include(a => a.AlunosResponsaveis)
                    .ThenInclude(ar => ar.Responsavel)
                .ToListAsync();

            var alunosDTO = alunos.Select(a => ConverterParaDTO(a)).ToList();

            return Ok(alunosDTO);
        }

        [NonAction]
        private async Task<string> SalvarArquivo(IFormFile arquivo, string pasta, string prefixo)
        {
            if (arquivo == null || arquivo.Length == 0)
                throw new Exception("Arquivo inválido.");

            var ext = Path.GetExtension(arquivo.FileName).ToLowerInvariant();
            if (!_extensoesPermitidas.Contains(ext))
                throw new Exception("Formato de arquivo inválido.");

            var nome = $"{prefixo}_{Guid.NewGuid()}{ext}";
            var caminho = Path.Combine(pasta, nome);

            using var stream = new FileStream(caminho, FileMode.Create);
            await arquivo.CopyToAsync(stream);

            return $"/{Path.GetFileName(pasta)}/{nome}";
        }

        [NonAction]
        private AlunoDTO ConverterParaDTO(Aluno aluno)
        {
            return new AlunoDTO
            {
                IdAlunos = aluno.IdAlunos, 
                Nome = aluno.Nome,
                Email = aluno.Email,
                Telefone = aluno.Telefone,
                Imagem = aluno.Imagem,
                Assinatura = aluno.Assinatura,
                DataNascimento = aluno.DataNascimento,
                IdResponsaveis = aluno.AlunosResponsaveis
                    .Select(ar => ar.Responsavel.Id)
                    .ToList()
            };
        }
    }
}
