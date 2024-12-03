using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetail_Id { get; set; }

        public int Order_Id { get; set; }
        [ForeignKey("Order_Id")]
        public Order Order { get; set; }

        //public  int Perfume_Id { get; set; }
        //[ForeignKey("Perfume_Id")]
        public ICollection<OrderDetailPerfume> OrderDetailPerfumes { get; set; }
        public int OrderDetail_Quantity { get; set; }



    }
}
