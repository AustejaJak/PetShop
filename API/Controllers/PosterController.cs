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

        [HttpPost]
        public async Task<ActionResult<Poster>> AddPoster(Poster model)
        {
            model.SkelbimoValidacija="true";
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var poster = new Poster
            {
                GyvunuKategorija = model.GyvunuKategorija,
                Pavadinimas = model.Pavadinimas,
                Kiekis = model.Kiekis,
                Kaina = model.Kaina,
                Aprasas = model.Aprasas,
                Nuotrauka = model.Nuotrauka,
                Ivertinimas = 0,
                SkelbimoValidacija = model.SkelbimoValidacija
            };

            _context.Posters.Add(poster);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPosters), new { id = poster.SkelbimoNr }, poster);
        }

    }
}
