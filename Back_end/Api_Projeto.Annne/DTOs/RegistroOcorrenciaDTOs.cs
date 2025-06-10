using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.DTOs
{
    public class RegistroOcorrenciaDTOs
    {
  
    public string Tipo { get; set; } = string.Empty;
    public string Motivo { get; set; } = string.Empty;
    public DateTime DataHora { get; set; } = DateTime.Now;
    public DateTime? Encerramento { get; set; }
    public string Curso { get; set; } = string.Empty;
    public string Turma { get; set; } = string.Empty;
    public string Observacao { get; set; } = string.Empty;
}

}
