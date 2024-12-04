using PhongPerfume.Data;
using PhongPerfume.Interface;

namespace PhongPerfume.Repository
{
    public class OrderItemsRepository : IOrderItemsRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderItemsRepository(ApplicationDbContext context)
        {
            _context = context;
        }


    }
}
