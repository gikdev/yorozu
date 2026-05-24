using System.Text.Json.Serialization;

namespace Yorozu.Domain.Todos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoSortBy {
    None,
    Title,
    DueDate,
    Priority,
}
