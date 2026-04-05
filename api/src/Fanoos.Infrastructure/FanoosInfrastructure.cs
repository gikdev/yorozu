using Fanoos.Application.Todos;
using Fanoos.Common;
using Fanoos.Common.Data;
using Fanoos.Common.Endpoints;
using Fanoos.Infrastructure.Database;
using Fanoos.Infrastructure.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fanoos.Infrastructure;

public static class FanoosInfrastructure {
    public static IServiceCollection AddFanoosInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    ) {
        services.AddDbContext<MainDbCtx>((sp, options) =>
            options
                .UseSqlite(
                    configuration.GetConnectionString("Database"),
                    options => options
                        .MigrationsHistoryTable(HistoryRepository.DefaultTableName, Schemas.Main)
                )
                .UseSnakeCaseNamingConvention()
        );

        services.AddApplication(Application.AssemblyReference.Assembly);

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<MainDbCtx>());

        services.AddScoped<ITodoRepository, TodoRepository>();

        services.AddEndpoints(Presentation.AssemblyReference.Assembly);

        return services;
    }
}
