using PhongPerfume.DTO.UserDTO;
using PhongPerfume.Models;

namespace PhongPerfume.Interface
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> AddUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task DeleteUserAsync(int id);
        UserGetAll GetUserByUsername(string username);
        String GetRoleByUsername(string username);
    }
}
