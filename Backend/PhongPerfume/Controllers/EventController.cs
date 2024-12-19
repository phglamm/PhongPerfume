using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.EventDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class EventController : Controller
    {

        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetAllEvent()
        {
            var Events = await _eventRepository.GetAllEventsAsync();
            var EventsDTO = Events.Select(c => new EventGetAll
            {
                Event_Id = c.Event_Id,
                Event_Poster = c.Event_Poster,
                Event_Name = c.Event_Name,
                Event_Start = c.Event_Start,
                Event_End = c.Event_End,
                Event_Voucher = c.Event_Voucher,
                Event_Discount = c.Event_Discount,

            });
            return Ok(EventsDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventGetAll>> GetEventById(int id)
        {
            var selectedEvent = await _eventRepository.GetEventByIdAsync(id);
            if (selectedEvent == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            var selectedEventDTO = new EventGetAll
            {
                Event_Id = selectedEvent.Event_Id,
                Event_Poster = selectedEvent.Event_Poster,
                Event_Name = selectedEvent.Event_Name,
                Event_Start = selectedEvent.Event_Start,
                Event_End = selectedEvent.Event_End,
                Event_Voucher = selectedEvent.Event_Voucher,
                Event_Discount = selectedEvent.Event_Discount,
            };
            return Ok(selectedEventDTO);
        }

        [HttpPost]
        public async Task<ActionResult<Event>> AddEvent([FromBody] EventPost eventPost)
        {
            if (eventPost == null)
            {
                return BadRequest("Event's Data is required");
            }

            var addEvent = new Event
            {

                Event_Name = eventPost.Event_Name,
                Event_Poster = eventPost.Event_Poster,
                Event_Start = eventPost.Event_Start,
                Event_End = eventPost.Event_End,
                Event_Voucher = eventPost.Event_Voucher,
                Event_Discount = eventPost.Event_Discount,
            };

            var addedEvent = await _eventRepository.AddEventAsync(addEvent);
            System.Diagnostics.Debug.WriteLine($"{addedEvent.Event_Id}");
            return CreatedAtAction(nameof(GetEventById), new { id = addedEvent.Event_Id }, addedEvent);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Event>> UpdateEvent(int id, [FromBody] EventPost eventPost)
        {
            var ToUpdateEvent = await _eventRepository.GetEventByIdAsync(id);
            if (ToUpdateEvent == null)
            {
                return NotFound($"Cannot find Brand with ID:{id}");
            }
            if (eventPost == null)
            {
                return BadRequest("Event's Data is required");
            }

            ToUpdateEvent.Event_Name = eventPost.Event_Name;
            ToUpdateEvent.Event_Poster = eventPost.Event_Poster;
            ToUpdateEvent.Event_Start = eventPost.Event_Start;
            ToUpdateEvent.Event_End = eventPost.Event_End;
            ToUpdateEvent.Event_Voucher = eventPost.Event_Voucher;
            ToUpdateEvent.Event_Discount = eventPost.Event_Discount;


            var UpdatedEvent = await _eventRepository.UpdateEventAsync(ToUpdateEvent);
            return Ok(UpdatedEvent);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteEvent(int id)
        {
            var deletedEvent = await _eventRepository.GetEventByIdAsync(id);
            if (deletedEvent == null)
            {
                return NotFound($"Cannot find Event with ID:{id}");
            }
            await _eventRepository.DeleteEventAsync(id);
            return Ok("Delete Successfully");
        }
    }
}
