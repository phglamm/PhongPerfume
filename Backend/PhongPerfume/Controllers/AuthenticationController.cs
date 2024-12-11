using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> Login([FromBody] UserLogin userLogin)
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
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7); // Refresh token valid for 7 days
            await _userRepository.UpdateUserAsync(user);
            Console.WriteLine("Refresh token should now be saved in the database.");

            return Ok(new { user, token, refreshToken });
        }

        return Unauthorized();
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromQuery] string refreshToken)
    {
        if (string.IsNullOrEmpty(refreshToken))
        {
            return Unauthorized("Refresh token is required.");
        }

        var user = _userRepository.GetUserByRefreshToken(refreshToken);

        if (user == null || user.RefreshTokenExpiry < DateTime.Now)
        {
            return Unauthorized("Invalid or expired refresh token.");
        }

        // Generate new tokens
        var newAccessToken = GenerateToken(user.Username, user.Role);
        var newRefreshToken = GenerateRefreshToken();

        // Update refresh token in the database
        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(7);
        await _userRepository.UpdateUserAsync(user);

        return Ok(new { token = newAccessToken, refreshToken = newRefreshToken });
    }


    [HttpPost("loginGoogle")]
    public async Task<IActionResult> LoginGoogleAsync(string googleToken)
    {
        if (string.IsNullOrEmpty(googleToken))
        {
            return BadRequest("Google ID token is required.");
        }

        try
        {
            // Step 1: Verify the Google ID token
            var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(googleToken);
            var email = decodedToken.Claims["email"].ToString();
            var full_name = decodedToken.Claims["displayName"].ToString();
            var picture = decodedToken.Claims.ContainsKey("picture") ? decodedToken.Claims["picture"].ToString() : "";
            var phoneNumber = decodedToken.Claims["phoneNumber"].ToString();
            // Step 2: Check if the user exists in the database
            var user = _userRepository.GetUserByEmail(email);

            if (user == null)
            {
                // Step 3: Register the user in the database
                user = new User
                {
                    Full_Name = full_name,
                    Email = email,
                    Gender = true,
                    Phone = phoneNumber,
                    Username = email,
                    Role = "customer", // Default role
                    Password = "google-auth", // Placeholder password (not used for Google login)
                    //ProfilePicture = picture Store Google profile picture if needed

                };

                await _userRepository.AddUserAsync(user);
            }

            // Step 4: Generate a JWT for the user
            var token = GenerateToken(user.Username, user.Role);

            return Ok(new
            {
                jwtToken = token,
                user = new
                {
                    Full_Name = full_name,
                    Email = email,
                    Gender = true,
                    Phone = phoneNumber,
                    Username = email,
                    Role = "customer", // Default role
                    Password = "google-auth", // Placeholder password (not used for Google login)
                }
            });
        }
        catch (Exception ex)
        {
            return Unauthorized(new
            {
                message = "Invalid Google ID token.",
                error = ex.Message
            });
        }

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
    private string GenerateRefreshToken()
    {
        var randomBytes = new byte[64];
        using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
        {
            rng.GetBytes(randomBytes);
        }
        return Convert.ToBase64String(randomBytes);
    }



}

// Model LoginModel để nhận thông tin đăng nhập từ client

