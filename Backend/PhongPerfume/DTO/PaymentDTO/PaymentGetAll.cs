using PhongPerfume.Models;

namespace PhongPerfume.DTO.PaymentDTO
{
    public class PaymentGetAll
    {
        public int Payment_Id { get; set; }
        public string Payment_Method { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
