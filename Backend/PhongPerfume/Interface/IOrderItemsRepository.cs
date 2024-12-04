using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IOrderItemsRepository
    {
        Task<IEnumerable<OrderItems>> GetAllOrderItemsAsync();


    }
}
