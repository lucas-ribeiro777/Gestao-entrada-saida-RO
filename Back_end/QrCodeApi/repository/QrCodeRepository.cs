using Api.Models;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Repository
{
    public class QrCodeRepository
    {
        private readonly GestaoAnneContext _context;

        public QrCodeRepository(GestaoAnneContext context)
        {
            _context = context;
        }

        public async Task<QrCode> AddAsync(QrCode qrCode)
        {
            _context.QrCodes.Add(qrCode);
            await _context.SaveChangesAsync();
            return qrCode;
        }

        public async Task<int> CountAsync()
        {
            return await _context.QrCodes.CountAsync();
        }

        // opcional: buscar por aluno
        public async Task<List<QrCode>> GetByAlunoIdAsync(int idAluno)
        {
            return await _context.QrCodes
                .Where(q => q.IdAluno == idAluno)
                .ToListAsync();
        }

        // opcional: buscar o último QR gerado
        public async Task<QrCode?> GetLastAsync()
        {
            return await _context.QrCodes
                .OrderByDescending(q => q.Id)
                .FirstOrDefaultAsync();
        }
    }
}
