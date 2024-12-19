namespace PhongPerfume.DTO.BrandDTO
{
    public class BrandGetAll
    {
        public int Brand_Id { get; set; }
        public string Brand_Images { get; set; }
        public string Brand_Name { get; set; }
        public string Brand_Description { get; set; }
        public List<string> Perfumes { get; set; }
    }
}
