
using DatingApp.models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Data
{
    public class DataContext : DbContext
    {    
        // DbContextOptions<DataContext>
        
        public DataContext(DbContextOptions options) : base(options) {}
        
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        
        public DbSet<Photo> Photos { get; set; }
    }
}