using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.DTOs
{
    public class  LoginResponseDTO
    {
        public int Id { get; set; }
        public string Tipo { get; set; } = "";
        public string Nome { get; set; } = "";
    }
}