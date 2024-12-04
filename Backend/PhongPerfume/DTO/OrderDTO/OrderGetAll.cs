using PhongPerfume.Models;

namespace PhongPerfume.DTO.OrderDTO
{
    public class OrderGetAll
    {
        public int Order_Id { get; set; }

        public DateTime Order_Date { get; set; }
        public string Order_Address { get; set; }
        public string Order_Status { get; set; }
        public int Total_Price { get; set; }

        public int User_Id { get; set; }
        public User User { get; set; }

        public int Event_Id { get; set; }
        public Event Event { get; set; }

        public int Payment_Id { get; set; }
        public Payment Payment { get; set; }

        public int Warranty_Id { get; set; }
        public Warranty Warranty { get; set; }

        public ICollection<OrderItems> OrderItems { get; set; }
    }
}
