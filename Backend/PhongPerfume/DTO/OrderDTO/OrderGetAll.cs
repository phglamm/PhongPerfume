using PhongPerfume.DTO.OrderItemsDTO;

namespace PhongPerfume.DTO.OrderDTO
{
    public class OrderGetAll
    {
        public int Order_Id { get; set; }
        public DateTime Order_Date { get; set; }
        public string Order_customerName { get; set; }
        public string Order_customerEmail { get; set; }
        public string Order_customerPhone { get; set; }
        public string Order_Address { get; set; }
        public string Order_Status { get; set; }
        public int Total_Price { get; set; }
        public int User_Id { get; set; }
        public OrderUserReturnDTO User { get; set; }

        public int Event_Id { get; set; }
        public string Event_Name { get; set; }

        public int Payment_Id { get; set; }
        public string Payment_Method { get; set; }

        public int Warranty_Id { get; set; }
        public string Warranty_Name { get; set; }

        public ICollection<OrderItemsGetAll> OrderItems { get; set; }
    }
}
