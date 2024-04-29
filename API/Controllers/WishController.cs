using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public WishController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Wish>> GetWishes()
        {
            var wishes = _context.Wishes.ToList();
            return Ok(wishes);
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

            return CreatedAtAction(nameof(GetWishes), new { id = wish.NoroNr }, wish);
        }
    }
}
