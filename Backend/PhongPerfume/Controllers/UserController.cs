using Microsoft.AspNetCore.Mvc;
using PhongPerfume.DTO.UserDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;

namespace PhongPerfume.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    //[Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        //[Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<UserGetAll>>> GetAllUser()
        {
            var Users = await _userRepository.GetAllUsersAsync();
            var UsersDTO = Users.Select(c => new UserGetAll
            {
                User_Id = c.User_Id,
                Full_Name = c.Full_Name,
                Gender = c.Gender,
                Phone = c.Phone,
                Email = c.Email,
                Address = c.Address,
                Username = c.Username,
                Password = c.Password,
                Reward_point = c.Reward_point,
                Role = c.Role,
            });
            return Ok(UsersDTO);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserGetAll>> GetUserById(int id)
        {
            var selectedUser = await _userRepository.GetUserByIdAsync(id);
            if (selectedUser == null)
            {
                return NotFound($"Cannot find User with ID:{id}");
            }
            var selectedUserDTO = new UserGetAll
            {
                User_Id = selectedUser.User_Id,
                Full_Name = selectedUser.Full_Name,
                Gender = selectedUser.Gender,
                Phone = selectedUser.Phone,
                Email = selectedUser.Email,
                Address = selectedUser.Address,
                Username = selectedUser.Username,
                Password = selectedUser.Password,
                Reward_point = selectedUser.Reward_point,
                Role = selectedUser.Role,
            };
            return Ok(selectedUserDTO);
        }

        [HttpPost]
        public async Task<ActionResult<User>> AddUser([FromBody] UserPost userPost)
        {
            if (userPost == null)
            {
                return BadRequest("User's Data is required");
            }

            var addUser = new User
            {
                Full_Name = userPost.Full_Name,
                Gender = userPost.Gender,
                Phone = userPost.Phone,
                Email = userPost.Email,
                Address = userPost.Address,
                Username = userPost.Username,
                Password = userPost.Password,
                Role = userPost.Role,
            };

            var addedUser = await _userRepository.AddUserAsync(addUser);
            System.Diagnostics.Debug.WriteLine($"{addedUser.User_Id}");
            return CreatedAtAction(nameof(GetUserById), new { id = addedUser.User_Id }, addedUser);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<User>> UpdateUser(int id, [FromBody] UserPost userPost)
        {
            var ToUpdateUser = await _userRepository.GetUserByIdAsync(id);
            if (ToUpdateUser == null)
            {
                return NotFound($"Cannot find User with ID:{id}");
            }
            if (userPost == null)
            {
                return BadRequest("User's Data is required");
            }

            ToUpdateUser.Full_Name = userPost.Full_Name;
            ToUpdateUser.Gender = userPost.Gender;
            ToUpdateUser.Phone = userPost.Phone;
            ToUpdateUser.Email = userPost.Email;
            ToUpdateUser.Address = userPost.Address;
            ToUpdateUser.Username = userPost.Username;
            ToUpdateUser.Password = userPost.Password;
            ToUpdateUser.Role = userPost.Role;

            var UpdatedUser = await _userRepository.UpdateUserAsync(ToUpdateUser);
            return Ok(UpdatedUser);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var deletedUser = await _userRepository.GetUserByIdAsync(id);
            if (deletedUser == null)
            {
                return NotFound($"Cannot find User with ID:{id}");
            }
            await _userRepository.DeleteUserAsync(id);
            return Ok("Delete Successfully");
        }


    }
}
