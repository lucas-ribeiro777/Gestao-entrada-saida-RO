using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Models
{
    [Table("usuarios")]
    public class Usuarios
    {

         [Key]
        public int Id { get; set; } 
        public string? Email { get; set; }
        public string? Senha { get; set; }
    }
}

    
