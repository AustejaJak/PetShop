using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;

namespace API.Controllers
{
    [Route("api/[controller]")]
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
    }
}
