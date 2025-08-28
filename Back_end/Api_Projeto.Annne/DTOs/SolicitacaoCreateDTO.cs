using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.DTOs
{
    public class SolicitacaoCreateDTO
    {

        public int IdSolicitacao { get; set; }
        public int IdAlunos { get; set; }

        public int IdNomeCurso { get; set; }

        public string Tipo { get; set; } = "entrada";

        public string Motivo { get; set; } = "Não informado";

        public DateTime? DataHora { get; set; } = DateTime.Now;

         public TimeSpan? Retorno { get; set; }

        public string StatusProfessor { get; set; } = "pendente";

        public string StatusResponsavel { get; set; } = "pendente";

        public string StatusCoordenador { get; set; } = "pendente";
    }
}