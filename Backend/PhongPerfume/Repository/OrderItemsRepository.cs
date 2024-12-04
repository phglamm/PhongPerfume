using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class OrderItemsRepository : IOrderItemsRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderItemsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<OrderItems>> GetAllOrderItemsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
