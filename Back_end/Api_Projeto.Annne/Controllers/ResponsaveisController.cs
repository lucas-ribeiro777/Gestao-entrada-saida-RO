using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;
using System.IO;
using System.Threading.Tasks;
using System.Linq;
using System;
using Api_Projeto.Annne.Repository;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResponsaveisController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;
        private readonly string _assinaturasPath;

        public ResponsaveisController(DbGestaoAnneContext context)
        {
            _context = context;
            _assinaturasPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            if (!Directory.Exists(_assinaturasPath))
                Directory.CreateDirectory(_assinaturasPath);
        }

        // POST api/responsaveis/upload
        [HttpPost("upload")]
        public async Task<ActionResult<Responsavel>> PostResponsavel([FromForm] ResponsavelUploadDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var responsavel = new Responsavel
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                DataNascimento = dto.DataNascimento,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            if (dto.Assinatura != null && dto.Assinatura.Length > 0)
            {
                var extensao = Path.GetExtension(dto.Assinatura.FileName).ToLowerInvariant();
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };

                if (!extensoesPermitidas.Contains(extensao))
                    return BadRequest("Extensão de arquivo de assinatura não suportada.");

                var nomeArquivo = $"assinatura_responsavel_{Guid.NewGuid()}{extensao}";
                var caminhoCompleto = Path.Combine(_assinaturasPath, nomeArquivo);

                using var stream = new FileStream(caminhoCompleto, FileMode.Create);
                await dto.Assinatura.CopyToAsync(stream);

                responsavel.Assinatura = $"/assinaturas/{nomeArquivo}";
            }

            _context.Responsaveis.Add(responsavel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetResponsavel), new { id = responsavel.Id }, responsavel);
        }

        // GET api/responsaveis/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Responsavel>> GetResponsavel(int id)
        {
            var responsavel = await _context.Responsaveis
                .Include(r => r.Alunos) // inclui alunos associados
                .FirstOrDefaultAsync(r => r.Id == id);

            if (responsavel == null)
                return NotFound();

            return responsavel;
        }

        // POST api/responsaveis/simples
        [HttpPost("simples")]
        public async Task<ActionResult<Responsavel>> PostResponsavelSimples([FromBody] ResponsavelUploadDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var responsavel = new Responsavel
            {
                Nome = dto.Nome ?? throw new ArgumentNullException(nameof(dto.Nome)),
                Telefone = dto.Telefone
            };

            _context.Responsaveis.Add(responsavel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetResponsavel), new { id = responsavel.Id }, responsavel);
        }

        // PUT api/responsaveis/{id}/aluno/{alunoId}
        [HttpPut("{id}/aluno/{alunoId}")]
        public async Task<IActionResult> RelacionarResponsavelAluno(int id, int alunoId)
        {
            var responsavel = await _context.Responsaveis
                .Include(r => r.Alunos)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (responsavel == null)
                return NotFound("Responsável não encontrado.");

            var aluno = await _context.Alunos.FindAsync(alunoId);
            if (aluno == null)
                return NotFound("Aluno não encontrado.");

            if (!responsavel.Alunos.Any(a => a.Id == alunoId))
                responsavel.Alunos.Add(aluno);

            await _context.SaveChangesAsync();

            return Ok(responsavel);
        }

        // GET api/responsaveis
        [HttpGet]
        public async Task<IActionResult> GetResponsaveis()
        {
            var lista = await _context.Responsaveis
                .Include(r => r.Alunos)
                .ToListAsync();

            return Ok(lista);
        }
    }
}
