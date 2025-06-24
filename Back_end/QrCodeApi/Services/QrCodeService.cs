using Api.Models;
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using QRCoder;
using Microsoft.AspNetCore.Hosting;

namespace Api.Services
{
    public class QrCodeService
    {
        private readonly IWebHostEnvironment _env;

       public QrCodeService(IWebHostEnvironment env)
{
    _env = env;
}

        public string GerarQRCode(string conteudo, string nomeArquivo)
        {
            if (string.IsNullOrEmpty(_env.WebRootPath))
            {
                throw new DirectoryNotFoundException("WebRootPath não está configurado.");
            }

            if (string.IsNullOrEmpty(nomeArquivo))
            {
                throw new ArgumentException("Nome do arquivo não pode ser vazio.");
            }

            // cria a pasta wwwroot caso não exista
            if (!Directory.Exists(_env.WebRootPath))
            {
                Directory.CreateDirectory(_env.WebRootPath);
            }

            string pasta = Path.Combine(_env.WebRootPath, "qrcodes");

            // cria a pasta qrcodes caso não exista
            if (!Directory.Exists(pasta))
            {
                Directory.CreateDirectory(pasta);
            }

            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(conteudo, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);

            using Bitmap qrCodeImage = qrCode.GetGraphic(20);

            string caminhoCompleto = Path.Combine(pasta, nomeArquivo + ".png");
            qrCodeImage.Save(caminhoCompleto, ImageFormat.Png);

            return $"/qrcodes/{nomeArquivo}.png";
        }
    }
}
