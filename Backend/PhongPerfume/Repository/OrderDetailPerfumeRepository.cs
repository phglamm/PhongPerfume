using PhongPerfume.Data;
using PhongPerfume.Interface;

namespace PhongPerfume.Repository
{
    public class OrderDetailPerfumeRepository : IOrderDetailPerfumeRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailPerfumeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
