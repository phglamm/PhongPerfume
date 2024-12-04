namespace PhongPerfume.DTO.OrderDTO
{
    public class OrderPost
    {
        public DateTime Order_Date { get; set; }
        public string Order_Address { get; set; }
        public string Order_Status { get; set; }
        public int Total_Price { get; set; }

        public int User_Id { get; set; }

        public int Event_Id { get; set; }

        public int Payment_Id { get; set; }

        public int Warranty_Id { get; set; }

        //public ICollection<OrderDetail> OrderPerfumes { get; set; }
    }
}
