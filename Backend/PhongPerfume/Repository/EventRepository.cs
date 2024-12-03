using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Event> AddEventAsync(Event eventSale)
        {
            _context.Events.Add(eventSale);
            await _context.SaveChangesAsync();
            return eventSale;
        }

        public async Task DeleteEventAsync(int id)
        {
            var deletedEvent = await _context.Events.FindAsync(id);
            if (deletedEvent != null)
            {
                _context.Events.Remove(deletedEvent);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Event>> GetAllEventsAsync()
        {
            return await _context.Events.ToListAsync();
        }

        public async Task<Event> GetEventByIdAsync(int id)
        {
            var selectedEvent = await _context.Events.FindAsync(id);
            return selectedEvent;
        }

        public async Task<Event> UpdateEventAsync(Event eventSale)
        {
            _context.Events.Update(eventSale);
            await _context.SaveChangesAsync();
            return eventSale;
        }
    }
}
