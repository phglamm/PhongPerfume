using Microsoft.AspNetCore.Mvc;
using PhongPerfume.Interface;

namespace PhongPerfume.Controllers
{
    public class EventController : Controller
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }
    }
}
