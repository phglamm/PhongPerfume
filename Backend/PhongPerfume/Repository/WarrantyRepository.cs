using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class WarrantyRepository : IWarrantyRepository
    {
        private readonly ApplicationDbContext _context;

        public WarrantyRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Warranty> AddWarrantyAsync(Warranty warranty)
        {

            _context.Warrantys.Add(warranty);
            await _context.SaveChangesAsync();
            return warranty;
        }

        public async Task DeleteWarrantyAsync(int id)
        {
            var deleteWarranty = await _context.Warrantys.FindAsync(id);
            if (deleteWarranty != null)
            {
                _context.Warrantys.Remove(deleteWarranty);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Warranty>> GetAllPerfumesAsync()
        {
            return await _context.Warrantys.ToListAsync();
        }

        public async Task<Warranty> GetWarrantyByIdAsync(int id)
        {
            var selectedWarranty = await _context.Warrantys.FindAsync(id);
            return selectedWarranty;
        }

        public async Task<Warranty> UpdateWarrantyAsync(Warranty warranty)
        {
            _context.Warrantys.Update(warranty);
            await _context.SaveChangesAsync();
            return warranty;
        }
    }
}
