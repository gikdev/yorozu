using Yorozu.Application.Todos.ChangeTodoCompletion;

namespace Yorozu.Presentation.Todos.ChangeTodoCompletion;

internal sealed record ChangeTodoCompletionRequest {
    public required TodoCompletionChangeAction CompletionChangeAction { get; init; }
}
