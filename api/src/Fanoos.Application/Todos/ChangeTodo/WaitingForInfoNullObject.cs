#pragma warning disable CA1002 // Do not expose generic lists

using Fanoos.Common.Dto;
using Fanoos.Domain.Todos;

namespace Fanoos.Application.Todos.ChangeTodo;

public sealed record WaitingForInfoNullObject : NullObject<WaitingForInfo?>;
