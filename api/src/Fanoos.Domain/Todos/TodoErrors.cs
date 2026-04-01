using ErrorOr;

namespace Fanoos.Domain.Todos;

public static class TodoErrors {
    public static readonly Error UrgentTodoCannotBeInSomedayBucket = Error.Validation(
        description: "A todo cannot be both urgent and in the Someday/Maybe bucket.",
        code: "Todo.UrgentInSomedayBucket"
    );

    public static readonly Error WaitingBucketNeedsWaitingInfo = Error.Validation(
        description: "To properly set a todo's bucket to 'waiting', you need to provide waiting info too!",
        code: "Todo.WaitingBucketNeedsWaitingInfo"
    );

    public static readonly Error CantHaveWaitingInfoWhenNotInWaitingBucket = Error.Validation(
        description: "You can't have waiting info, without the todo being in the waiting bucket.",
        code: "Todo.CantHaveWaitingInfoWhenNotInWaitingBucket"
    );
}
