using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Models
{
    public interface IUsuario
    {
         string Email { get; set; }
    string Senha { get; set; }
    }
}