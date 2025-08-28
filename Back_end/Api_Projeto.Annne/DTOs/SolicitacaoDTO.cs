using System;

namespace Api_Projeto.Annne.DTOs
{
    public class SolicitacaoDTO
    {
        public int IdSolicitacao { get; set; }
        public int IdAlunos { get; set; }
        public int IdNomeCurso { get; set; }

        public string Tipo { get; set; } = "entrada";
        public string Motivo { get; set; } = "Não informado";
        public DateTime? DataHora { get; set; }
        public TimeSpan? Retorno { get; set; }

        public string StatusProfessor { get; set; } = "pendente";
        public string StatusResponsavel { get; set; } = "pendente";
        public string StatusCoordenador { get; set; } = "pendente";
    }
}
