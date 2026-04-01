using System.Text.Json.Serialization;

namespace Fanoos.Application.Todos.ChangeTodoCompletion;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum TodoCompletionChangeAction {
    Toggle = 0,
    MarkNotDone = 1,
    MarkDone = 2,
}

