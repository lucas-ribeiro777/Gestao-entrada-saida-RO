using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api_Projeto.Annne.Models
{
    [Table("usuarios")]
    public class Usuarios
    {

         [Column("email")] 
            public required string Email { get; set; }

        [Column("senha")]
        [Required]
        public string Senha { get; set; } = string.Empty;
    }
}
