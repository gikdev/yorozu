using System.Text.Json.Serialization;

namespace Yorozu.Presentation.Todos.ListTodos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnergyLevelFilter {
    All = -1,
    Unknown = 0,
    Low = 1,
    Medium = 2,
    High = 3,
}
