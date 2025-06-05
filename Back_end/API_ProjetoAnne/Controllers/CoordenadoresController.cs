using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly string _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");

    public UploadController()
    {
        // Cria a pasta se ela não existir
        if (!Directory.Exists(_assinaturaPath))
            Directory.CreateDirectory(_assinaturaPath);
    }

    [HttpPost("assinatura")]
    public async Task<IActionResult> UploadAssinatura([FromForm] IFormFile assinatura)
    {
        if (assinatura == null || assinatura.Length == 0)
            return BadRequest("Arquivo de assinatura inválido.");

        var extensao = Path.GetExtension(assinatura.FileName);
        var nomeUnico = $"assinatura_{Guid.NewGuid()}{extensao}";
        var caminhoCompleto = Path.Combine(_assinaturaPath, nomeUnico);

        using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
        {
            await assinatura.CopyToAsync(stream);
        }

        var caminhoRelativo = $"/assinaturas/{nomeUnico}";

        return Ok(new { caminho = caminhoRelativo });
    }
}