using Microsoft.AspNetCore.Mvc;
using ApiRO.Models;

namespace ApiRO.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OcorrenciasController : ControllerBase
    {
        private static readonly List<Ocorrencia> ocorrencias = new();
        private static int nextId = 1;

        // POST /ocorrencias
        [HttpPost]
        public IActionResult RegistrarOcorrencia([FromBody] Ocorrencia novaOcorrencia)
        {
            if (novaOcorrencia == null ||
                novaOcorrencia.AlunoId <= 0 ||
                string.IsNullOrEmpty(novaOcorrencia.Descricao) ||
                string.IsNullOrEmpty(novaOcorrencia.Professor))
            {
                return BadRequest("Dados inválidos.");
            }

            novaOcorrencia.Id = nextId++;
            ocorrencias.Add(novaOcorrencia);
            return CreatedAtAction(nameof(ObterOcorrenciaPorId), new { id = novaOcorrencia.Id }, novaOcorrencia);
        }

        // GET /ocorrencias
        [HttpGet]
        public ActionResult<List<Ocorrencia>> ListarTodas()
        {
            return ocorrencias;
        }

        // GET /ocorrencias/{id}
        [HttpGet("{id}")]
        public ActionResult<Ocorrencia> ObterOcorrenciaPorId(int id)
        {
            var ocorrencia = ocorrencias.FirstOrDefault(o => o.Id == id);
            if (ocorrencia == null) return NotFound();
            return ocorrencia;
        }

        // GET /ocorrencias/responsavel/{idFilho}
        [HttpGet("responsavel/{idFilho}")]
        public ActionResult<List<Ocorrencia>> ListarPorFilho(int idFilho)
        {
            if (idFilho <= 0) return BadRequest("idFilho inválido.");

            var resultado = ocorrencias.Where(o => o.AlunoId == idFilho).ToList();
            return resultado;
        }
    }
}
