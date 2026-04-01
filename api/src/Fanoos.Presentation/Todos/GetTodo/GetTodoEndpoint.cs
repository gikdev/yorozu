using Fanoos.Application.Todos.GetTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Endpoints;
using Fanoos.Presentation.Todos.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos.GetTodo;

internal sealed class GetTodoEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("todos/{id:guid}", Handle)
            .WithName(nameof(GetTodo))
            .WithSummary("Get todo")
            .WithTags(ApiTags.Todos)
            .Produces<TodoResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromRoute] Guid id
    ) {
        var result = await mediator.Send(new GetTodoQuery(id));

        return result.MatchResponse(
            item => Results.Ok(item.MapToResponse())
        );
    }
}
