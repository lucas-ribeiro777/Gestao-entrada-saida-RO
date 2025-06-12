using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Repository;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.DTOs;
using System.Net.Mail;
using System.Net;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecuperacaoSenhaController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;
        private readonly IConfiguration _config;

        public RecuperacaoSenhaController(DbGestaoAnneContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("solicitar")]
        public async Task<IActionResult> SolicitarRecuperacao([FromBody] RecuperacaoSenhaDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email))
                return BadRequest(new { mensagem = "O campo email é obrigatório." });

            var email = dto.Email.Trim().ToLower();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            var token = Guid.NewGuid().ToString();
            var dataCriacao = DateTime.UtcNow;
            var dataExpiracao = dataCriacao.AddHours(1);

            var tokenRecuperacao = new TokenRecuperacaoSenha
            {
                Token = token,
                UsuarioId = usuario.Id,
                DataCriacao = dataCriacao,
                DataExpiracao = dataExpiracao,
                Usado = false
            };

            _context.TokensRecuperacaoSenha.Add(tokenRecuperacao);
            await _context.SaveChangesAsync();

            // Preparar envio do e-mail
            var linkRecuperacao = $"https://seusite.com/recuperar-senha?token={token}";
            var corpoEmail = $@"
                <h3>Recuperação de Senha</h3>
                <p>Olá,</p>
                <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
                <p><a href='{linkRecuperacao}'>Recuperar Senha</a></p>
                <p>Este link expira em 1 hora.</p>";

            // Ler configurações de email
            var smtpHost = _config["Email:SmtpHost"];
            var smtpPortString = _config["Email:SmtpPort"];
            var remetente = _config["Email:Remetente"];
            var senha = _config["Email:Senha"];

            if (string.IsNullOrWhiteSpace(smtpHost) ||
                string.IsNullOrWhiteSpace(smtpPortString) ||
                string.IsNullOrWhiteSpace(remetente) ||
                string.IsNullOrWhiteSpace(senha) ||
                !int.TryParse(smtpPortString, out int smtpPort))
            {
                return StatusCode(500, new { mensagem = "Configuração de e-mail inválida." });
            }

            var mailMessage = new MailMessage
            {
                From = new MailAddress(remetente),
                Subject = "Recuperação de Senha",
                Body = corpoEmail,
                IsBodyHtml = true
            };

            mailMessage.To.Add(usuario.Email);

            try
            {
                using var smtpClient = new SmtpClient(smtpHost, smtpPort)
                {
                    Credentials = new NetworkCredential(remetente, senha),
                    EnableSsl = true
                };

                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (SmtpException ex)
            {
                return StatusCode(500, new { mensagem = "Erro ao enviar e-mail: " + ex.Message });
            }

            return Ok(new { mensagem = "Token de recuperação enviado por e-mail." });
        }
    }
}
