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

                public async Task<List<Grafico>> GetTodosAsync() =>
            await _context.Graficos.ToListAsync();

        
        public async Task<List<Grafico>> GetPorCursoAsync(int idCurso) =>
            await _context.Graficos
                          .Where(g => g.IdNomeCurso == idCurso)
                          .ToListAsync();

       
        public async Task<Grafico> CriarGraficoAsync(Grafico grafico)
        {
            _context.Graficos.Add(grafico);
            await _context.SaveChangesAsync();
            return grafico;
        }

       
        public async Task<GraficoResumoDto> SalvarResumoDadosAsync(int idCurso)
        {
            var horariosFrequentes = _context.QrCodeRegistros
                .Where(q => q.IdNomeCurso == idCurso)
                .AsEnumerable()
                .GroupBy(q => new TimeSpan(q.DataHora.Hour, 0, 0))
                .Select(g => new { Hora = g.Key, Quantidade = g.Count() })
                .OrderByDescending(g => g.Quantidade)
                .Take(4)
                .ToList();

            var motivosFrequentes = await _context.Solicitacoes
                .Where(s => s.IdNomeCurso == idCurso && !string.IsNullOrEmpty(s.Motivo))
                .GroupBy(s => s.Motivo)
                .Select(g => new { Motivo = g.Key, Quantidade = g.Count() })
                .OrderByDescending(g => g.Quantidade)
                .Take(4)
                .ToListAsync();

            return new GraficoResumoDto
            {
                Horarios = horariosFrequentes
                    .Select(h => new HorarioResumoDto
                    {
                        Hora = h.Hora,
                        Quantidade = h.Quantidade
                    }).ToList(),

                Motivos = motivosFrequentes
                    .Select(m => new MotivoResumoDto
                    {
                        Motivo = m.Motivo,
                        Quantidade = m.Quantidade
                    }).ToList()
            };
        }

        
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
                    HorariosMaisFrequentes = resumo.Horarios.Select(h => new
                    {
                        hora = h.Hora.ToString(@"hh\:mm"),
                        quantidade = h.Quantidade
                    }),
                    MotivosMaisFrequentes = resumo.Motivos.Select(m => new
                    {
                        motivo = m.Motivo,
                        quantidade = m.Quantidade
                    })
                };

                listaResumo.Add(dto);
            }

            return listaResumo;
        }

        
        public async Task<Curso> GetCursoByIdAsync(int idCurso)
        {
            return await _context.Cursos
                .FirstOrDefaultAsync(c => c.IdNomeCurso == idCurso);
        }
    }
}
