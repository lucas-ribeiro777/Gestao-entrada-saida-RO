using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Api_Projeto.Annne.Data;
using Api_Projeto.Annne.Models;
using Api_Projeto.Annne.DTOs;

namespace Api_Projeto.Annne.Services
{
    public class SolicitacaoService
    {
        private readonly GestaoAnneContext _context;

        public SolicitacaoService(GestaoAnneContext context)
        {
            _context = context;
        }

       
        public async Task<SolicitacaoDTO> CriarSolicitacaoAsync(SolicitacaoCreateDTO solicitacao)
        {
            // pega o aluno vinculado
            var aluno = await _context.Alunos.FindAsync(solicitacao.IdAlunos);
            if (aluno == null)
                throw new Exception("Aluno não encontrado.");

           
            var idade = DateTime.Today.Year - aluno.DataNascimento.Year;
            if (aluno.DataNascimento.Date > DateTime.Today.AddYears(-idade))
                idade--; 

           
            var statusResponsavel = solicitacao.StatusResponsavel ?? "pendente";
            if (idade >= 18)
                statusResponsavel = "sim";

            var novaSolicitacao = new Solicitacao
            {
                IdAlunos = solicitacao.IdAlunos,
                IdNomeCurso = solicitacao.IdNomeCurso,
                Tipo = solicitacao.Tipo,
                Motivo = solicitacao.Motivo,
                DataHora = solicitacao.DataHora ?? DateTime.Now,
                Retorno = solicitacao.Retorno,
                StatusProfessor = solicitacao.StatusProfessor ?? "pendente",
                StatusResponsavel = statusResponsavel,
                StatusCoordenador = solicitacao.StatusCoordenador ?? "pendente"
            };

            _context.Solicitacoes.Add(novaSolicitacao);
            await _context.SaveChangesAsync();

            return MapToDTO(novaSolicitacao);
        }

      
        public async Task<SolicitacaoDTO> AtualizarStatusAsync(
            int idSolicitacao,
            string? statusProfessor = null,
            string? statusResponsavel = null,
            string? statusCoordenador = null)
        {
            var solicitacao = await _context.Solicitacoes
                .Include(s => s.Aluno)
                .Include(s => s.Curso)
                .FirstOrDefaultAsync(s => s.IdSolicitacao == idSolicitacao);

            if (solicitacao == null)
                throw new Exception("Solicitação não encontrada.");

            if (!string.IsNullOrWhiteSpace(statusProfessor))
                solicitacao.StatusProfessor = statusProfessor;

            if (!string.IsNullOrWhiteSpace(statusResponsavel))
            {
               
                var idade = DateTime.Today.Year - solicitacao.Aluno.DataNascimento.Year;
                if (solicitacao.Aluno.DataNascimento.Date > DateTime.Today.AddYears(-idade))
                    idade--;

                if (idade >= 18)
                    solicitacao.StatusResponsavel = "sim";
                else
                    solicitacao.StatusResponsavel = statusResponsavel;
            }

            if (!string.IsNullOrWhiteSpace(statusCoordenador))
                solicitacao.StatusCoordenador = statusCoordenador;

            _context.Solicitacoes.Update(solicitacao);
            await _context.SaveChangesAsync();

            return MapToDTO(solicitacao);
        }

        public async Task<IEnumerable<SolicitacaoDTO>> GetPorPeriodoAsync(int dias)
        {
            var dataLimite = DateTime.Now.AddDays(-dias);

            var solicitacoes = await _context.Solicitacoes
                .Include(s => s.Aluno)
                .Include(s => s.Curso)
                .Where(s => s.DataHora >= dataLimite)
                .ToListAsync();

            return solicitacoes.Select(MapToDTO).ToList();
        }

        public async Task<IEnumerable<SolicitacaoDTO>> GetPorAlunoAsync(int idAluno)
        {
            var solicitacoes = await _context.Solicitacoes
                .Include(s => s.Aluno)
                .Include(s => s.Curso)
                .Where(s => s.IdAlunos == idAluno)
                .ToListAsync();

            return solicitacoes.Select(MapToDTO).ToList();
        }

        private SolicitacaoDTO MapToDTO(Solicitacao s)
        {
            return new SolicitacaoDTO
            {
                IdSolicitacao = s.IdSolicitacao,
                IdAlunos = s.IdAlunos,
                IdNomeCurso = s.IdNomeCurso,
                Tipo = s.Tipo,
                Motivo = s.Motivo,
                DataHora = s.DataHora,
                Retorno = s.Retorno,
                StatusProfessor = s.StatusProfessor ?? "pendente",
                StatusResponsavel = s.StatusResponsavel ?? "pendente",
                StatusCoordenador = s.StatusCoordenador ?? "pendente"
            };
        }
    }
}
