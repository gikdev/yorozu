using System.Text.Json.Serialization;

namespace Fanoos.Domain.Todos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoBucket {
    Uncategorized = 0,
    NextActions = 1,
    Waiting = 2,
    SomedayMaybe = 3,
}
