using Microsoft.AspNetCore.Mvc;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.DTOs;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Repository;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ROController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;

        public ROController(DbGestaoAnneContext context)
        {
            _context = context;
        }

        // POST: api/RO
        [HttpPost]
        public async Task<IActionResult> Registrar([FromBody] RegistroOcorrenciaDTOs dto)
        {
            var nova = new RegistroOcorrencia
            {
                Tipo = dto.Tipo,
                Motivo = dto.Motivo,
                DataHora = dto.DataHora,
                Encerramento = dto.Encerramento,
                Curso = dto.Curso,
                Turma = dto.Turma,
                Observacao = dto.Observacao,

                // No futuro, esses IDs devem vir do token (usuário logado)
                ProfessorId = 1,
                AlunoId = 10,
                CoordenadorId = 2,
                ResponsavelId = 3
            };

            _context.RegistroOcorrencia.Add(nova);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(ObterPorAluno), new { alunoId = nova.AlunoId }, nova);
        }

        // GET: api/RO
        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var lista = await _context.RegistroOcorrencia
                .OrderByDescending(o => o.DataHora)
                .ToListAsync();

            return Ok(lista);
        }

        // GET: api/RO/aluno/{alunoId}
        [HttpGet("aluno/{alunoId}")]
        public async Task<IActionResult> ObterPorAluno(int alunoId)
        {
            var lista = await _context.RegistroOcorrencia
                .Where(o => o.AlunoId == alunoId)
                .OrderByDescending(o => o.DataHora)
                .ToListAsync();

            if (!lista.Any())
                return NotFound("Nenhuma ocorrência encontrada para esse aluno.");

            return Ok(lista);
        }
    }
}
