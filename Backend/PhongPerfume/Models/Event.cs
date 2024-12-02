using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Event
    {
        [Key]
        public required int Event_Id { get; set; }
        public required string Event_Name { get; set; }
        public required DateTime Event_Start { get; set; }
        public required DateTime Event_End { get; set; }
        public required string Event_Voucher { get; set; }
        public required int Event_Discount { get; set; }

        public ICollection<Order> Orders { get; set; }



    }
}
