﻿namespace PhongPerfume.DTO.PerfumeDTO
{
    public class PerfumeGetAll
    {
        public int Perfume_Id { get; set; }
        public string Perfume_Name { get; set; }
        public string Perfume_Description { get; set; }
        public string Perfume_Type { get; set; }
        public List<string> Perfume_images { get; set; } = new List<string>();
        public int Size { get; set; }
        public int Stocks { get; set; }
        public decimal Price { get; set; }
        public int Brand_Id { get; set; }
        public string Brand_Name { get; set; }
    }
}
