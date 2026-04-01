using Fanoos.Application.Todos.ChangeTodoCompletion;

namespace Fanoos.Presentation.Todos.ChangeTodoCompletion;

internal sealed record ChangeTodoCompletionRequest {
    public required TodoCompletionChangeAction CompletionChangeAction { get; init; }
}
