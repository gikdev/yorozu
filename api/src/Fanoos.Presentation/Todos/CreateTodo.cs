using Fanoos.Application.Todos.CreateTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Endpoints;
using Fanoos.Domain.Todos;
using Fanoos.Presentation.Todos.Common;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos;

internal sealed class CreateTodo : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPost("todos", Handle)
            .WithName(nameof(CreateTodo))
            .WithSummary("Create todo")
            .WithTags(ApiTags.Todos)
            .Accepts<CreateTodoRequest>("application/json")
            .Produces<TodoResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromBody] CreateTodoRequest request
    ) {
        var validator = new CreateTodoRequestValidator();
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid) return validationResult.ToValidationProblem();

        var result = await mediator.Send(MapToCommand(request));

        return result.MatchResponse(
            item => Results.Ok(item.MapToResponse())
        );
    }

    private static CreateTodoCommand MapToCommand(CreateTodoRequest request) {
        return new CreateTodoCommand {
            Bucket = request.Bucket,
            Contexts = request.Contexts,
            Description = request.Description,
            DueDate = request.DueDate,
            EffortType = request.EffortType,
            EnergyLevel = request.EnergyLevel,
            IsDone = request.IsDone,
            IsUrgent = request.IsUrgent,
            PomodoroEstimate = request.PomodoroEstimate,
            Priority = request.Priority,
            Title = request.Title,
            WaitingForInfo = request.WaitingForInfo,
            Why = request.Why,
        };
    }

    private sealed record CreateTodoRequest {
        public required string Title { get; init; }
        public string? Description { get; init; }
        public string? Why { get; init; }
        public byte? PomodoroEstimate { get; init; }
        public bool? IsUrgent { get; init; }
        public bool? IsDone { get; init; }
        public DateTimeOffset? DueDate { get; init; }
        public IEnumerable<string>? Contexts { get; init; }
        public TodoPriority? Priority { get; init; }
        public TodoEffortType? EffortType { get; init; }
        public EnergyLevel? EnergyLevel { get; init; }
        public TodoBucket? Bucket { get; init; }
        public WaitingForInfo? WaitingForInfo { get; init; }
    }

    private sealed class CreateTodoRequestValidator : AbstractValidator<CreateTodoRequest> {
        public CreateTodoRequestValidator() {
            RuleFor(x => x.Title)
                .NotEmpty();
        }
    }
}
