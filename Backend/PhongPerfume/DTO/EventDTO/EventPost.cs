namespace PhongPerfume.DTO.EventDTO
{
    public class EventPost
    {
        public string Event_Name { get; set; }
        public string Event_Poster { get; set; }
        public DateTime Event_Start { get; set; }
        public DateTime Event_End { get; set; }
        public string Event_Voucher { get; set; }
        public int Event_Discount { get; set; }
    }
}
