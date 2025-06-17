using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using GraficoAPI.Models;

namespace GraficoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GraficoController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public GraficoController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("dados")]
        [ProducesResponseType(typeof(GraficosResponse), 200)]
        public async Task<IActionResult> GetDadosGraficos()
        {
            var url = "https://minha-outra-api.com/api/graficos/dados"; // Altere para a real

            try
            {
                var response = await _httpClient.GetFromJsonAsync<GraficosResponse>(url);

                if (response == null)
                    return NotFound("Dados não encontrados.");

                return Ok(response);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Erro ao acessar a API externa: {ex.Message}");
            }
        }
    }
}
