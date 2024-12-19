using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IBrandRepository
    {

        Task<IEnumerable<Brand>> GetAllBrandsAsync();
        Task<Brand> GetBrandByIdAsync(int id);
        Task<Brand> GetBrandWithPerfumeByIdAsync(int id);

        Task<Brand> AddBrandAsync(Brand brand);
        Task<Brand> UpdateBrandAsync(Brand brand);
        Task DeleteBrandAsync(int id);

    }
}
