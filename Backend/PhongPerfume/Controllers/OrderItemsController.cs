using Microsoft.AspNetCore.Mvc;
using PhongPerfume.Interface;

namespace PhongPerfume.Controllers
{
    public class OrderItemsController : Controller
    {
        private readonly IOrderItemsRepository _orderDetailRepository;

        public OrderItemsController(IOrderItemsRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }
    }
}
