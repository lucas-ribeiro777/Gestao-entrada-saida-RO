using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Api_Projeto.Annne.DTOs;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Repository; // para DbGestaoAnneContext
using System;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoordenadoresController : ControllerBase
    {
        private readonly DbGestaoAnneContext _context;
        private readonly IPasswordHasher<Coordenador> _passwordHasher;
        private readonly string _assinaturaPath;

        public CoordenadoresController(DbGestaoAnneContext context, IPasswordHasher<Coordenador> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;

            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        [HttpPost("criar")]
        public async Task<IActionResult> CriarCoordenador([FromForm] CoordenadorUploadAssinaturaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Assinatura == null || dto.Assinatura.Length == 0)
                return BadRequest("Arquivo de assinatura inválido.");

            var extensao = Path.GetExtension(dto.Assinatura.FileName).ToLowerInvariant();
            var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
            if (!extensoesPermitidas.Contains(extensao))
                return BadRequest("Formato de arquivo não permitido. Use jpg ou png.");

            var nomeUnico = $"assinatura_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturaPath, nomeUnico);

            try
            {
                using var stream = new FileStream(caminhoCompleto, FileMode.Create);
                await dto.Assinatura.CopyToAsync(stream);
            }
            catch
            {
                return StatusCode(500, "Erro ao salvar o arquivo da assinatura.");
            }

            var caminhoRelativo = $"/assinaturas/{nomeUnico}";

            var coordenador = new Coordenador
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Assinatura = caminhoRelativo
            };

            coordenador.Senha = _passwordHasher.HashPassword(coordenador, dto.Senha);

            try
            {
                _context.Coordenadores.Add(coordenador);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (System.IO.File.Exists(caminhoCompleto))
                    System.IO.File.Delete(caminhoCompleto);

                var mensagemErro = ex.Message;
                if (ex.InnerException != null)
                    mensagemErro += " | Inner Exception: " + ex.InnerException.Message;

                return StatusCode(500, new
                {
                    mensagem = "Erro ao salvar o coordenador no banco de dados.",
                    erro = mensagemErro,
                    stackTrace = ex.StackTrace
                });
            }

            return Ok(new
            {
                mensagem = "Coordenador criado com sucesso!",
                dados = new
                {
                    coordenador.Id,
                    coordenador.Nome,
                    coordenador.Email,
                    coordenador.Telefone,
                    AssinaturaUrl = caminhoRelativo
                }
            });
        }
    }
}
