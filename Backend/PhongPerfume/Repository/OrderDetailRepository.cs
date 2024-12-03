using PhongPerfume.Data;
using PhongPerfume.Interface;

namespace PhongPerfume.Repository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
