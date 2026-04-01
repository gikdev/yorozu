using System.Text.Json.Serialization;

namespace Fanoos.Domain.Todos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoSortOrder {
    Asc,
    Desc,
}
