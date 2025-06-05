using Microsoft.AspNetCore.Mvc;
using APIautorizacao.Data;
using APIautorizacao.Models;

namespace APIautorizacao.Controllers
{
    [Route("api/ocorrencia")]
    [ApiController]
    public class OcorrenciaController : ControllerBase
    {
        private static List<Ocorrencia> ocorrencias = new List<Ocorrencia>();

        [HttpPost("autorizar")]
        public IActionResult AutorizarOcorrencia([FromBody] Ocorrencia ocorrencia)
        {
            ocorrencias.Add(ocorrencia);
            return Ok(new { mensagem = "Ocorrência autorizada!", ocorrencia });
        }
    }
}
