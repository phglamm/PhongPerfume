using PhongPerfume.DTO.OrderItemsDTO;

namespace PhongPerfume.DTO.OrderDTO
{
    public class OrderPost
    {
        public DateTime Order_Date { get; set; }
        public string Order_customerName { get; set; }
        public string Order_customerEmail { get; set; }
        public string Order_customerPhone { get; set; }
        public string Order_Address { get; set; }
        public string Order_Status { get; set; }
        public float Total_Price { get; set; }
        public int User_Id { get; set; }
        public int Payment_Id { get; set; }
        public int Warranty_Id { get; set; }

        public ICollection<OrderItemsPost> OrderItems { get; set; }
    }
}
