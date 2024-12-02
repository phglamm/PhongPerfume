using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Payment
    {
        [Key]
        public required int Payment_Id { get; set; }
        public required string Payment_Method { get; set; }
        public ICollection<Order> Orders { get; set; }

    }
}
