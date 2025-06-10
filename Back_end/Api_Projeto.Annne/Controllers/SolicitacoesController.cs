using Api_Projeto.Annne.Models;
using Microsoft.AspNetCore.Mvc;


namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacoesController : ControllerBase
    {
        private static List<Solicitacao> _solicitacoes = new();
        private static int _nextId = 1;

        // Envia uma nova solicitação de entrada ou saída
        [HttpPost]
        public IActionResult EnviarSolicitacao([FromBody] Solicitacao nova)
        {
            nova.IdSolicitacao = _nextId++;
            nova.DataHora = DateTime.Now;
            _solicitacoes.Add(nova);

            return CreatedAtAction(nameof(ConsultarSolicitacao), new { id = nova.IdSolicitacao }, nova);
        }

        // Consulta uma solicitação por ID
        [HttpGet("{id}")]
        public IActionResult ConsultarSolicitacao(int id)
        {
            var solicitacao = _solicitacoes.FirstOrDefault(s => s.IdSolicitacao == id);
            if (solicitacao == null)
                return NotFound("Solicitação não encontrada.");

            return Ok(solicitacao);
        }

        // Retorna o histórico de todas as solicitações
        [HttpGet]
        public IActionResult VisualizarHistorico()
        {
            var historico = _solicitacoes.OrderByDescending(s => s.DataHora).ToList();
            return Ok(historico);
        }
    }
}
