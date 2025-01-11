using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;

        public OrderRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            // Add the order itself to the context
            _context.Orders.Add(order);

            // Save changes to the database (this will also persist the OrderItems)
            await _context.SaveChangesAsync();

            return await _context.Orders
       .Include(o => o.User)
       .Include(o => o.Payment)
       .Include(o => o.Warranty)
       .Include(o => o.OrderItems)
           .ThenInclude(oi => oi.Perfume)
               .ThenInclude(p => p.Brand)
       .FirstOrDefaultAsync(o => o.Order_Id == order.Order_Id);
        }



        public async Task DeleteOrderAsync(int id)
        {
            var deleteOrder = await _context.Orders.FindAsync(id);
            if (deleteOrder != null)
            {
                _context.Orders.Remove(deleteOrder);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Include(w => w.Warranty)            // Include Warranty
                .Include(p => p.Payment)             // Include Payment
                .Include(u => u.User)                // Include User
                .Include(o => o.OrderItems)          // Include OrderItems
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Brand)   // Include Brand in Perfume
                .Include(o => o.OrderItems)          // Include OrderItems again
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Event)   // Include Event in Perfume
                .ToListAsync();
        }


        public async Task<IEnumerable<Order>> GetAllOrdersFromUserAsync(int userID)
        {
            return await _context.Orders
                .Where(o => o.User_Id == userID)
                .Include(u => u.User)
                .Include(w => w.Warranty)
                .Include(p => p.Payment)
                .Include(o => o.OrderItems)          // Include OrderItems
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Brand)   // Include Brand in Perfume
                .Include(o => o.OrderItems)          // Include OrderItems again
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Event)   // Include Event in Perfume
                .ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var selectedOrder = await _context.Orders
                .Include(u => u.User)
                .Include(w => w.Warranty)
                .Include(p => p.Payment)
                .Include(o => o.OrderItems)          // Include OrderItems
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Brand)   // Include Brand in Perfume
                .Include(o => o.OrderItems)          // Include OrderItems again
                    .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
                        .ThenInclude(p => p.Event)   // Include Event in Perfume
                .FirstOrDefaultAsync(o => o.Order_Id == id);
            return selectedOrder;
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Payment)
            .Include(o => o.Warranty)
            .Include(o => o.OrderItems)          // Include OrderItems
            .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
            .ThenInclude(p => p.Brand)   // Include Brand in Perfume
            .Include(o => o.OrderItems)          // Include OrderItems again
            .ThenInclude(oi => oi.Perfume)   // Include Perfume in OrderItems
            .ThenInclude(p => p.Event)   // Include Event in Perfume
        .FirstOrDefaultAsync(o => o.Order_Id == order.Order_Id);
        }
    }
}
