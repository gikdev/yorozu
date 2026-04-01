using FluentValidation;

namespace Fanoos.Presentation.Todos.CreateTodo;

internal sealed class CreateTodoRequestValidator : AbstractValidator<CreateTodoRequest> {
    public CreateTodoRequestValidator() {
        RuleFor(x => x.Title)
            .NotEmpty();

        When(x => x.WaitingForInfo != null, () => {
            RuleFor(x => x.WaitingForInfo!.Description)
                .NotEmpty();

            RuleFor(x => x.WaitingForInfo!.ReviewAt)
                .NotEmpty();
        });
    }
}
