using Microsoft.EntityFrameworkCore;
using API.Entities;

namespace API.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

        public DbSet<Cart> ShoppingCartItems { get; set; }
        public DbSet<Poster> Posters { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
    }
}