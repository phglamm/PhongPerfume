using Microsoft.AspNetCore.Mvc;

namespace PhongPerfume.Controllers
{
    public class OrderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
