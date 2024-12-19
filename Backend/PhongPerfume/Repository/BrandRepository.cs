using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationDbContext _context;

        public BrandRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Brand> AddBrandAsync(Brand brand)
        {
            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task DeleteBrandAsync(int id)
        {
            var deletedBrand = await _context.Brands.FindAsync(id);
            if (deletedBrand != null)
            {
                _context.Brands.Remove(deletedBrand);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Brand>> GetAllBrandsAsync()
        {
            return await _context.Brands.Include(p => p.Perfumes).ToListAsync();
        }

        public async Task<Brand> GetBrandByIdAsync(int id)
        {
            var selectedBrand = await _context.Brands.FindAsync(id);
            return selectedBrand;
        }
        public async Task<Brand> GetBrandWithPerfumeByIdAsync(int id)
        {
            var selectedBrand = await _context.Brands.Include(p => p.Perfumes).FirstOrDefaultAsync(b => b.Brand_Id == id);
            return selectedBrand;
        }

        public async Task<Brand> UpdateBrandAsync(Brand brand)
        {
            _context.Brands.Update(brand);
            await _context.SaveChangesAsync();
            return brand;
        }
    }
}
