namespace Fanoos.Presentation.Todos.Common;

internal sealed record WaitingForRequest {
    public required string Description { get; init; }
    public required DateTimeOffset ReviewAt { get; init; }
}
