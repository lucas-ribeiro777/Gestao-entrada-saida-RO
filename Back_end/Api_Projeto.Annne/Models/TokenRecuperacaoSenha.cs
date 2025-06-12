using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Models
{
    public class TokenRecuperacaoSenha
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; } // FK

        public required string Token { get; set; }
        public DateTime DataCriacao { get; set; }
        public DateTime DataExpiracao { get; set; }
        public bool Usado { get; set; }

        // Propriedade de navegação (pode ser anulável)
        public Usuarios? Usuario { get; set; }
    }
}