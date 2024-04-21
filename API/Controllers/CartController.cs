using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;

namespace API.Logic
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase, IDisposable
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
            if (cartItem == null)
            {
                var poster = _db.Posters.FirstOrDefault(p => p.SkelbimoNr == id);
                if (poster == null)
                {
                    return NotFound("Poster not found.");
                }

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
                cartItem.Kiekis++;
            }
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
            var sessionCartId = _httpContextAccessor.HttpContext.Session.GetString(CartSessionKey);
            if (string.IsNullOrEmpty(sessionCartId))
            {
                sessionCartId = _httpContextAccessor.HttpContext.User.Identity?.Name ?? Guid.NewGuid().ToString();
                _httpContextAccessor.HttpContext.Session.SetString(CartSessionKey, sessionCartId);
            }
            return sessionCartId;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
