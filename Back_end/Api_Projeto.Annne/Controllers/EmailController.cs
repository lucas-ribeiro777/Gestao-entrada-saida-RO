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
<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <title>Recuperação de Senha - SENAI</title>
    <style>
        body, p, h2, span {{
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }}
        body {{
            background-color: #f4f6f9;
            color: #333333;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }}
        .container {{
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 14px;
            padding: 40px 35px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }}
        .logo {{
            text-align: center;
            margin-bottom: 35px;
        }}
        .logo img {{
            max-width: 180px;
            height: auto;
            display: inline-block;
        }}
        h2.titulo {{
            color: #004a99;
            font-weight: 700;
            font-size: 28px;
            text-align: center;
            margin-bottom: 30px;
            letter-spacing: 1px;
        }}
        p.mensagem {{
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #444444;
        }}
        .token-box {{
            background: linear-gradient(135deg, #0056A6);
            color: #ffffff;
            font-size: 36px;
            font-weight: 900;
            letter-spacing: 6px;
            padding: 22px 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 6px 20px rgba(0, 86, 166, 0.5);
            user-select: all;
            margin: 40px auto;
            width: fit-content;
        }}
        .expira {{
            font-size: 15px;
            color: #666666;
            text-align: center;
            margin-bottom: 40px;
        }}
        .expira strong {{
            color: #0056A6; 
        }}
        .footer {{
            border-top: 1px solid #e0e0e0;
            padding-top: 25px;
            font-size: 13px;
            color: #999999;
            text-align: center;
            line-height: 1.4;
        }}
        .footer a {{
            color: #0056A6;
            text-decoration: none;
            margin: 0 8px;
            font-weight: 500;
        }}
        .footer a:hover {{
            text-decoration: underline;
        }}
        @media screen and (max-width: 640px) {{
            .container {{
                margin: 20px 15px;
                padding: 30px 20px;
            }}
            .token-box {{
                font-size: 28px;
                padding: 18px 30px;
                letter-spacing: 4px;
            }}
            h2.titulo {{
                font-size: 24px;
            }}
        }}
    </style>
</head>
<body>
    <div class='container'>

        <!-- Logo -->
        <div class='logo'>
            <img 
                src='https://www.imagemhost.com.br/images/2025/04/14/Logo-novo-SENAI_-sem-slogan_755X325.png' 
                alt='Logo SENAI' 
                border='0' 
            />
        </div>

        <!-- Título -->
        <h2 class='titulo'>Recuperação de Senha</h2>

        <!-- Mensagem inicial -->
        <p class='mensagem'>Olá,</p>
        <p class='mensagem'>
            Recebemos sua solicitação de redefinição de senha. Utilize o código abaixo para confirmar a alteração:
        </p>

        <!-- Token -->
        <div class='token-box' title='Código de recuperação'>
            {token}
        </div>

        <!-- Mensagem de expiração -->
        <p class='expira'>
            Este código expira em <strong>{_tokenExpiracao.TotalMinutes} minutos</strong>.<br/>
            Caso não tenha solicitado essa recuperação, por favor ignore esta mensagem.
        </p>

        <!-- Rodapé -->
        <div class='footer'>
            <p>© {DateTime.Now.Year} SENAI - Serviço Nacional de Aprendizagem Industrial</p>
            <p>
                <a href='https://sp.senai.br/unidade/lencoispaulista/' target='_blank' rel='noopener noreferrer'>Site Oficial</a> |
                <a href='https://www.google.com/search?q=senai+len%C3%A7%C3%B3is+paulista+telefone' target='_blank' rel='noopener noreferrer'>Contato</a> |
                <a href='https://www.sp.senai.br/termos-de-uso-e-politica-de-privacidade' target='_blank' rel='noopener noreferrer'>Política de Privacidade</a>
            </p>
        </div>

    </div>
</body>
</html>
";

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
