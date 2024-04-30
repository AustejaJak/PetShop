using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class PosterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PosterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Poster>> GetPosters()
        {
            var posters = _context.Posters.ToList();
            return Ok(posters);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Poster>> GetPosterById(int id)
        {
            var poster = await _context.Posters.FindAsync(id);

            if (poster == null)
            {
                return NotFound();
            }

            return Ok(poster);
        }

        [HttpPost("RemoveQuantity/{id}")]
        public IActionResult RemoveQuantity(int id)
        {
            var poster = _context.Posters.FirstOrDefault(p => p.SkelbimoNr == id);
            
            if (poster == null)
            {
                return NotFound("Skelbimų nėra.");
            }

            if (poster.Kiekis > 0)
            {
                poster.Kiekis--;
            }
            else
            {
                return BadRequest("Skelbimo nėra.");
            }

            _context.SaveChanges();

            return Ok();
        }
    }
}
