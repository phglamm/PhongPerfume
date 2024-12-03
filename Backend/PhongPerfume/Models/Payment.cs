using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Payment
    {
        [Key]
        public int Payment_Id { get; set; }
        public string Payment_Method { get; set; }
        public ICollection<Order> Orders { get; set; }

    }
}
