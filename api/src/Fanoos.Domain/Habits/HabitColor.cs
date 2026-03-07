using System.Text.Json.Serialization;

namespace Fanoos.Domain.Habits;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum HabitColor {
    Silver,
    Tomato,
    MediumSeaGreen,
    CornflowerBlue,
    Gold
}
