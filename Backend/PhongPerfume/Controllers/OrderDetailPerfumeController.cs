using Microsoft.AspNetCore.Mvc;
using PhongPerfume.Interface;

namespace PhongPerfume.Controllers
{
    public class OrderDetailPerfumeController : Controller
    {
        private readonly IOrderDetailPerfumeRepository _orderDetailPerfumeRepository;

        public OrderDetailPerfumeController(IOrderDetailPerfumeRepository orderDetailPerfumeRepository)
        {
            _orderDetailPerfumeRepository = orderDetailPerfumeRepository;
        }
    }
}
