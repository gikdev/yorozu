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

    private readonly List<HabitCompletion> _completions = [];

    public Guid Id { get; private init; }
    public string Name { get; private set; }
    public string? Description { get; private set; }
    public int IdealCount { get; private set; }
    public HabitColor Color { get; private set; }
    public bool IsArchived { get; private set; }
    public IReadOnlyList<HabitCompletion> Completions => _completions.AsReadOnly();

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

    public HabitCompletion? GetCompletionByDate(DateOnly today) {
        var completion = _completions.FirstOrDefault(x => x.Day == today);

        return completion;
    }

    public ErrorOr<HabitCompletion> CycleCompletionStatus(DateOnly today) {
        // 1. Ensure completion exists (or create it)
        var completionResult = EnsureCompletionExists(today);
        if (completionResult.IsError) return completionResult.Errors;
        var completion = completionResult.Value;

        // 2. Cycle the Status
        completion.Status = completion.Status switch {
            HabitCompletionStatus.None => HabitCompletionStatus.Done,
            HabitCompletionStatus.Done => HabitCompletionStatus.Skipped,
            HabitCompletionStatus.Skipped => HabitCompletionStatus.None,
            _ => throw new InvalidOperationException("Invalid habit completion status state.")
        };

        return completion;
    }

    private ErrorOr<HabitCompletion> EnsureCompletionExists(DateOnly today) {
        var existing = GetCompletionByDate(today);

        if (existing != null)
            return existing;

        var newCompletion = new HabitCompletion {
            Day = today,
            HabitId = Id,
            Status = HabitCompletionStatus.None
        };

        _completions.Add(newCompletion);

        return newCompletion;
    }
}
