using Microsoft.AspNetCore.Mvc;
using PhongPerfume.Interface;

namespace PhongPerfume.Controllers
{
    public class OrderDetailController : Controller
    {
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }
    }
}
