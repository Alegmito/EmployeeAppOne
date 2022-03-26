using Microsoft.EntityFrameworkCore;

namespace EmployeeAppOne.Models
{
    public class EmployeeAppContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Role> Roles { get; set; } = null!;
        public EmployeeAppContext(DbContextOptions<EmployeeAppContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasIndex(c => c.Email)
                .IsUnique();




            //modelBuilder.Entity<UserRole>()
            //    .HasKey(t => new {t.Post, })

            //modelBuilder.Entity<UserRole>()
            //    .HasOne(e => e.Role)
            //    .WithMany(e => e.UserRoles);

        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is Employee &&
                (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                ((Employee)entry.Entity).ModifiedDate = DateTime.UtcNow;
            }

            return base.SaveChangesAsync(cancellationToken);

        }
        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is Employee && 
                ( e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entry in entries)
            {
                ((Employee)entry.Entity).ModifiedDate = DateTime.UtcNow;
            }

            return base.SaveChanges();

        }
    }
}
