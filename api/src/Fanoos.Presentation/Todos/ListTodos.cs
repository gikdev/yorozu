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
        [FromQuery(Name = "bucket")] TodoBucketFilter bucketFilter = TodoBucketFilter.All,
        [FromQuery(Name = "sort_by")] TodoSortBy sortBy = TodoSortBy.None,
        [FromQuery(Name = "sort_order")] TodoSortOrder sortOrder = TodoSortOrder.Asc,
        [FromQuery(Name = "q")] string? includeQuery = null,
        [FromQuery(Name = "exclude_query")] string? excludeQuery = null,
        [FromQuery(Name = "available_energy_level")] EnergyLevel? availableEnergyLevel = null,
        [FromQuery(Name = "available_pomodoros")] byte? availablePomodoros = null
    ) {
        var dto = new OrganizeTodosDto {
            AvailableEnergyLevel = availableEnergyLevel,
            AvailablePomodoros = availablePomodoros,
            Bucket = bucketFilter switch {
                TodoBucketFilter.Uncategorized => TodoBucket.Uncategorized,
                TodoBucketFilter.NextActions => TodoBucket.NextActions,
                TodoBucketFilter.SomedayMaybe => TodoBucket.SomedayMaybe,
                TodoBucketFilter.Waiting => TodoBucket.Waiting,
                _ => null,
            },
            ExcludeQuery = excludeQuery,
            IncludeQuery = includeQuery,
            SortBy = sortBy,
            SortOrder = sortOrder,
        };
        var query = new ListTodosQuery(dto);
        List<Todo> todos = await mediator.Send(query);

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
