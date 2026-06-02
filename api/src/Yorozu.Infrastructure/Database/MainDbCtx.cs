using Microsoft.EntityFrameworkCore;
using Yorozu.Common.Data;

namespace Yorozu.Infrastructure.Database;

public sealed class MainDbCtx(DbContextOptions<MainDbCtx> options) : DbContext(options), IUnitOfWork {
    // internal DbSet<Todo> Todos => Set<Todo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.HasDefaultSchema(Schemas.Main);

        // modelBuilder.ApplyConfiguration(new TodoConfiguration());
    }
}
