using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Logic
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public const string CartSessionKey = "CartId";

        public CartController(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _db = dbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("AddToCart/{id}")]
        public IActionResult AddToCart(int id)
        {
            var shoppingCartId = GetCartId();

            var cartItem = _db.CartItems.FirstOrDefault(c => c.KrepselioNr == shoppingCartId && c.SkelbimoNr == id);
            var poster = _db.Posters.FirstOrDefault(p => p.SkelbimoNr == id);

            if (poster == null)
            {
                return NotFound("Poster not found.");
            }

            if (cartItem == null)
            {
                if (poster.Kiekis == 0)
                {
                    return BadRequest("Poster is out of stock.");
                }

                poster.Kiekis--;

                cartItem = new CartItem
                {
                    KrepselioSkelbimoNr = Guid.NewGuid().ToString(),
                    SkelbimoNr = id,
                    KrepselioNr = shoppingCartId,
                    Kiekis = 1,
                    SukurimoData = DateTime.Now
                };
                _db.CartItems.Add(cartItem);
            }
            else
            {
                if (poster.Kiekis == 0)
                {
                    return BadRequest("Adding one more item exceeds available stock for this poster.");
                }
                else if (poster.Kiekis > 0) // Only decrement if stock is greater than 0
                {
                    poster.Kiekis--; // Decrease the stock of the poster
                }
                cartItem.Kiekis++;
            }

            _db.SaveChanges();

            return Ok();
        }


        [HttpPost("RemoveFromCart/{id}")]
        public IActionResult RemoveFromCart(int id)
        {
            var shoppingCartId = GetCartId();

            // Find the cart item
            var cartItem = _db.CartItems.FirstOrDefault(c => c.KrepselioNr == shoppingCartId && c.SkelbimoNr == id);
            var poster = _db.Posters.FirstOrDefault(p => p.SkelbimoNr == id);
            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            // Decrease the quantity or remove the item
            if (cartItem.Kiekis > 1)
            {
                cartItem.Kiekis--;
            }
            else
            {
                _db.CartItems.Remove(cartItem);
            }

            poster.Kiekis++; // Increase the stock of the poster

            // Save the changes to the database
            _db.SaveChanges();

            return Ok();
        }


        [HttpGet("GetCartItems")]
        public ActionResult<List<CartItem>> GetCartItems()
        {
            var shoppingCartId = GetCartId();

            var cartItems = _db.CartItems.Where(c => c.KrepselioNr == shoppingCartId).ToList();
            return Ok(cartItems);
        }

        [HttpGet("GetcartId")]
        private string GetCartId()
        {
            // Get the username from the JWT token
            var username = User.Identity?.Name;

            // Use the username as the cart identifier
            if (string.IsNullOrEmpty(username))
            {
                // If the username is not available (which shouldn't happen in authenticated requests), generate a new identifier
                return Guid.NewGuid().ToString();
            }

            return username;
        }

    }
}
