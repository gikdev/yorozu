using ErrorOr;

namespace Fanoos.Domain.Todos;

public static class TodoErrors {
    public static readonly Error UrgentTodoCannotBeInSomedayBucket = Error.Validation(
        description: "A todo cannot be both urgent and in the Someday/Maybe bucket.",
        code: "Todo.UrgentInSomedayBucket"
    );
}
