namespace Api_Projeto.Annne.DTOs
{
    public class SolicitarResetSenhaDTO
    {
        public required string Email { get; set; }
        public required string NovaSenha { get; set; }
        public required string ConfirmarSenha { get; set; }
    }

    public class ValidarTokenDTO
    {
        public string Token { get; set; } = string.Empty;
    }
}
