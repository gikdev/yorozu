using Fanoos.Domain.Todos;
using MediatR;
using System.Text.Json.Serialization;

namespace Fanoos.Application.Todos.ListTodos;

public sealed record ListTodosQuery : IRequest<List<Todo>> {
    public required TodoBucket? Bucket { get; init; }
    public required SortBy SortBy { get; init; }
    public required SortOrder SortOrder { get; init; }
    public required string? IncludeQuery { get; init; }
    public required string? ExcludeQuery { get; init; }

    private ListTodosQuery() { }

    public static ListTodosQuery Create(
        TodoBucket? bucket,
        SortBy? sortBy,
        SortOrder? sortOrder,
        string? includeQuery,
        string? excludeQuery
    ) {
        return new ListTodosQuery {
            Bucket = bucket,
            SortBy = sortBy ?? SortBy.None,
            SortOrder = sortOrder ?? SortOrder.Asc,
            IncludeQuery = includeQuery,
            ExcludeQuery = excludeQuery,
        };
    }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortBy {
    None,
    Title,
    Context,
    DueDate,
    Priority,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortOrder {
    Asc,
    Desc,
}
