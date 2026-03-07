using FluentValidation;

namespace Fanoos.Application.Todos.CreateTodo;

public class CreateTodoCommandValidator : AbstractValidator<CreateTodoCommand> {
    public CreateTodoCommandValidator() {
        RuleFor(x => x)
            .Must(x => (x.RawTodoPayload is null) ^ (x.NormalTodoPayload is null))
            .WithMessage("Provide either RawTodoPayload or NormalTodoPayload (but not both).");

        When(x => x.NormalTodoPayload is not null, () => {
            RuleFor(x => x.NormalTodoPayload!.Time)
                .GreaterThanOrEqualTo(0)
                .When(x => x.NormalTodoPayload!.Time.HasValue)
                .WithMessage("Time must be a positive value.");
        });
    }
}

