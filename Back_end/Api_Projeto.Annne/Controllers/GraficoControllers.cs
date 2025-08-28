using Microsoft.AspNetCore.Mvc;
using Api_Projeto.Annne.Services;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GraficoController : ControllerBase
    {
        private readonly GraficoService _graficoService;

        public GraficoController(GraficoService graficoService)
        {
            _graficoService = graficoService;
        }

        
        [HttpGet("resumo/{idCurso}")]
        public async Task<IActionResult> GetResumo(int idCurso)
        {
            var resumo = await _graficoService.SalvarResumoDadosAsync(idCurso);

            return Ok(new
            {
                horariosMaisFrequentes = resumo.Horarios.Select(h => new
                {
                    hora = h.Hora.ToString(@"hh\:mm"),
                    quantidade = h.Quantidade
                }),
                motivosMaisFrequentes = resumo.Motivos.Select(m => new
                {
                    motivo = m.Motivo,
                    quantidade = m.Quantidade
                })
            });
        }

        
        [HttpGet("cursos")]
        public async Task<IActionResult> GetResumoTodos()
        {
            var lista = await _graficoService.GetResumoTodosCursosAsync();
            return Ok(lista);
        }

       
[HttpGet("{idCurso}")]
public async Task<IActionResult> GetCursoById(int idCurso)
{
    var curso = await _graficoService.GetCursoByIdAsync(idCurso);

    if (curso == null)
        return NotFound(new { mensagem = "Curso não encontrado." });

    return Ok(curso);
}

    }
}

