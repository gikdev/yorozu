using System.Text.Json.Serialization;

namespace Fanoos.Presentation.Todos.ListTodos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoBucketFilter {
    All = 0,
    Uncategorized = 1,
    NextActions = 2,
    Waiting = 3,
    SomedayMaybe = 4,
}
