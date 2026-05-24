using Yorozu.Presentation.Todos.Common;

namespace Yorozu.Presentation.Todos.ListTodos;

internal sealed record TodoListResponse {
    public required List<TodoResponse> Items { get; init; }
}
