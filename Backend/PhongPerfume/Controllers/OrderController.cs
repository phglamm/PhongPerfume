using Microsoft.AspNetCore.Mvc;
using PhongPerfume.Interface;

namespace PhongPerfume.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
    }
}
