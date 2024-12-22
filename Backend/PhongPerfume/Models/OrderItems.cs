using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    [PrimaryKey(nameof(Order_Id), nameof(Perfume_Id))]
    public class OrderItems
    {
        public int Order_Id { get; set; }

        public int Perfume_Id { get; set; }

        [ForeignKey("Order_Id")]
        public Order Order { get; set; }

        [ForeignKey("Perfume_Id")]
        public Perfume Perfume { get; set; }
        public int Quantity { get; set; }

    }
}
