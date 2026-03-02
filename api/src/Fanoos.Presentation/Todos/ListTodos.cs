using Fanoos.Application.Todos.ListTodos;
using Fanoos.Common.Endpoints;
using Fanoos.Domain.Todos;
using Fanoos.Presentation.Todos.Common;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos;

internal sealed class ListTodos : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapGet("todos", Handle)
            .WithName(nameof(ListTodos))
            .WithSummary("List todos")
            .WithTags(ApiTags.Todos)
            .Produces<TodoListResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromQuery(Name = "include_archived")] bool includeArchived = false
    ) {
        List<Todo> todos = await mediator.Send(
            new ListTodosQuery {
                IncludeArchived = includeArchived
            }
        );

        return Results.Ok(MapToListResponse(todos, includeArchived));
    }

    private sealed record TodoListResponse {
        public required List<TodoResponse> Items { get; init; }
        public required bool IncludesArchived { get; init; }
    }

    private static TodoListResponse MapToListResponse(List<Todo> todos, bool includesArchived) {
        return new TodoListResponse {
            Items = todos.ConvertAll(t => t.MapToResponse()),
            IncludesArchived = includesArchived,
        };
    }
}
