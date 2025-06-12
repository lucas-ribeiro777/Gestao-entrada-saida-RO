using Microsoft.AspNetCore.Mvc;
using APIDevolutivaRO.Models;

namespace APIDevolutivaRO.Controllers
{
    [ApiController]
    [Route("api/ro")]
    public class ROController : ControllerBase
    {
        [HttpPost("devolutiva")]
        public IActionResult PostDevolutiva([FromBody] DevolutivaRO model)
        {
            if (model == null || string.IsNullOrWhiteSpace(model.Devolutiva))
            {
                return BadRequest(new { message = "Dados inválidos." });
            }

            return Ok(new { message = "Devolutiva registrada com sucesso." });
        }
    }
}
