using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Models
{
    [Table("solicitacao")]
     public class Solicitacoes
    {
        public int Id { get; set; }
        public string AlunoNome { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
        public string Tipo { get; set; } = "Saída"; // ou "Entrada"
        public string Motivo { get; set; } = string.Empty;
        public string Status { get; set; } = "Pendente"; // Pendente, Aprovada, Recusada
    }
}
    
