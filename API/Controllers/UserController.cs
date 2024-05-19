using API.Data; // Import your DbContext
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _context; // Your DbContext

    public UserController(ApplicationDbContext context)
    {
        _context = context;
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

}
