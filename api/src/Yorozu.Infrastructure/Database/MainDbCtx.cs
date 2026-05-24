using Yorozu.Common.Data;
using Yorozu.Domain.Todos;
using Yorozu.Infrastructure.Todos;
using Microsoft.EntityFrameworkCore;

namespace Yorozu.Infrastructure.Database;

public sealed class MainDbCtx(DbContextOptions<MainDbCtx> options) : DbContext(options), IUnitOfWork {
    // internal DbSet<Todo> Todos => Set<Todo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.HasDefaultSchema(Schemas.Main);

        // modelBuilder.ApplyConfiguration(new TodoConfiguration());
    }
}
