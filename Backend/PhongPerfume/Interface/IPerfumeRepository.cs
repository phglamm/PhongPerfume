﻿using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IPerfumeRepository
    {

        Task<IEnumerable<Perfume>> GetAllPerfumesAsync();
        Task<Perfume> GetPerfumeByIdAsync(int id);
        Task<Perfume> AddPerfumeAsync(Perfume perfume);
        Task<Perfume> UpdatePerfumeAsync(Perfume perfume);
        Task DeletePerfumeAsync(int id);
    }
}
