using System.ComponentModel.DataAnnotations;

namespace PhongPerfume.Models
{
    public class User
    {
        [Key]
        public required int User_Id { get; set; }
        public required string Full_Name { get; set; }
        public required bool Gender { get; set; }
        public required string Phone { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public int Reward_point { get; set; }
        public required string Role { get; set; }
        public ICollection<Order> Orders { get; set; }



    }
}
