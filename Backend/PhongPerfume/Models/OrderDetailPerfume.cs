using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class OrderDetailPerfume
    {
        [Key]
        public int OrderDetailPerfume_Id { get; set; }

        public int OrderDetail_Id { get; set; }
        [ForeignKey("OrderDetail_Id")]
        public OrderDetail OrderDetail { get; set; }

        public int Perfume_Id { get; set; }
        [ForeignKey("Perfume_Id")]
        public Perfume Perfume { get; set; }
    }
}
