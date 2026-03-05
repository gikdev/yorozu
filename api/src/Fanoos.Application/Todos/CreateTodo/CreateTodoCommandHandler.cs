using ErrorOr;
using Fanoos.Common.Data;
using Fanoos.Domain.Todos;
using MediatR;

namespace Fanoos.Application.Todos.CreateTodo;

internal sealed class CreateTodoCommandHandler(
    ITodoRepository todoRepository,
    IUnitOfWork unitOfWork
) : IRequestHandler<CreateTodoCommand, ErrorOr<Todo>> {
    public async Task<ErrorOr<Todo>> Handle(CreateTodoCommand request, CancellationToken cancellationToken) {
        ErrorOr<Todo> todoResult = Todo.FromRaw(request.RawTitle);

        if (todoResult.IsError) return todoResult.Errors;

        Todo todo = todoResult.Value;

        await todoRepository.AddAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todoResult;
    }
}
