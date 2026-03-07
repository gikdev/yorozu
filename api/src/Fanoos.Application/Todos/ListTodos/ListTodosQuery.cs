using Fanoos.Domain.Todos;
using MediatR;
using System.Text.Json.Serialization;

namespace Fanoos.Application.Todos.ListTodos;

public record ListTodosQuery : IRequest<List<Todo>> {
    public required ArchivedStatus ArchivedStatus { get; init; }
    public required TodoBucket? Bucket { get; init; }
    public required SortBy SortBy { get; init; }
    public required SortOrder SortOrder { get; init; }
    public required string? IncludeQuery { get; init; }
    public required string? ExcludeQuery { get; init; }

    private ListTodosQuery() { }

    public static ListTodosQuery Create(
        ArchivedStatus? archivedStatus,
        TodoBucket? bucket,
        SortBy? sortBy,
        SortOrder? sortOrder,
        string? includeQuery,
        string? excludeQuery
    ) {
        return new ListTodosQuery {
            ArchivedStatus = archivedStatus ?? ArchivedStatus.Active,
            Bucket = bucket,
            SortBy = sortBy ?? SortBy.None,
            SortOrder = sortOrder ?? SortOrder.Asc,
            IncludeQuery = includeQuery,
            ExcludeQuery = excludeQuery,
        };
    }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ArchivedStatus {
    All,
    Archived,
    Active,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortBy {
    None,
    Time,
    Context,
    Project,
    Tag,
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum SortOrder {
    Asc,
    Desc,
}
