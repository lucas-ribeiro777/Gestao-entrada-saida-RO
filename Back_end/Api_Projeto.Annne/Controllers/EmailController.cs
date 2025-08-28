using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmailController : ControllerBase
    {
        private readonly GestaoAnneContext _context;
        private readonly IEmailService _emailService;
        private readonly IMemoryCache _memoryCache;
        private readonly TimeSpan _tokenExpiracao = TimeSpan.FromHours(1);

        public EmailController(GestaoAnneContext context, IEmailService emailService, IMemoryCache memoryCache)
        {
            _context = context;
            _emailService = emailService;
            _memoryCache = memoryCache;
        }

        private static string GerarTokenNumerico6Digitos()
        {
            using var rng = RandomNumberGenerator.Create();
            byte[] bytes = new byte[4];
            rng.GetBytes(bytes);
            int token = Math.Abs(BitConverter.ToInt32(bytes, 0)) % 900000 + 100000;
            return token.ToString();
        }

        private async Task<object?> BuscarUsuarioPorEmail(string email)
        {
            var emailLower = email.ToLower();
            var aluno = await _context.Alunos.FirstOrDefaultAsync(u => u.Email.ToLower() == emailLower);
            if (aluno != null) return aluno;

            var responsavel = await _context.Responsaveis.FirstOrDefaultAsync(u => u.Email.ToLower() == emailLower);
            if (responsavel != null) return responsavel;

            var professor = await _context.Professores.FirstOrDefaultAsync(u => u.Email.ToLower() == emailLower);
            if (professor != null) return professor;

            var coordenador = await _context.Coordenadores.FirstOrDefaultAsync(u => u.Email.ToLower() == emailLower);
            if (coordenador != null) return coordenador;

            return null;
        }

        private bool ValidarSenha(string senha) =>
            !string.IsNullOrWhiteSpace(senha) && senha.Length >= 6;

        [HttpPost("solicitar-recuperacao-senha")]
        public async Task<IActionResult> SolicitarRecuperacaoSenha([FromBody] SolicitarResetSenhaDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.NovaSenha) || string.IsNullOrWhiteSpace(dto.ConfirmarSenha))
                return BadRequest("E-mail, nova senha e confirmação de senha são obrigatórios.");

            if (dto.NovaSenha.Trim() != dto.ConfirmarSenha.Trim())
                return BadRequest("A nova senha e a confirmação não coincidem.");

            if (!ValidarSenha(dto.NovaSenha.Trim()))
                return BadRequest("Senha inválida. A senha deve ter pelo menos 6 caracteres.");

            var email = dto.Email.Trim().ToLower();
            var usuario = await BuscarUsuarioPorEmail(email);
            if (usuario == null)
                return NotFound("Usuário não encontrado com esse e-mail.");

            var token = GerarTokenNumerico6Digitos();
            while (_memoryCache.TryGetValue(token, out _)) token = GerarTokenNumerico6Digitos();

            var senhaHash = BCrypt.Net.BCrypt.HashPassword(dto.NovaSenha.Trim());
            _memoryCache.Set(token, (email, senhaHash), _tokenExpiracao);

            var corpoEmail = $@"
                <p>Olá,</p>
                <p>Você solicitou a redefinição de senha. Use o código abaixo para confirmar a troca:</p>
                <h2>{token}</h2>
                <p>Esse código expira em {_tokenExpiracao.TotalMinutes} minutos.</p>";

            try
            {
                await _emailService.EnviarEmailAsync(email, "Recuperação de Senha", corpoEmail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Falha ao enviar o e-mail: {ex.Message}");
            }

            return Ok("E-mail com token enviado com sucesso. Use o código para confirmar a troca.");
        }

        [HttpPost("confirmar-token")]
        public async Task<IActionResult> ConfirmarToken([FromBody] ValidarTokenDTO dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Token))
                return BadRequest("Token é obrigatório.");

            var token = dto.Token.Trim();
            if (!_memoryCache.TryGetValue(token, out (string email, string senhaHash) dados))
                return BadRequest("Token inválido ou expirado.");

            var usuario = await BuscarUsuarioPorEmail(dados.email);
            if (usuario == null) return NotFound("Usuário não encontrado.");

            switch (usuario)
            {
                case Aluno a: a.Senha = dados.senhaHash; break;
                case Responsavel r: r.Senha = dados.senhaHash; break;
                case Professor p: p.Senha = dados.senhaHash; break;
                case Coordenador c: c.Senha = dados.senhaHash; break;
            }

            await _context.SaveChangesAsync();
            _memoryCache.Remove(token);

            return Ok("Senha redefinida com sucesso.");
        }
    }
}
