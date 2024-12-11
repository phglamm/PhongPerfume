using Microsoft.EntityFrameworkCore;
using PhongPerfume.Data;
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

        public User GetUserByUsername(string username)

        {
            if (string.IsNullOrEmpty(username))
            {
                throw new ArgumentException("Username cannot be null or empty", nameof(username));
            }
            var user = _context.Users.AsNoTracking().FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                throw new InvalidOperationException($"User with username '{username}' not found.");
            }
            var userDTO = new User
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
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiry = user.RefreshTokenExpiry,
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

        public User GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                throw new ArgumentException("email cannot be null or empty", nameof(email));
            }
            var user = _context.Users.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                throw new InvalidOperationException($"User with email '{email}' not found.");
            }
            var userDTO = new User
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

        public User GetUserByRefreshToken(string refreshToken)
        {
            if (string.IsNullOrEmpty(refreshToken))
            {
                throw new ArgumentException("refreshToken cannot be null or empty", nameof(refreshToken));
            }
            var user = _context.Users.AsNoTracking().FirstOrDefault(u => u.RefreshToken == refreshToken);
            if (user == null)
            {
                throw new InvalidOperationException($"User with refreshToken '{refreshToken}' not found.");
            }
            var userDTO = new User
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
                RefreshToken = user.RefreshToken,
                RefreshTokenExpiry = user.RefreshTokenExpiry,
            };

            return userDTO;
        }
    }
}
