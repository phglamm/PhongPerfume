using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IWarrantyRepository
    {
        Task<IEnumerable<Warranty>> GetAllPerfumesAsync();
        Task<Warranty> GetWarrantyByIdAsync(int id);
        Task<Warranty> AddWarrantyAsync(Warranty warranty);
        Task<Warranty> UpdateWarrantyAsync(Warranty warranty);
        Task DeleteWarrantyAsync(int id);
    }
}
