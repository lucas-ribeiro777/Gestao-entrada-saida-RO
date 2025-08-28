using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api_Projeto.Annne.Models
{
    [Table("solicitacao")]
    public class Solicitacao
    {
        [Key]
        [Column("id_solicitacao")]
        public int IdSolicitacao { get; set; }

        [Column("id_alunos")]
        public int IdAlunos { get; set; }

        [Column("id_nome_curso")]
        public int IdNomeCurso { get; set; }

        [Column("tipo")]
        public string Tipo { get; set; } = "entrada";

        [Column("motivo")]
        public string Motivo { get; set; } = "Não informado";

        [Column("data_hora")]
        public DateTime DataHora { get; set; } = DateTime.Now;

       [Column("retorno", TypeName = "time")]
        public TimeSpan? Retorno { get; set; }  

        [Column("status_professor")]
        public string StatusProfessor { get; set; } = "pendente";

        [Column("status_responsavel")]
        public string StatusResponsavel { get; set; } = "pendente";

        [Column("status_coordenador")]
        public string StatusCoordenador { get; set; } = "pendente";

        public Aluno? Aluno { get; set; }
        public Curso? Curso { get; set; }
    }

        public class TimeSpanConverter : JsonConverter<TimeSpan?>
    {
        public override TimeSpan? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var value = reader.GetString();
            return string.IsNullOrWhiteSpace(value) ? null : TimeSpan.Parse(value);
        }

        public override void Write(Utf8JsonWriter writer, TimeSpan? value, JsonSerializerOptions options)
        {
            if (value.HasValue)
                writer.WriteStringValue(value.Value.ToString(@"hh\:mm\:ss"));
            else
                writer.WriteNullValue();
        }
    }
}
