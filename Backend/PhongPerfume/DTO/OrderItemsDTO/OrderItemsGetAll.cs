namespace PhongPerfume.DTO.OrderItemsDTO
{
    public class OrderItemsGetAll
    {
        public int Order_Id { get; set; }
        public int Perfume_Id { get; set; }
        public string Perfume_Name { get; set; }
        public string Perfume_Description { get; set; }
        public string Perfume_For { get; set; }
        public string Perfume_Type { get; set; }
        public List<string> Perfume_images { get; set; } = new List<string>();
        public int Size { get; set; }
        public int Stocks { get; set; }
        public decimal Price { get; set; }
        public int Brand_Id { get; set; }
        public string Brand_Name { get; set; }
        public int? Event_Id { get; set; }
        public string? Event_Poster { get; set; }
        public string? Event_Name { get; set; }
        public DateTime? Event_Start { get; set; }
        public DateTime? Event_End { get; set; }
        public string? Event_Voucher { get; set; }
        public int? Event_Discount { get; set; }
        public int Quantity { get; set; }
    }
}
