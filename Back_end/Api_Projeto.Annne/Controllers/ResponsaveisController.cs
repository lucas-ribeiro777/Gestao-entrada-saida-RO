using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository;

namespace GestaoResponsaveisAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResponsaveisController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;
        private readonly string _assinaturasPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

#pragma warning disable CS8618
        public ResponsaveisController(DbGestaoAnneContext context)
#pragma warning restore CS8618
        {
            _context = context;

            if (!Directory.Exists(_assinaturasPath))
                Directory.CreateDirectory(_assinaturasPath);
        }

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
                IdAluno = dto.IdAluno,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };

            if (dto.Assinatura != null && dto.Assinatura.Length > 0)
            {
                var extensao = Path.GetExtension(dto.Assinatura.FileName).ToLowerInvariant();
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };

                if (!extensoesPermitidas.Contains(extensao))
                    return BadRequest("Extensão de arquivo de assinatura não suportada.");

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

        [HttpPost("simples")]
        public async Task<IActionResult> CadastrarResponsavel([FromBody] ResponsavelCreateDTO dto)
        {
            var responsavel = new Responsavel
            {
                Nome = dto.Nome,
                Telefone = dto.Telefone
            };

            _context.Responsaveis.Add(responsavel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetResponsavelResumo), new { id = responsavel.Id }, responsavel);
        }

        [HttpPut("{id}/aluno/{alunoId}")]
        public async Task<IActionResult> RelacionarResponsavelAluno(int id, int alunoId, Responsavel responsavel)
        {
            var responsavelExistente = await _context.Responsaveis.FindAsync(id);
            if (responsavelExistente == null)
                return NotFound("Responsável não encontrado.");

            var aluno = await _context.Alunos.FindAsync(alunoId);
            if (aluno == null)
                return NotFound("Aluno não encontrado.");

            if (responsavelExistente.AlunosIds == null)
                responsavelExistente.AlunosIds = new List<int>();

            if (!responsavelExistente.AlunosIds.Contains(alunoId))
                responsavelExistente.AlunosIds.Add(alunoId);

            _context.Responsaveis.Update(responsavelExistente);
            await _context.SaveChangesAsync();

            return Ok(responsavelExistente);
        }

        [HttpGet]
        public async Task<IActionResult> ConsultarResponsaveis()
        {
            var lista = await _context.Responsaveis.ToListAsync();
            return Ok(lista);
        }
    }
}
