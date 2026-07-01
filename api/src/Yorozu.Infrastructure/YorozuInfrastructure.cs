using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Yorozu.Application.Common;
using Yorozu.Common;
using Yorozu.Common.Data;
using Yorozu.Common.Endpoints;
using Yorozu.Infrastructure.ConsumptionTrackLists;
using Yorozu.Infrastructure.Database;

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
        );

        services.AddApplication(Application.AssemblyReference.Assembly);

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<MainDbCtx>());

        services.AddScoped<IConsumptionTrackListRepository, ConsumptionTrackListRepository>();

        services.AddEndpoints(Presentation.AssemblyReference.Assembly);

        return services;
    }
}
