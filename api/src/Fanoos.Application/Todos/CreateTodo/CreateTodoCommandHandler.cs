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
        ErrorOr<Todo> todoResult = Error.Unexpected(description: "Payload processing failed unexpectedly.");

        if (request.RawTodoPayload != null) {
            todoResult = Todo.FromRaw(request.RawTodoPayload.RawInput);
        }

        if (request.NormalTodoPayload != null) {
            todoResult = Todo.Create(
                isArchived: null,
                isDone: request.NormalTodoPayload.IsDone,
                isUrgent: request.NormalTodoPayload.IsUrgent,
                isImportant: request.NormalTodoPayload.IsImportant,
                bucket: request.NormalTodoPayload.Bucket,
                energyLevel: request.NormalTodoPayload.EnergyLevel,
                tag: request.NormalTodoPayload.Tag,
                time: request.NormalTodoPayload.Time,
                project: request.NormalTodoPayload.Project,
                context: request.NormalTodoPayload.Context,
                title: request.NormalTodoPayload.Title
            );
        }

        if (todoResult.IsError) return todoResult.Errors;

        Todo todo = todoResult.Value;

        await todoRepository.AddAsync(todo, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

        return todoResult;
    }
}
