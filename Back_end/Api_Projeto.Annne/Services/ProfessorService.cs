using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.DTOs;

namespace Api_Projeto.Annne.Services
{
    public class ProfessorService
    {
        private readonly GestaoAnneContext _context;
        private readonly string _assinaturaPath;

        public ProfessorService(GestaoAnneContext context)
        {
            _context = context;
            _assinaturaPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "assinaturas");
            if (!Directory.Exists(_assinaturaPath))
                Directory.CreateDirectory(_assinaturaPath);
        }

       
        public async Task<ProfessorDTO> CriarProfessorAsync(ProfessorUploadDTO dto)
        {
            var professor = new Professor
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Telefone = dto.Telefone,
                Senha = BCrypt.Net.BCrypt.HashPassword(dto.Senha),
                Assinatura = null
            };

            _context.Professores.Add(professor);
            await _context.SaveChangesAsync();

           
            foreach (var cursoId in dto.CursosIds)
            {
                var curso = await _context.Cursos.FindAsync(cursoId);
                if (curso == null)
                    throw new Exception($"Curso com ID '{cursoId}' não encontrado.");

                _context.ProfessorCursos.Add(new ProfessorCursos
                {
                    IdProfessor = professor.Id,
                    IdNomeCurso = curso.IdNomeCurso
                });
            }

            await _context.SaveChangesAsync();
            return MapToDTO(professor);
        }

        
        public async Task<string> AdicionarAssinaturaAsync(int professorId, UploadAssinaturaDTO dto)
        {
            var professor = await _context.Professores.FindAsync(professorId);
            if (professor == null)
                throw new Exception("Professor não encontrado.");

            var extensao = Path.GetExtension(dto.Assinatura.FileName);
            var nomeArquivo = $"assinatura_professor_{Guid.NewGuid()}{extensao}";
            var caminhoCompleto = Path.Combine(_assinaturaPath, nomeArquivo);

            using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
            {
                await dto.Assinatura.CopyToAsync(stream);
            }

            professor.Assinatura = $"/assinaturas/{nomeArquivo}";
            await _context.SaveChangesAsync();
            return professor.Assinatura;
        }

       
        public async Task<ProfessorDTO?> ObterProfessorPorIdAsync(int id)
        {
            var professor = await _context.Professores
                .Include(p => p.ProfessorCursos)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (professor == null) return null;
            return MapToDTO(professor);
        }

     
        public async Task<List<ProfessorDTO>> ObterTodosProfessoresAsync()
        {
            var professores = await _context.Professores
                .Include(p => p.ProfessorCursos)
                .ToListAsync();

            return professores.Select(MapToDTO).ToList();
        }

      
        private ProfessorDTO MapToDTO(Professor p)
                {
                        return new ProfessorDTO
                        {
                            IdProfessor = p.Id,
                            Nome = p.Nome,
                            Email = p.Email,
                            Telefone = p.Telefone,
                            Assinatura = p.Assinatura,
                            CursosIds = p.ProfessorCursos?
                                .Where(pc => pc != null) 
                                .Select(pc => pc.IdNomeCurso) 
                                .ToList() 
                                ?? new List<int>()
                        };
                }
     }
}

