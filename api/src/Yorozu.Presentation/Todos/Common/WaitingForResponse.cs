namespace Yorozu.Presentation.Todos.Common;

internal sealed record WaitingForResponse {
    public required string Description { get; init; }
    public required DateTimeOffset ReviewAt { get; init; }
}
