using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api_Projeto.Annne.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SolicitacoesController : ControllerBase
    {
        private static List<Solicitacoes> _solicitacoes = new();
        private static int _nextId = 1;

       
        // Envia uma nova solicitação de entrada ou saída.
        
        [HttpPost]
        public IActionResult EnviarSolicitacao([FromBody] Solicitacoes nova)
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