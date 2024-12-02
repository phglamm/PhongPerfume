using Microsoft.AspNetCore.Mvc;

namespace PhongPerfume.Controllers
{
    public class EventController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
