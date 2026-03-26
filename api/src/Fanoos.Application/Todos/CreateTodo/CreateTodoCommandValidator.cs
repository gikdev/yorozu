using FluentValidation;

namespace Fanoos.Application.Todos.CreateTodo;

public class CreateTodoCommandValidator : AbstractValidator<CreateTodoCommand> {
    public CreateTodoCommandValidator() {
        RuleFor(x => x.Title)
            .NotEmpty();

        RuleFor(x => x.Contexts)
            .NotNull()
            .ForEach(c => c.NotEmpty())
            .When(x => x.Contexts != null);

        RuleFor(x => x.PomodoroEstimate)
            .GreaterThanOrEqualTo((byte)0)
            .When(x => x.PomodoroEstimate.HasValue);

        RuleFor(x => x.DueDate)
            .GreaterThan(DateTimeOffset.UtcNow)
            .When(x => x.DueDate.HasValue)
            .WithMessage("Due date must be in the future.");

        // Enums are required by the command — verify they are valid enum values
        RuleFor(x => x.Priority)
            .IsInEnum()
            .When(x => x.Priority.HasValue);

        RuleFor(x => x.EffortType)
            .IsInEnum()
            .When(x => x.EffortType.HasValue);

        RuleFor(x => x.EnergyLevel)
            .IsInEnum()
            .When(x => x.EnergyLevel.HasValue);

        RuleFor(x => x.Bucket)
            .IsInEnum()
            .When(x => x.Bucket.HasValue);

        When(x => x.WaitingForInfo is not null, () => {
            RuleFor(x => x.WaitingForInfo!.Description)
                .NotEmpty();

            RuleFor(x => x.WaitingForInfo!.ReviewAt.Value)
                .GreaterThan(DateTimeOffset.UtcNow)
                .WithMessage("Review date must be in the future.");
        });
    }
}
