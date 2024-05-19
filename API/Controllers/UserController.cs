using API.Data; // Import your DbContext
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using API.Entities;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context; // Your DbContext
    private readonly UserManager<User> _userManager;

    public UserController(ApplicationDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet("get-username")]
    [Authorize] // Require authorization for this endpoint
    public IActionResult GetUsername()
    {
        // Get the username from the claims
        var usernameClaim = User.FindFirstValue(ClaimTypes.Name);

        if (usernameClaim == null)
        {
            return NotFound();
        }

        return Ok(new { Username = usernameClaim });
    }

    [HttpGet("get-users")]
    [Authorize]
    public IActionResult GetUsers()
    {
        var users = _context.Users.ToList();

        return Ok(users);
    }

    [HttpDelete("delete-user/{userId}")]
    [Authorize]
    public async Task<bool> DeleteUserByIdAsync(string userId)
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true; // User deleted successfully
            }
            else
            {
                return false; // User not found
            }
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine($"Error deleting user: {ex.Message}");
            return false; // Error occurred while deleting user
        }
    }

    [HttpPost("assign-admin-role/{userId}")]
    [Authorize(Roles = "Admin")] // Only allow admins to assign admin role
    public async Task<IActionResult> AssignAdminRole(string userId)
    {
        try
        {
            // Get the current user's ID from the JWT token
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check if the user is trying to assign admin role to themselves
            if (currentUserId == userId)
            {
                return BadRequest("You cannot assign the Admin role to yourself.");
            }

            // Get the user by ID using UserManager
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user already has the Admin role using UserManager
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("Admin"))
            {
                return BadRequest("User already has the Admin role.");
            }

            // Remove User role if exists
            if (userRoles.Contains("User"))
            {
                await _userManager.RemoveFromRoleAsync(user, "User");
            }

            // Add the Admin role to the user using UserManager
            await _userManager.AddToRoleAsync(user, "Admin");

            return Ok("Admin role assigned successfully.");
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine($"Error assigning admin role: {ex.Message}");
            return StatusCode(500, "An error occurred while assigning admin role.");
        }
    }

    [HttpPost("assign-user-role/{userId}")]
    [Authorize(Roles = "Admin")] // Only allow admins to assign user role
    public async Task<IActionResult> AssignUserRole(string userId)
    {
        try
        {
            // Get the current user's ID from the JWT token
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Check if the user is trying to assign user role to themselves
            if (currentUserId == userId)
            {
                return BadRequest("You cannot assign the User role to yourself.");
            }

            // Get the user by ID using UserManager
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Check if the user already has the User role using UserManager
            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Contains("User"))
            {
                return BadRequest("User already has the User role.");
            }

            // Remove Admin role if exists
            if (userRoles.Contains("Admin"))
            {
                await _userManager.RemoveFromRoleAsync(user, "Admin");
            }

            // Add the User role to the user using UserManager
            await _userManager.AddToRoleAsync(user, "User");

            return Ok("User role assigned successfully.");
        }
        catch (Exception ex)
        {
            // Handle exception
            Console.WriteLine($"Error assigning user role: {ex.Message}");
            return StatusCode(500, "An error occurred while assigning user role.");
        }
    }

}
