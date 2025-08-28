using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly GestaoAnneContext _context;

        public UsuariosController(GestaoAnneContext context)
        {
            _context = context;
        }

      [HttpPost("Login")]
public async Task<IActionResult> Login([FromBody] Usuarios usuario)
{
    if (usuario == null || string.IsNullOrWhiteSpace(usuario.Email) || string.IsNullOrWhiteSpace(usuario.Senha))
        return BadRequest(new { mensagem = "E-mail e senha são obrigatórios." });

    var emailInput = usuario.Email.Trim().ToLower();
    var senhaInput = usuario.Senha;

   
    var aluno = await _context.Alunos
        .Select(a => new
        {
            Id = a.IdAlunos,
            Nome = a.Nome ?? "",
            Email = a.Email ?? "",
            Senha = a.Senha ?? ""
        })
        .FirstOrDefaultAsync(a => a.Email.ToLower() == emailInput);

    if (aluno != null && !string.IsNullOrEmpty(aluno.Senha) && BCrypt.Net.BCrypt.Verify(senhaInput, aluno.Senha))
        return Ok(new LoginResponseDTO { Id = aluno.Id, Tipo = "Aluno", Nome = aluno.Nome });

    var responsavel = await _context.Responsaveis
        .Select(r => new
        {
            Id = r.Id,
            Nome = r.Nome ?? "",
            Email = r.Email ?? "",
            Senha = r.Senha ?? ""
        })
        .FirstOrDefaultAsync(r => r.Email.ToLower() == emailInput);

    if (responsavel != null && !string.IsNullOrEmpty(responsavel.Senha) && BCrypt.Net.BCrypt.Verify(senhaInput, responsavel.Senha))
        return Ok(new LoginResponseDTO { Id = responsavel.Id, Tipo = "Responsavel", Nome = responsavel.Nome });

    
    var professor = await _context.Professores
        .Select(p => new
        {
            Id = p.Id,
            Nome = p.Nome ?? "",
            Email = p.Email ?? "",
            Senha = p.Senha ?? ""
        })
        .FirstOrDefaultAsync(p => p.Email.ToLower() == emailInput);

    if (professor != null && !string.IsNullOrEmpty(professor.Senha) && BCrypt.Net.BCrypt.Verify(senhaInput, professor.Senha))
        return Ok(new LoginResponseDTO { Id = professor.Id, Tipo = "Professor", Nome = professor.Nome });


    var coordenador = await _context.Coordenadores
        .Select(c => new
        {
            Id = c.Id,
            Nome = c.Nome ?? "",
            Email = c.Email ?? "",
            Senha = c.Senha ?? ""
        })
        .FirstOrDefaultAsync(c => c.Email.ToLower() == emailInput);

    if (coordenador != null && !string.IsNullOrEmpty(coordenador.Senha) && BCrypt.Net.BCrypt.Verify(senhaInput, coordenador.Senha))
        return Ok(new LoginResponseDTO { Id = coordenador.Id, Tipo = "Coordenador", Nome = coordenador.Nome });

    
    return NotFound(new { mensagem = "Usuário não encontrado ou senha incorreta." });
}

    }
}

