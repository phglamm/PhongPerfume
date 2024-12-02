using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhongPerfume.Models
{
    public class Perfume
    {
        [Key]
        public int Perfume_Id { get; set; }
        public required string Perfume_Name { get; set; }
        public required string Perfume_Description { get; set; }
        public required string Perfume_Type { get; set; }
        public List<string> Perfume_images { get; set; } = new List<string>();
        public required int Size { get; set; }
        public required int Stocks { get; set; }
        public required decimal Price { get; set; }
        public required int Brand_Id { get; set; }
        [ForeignKey("Brand_Id")]
        public required Brand Brand { get; set; }

        public ICollection<OrderDetailPerfume> OrderDetailPerfumes { get; set; }


    }
}
