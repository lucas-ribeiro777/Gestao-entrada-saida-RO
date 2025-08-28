using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.DTOs;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoordenadorController : ControllerBase
    {
        private readonly GestaoAnneContext _context;
        private readonly string _assinaturaPath;

        public CoordenadorController(GestaoAnneContext context)
        {
            _context = context;
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        [HttpPost]
        public async Task<ActionResult<Coordenador>> PostCoordenador([FromForm] CoordenadorUploadDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            
            if (string.IsNullOrWhiteSpace(dto.Nome) ||
                string.IsNullOrWhiteSpace(dto.Telefone) ||
                string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Senha))
            {
                return BadRequest("Nome, Telefone, Email e Senha são obrigatórios.");
            }

            var coordenador = new Coordenador
            {
                Nome = dto.Nome.Trim(),
                Telefone = dto.Telefone.Trim(),
                Email = dto.Email.Trim(),
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Assinatura = null 
            };

            _context.Coordenadores.Add(coordenador);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCoordenador), new { id = coordenador.Id }, coordenador);
        }

        [HttpPost("{id}/assinatura")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AdicionarAssinatura(int id, [FromForm] UploadAssinaturaDTO dto)
        {
            var coordenador = await _context.Coordenadores.FindAsync(id);
            if (coordenador == null)
                return NotFound("Coordenador não encontrado.");

            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            var nomeArquivo = $"assinatura_coordenador_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturaPath, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Assinatura.CopyToAsync(stream);
            }

            coordenador.Assinatura = $"/assinaturas/{nomeArquivo}";
            await _context.SaveChangesAsync();

            return Ok(new { Mensagem = "Assinatura adicionada com sucesso!", Caminho = coordenador.Assinatura });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Coordenador>> GetCoordenador(int id)
        {
            var c = await _context.Coordenadores
                .AsNoTracking() 
                .FirstOrDefaultAsync(x => x.Id == id);

            if (c == null) return NotFound();

            return Ok(c);
        }

        [HttpGet]
        public async Task<ActionResult<List<Coordenador>>> GetCoordenadores()
        {
            var lista = await _context.Coordenadores
                .AsNoTracking()
                .ToListAsync();

            return Ok(lista);
        }
    }
}
