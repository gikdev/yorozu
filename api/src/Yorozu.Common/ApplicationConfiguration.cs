using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Yorozu.Common.Behaviors;

namespace Yorozu.Common;

public static class ApplicationConfiguration {
    public static IServiceCollection AddApplication(
        this IServiceCollection services,
        params Assembly[] moduleAssemblies
    ) {
        services.AddMediatR(config => {
            config.RegisterServicesFromAssemblies(moduleAssemblies);

            config.AddOpenBehavior(typeof(ExceptionHandlingPipelineBehavior<,>));
        });

        services.AddValidatorsFromAssemblies(moduleAssemblies, includeInternalTypes: true);

        return services;
    }
}
