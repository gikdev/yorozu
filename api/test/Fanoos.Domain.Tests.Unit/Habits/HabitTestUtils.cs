#pragma warning disable CA2211 // Non-constant fields should not be visible
#pragma warning disable CA1515 // Consider making public types internal

using ErrorOr;
using Fanoos.Domain.Habits;

namespace Fanoos.Domain.Tests.Unit.Habits;

public static class HabitTestUtils {
    public static string ValidTitle = "Brush teeth";

    public static ErrorOr<Habit> CreateHabit(
        string? name = null,
        string? description = null,
        int? idealCount = null,
        HabitColor? color = null,
        bool? isArchived = null,
        Guid? id = null
    ) {
        return Habit.Create(
            id: id,
            isArchived: isArchived,
            color: color,
            idealCount: idealCount,
            description: description,
            name: name ?? ValidTitle
        );
    }
}
