using Microsoft.AspNetCore.Mvc;
using SolicitacoesAPI.Models;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;

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
        [SwaggerOperation(Summary = "Enviar Solicitação")]
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
        [SwaggerOperation(Summary = "Consultar Status")]
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
        [SwaggerOperation(Summary = "Visualizar Histórico")]
        public IActionResult VisualizarHistorico()
        {
            return Ok(_solicitacoes.OrderByDescending(s => s.DataHora).ToList());
        }

        /// <summary>
        /// Consulta os dados completos de uma solicitação pelo ID.
        /// </summary>
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Consultar Solicitação Completa")]
        public IActionResult ConsultarSolicitacao(int id)
        {
            var solicitacao = _solicitacoes.FirstOrDefault(s => s.Id == id);
            if (solicitacao == null)
                return NotFound("Solicitação não encontrada.");

            return Ok(solicitacao);
        }
    }
}
