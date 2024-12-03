using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Warranty
    {
        [Key]
        public int Warranty_Id { get; set; }
        public string Warranty_Name { get; set; }
        public string Warranty_Description { get; set; }
        public ICollection<Order> Orders { get; set; }



    }
}
