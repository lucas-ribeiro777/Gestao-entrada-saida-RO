using System.Net.Mail;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class usuariosController : ControllerBase
    {
        
         private readonly DbGestaoAnneContext _context;

        public usuariosController(DbGestaoAnneContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuarios usuario)
        {
            if (usuario == null)
                return BadRequest("Dados de login não fornecidos");

            if (string.IsNullOrEmpty(usuario.Email))
                return BadRequest("O e-mail não pode ser nulo ou vazio");

            try
            {
                var email = new MailAddress(usuario.Email);
            }
            catch (FormatException)
            {
                return BadRequest("Email inválido");
            }

            // Busca no banco de dados na tabela Usuario agora
            var usuarioEncontrado = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == usuario.Email && u.Senha == usuario.Senha);

            if (usuarioEncontrado == null)
            {
                return Unauthorized(new { mensagem = "Email ou senha incorretos" });
            }

            return Ok(new
            {
                mensagem = "Login realizado com sucesso",
                usuarioEncontrado.Id,
                usuarioEncontrado.Email
            });
        }
    }
}
    
