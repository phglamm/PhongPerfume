using Microsoft.AspNetCore.Mvc;

namespace PhongPerfume.Controllers
{
    public class PerfumeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
