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
        [FromQuery(Name = "archived_status")] DoneStatus archivedStatus = DoneStatus.Todo,
        [FromQuery(Name = "bucket")] TodoBucket? bucket = null,
        [FromQuery(Name = "sort_by")] SortBy? sortBy = null,
        [FromQuery(Name = "sort_order")] SortOrder? sortOrder = null,
        [FromQuery(Name = "q")] string? includeQuery = null,
        [FromQuery(Name = "exclude_query")] string? excludeQuery = null
    ) {
        List<Todo> todos = await mediator.Send(
            ListTodosQuery.Create(
                excludeQuery: excludeQuery,
                includeQuery: includeQuery,
                sortOrder: sortOrder,
                sortBy: sortBy,
                bucket: bucket,
                doneStatus: archivedStatus
            )
        );

        return Results.Ok(MapToListResponse(todos));
    }

    private sealed record TodoListResponse {
        public required List<TodoResponse> Items { get; init; }
    }

    private static TodoListResponse MapToListResponse(List<Todo> todos) {
        return new TodoListResponse {
            Items = todos.ConvertAll(t => t.MapToResponse()),
        };
    }
}
