using Api_Projeto.Annne.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QrCodeController : ControllerBase
    {
        private readonly QrCodeService _qrCodeService;

        public QrCodeController(QrCodeService qrCodeService)
        {
            _qrCodeService = qrCodeService;
        }

        [HttpPost("gerar/{idSolicitacao}")]
        public async Task<IActionResult> Gerar(int idSolicitacao)
        {
            try
            {
                var registro = await _qrCodeService.GerarQrCodeAsync(idSolicitacao);
                return Ok(new
                {
                    mensagem = "QR Code gerado com sucesso",
                    registro
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    mensagem = "Erro ao gerar QR Code",
                    detalhe = ex.Message
                });
            }
        }
    }
}