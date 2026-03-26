using Fanoos.Application.Backups.Common;
using Fanoos.Application.Backups.GetBackup;
using Fanoos.Common.Endpoints;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Backups;

internal sealed class GetBackup : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("backups", Handle)
            .WithName(nameof(GetBackup))
            .WithSummary("Get backup")
            .WithTags(ApiTags.Backups)
            .Produces<BackupDto>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender sender
    ) {
        var result = await sender.Send(new GetBackupQuery());

        return Results.Ok(result);
    }
}
