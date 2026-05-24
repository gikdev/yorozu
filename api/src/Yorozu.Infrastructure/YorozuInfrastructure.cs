using Yorozu.Application.Todos;
using Yorozu.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Endpoints;
using Yorozu.Infrastructure.Database;
using Yorozu.Infrastructure.Todos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Yorozu.Infrastructure;

public static class YorozuInfrastructure {
    public static IServiceCollection AddYorozuInfrastructure(
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

        // services.AddScoped<ITodoRepository, TodoRepository>();

        services.AddEndpoints(Presentation.AssemblyReference.Assembly);

        return services;
    }
}
