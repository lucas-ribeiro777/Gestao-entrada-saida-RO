using System;
using System.IO;
using System.Threading.Tasks;
using QRCoder;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace Api_Projeto.Annne.Services
{
    public class QrCodeService
    {
        private readonly GestaoAnneContext _context;
        private readonly string _pastaQrCode;

        public QrCodeService(GestaoAnneContext context)
        {
            _context = context;
            _pastaQrCode = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "qrcodes");
            if (!Directory.Exists(_pastaQrCode))
                Directory.CreateDirectory(_pastaQrCode);
        }

        public async Task<QrCodeRegistro> GerarQrCodeAsync(int idSolicitacao)
        {
            
            var solicitacao = await _context.Solicitacoes
                .Include(s => s.Aluno)
                .Include(s => s.Curso)
                .FirstOrDefaultAsync(s => s.IdSolicitacao == idSolicitacao);

            if (solicitacao == null)
                throw new Exception("Solicitação não encontrada.");

           
            string conteudo =
                $"Solicitação: {solicitacao.IdSolicitacao}\n" +
                $"Aluno: {solicitacao.Aluno.Nome}\n" +
                $"Curso: {solicitacao.Curso.NomeCurso}\n" +
                $"Tipo: {solicitacao.Tipo}\n" +
                $"Status Professor: {solicitacao.StatusProfessor}\n" +
                $"Status Responsável: {solicitacao.StatusResponsavel}\n" +
                $"Status Coordenador: {solicitacao.StatusCoordenador}\n" +
                $"Data: {solicitacao.DataHora:dd/MM/yyyy HH:mm}";

            
            string conteudoUtf8 = Encoding.UTF8.GetString(
                Encoding.UTF8.GetBytes(conteudo)
            );

            using var generator = new QRCodeGenerator();
            using var qrData = generator.CreateQrCode(
                conteudoUtf8,
                QRCodeGenerator.ECCLevel.Q,
                forceUtf8: true,
                utf8BOM: false
            );
            var pngQr = new PngByteQRCode(qrData);
            byte[] pngBytes = pngQr.GetGraphic(20);

           
            string nomeArquivo = $"qrcode_{idSolicitacao}_{DateTime.Now:yyyyMMddHHmmss}.png";
            string caminhoFisico = Path.Combine(_pastaQrCode, nomeArquivo);
            await File.WriteAllBytesAsync(caminhoFisico, pngBytes);

            var registro = new QrCodeRegistro
            {
                IdAlunos = solicitacao.IdAlunos,
                IdNomeCurso = solicitacao.IdNomeCurso,
                StatusProfessor = solicitacao.StatusProfessor,
                StatusResponsavel = solicitacao.StatusResponsavel,
                StatusCoordenador = solicitacao.StatusCoordenador,
                CaminhoArquivo = $"/qrcodes/{nomeArquivo}",
                DataHora = DateTime.Now
            };

            _context.QrCodeRegistros.Add(registro);
            await _context.SaveChangesAsync();
            return registro;
        }
    }
}
