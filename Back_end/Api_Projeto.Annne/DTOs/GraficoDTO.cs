namespace Api_Projeto.Annne.DTOs
{
    public class GraficoDTO
    {
        public int Id { get; set; }
        public int IdNomeCurso { get; set; }
        public string Hora { get; set; } = string.Empty;
        public string Motivo { get; set; } = string.Empty;
    }

    public class HorarioResumoDto
    {
        public TimeSpan Hora { get; set; }
        public int Quantidade { get; set; }
    }

    public class MotivoResumoDto
    {
        public string Motivo { get; set; } = string.Empty;
        public int Quantidade { get; set; }
    }

    public class GraficoResumoDto
    {
        public List<HorarioResumoDto> Horarios { get; set; } = new();
        public List<MotivoResumoDto> Motivos { get; set; } = new();
    }

    public class GraficoCursoResumoDto
    {
        public int IdCurso { get; set; }
        public string NomeCurso { get; set; } = string.Empty;
        public string Codigo { get; set; } = string.Empty;
        public string Periodo { get; set; } = string.Empty;
        public string DiasDeAula { get; set; } = string.Empty;

        public IEnumerable<object> HorariosMaisFrequentes { get; set; } = new List<object>();
        public IEnumerable<object> MotivosMaisFrequentes { get; set; } = new List<object>();
    }
}
