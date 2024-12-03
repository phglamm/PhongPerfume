using PhongPerfume.Data;
using PhongPerfume.Interface;

namespace PhongPerfume.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
