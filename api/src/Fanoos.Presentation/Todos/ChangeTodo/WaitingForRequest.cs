namespace Fanoos.Presentation.Todos.ChangeTodo;

internal sealed record WaitingForRequest {
    public required string Description { get; init; }
    public required DateTimeOffset ReviewAt { get; init; }
}
