using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Models
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions options) :base(options) { }

        public DbSet<Employee> Employees { get; set; }

    }
}
