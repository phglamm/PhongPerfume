using PhongPerfume.Models;

namespace PhongPerfume.DTO.EventDTO
{
    public class EventGetAll
    {
        public int Event_Id { get; set; }
        public string Event_Poster { get; set; }
        public string Event_Name { get; set; }
        public DateTime Event_Start { get; set; }
        public DateTime Event_End { get; set; }
        public string Event_Voucher { get; set; }
        public int Event_Discount { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
