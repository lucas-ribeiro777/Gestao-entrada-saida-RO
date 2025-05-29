using Microsoft.AspNetCore.Mvc;
using SolicitacoesAPI.Models;

namespace SolicitacoesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ROController : ControllerBase
    {
        private static List<RegistroOcorrencia> _ocorrencias = new();
        private static int _nextId = 1;

        /// <summary>
        /// Professor registra uma nova ocorrência.
        /// </summary>
        [HttpPost]
        public IActionResult Registrar([FromBody] RegistroOcorrencia nova)
        {
            nova.Id = _nextId++;
            nova.DataHora = DateTime.Now;
            _ocorrencias.Add(nova);
            return CreatedAtAction(nameof(ObterPorAluno), new { alunoNome = nova.AlunoNome }, nova);
        }

        /// <summary>
        /// Coordenador vê o histórico de todas as ocorrências.
        /// </summary>
        [HttpGet]
        public IActionResult ObterTodos()
        {
            return Ok(_ocorrencias.OrderByDescending(o => o.DataHora));
        }

        /// <summary>
        /// Responsável vê as ocorrências do filho.
        /// </summary>
        [HttpGet("aluno/{alunoNome}")]
        public IActionResult ObterPorAluno(string alunoNome)
        {
            var ocorrencias = _ocorrencias
                .Where(o => o.AlunoNome.Equals(alunoNome, StringComparison.OrdinalIgnoreCase))
                .OrderByDescending(o => o.DataHora)
                .ToList();

            if (!ocorrencias.Any())
                return NotFound("Nenhuma ocorrência encontrada para esse aluno.");

            return Ok(ocorrencias);
        }
    }
}
