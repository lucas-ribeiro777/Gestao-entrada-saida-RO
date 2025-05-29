using Microsoft.AspNetCore.Mvc;
using GestaoResponsaveisAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace GestaoResponsaveisAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ResponsaveisController : ControllerBase
    {
        // Simula banco de dados em memória
        private static readonly List<Responsavel> responsaveis = new List<Responsavel>();
        private static readonly List<Aluno> alunos = new List<Aluno>
        {
            new Aluno { Id = 1, Nome = "João Silva" },
            new Aluno { Id = 2, Nome = "Maria Oliveira" }
        };

        [HttpPost]
        public IActionResult CadastrarResponsavel([FromBody] ResponsavelCreateDTO dto)
        {
            var responsavel = new Responsavel
            {
                Id = responsaveis.Count + 1,
                Nome = dto.Nome,
                Telefone = dto.Telefone
            };

            responsaveis.Add(responsavel);
            return CreatedAtAction(nameof(ConsultarResponsaveis), new { id = responsavel.Id }, responsavel);
        }

        [HttpPut("{id}/aluno/{alunoId}")]
        public IActionResult RelacionarResponsavelAluno(int id, int alunoId)
        {
            var responsavel = responsaveis.FirstOrDefault(r => r.Id == id);
            if (responsavel == null)
                return NotFound("Responsável não encontrado.");

            var aluno = alunos.FirstOrDefault(a => a.Id == alunoId);
            if (aluno == null)
                return NotFound("Aluno não encontrado.");

            if (!responsavel.AlunosIds.Contains(alunoId))
                responsavel.AlunosIds.Add(alunoId);

            return Ok(responsavel);
        }

        [HttpGet]
        public IActionResult ConsultarResponsaveis()
        {
            return Ok(responsaveis);
        }
    }
}
