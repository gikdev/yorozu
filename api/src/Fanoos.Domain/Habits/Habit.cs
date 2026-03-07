#pragma warning disable CA1034 // Nested types should not be visible
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

using ErrorOr;
using Fanoos.Common.Domain;

namespace Fanoos.Domain.Habits;

public sealed class Habit : IAggregateRoot {
    public static class Defaults {
        public const int IdealCount = 1;
        public const HabitColor Color = HabitColor.Silver;
        public const bool IsArchived = false;
    }

    public Guid Id { get; private init; }
    public string Name { get; private set; }
    public string? Description { get; private set; }
    public int IdealCount { get; private set; }
    public HabitColor Color { get; private set; }
    public bool IsArchived { get; private set; }

    private Habit() { }

    public static ErrorOr<Habit> Create(
        string name,
        string? description,
        int? idealCount,
        HabitColor? color,
        bool? isArchived,
        Guid? id = null
    ) {
        if (string.IsNullOrWhiteSpace(name))
            return HabitErrors.NameIsEmpty;

        var habit = new Habit {
            Id = id ?? Guid.NewGuid(),
            Name = name,
            Description = description,
            IdealCount = idealCount ?? Defaults.IdealCount,
            Color = color ?? Defaults.Color,
            IsArchived = isArchived ?? Defaults.IsArchived,
        };

        return habit;
    }
}
