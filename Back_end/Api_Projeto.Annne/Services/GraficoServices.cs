using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.DTOs;

namespace Api_Projeto.Annne.Services
{
    public class GraficoService
    {
        private readonly GestaoAnneContext _context;

        public GraficoService(GestaoAnneContext context)
        {
            _context = context;
        }

        // Retorna todos os gráficos
        public async Task<List<Grafico>> GetTodosAsync() =>
            await _context.Graficos.ToListAsync();

        // Retorna gráficos de um curso específico
        public async Task<List<Grafico>> GetPorCursoAsync(int idCurso) =>
            await _context.Graficos
                          .Where(g => g.IdNomeCurso == idCurso)
                          .ToListAsync();

        // Cria um novo gráfico
        public async Task<Grafico> CriarGraficoAsync(Grafico grafico)
        {
            _context.Graficos.Add(grafico);
            await _context.SaveChangesAsync();
            return grafico;
        }

        // Salva resumo de horários e motivos para um curso
        public async Task<GraficoResumoDto> SalvarResumoDadosAsync(int idCurso)
        {
            var horariosFrequentes = _context.Solicitacoes
                .Where(s => s.IdNomeCurso == idCurso)
                .AsEnumerable()
                .GroupBy(s => new TimeSpan(s.DataHora.Hour, 0, 0))
                .Select(g => new HorarioResumoDto
                {
                    Hora = g.Key,
                    Quantidade = g.Count()
                })
                .OrderByDescending(h => h.Quantidade)
                .Take(4)
                .ToList();

            var motivosFrequentes = _context.Solicitacoes
                .Where(s => s.IdNomeCurso == idCurso && !string.IsNullOrEmpty(s.Motivo))
                .GroupBy(s => s.Motivo)
                .Select(g => new MotivoResumoDto
                {
                    Motivo = g.Key,
                    Quantidade = g.Count()
                })
                .OrderByDescending(m => m.Quantidade)
                .Take(4)
                .ToList();

            return new GraficoResumoDto
            {
                Horarios = horariosFrequentes,
                Motivos = motivosFrequentes
            };
        }

        // Retorna resumo de todos os cursos
        public async Task<List<GraficoCursoResumoDto>> GetResumoTodosCursosAsync()
        {
            var cursos = await _context.Cursos.ToListAsync();
            var listaResumo = new List<GraficoCursoResumoDto>();

            foreach (var curso in cursos)
            {
                var resumo = await SalvarResumoDadosAsync(curso.IdNomeCurso);

                var dto = new GraficoCursoResumoDto
                {
                    IdCurso = curso.IdNomeCurso,
                    NomeCurso = curso.NomeCurso,
                    Codigo = curso.Codigo,
                    Periodo = curso.Periodo,
                    DiasDeAula = curso.DiasDeAula,
                    HorariosMaisFrequentes = resumo.Horarios,
                    MotivosMaisFrequentes = resumo.Motivos
                };

                listaResumo.Add(dto);
            }

            return listaResumo;
        }

        // Busca curso por ID
        public async Task<Curso> GetCursoByIdAsync(int idCurso)
        {
            return await _context.Cursos
                .FirstOrDefaultAsync(c => c.IdNomeCurso == idCurso);
        }
    }
}
