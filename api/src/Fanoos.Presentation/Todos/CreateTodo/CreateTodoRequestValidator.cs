using FluentValidation;

namespace Fanoos.Presentation.Todos.CreateTodo;

internal sealed class CreateTodoRequestValidator : AbstractValidator<CreateTodoRequest> {
    public CreateTodoRequestValidator() {
        RuleFor(x => x.Title)
            .NotEmpty();
    }
}
