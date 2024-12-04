using PhongPerfume.Models;

namespace PhongPerfume.DTO.WarrantyDTO
{
    public class WarrantyGetAll
    {
        public int Warranty_Id { get; set; }
        public string Warranty_Name { get; set; }
        public string Warranty_Description { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}
