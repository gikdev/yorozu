using ErrorOr;

namespace Fanoos.Domain.Todos;

public static class TodoErrors {
    public readonly static Error RawInputIsEmpty = Error.Validation(
        description: "Todo's raw input is empty!",
        code: "Todo.RawInputIsEmpty"
    );

    public readonly static Error TitleIsEmpty = Error.Validation(
        description: "Todo's title is empty!",
        code: "Todo.TitleIsEmpty"
    );
}
