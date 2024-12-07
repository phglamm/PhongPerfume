﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhongPerfume.DTO.UserDTO;
using PhongPerfume.Interface;
using PhongPerfume.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthenticationController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IUserRepository _userRepository;


    public AuthenticationController(IConfiguration configuration, IUserRepository userRepository)
    {
        _configuration = configuration;
        _userRepository = userRepository;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLogin userLogin)
    {
        // Kiểm tra thông tin đăng nhập
        if (ValidateUser(userLogin))
        {
            var user = _userRepository.GetUserByUsername(userLogin.Username);
            if (string.IsNullOrEmpty(user.Role))
            {
                return Unauthorized("User's role not found");
            }

            var token = GenerateToken(userLogin.Username, user.Role);
            return Ok(new { token, user });
        }

        return Unauthorized();
    }
    [HttpPost("Register")]
    public async Task<ActionResult<UserRegister>> Register([FromBody] UserRegister userRegister)
    {
        if (userRegister == null)
        {
            return BadRequest("User's Data is required");
        }

        var addUser = new User
        {
            Full_Name = userRegister.Full_Name,
            Gender = userRegister.Gender,
            Phone = userRegister.Phone,
            Email = userRegister.Email,
            Address = userRegister.Address,
            Username = userRegister.Username,
            Password = userRegister.Password,
            Reward_point = userRegister.Reward_point,
            Role = userRegister.Role,
        };

        var addedUser = await _userRepository.AddUserAsync(addUser);
        System.Diagnostics.Debug.WriteLine($"{addedUser.User_Id}");
        return Ok(new { addedUser });
    }

    private bool ValidateUser(UserLogin userLogin)
    {
        // Giả sử thông tin đăng nhập tĩnh (thay bằng kiểm tra từ DB trong thực tế)
        //return login.Username == "string" && login.Password == "string";
        var dbUser = _userRepository.GetUserByUsername(userLogin.Username);

        // Kiểm tra nếu không tìm thấy người dùng hoặc mật khẩu không đúng
        if (dbUser == null || dbUser.Password != userLogin.Password)
        {
            return false;
        }

        return true;

    }

    private string GenerateToken(string username, string role)
    {
        // Tạo danh sách Claims (Thông tin người dùng)
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, role) // Thêm vai trò nếu cần
            
        };

        // Lấy Secret Key từ cấu hình
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Tạo token
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpireMinutes"])),
            signingCredentials: creds
        );

        // Trả về token dưới dạng chuỗi
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// Model LoginModel để nhận thông tin đăng nhập từ client

