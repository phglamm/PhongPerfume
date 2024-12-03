using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class Brand
    {
        [Key]
        public int Brand_Id { get; set; }
        public string Brand_Name { get; set; }
        public string Brand_Description { get; set; }
        public ICollection<Perfume> Perfumes { get; set; }


    }
}
