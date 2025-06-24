using Microsoft.AspNetCore.Mvc;
using inicialresponsavel.Models;

namespace inicialresponsavel.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlunosController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAlunos()
        {
            var alunos = new List<Aluno>
            {
                new Aluno {
                    Id = 1,
                    Nome = "Pedro Rocha Carvalho",
                    Curso1 = "Banco de Dados",
                    Curso2 = "Lógica de Programação",
                    FotoUrl = "https://exemplo.com/foto-pedro.jpg"
                },
                new Aluno {
                    Id = 2,
                    Nome = "Bruna Rocha Carvalho",
                    Curso1 = "Técnico em Administração",
                    Curso2 = "",
                    FotoUrl = "https://exemplo.com/foto-bruna.jpg"
                }
            };

            return Ok(alunos);
        }
    }
}
