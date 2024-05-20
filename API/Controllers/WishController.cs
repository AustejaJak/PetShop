using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class WishController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wish>>> GetWishes()
        {
            var wishes = await _context.Wishes.ToListAsync();
            return Ok(wishes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Wish>> GetWish(int id)
        {
            var wish = await _context.Wishes.FindAsync(id);

            if (wish == null)
            {
                return NotFound();
            }

            return Ok(wish);
        }

        [HttpPost]
        public async Task<ActionResult<Wish>> AddWish(Wish model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var wish = new Wish
            {
                ProduktoPavadinimas = model.ProduktoPavadinimas,
                Kategorija = model.Kategorija,
                Kiekis = model.Kiekis,
                Tiekejas = model.Tiekejas
            };

            _context.Wishes.Add(wish);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWish), new { id = wish.NoroNr }, wish);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWish(int id, Wish model)
        {
            if (id != model.NoroNr)
            {
                return BadRequest("Invalid ID");
            }

            var wish = await _context.Wishes.FindAsync(id);
            if (wish == null)
            {
                return NotFound();
            }

            wish.ProduktoPavadinimas = model.ProduktoPavadinimas;
            wish.Kategorija = model.Kategorija;
            wish.Kiekis = model.Kiekis;
            wish.Tiekejas = model.Tiekejas;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WishExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool WishExists(int id)
        {
            return _context.Wishes.Any(e => e.NoroNr == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWish(int id)
        {
            var wish = await _context.Wishes.FindAsync(id);
            if (wish == null)
            {
                return NotFound();
            }

            _context.Wishes.Remove(wish);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}