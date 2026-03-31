using Fanoos.Application.Todos.DeleteTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Endpoints;
using Fanoos.Domain.Todos;
using Fanoos.Presentation.Todos.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos;

internal sealed class DeleteTodo : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapDelete("todos/{id:guid}", Handle)
            .WithName(nameof(DeleteTodo))
            .WithSummary("Delete todo")
            .WithTags(ApiTags.Todos)
            .Produces(201);
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromRoute] Guid id
    ) {
        var result = await mediator.Send(new DeleteTodoCommand(id));

        return result.MatchResponse();
    }
}
