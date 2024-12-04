using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class Perfume
    {
        [Key]
        public int Perfume_Id { get; set; }
        public string Perfume_Name { get; set; }
        public string Perfume_Description { get; set; }
        public string Perfume_Type { get; set; }
        public List<string> Perfume_images { get; set; } = new List<string>();
        public int Size { get; set; }
        public int Stocks { get; set; }
        public decimal Price { get; set; }
        public int Brand_Id { get; set; }
        [ForeignKey("Brand_Id")]
        public Brand Brand { get; set; }

        public ICollection<OrderItems> OrderItems { get; set; }


    }
}
