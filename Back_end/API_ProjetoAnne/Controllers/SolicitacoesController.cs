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

       
        // Envia uma nova solicitação de entrada ou saída.
        
        [HttpPost]
        public IActionResult EnviarSolicitacao([FromBody] Solicitacao nova)
        {
            nova.Id = _nextId++;
            nova.Status = "Pendente";
            nova.DataHora = DateTime.Now;
            _solicitacoes.Add(nova);
            return CreatedAtAction(nameof(ConsultarStatus), new { id = nova.Id }, nova);
        }

      
        // Consulta o status de uma solicitação.
       
        [HttpGet("{id}/status")]
        public IActionResult ConsultarStatus(int id)
        {
            var solicitacao = _solicitacoes.FirstOrDefault(s => s.Id == id);
            if (solicitacao == null)
                return NotFound("Solicitação não encontrada.");

            return Ok(new { solicitacao.Id, solicitacao.Status });
        }

       
       
        // Retorna o histórico de todas as solicitações.

        [HttpGet]
        public IActionResult VisualizarHistorico()
        {
            return Ok(_solicitacoes.OrderByDescending(s => s.DataHora).ToList());
        }
    }
}
