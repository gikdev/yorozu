using System.Text.Json.Serialization;

namespace Yorozu.Domain.Todos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoSortOrder {
    Asc,
    Desc,
}
