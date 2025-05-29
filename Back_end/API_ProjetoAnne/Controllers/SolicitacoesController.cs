using Microsoft.AspNetCore.Mvc;
using SolicitacoesAPI.Models;

namespace SolicitacoesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacoesController : ControllerBase
    {
        private static List<Solicitacao> _solicitacoes = new();
        private static int _nextId = 1;

        /// <summary>
        /// Envia uma nova solicitação de entrada ou saída.
        /// </summary>
        [HttpPost]
        public IActionResult EnviarSolicitacao([FromBody] Solicitacao nova)
        {
            nova.Id = _nextId++;
            nova.Status = "Pendente";
            nova.DataHora = DateTime.Now;
            _solicitacoes.Add(nova);
            return CreatedAtAction(nameof(ConsultarStatus), new { id = nova.Id }, nova);
        }

        /// <summary>
        /// Consulta o status de uma solicitação.
        /// </summary>
        [HttpGet("{id}/status")]
        public IActionResult ConsultarStatus(int id)
        {
            var solicitacao = _solicitacoes.FirstOrDefault(s => s.Id == id);
            if (solicitacao == null)
                return NotFound("Solicitação não encontrada.");

            return Ok(new { solicitacao.Id, solicitacao.Status });
        }

        /// <summary>
        /// Retorna o histórico de todas as solicitações.
        /// </summary>
        [HttpGet]
        public IActionResult VisualizarHistorico()
        {
            return Ok(_solicitacoes.OrderByDescending(s => s.DataHora).ToList());
        }
    }
}
