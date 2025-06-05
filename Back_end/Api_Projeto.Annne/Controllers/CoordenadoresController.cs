using Microsoft.AspNetCore.Mvc;
using Api_Projeto.Annne.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoordenadoresController : ControllerBase
    {
        private readonly string _assinaturaPath;

        public CoordenadoresController()
        {
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

            // Garante que a pasta de assinaturas existe
            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

        [HttpPost("criar")]
        public async Task<IActionResult> CriarCoordenador([FromForm] CoordenadorUploadAssinaturaDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Verifica se a assinatura foi enviada
            if (dto.Assinatura == null || dto.Assinatura.Length == 0)
                return BadRequest("Arquivo de assinatura inválido.");

            // Gera nome único para a imagem da assinatura
            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            var nomeUnico = $"assinatura_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturaPath, nomeUnico);

            // Salva o arquivo da assinatura no disco
            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Assinatura.CopyToAsync(stream);
            }

            var caminhoRelativo = $"/assinaturas/{nomeUnico}";

            // Criptografa a senha usando SHA256
            string senhaCriptografada = GerarHashSHA256(dto.Senha);

            // TODO: Criar e salvar o objeto Coordenador no banco de dados
            /*
            var coordenador = new Coordenador
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,  // <-- adicionado telefone
                Senha = senhaCriptografada,
                CaminhoAssinatura = caminhoRelativo
            };

            _context.Coordenadores.Add(coordenador);
            await _context.SaveChangesAsync();
            */

            return Ok(new
            {
                mensagem = "Coordenador criado com sucesso!",
                dados = new
                {
                    dto.Nome,
                    dto.Email,
                    dto.Telefone,  // <-- incluído no retorno
                    SenhaCriptografada = senhaCriptografada,
                    AssinaturaUrl = caminhoRelativo
                }
            });
        }

        private static string GerarHashSHA256(string input)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(input);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }
    }
}
