using System.Text.Json.Serialization;

namespace Yorozu.Domain.Todos;

/// <summary>
/// Represents the energy level required for a task to be done.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum EnergyLevel {
    Unknown = 0,
    Low = 1,
    Medium = 2,
    High = 3,
}
