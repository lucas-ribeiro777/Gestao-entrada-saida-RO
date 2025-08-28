using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Data;
using System.IO;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResponsaveisController : ControllerBase
    {
        private readonly GestaoAnneContext _context;
        private readonly string _assinaturaPath;

        public ResponsaveisController(GestaoAnneContext context)
        {
            _context = context;
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");
            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        
        [HttpPost("cadastro")]
        public async Task<ActionResult<ResponsavelDTO>> PostResponsavel([FromBody] ResponsavelUploadDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var responsavel = new Responsavel
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Assinatura = null
            };

            _context.Responsaveis.Add(responsavel);
            await _context.SaveChangesAsync();

            var idsAlunosAssociados = new List<int>();
            if (dto.NomesAlunos != null && dto.NomesAlunos.Any())
            {
                foreach (var nomeAluno in dto.NomesAlunos.Distinct())
                {
                    var aluno = await _context.Alunos
                        .FirstOrDefaultAsync(a => a.Nome.Trim().ToLower() == nomeAluno.Trim().ToLower());

                    if (aluno != null && !_context.AlunosResponsaveis
                        .Any(ar => ar.IdAlunos == aluno.IdAlunos && ar.IdResponsavel == responsavel.Id))
                    {
                        _context.AlunosResponsaveis.Add(new AlunoResponsavel
                        {
                            IdAlunos = aluno.IdAlunos, 
                            IdResponsavel = responsavel.Id
                        });
                        idsAlunosAssociados.Add(aluno.IdAlunos); 
                    }
                }
                await _context.SaveChangesAsync();
            }

            var responsavelDTO = new ResponsavelDTO
            {
                Id = responsavel.Id,
                Nome = responsavel.Nome,
                Email = responsavel.Email,
                Telefone = responsavel.Telefone,
                Assinatura = responsavel.Assinatura,
                IdsAlunos = idsAlunosAssociados
            };

            return CreatedAtAction(nameof(GetResponsavel), new { id = responsavel.Id }, responsavelDTO);
        }

       
        [HttpPost("{id}/assinatura")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AdicionarAssinatura(int id, [FromForm] UploadAssinaturaDTO dto)
        {
            if (dto?.Assinatura == null || dto.Assinatura.Length == 0)
                return BadRequest("Nenhum arquivo enviado.");

            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            if (string.IsNullOrEmpty(extensao) ||
                !(extensao.Equals(".png", StringComparison.OrdinalIgnoreCase) ||
                  extensao.Equals(".jpg", StringComparison.OrdinalIgnoreCase) ||
                  extensao.Equals(".jpeg", StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest("Formato de arquivo não permitido. Use PNG ou JPG.");
            }

            var responsavel = await _context.Responsaveis.FindAsync(id);
            if (responsavel == null)
                return NotFound("Responsável não encontrado.");

            var nomeArquivo = $"assinatura_responsavel_{Guid.NewGuid()}{extensao}";
            var caminhoArquivo = Path.Combine(_assinaturaPath, nomeArquivo);

            using (var stream = new FileStream(caminhoArquivo, FileMode.Create))
            {
                await dto.Assinatura.CopyToAsync(stream);
            }

            responsavel.Assinatura = $"/assinaturas/{nomeArquivo}";
            _context.Responsaveis.Update(responsavel);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Mensagem = "Assinatura adicionada com sucesso!",
                Caminho = responsavel.Assinatura
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResponsavelDTO>> GetResponsavel(int id)
        {
            var responsavel = await _context.Responsaveis
                .Include(r => r.AlunosResponsaveis)
                    .ThenInclude(ar => ar.Aluno)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (responsavel == null) return NotFound();

            return new ResponsavelDTO
            {
                Id = responsavel.Id,
                Nome = responsavel.Nome,
                Email = responsavel.Email,
                Telefone = responsavel.Telefone,
                Assinatura = responsavel.Assinatura,
                IdsAlunos = responsavel.AlunosResponsaveis
                    .Where(ar => ar.Aluno != null)
                    .Select(ar => ar.Aluno.IdAlunos) 
                    .ToList()
            };
        }

     
        [HttpGet]
        public async Task<ActionResult<List<ResponsavelDTO>>> GetResponsaveis()
        {
            var responsaveis = await _context.Responsaveis
                .Include(r => r.AlunosResponsaveis)
                    .ThenInclude(ar => ar.Aluno)
                .ToListAsync();

            return responsaveis.Select(r => new ResponsavelDTO
            {
                Id = r.Id,
                Nome = r.Nome,
                Email = r.Email,
                Telefone = r.Telefone,
                Assinatura = r.Assinatura,
                IdsAlunos = r.AlunosResponsaveis
                    .Where(ar => ar.Aluno != null)
                    .Select(ar => ar.Aluno.IdAlunos) 
                    .ToList()
            }).ToList();
        }
    }
}
