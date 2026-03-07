using ErrorOr;

namespace Fanoos.Domain.Habits;

public static class HabitErrors {
    public readonly static Error NameIsEmpty = Error.Validation(
        description: "Habit's name is empty!",
        code: "Habit.NameIsEmpty"
    );
}
