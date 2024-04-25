using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace AuthenticationApi.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<User> _userManager;
    private readonly IConfiguration _configuration;

    public AuthenticationService (UserManager<User> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task<string> Register(RegisterRequest request)
    {
        var userByEmail = await _userManager.FindByEmailAsync(request.ElPastas);
        var userByUsername = await _userManager.FindByNameAsync(request.PrisijungimoVardas);
        if (userByEmail is not null || userByUsername is not null)
        {
            throw new ArgumentException($"User with email {request.ElPastas} or username {request.PrisijungimoVardas} already exists.");
        }

        User user = new()
        {
            Email = request.ElPastas,
            UserName = request.PrisijungimoVardas,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        var result = await _userManager.CreateAsync(user, request.Slaptazodis);

        if(!result.Succeeded)
        {
            throw new ArgumentException($"Unable to register user {request.PrisijungimoVardas} errors: {GetErrorsText(result.Errors)}");
        }

        return await Login(new LoginRequest { PrisijungimoVardas = request.ElPastas, Slaptazodis = request.Slaptazodis });
    }

    public async Task<string> Login(LoginRequest request)
    {
        var user = await _userManager.FindByNameAsync(request.PrisijungimoVardas);

        if(user is null)
        {
            user = await _userManager.FindByEmailAsync(request.PrisijungimoVardas);
        }

        if (user is null || !await _userManager.CheckPasswordAsync(user, request.Slaptazodis))
        {
            throw new ArgumentException($"Unable to authenticate user {request.PrisijungimoVardas}");
        }

        var authClaims = new List<Claim>
        {
            new(ClaimTypes.Name, user.UserName),
            new(ClaimTypes.Email, user.Email),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = GetToken(authClaims);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private JwtSecurityToken GetToken(IEnumerable<Claim> authClaims)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        return token;
    }

    private string GetErrorsText(IEnumerable<IdentityError> errors)
    {
        return string.Join(", ", errors.Select(error => error.Description).ToArray());
    }
}