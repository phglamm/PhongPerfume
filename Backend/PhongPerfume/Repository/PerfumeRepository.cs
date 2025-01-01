using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class PerfumeRepository : IPerfumeRepository
    {
        private readonly ApplicationDbContext _context;

        public PerfumeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Perfume> AddPerfumeAsync(Perfume perfume)
        {
            _context.Perfumes.Add(perfume);
            await _context.SaveChangesAsync();
            return perfume;
        }

        public async Task DeletePerfumeAsync(int id)
        {
            var deletePerfume = await _context.Perfumes.FindAsync(id);
            if (deletePerfume != null)
            {
                _context.Perfumes.Remove(deletePerfume);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Perfume>> FindPerfumeBySearch(string search)
        {
            return await _context.Perfumes
                .Include(b => b.Brand)
                .ThenInclude(p => p.Perfumes)
                .Where(p =>
                    EF.Functions.Like(p.Perfume_Name, $"%{search}%") ||
                    EF.Functions.Like(p.Perfume_Description, $"%{search}%"))
                .ToListAsync();

        }

        public async Task<IEnumerable<Perfume>> GetAllPerfumesAsync()
        {
            return await _context.Perfumes.Include(b => b.Brand).ThenInclude(p => p.Perfumes).ToListAsync();
        }

        public async Task<Perfume> GetPerfumeByIdAsync(int id)
        {
            var selectedPerfume = await _context.Perfumes.FindAsync(id);
            return selectedPerfume;
        }

        public async Task<Perfume> GetPerfumeWithBrandNameByIdAsync(int id)
        {
            var selectedPerfume = await _context.Perfumes.Include(b => b.Brand).FirstOrDefaultAsync(u => u.Perfume_Id == id);
            return selectedPerfume;
        }

        public async Task<Perfume> UpdatePerfumeAsync(Perfume perfume)
        {
            _context.Perfumes.Update(perfume);
            await _context.SaveChangesAsync();
            return perfume;
        }
    }
}
