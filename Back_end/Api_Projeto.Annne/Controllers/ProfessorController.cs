using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly ProfessorService _service;

        public ProfessorController(ProfessorService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<ActionResult<ProfessorDTO>> PostProfessor([FromBody] ProfessorUploadDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var professor = await _service.CriarProfessorAsync(dto);
                return CreatedAtAction(nameof(GetProfessor), new { id = professor.IdProfessor }, professor);
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        
        [HttpPost("{id}/assinatura")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AdicionarAssinatura(int id, [FromForm] UploadAssinaturaDTO dto)
        {
            try
            {
                var caminho = await _service.AdicionarAssinaturaAsync(id, dto);
                return Ok(new { Mensagem = "Assinatura adicionada com sucesso!", Caminho = caminho });
            }
            catch (System.Exception ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProfessorDTO>> GetProfessor(int id)
        {
            var professor = await _service.ObterProfessorPorIdAsync(id);
            if (professor == null) return NotFound();
            return Ok(professor);
        }

        [HttpGet]
        public async Task<ActionResult<List<ProfessorDTO>>> GetProfessores()
        {
            var professores = await _service.ObterTodosProfessoresAsync();
            return Ok(professores);
        }
    }
}
