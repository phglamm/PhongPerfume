using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Brand
    {
        [Key]
        public required int Brand_Id { get; set; }
        public required string Brand_Name { get; set; }
        public string Brand_Description { get; set; }
        public ICollection<Perfume> Perfumes { get; set; }


    }
}
