using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Api_Projeto.Annne.Services
{
    public interface IEmailService
    {
        Task EnviarEmailAsync(string email, string subject, string corpoEmail);
    }

    public class EmailServiceGmail : IEmailService
    {
        private readonly string _smtpHost = "smtp.gmail.com";
        private readonly string _smtpUser = "salads792lp@gmail.com"; 
        private readonly string _smtpPass = "cysr mhjy besq iswu"; 

        public async Task EnviarEmailAsync(string toEmail, string subject, string body)
        {
            try
            {
                try
                {
                   
                    using var client = new SmtpClient(_smtpHost, 587)
                    {
                        Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                        EnableSsl = true, 
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false
                    };

                    var mail = new MailMessage
                    {
                        From = new MailAddress(_smtpUser, "Recuperação de Senha"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true
                    };

                    mail.To.Add(toEmail);

                    await client.SendMailAsync(mail);
                    return; 
                }
                catch (SmtpException ex587)
                {
                    
                    using var client = new SmtpClient(_smtpHost, 465)
                    {
                        Credentials = new NetworkCredential(_smtpUser, _smtpPass),
                        EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false
                    };

                    var mail = new MailMessage
                    {
                        From = new MailAddress(_smtpUser, "Recuperação de Senha"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = true
                    };

                    mail.To.Add(toEmail);

                    await client.SendMailAsync(mail);
                }
            }
            catch (SmtpException smtpEx)
            {
                
                throw new System.Exception(
                    $"Falha ao enviar e-mail. Erro SMTP ({smtpEx.StatusCode}): {smtpEx.Message}",
                    smtpEx
                );
            }
            catch (System.Exception ex)
            {
                
                throw new System.Exception(
                    $"Erro inesperado ao enviar e-mail: {ex.InnerException?.Message ?? ex.Message}",
                    ex
                );
            }
        }
    }
}
