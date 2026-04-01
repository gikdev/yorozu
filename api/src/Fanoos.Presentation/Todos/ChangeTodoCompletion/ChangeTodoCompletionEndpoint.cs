using Fanoos.Application.Todos.ChangeTodoCompletion;
using Fanoos.Common.Api;
using Fanoos.Common.Endpoints;
using Fanoos.Presentation.Todos.Common;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos.ChangeTodoCompletion;

internal sealed class ChangeTodoCompletionEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPatch("todos/{id:guid}/completion", Handle)
            .WithName(nameof(ChangeTodoCompletion))
            .WithSummary("Change todo completion")
            .WithTags(ApiTags.Todos)
            .Accepts<ChangeTodoCompletionRequest>("application/json")
            .Produces<TodoResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromRoute] Guid id,
        [FromBody] ChangeTodoCompletionRequest request
    ) {
        var result = await mediator.Send(MapToCommand(request, id));

        return result.MatchResponse(item => Results.Ok(item.MapToResponse()));
    }

    private static ChangeTodoCompletionCommand MapToCommand(ChangeTodoCompletionRequest request, Guid id) {
        return new ChangeTodoCompletionCommand {
            Id = id,
            CompletionChangeAction = request.CompletionChangeAction,
        };
    }
}
