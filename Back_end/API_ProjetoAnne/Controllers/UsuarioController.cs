using Microsoft.AspNetCore.Mvc;
using ProjetoAPI.Models;

namespace ProjetoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private static List<Usuario> _usuarios = new();
        private static int _nextId = 1;

    
        /// Cadastrar novo usuário (aluno, responsável, professor, coordenador).
        [HttpPost]
        public IActionResult Cadastrar([FromBody] Usuario novo)
        {
            novo.Id = _nextId++;
            _usuarios.Add(novo);
            return CreatedAtAction(nameof(ConsultarAluno), new { id = novo.Id }, novo);
        }

       
        // Consultar um aluno específico pelo ID.
        
        [HttpGet("aluno/{id}")]
        public IActionResult ConsultarAluno(int id)
        {
            var aluno = _usuarios.FirstOrDefault(u => u.Id == id && u.Tipo == "Aluno");
            if (aluno == null)
                return NotFound("Aluno não encontrado.");
            return Ok(aluno);
        }

        
        // Listar todos os alunos cadastrados.
        
        [HttpGet("alunos")]
        public IActionResult ListarAlunos()
        {
            var alunos = _usuarios.Where(u => u.Tipo == "Aluno").ToList();
            return Ok(alunos);
        }
    }
}
