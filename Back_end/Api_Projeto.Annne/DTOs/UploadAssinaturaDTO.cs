using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Api_Projeto.Annne.DTOs
{
    public class UploadAssinaturaDTO
    {
        [Required(ErrorMessage = "O arquivo de assinatura é obrigatório.")]
        public IFormFile Assinatura { get; set; } = null!;
    }
}
