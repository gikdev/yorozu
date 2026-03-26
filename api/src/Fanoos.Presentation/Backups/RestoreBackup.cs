using Fanoos.Application.Backups.Common;
using Fanoos.Application.Backups.RestoreBackup;
using Fanoos.Common.Endpoints;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Backups;

internal sealed class RestoreBackup : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPost("backups", Handle)
            .WithName(nameof(RestoreBackup))
            .WithSummary("Restore backup")
            .WithTags(ApiTags.Backups)
            .Accepts<BackupDto>("application/json")
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender,
        [FromBody] BackupDto dto
    ) {
        bool wasSucccessful = await sender.Send(MapToCommand(dto));

        if (!wasSucccessful) return Results.InternalServerError("Something somehow failed...");

        return Results.NoContent();
    }

    private static RestoreBackupCommand MapToCommand(BackupDto dto) {
        return new RestoreBackupCommand {
            Todos = dto.Todos,
            Version = dto.Version,
        };
    }
}
