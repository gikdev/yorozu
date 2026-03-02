using System.Text.Json.Serialization;

namespace Fanoos.Domain.Todos;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnergyLevel {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
}
