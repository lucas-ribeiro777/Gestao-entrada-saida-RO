using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
    [Table("qrcode")]
    public class QrCode
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("id_aluno")]
        public int IdAluno { get; set; }

        [Column("id_nome_curso")]
        public int IdCurso { get; set; }

        [Column("id_coordenadores")]
        public int IdCoordenador { get; set; }

        [Column("id_responsavel")]
        public int IdResponsavel { get; set; }

        
        [Column("datahora")]
    public DateTime DataHora { get; set; }

    [Column("autorizado")]
    public string Autorizado { get; set; } = string.Empty;


        [Column("caminhoarquivo")]
        public string? CaminhoArquivo { get; set; }
    }

    [Table("solicitacao")]
    public class Solicitacao
    {
        [Column("id_solicitacao")]
        public int Id { get; set; }

        [Column("id_aluno")]
        public int IdAluno { get; set; }

        [Column("id_nome_curso")]
        public int IdCurso { get; set; }
    }

    [Table("coordenadores")]
    public class Coordenador
    {
        [Column("id_coordenador")]
        public int Id { get; set; }
    }

    [Table("responsaveis")]
    public class Responsavel
    {
        [Column("id_responsaveis")]
        public int Id { get; set; }
    }

    public class QrCodeRequest
    {
        public int IdAluno { get; set; }
        public string? Coordenador { get; set; }
        public string? Responsavel { get; set; }
    }
}
