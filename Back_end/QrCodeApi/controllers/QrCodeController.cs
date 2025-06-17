using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Models;
using Api.Data;
using Api.Services;
using System;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QrCodeController : ControllerBase
    {
        private readonly GestaoAnneContext _context;
        private readonly QrCodeService _qrCodeService;

        public QrCodeController(GestaoAnneContext context, QrCodeService qrCodeService)
        {
            _context = context;
            _qrCodeService = qrCodeService;
        }

        [HttpPost]
        public async Task<IActionResult> GerarQrCode([FromBody] QrCodeRequest request)
        {
            // valida se coordenador e responsável estão autorizados
            if (request.Coordenador?.ToLower() != "autorizado" || request.Responsavel?.ToLower() != "autorizado")
                return BadRequest("QR Code só é gerado se coordenador e responsável forem 'autorizado'.");

            // busca qualquer coordenador e responsável existentes no banco
            var coordenador = await _context.Coordenadores.FirstOrDefaultAsync();
            var responsavel = await _context.Responsaveis.FirstOrDefaultAsync();

            if (coordenador == null || responsavel == null)
                return NotFound("Coordenador ou responsável não encontrados.");

            // busca solicitação pelo IdAluno para pegar o curso
            var solicitacao = await _context.Solicitacoes.FirstOrDefaultAsync(s => s.IdAluno == request.IdAluno);
            int idCurso = solicitacao != null ? solicitacao.IdCurso : 0;

            // monta o conteúdo do QR Code (você pode ajustar o texto conforme quiser)
            string data = DateTime.Now.ToString("dd/MM/yyyy");
            string hora = DateTime.Now.ToString("HH:mm:ss");

            string conteudo = $"coordenador: autorizado\nresponsavel: autorizado\ndata: {data}\nhora: {hora}";
            string nomeArquivo = $"qrcode_{request.IdAluno}_{DateTime.Now.Ticks}";

            // gera o QR Code e pega o caminho para salvar no banco
            string caminho = _qrCodeService.GerarQRCode(conteudo, nomeArquivo);

            // cria registro do QR Code no banco
            var qrCode = new QrCode
            {
                IdAluno = request.IdAluno,
                IdCurso = idCurso,
                IdCoordenador = coordenador.Id,
                IdResponsavel = responsavel.Id,
                CaminhoArquivo = caminho,
                DataHora = DateTime.Now,
                Autorizado = "sim"
            };

            _context.QrCodes.Add(qrCode);
            await _context.SaveChangesAsync();

            return Ok(qrCode);
        }
    }
}
