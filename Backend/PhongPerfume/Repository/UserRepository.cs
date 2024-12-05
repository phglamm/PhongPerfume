using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
using PhongPerfume.DTO.UserDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            var selectedUser = await _context.Users.FindAsync(id);
            return selectedUser;
        }

        public async Task<User> AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            var deleteUser = await _context.Users.FindAsync(id);
            if (deleteUser != null)
            {
                _context.Users.Remove(deleteUser);
                await _context.SaveChangesAsync();
            }
        }

        public UserGetAll GetUserByUsername(string username)

        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty", nameof(username));
            }
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new InvalidOperationException($"User with username '{username}' not found.");
            }
            var userDTO = new UserGetAll
            {
                User_Id = user.User_Id,
                Full_Name = user.Full_Name,
                Gender = user.Gender,
                Phone = user.Phone,
                Email = user.Email,
                Address = user.Address,
                Username = user.Username,
                Password = user.Password,
                Role = user.Role,
            };

            return userDTO;
        }

        public string GetRoleByUsername(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty", nameof(username));
            }
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new InvalidOperationException($"User with username '{username}' not found.");
            }
            return user.Role;
        }


    }
}
