using ErrorOr;

namespace Fanoos.Domain.Todos;

public static class TodoErrors {
    public readonly static Error RawInputIsEmpty = Error.Validation(
        description: "Todo's raw input is empty!",
        code: "Todo.RawInputIsEmpty"
    );
}
