using ErrorOr;

namespace Fanoos.Domain.Habits;

public static class HabitErrors {
    public readonly static Error NameIsEmpty = Error.Validation(
        description: "Habit's name is empty!",
        code: "Habit.NameIsEmpty"
    );

    public readonly static Error DuplicatedCompletion = Error.Validation(
        description: "This habit completion is duplicated!",
        code: "Habit.DuplicateCompletion"
    );
}
