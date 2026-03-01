using Fanoos.Common.Data;
using Fanoos.Domain.Todos;
using Fanoos.Infrastructure.Todos;
using Microsoft.EntityFrameworkCore;

namespace Fanoos.Infrastructure.Database;

public sealed class MainDbCtx(DbContextOptions<MainDbCtx> options) : DbContext(options), IUnitOfWork {
    internal DbSet<Todo> Todos => Set<Todo>();

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.HasDefaultSchema(Schemas.Main);

        modelBuilder.ApplyConfiguration(new TodoConfiguration());
    }
}
