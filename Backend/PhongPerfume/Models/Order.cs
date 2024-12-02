using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class Order
    {
        [Key]
        public required int Order_Id { get; set; }

        public required DateTime Order_Date { get; set; }
        public required string Order_Address { get; set; }
        public required string Order_Status { get; set; }
        public required int Total_Price { get; set; }

        public required int User_Id { get; set; }
        [ForeignKey("User_Id")]
        public required User User { get; set; }

        public int Event_Id { get; set; }
        [ForeignKey("Event_Id")]
        public required Event Event { get; set; }

        [ForeignKey("Payment_Id")]
        public required int Payment_Id { get; set; }
        public required Payment Payment { get; set; }

        [ForeignKey("Warranty_Id")]
        public required int Warranty_Id { get; set; }
        public required Warranty Warranty { get; set; }

        public ICollection<OrderDetail> OrderPerfumes { get; set; }

    }
}
