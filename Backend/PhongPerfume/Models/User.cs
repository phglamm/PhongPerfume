using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class User
    {
        [Key]
        public int User_Id { get; set; }
        public string User_avatar { get; set; }
        public string Full_Name { get; set; }
        public bool Gender { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Reward_point { get; set; }
        public string Role { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiry { get; set; }

        public ICollection<Order> Orders { get; set; }



    }
}
