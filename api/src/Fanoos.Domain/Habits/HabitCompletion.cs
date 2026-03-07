namespace Fanoos.Domain.Habits;

public sealed record HabitCompletion {
    public required Guid HabitId { get; set; }
    public required DateOnly Day { get; set; }
    public required HabitCompletionStatus Status { get; set; }
}
