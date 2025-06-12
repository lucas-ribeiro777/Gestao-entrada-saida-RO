using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;

        public UsuariosController(DbGestaoAnneContext context)
        {
            _context = context;
        }

        [HttpPost("Login")]
public async Task<IActionResult> VerificarUsuario([FromBody] Usuarios usuario)
{
    if (usuario == null || string.IsNullOrWhiteSpace(usuario.Email))
        return BadRequest("O e-mail é obrigatório.");

    var emailNormalized = usuario.Email.Trim().ToLower();

    var existeUsuario = await _context.Usuarios
        .AnyAsync(u => u.Email.ToLower() == emailNormalized);

    if (existeUsuario)
        return Ok(new { existe = true, mensagem = "Usuário já existe." });
    else
        return Ok(new { existe = false, mensagem = "Usuário não encontrado." });
}

    }
}