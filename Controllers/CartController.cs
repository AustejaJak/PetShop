using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;

namespace API.Logic
{
  public class CartController : IDisposable
  {
    public string ShoppingCartId { get; set; } = null!;
    private readonly ApplicationDbContext _db;
     private readonly IHttpContextAccessor _httpContextAccessor;
    public const string CartSessionKey = "CartId";

  public CartController(DbContextOptions<ApplicationDbContext> options, IHttpContextAccessor httpContextAccessor)
    {
            _db = new ApplicationDbContext(options);
            _httpContextAccessor = httpContextAccessor;
    }

public void AddToCart(int id)
{         
    ShoppingCartId = GetCartId();

    var cartItem = _db.ShoppingCartItems.SingleOrDefault(c => c.KrepselioNr.ToString() == ShoppingCartId && c.SkelbimoNr == id);

    if (cartItem == null)
    {
        // Create a new cart item if no cart item exists.  
        var posterItem = _db.Posters.SingleOrDefault(p => p.SkelbimoNr == id);

        cartItem = new Cart
        {
            SkelbimoNr = id,
            KrepselioNr = Convert.ToInt32(ShoppingCartId),
            PosterItem = posterItem!,
            VartotojoNr = 1,
            SesijosNr = 1,
            ProduktuSuma = (posterItem?.Kaina ?? 0) * 1, // Assuming Kiekis is 1 initially
        };

        _db.ShoppingCartItems.Add(cartItem);
    }
    else
    {
        // If the item does exist in the cart,                  
        // then add one to the quantity.                 
        cartItem.Kiekis++;
        cartItem.ProduktuSuma = (cartItem.PosterItem?.Kaina ?? 0) * cartItem.Kiekis;
    }
    _db.SaveChanges();
}


    public void Dispose()
    {
      if (_db != null)
      {
        _db?.Dispose();
      }
    }

        public string GetCartId()
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext?.Session.GetString(CartSessionKey) == null)
            {
                if (!string.IsNullOrWhiteSpace(httpContext?.User.Identity.Name))
                {
                    httpContext.Session.SetString(CartSessionKey, httpContext.User.Identity.Name);
                }
                else
                {
                    // Generate a new random GUID using System.Guid class.     
                    Guid tempCartId = Guid.NewGuid();
                    httpContext?.Session.SetString(CartSessionKey, tempCartId.ToString());
                }
            }
            return httpContext.Session.GetString(CartSessionKey);
        }

    public List<Cart> GetCartItems()
    {
      ShoppingCartId = GetCartId();

      return _db.ShoppingCartItems.Where(
          c => c.KrepselioNr.ToString() == ShoppingCartId).ToList();
    }
  }
}