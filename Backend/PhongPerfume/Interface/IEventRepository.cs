using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEventsAsync();
        Task<Event> GetEventByIdAsync(int id);
        Task<Event> AddEventAsync(Event eventSale);
        Task<Event> UpdateEventAsync(Event eventSale);
        Task DeleteEventAsync(int id);
    }
}
