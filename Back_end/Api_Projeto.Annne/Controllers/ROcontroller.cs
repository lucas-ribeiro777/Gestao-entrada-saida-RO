using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Api_Projeto.Annne.Models;

namespace Api_Projeto.Annne.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ROController : ControllerBase
    {
        private static List<RegistroOcorrencia> _ocorrencias = new();
        private static int _nextId = 1;

       
        // Professor registra uma nova ocorrência.
        [HttpPost]
        public IActionResult Registrar([FromBody] RegistroOcorrencia nova)
        {
            nova.Id = _nextId++;
            nova.DataHora = DateTime.Now;
            _ocorrencias.Add(nova);
            return CreatedAtAction(nameof(ObterPorAluno), new { alunoId = nova.AlunoId }, nova);
        }

        
        // Coordenador vê o histórico de todas as ocorrências.
        [HttpGet]
        public IActionResult ObterTodos()
        {
            return Ok(_ocorrencias.OrderByDescending(o => o.DataHora));
        }

        
        // Responsável vê as ocorrências do filho por ID do aluno.
        [HttpGet("aluno/{alunoId}")]
        public IActionResult ObterPorAluno(int alunoId)
        {
            var ocorrencias = _ocorrencias
                .Where(o => o.AlunoId == alunoId)
                .OrderByDescending(o => o.DataHora)
                .ToList();

            if (!ocorrencias.Any())
                return NotFound("Nenhuma ocorrência encontrada para esse aluno.");

            return Ok(ocorrencias);
        }
    }
}
