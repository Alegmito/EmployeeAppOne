using Microsoft.EntityFrameworkCore;

namespace EmployeeAppOne.Models
{
    public class EmployeeAppContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; } = null!;
        public EmployeeAppContext(DbContextOptions<EmployeeAppContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Employee>().ToTable("Employee");
        }
    }
}
