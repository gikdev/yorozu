using System.Text.Json.Serialization;

namespace Fanoos.Domain.Habits;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum HabitCompletionStatus {
    None = 0,
    Done = 1,
    Skipped = 2,
}
