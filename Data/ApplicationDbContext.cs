using BackendValkrusman.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using static BackendValkrusman.Models.Toode;

namespace BackendValkrusman.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Toode> Tooted{ get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}
