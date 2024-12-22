using Microsoft.EntityFrameworkCore;
using PhongPerfume.Models;

namespace PhongPerfume.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Perfume> Perfumes { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Warranty> Warrantys { get; set; }

    }
}
