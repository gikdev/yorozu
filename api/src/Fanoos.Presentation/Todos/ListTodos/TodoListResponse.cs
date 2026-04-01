using Fanoos.Presentation.Todos.Common;

namespace Fanoos.Presentation.Todos.ListTodos;

internal sealed record TodoListResponse {
    public required List<TodoResponse> Items { get; init; }
}
