using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    public class QrCodeRegistro
    {
        [Key]
        [Column("id")]
        public int IdQrcode { get; set; }

        [Column("id_alunos")]
        public int IdAlunos { get; set; }

        [Column("id_nome_curso")]
        public int IdNomeCurso { get; set; }

        [Column("status_professor")]
        public string StatusProfessor { get; set; } = null!;

        [Column("status_responsavel")]
        public string StatusResponsavel { get; set; } = null!;

        [Column("status_coordenador")]
        public string StatusCoordenador { get; set; } = null!;

        [Column("caminhoarquivo")]
        public string CaminhoArquivo { get; set; } = null!;

        [Column("datahora")]
        public DateTime DataHora { get; set; }
    }
}
