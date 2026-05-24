using Yorozu.Application.Todos.DeleteTodo;
using Yorozu.Common.Api;
using Yorozu.Common.Endpoints;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Yorozu.Presentation.Todos.DeleteTodo;

internal sealed class DeleteTodoEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapDelete("todos/{id:guid}", Handle)
            .WithName(nameof(DeleteTodo))
            .WithSummary("Delete todo")
            .WithTags(ApiTags.Todos)
            .Produces(StatusCodes.Status204NoContent);
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromRoute] Guid id
    ) {
        var result = await mediator.Send(new DeleteTodoCommand(id));

        return result.MatchResponse();
    }
}
