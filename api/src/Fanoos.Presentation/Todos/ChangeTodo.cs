using ErrorOr;
using Fanoos.Application.Todos.ChangeTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Domain;
using Fanoos.Common.Dto;
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

internal sealed class ChangeTodo : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPatch("todos/{id:guid}", Handle)
            .WithName(nameof(ChangeTodo))
            .WithSummary("Change todo")
            .WithDescription("Toggle status, (un)archive, and change the title of the todo.")
            .WithTags(ApiTags.Todos)
            .Accepts<ChangeTodoRequest>("application/json")
            .Produces<TodoResponse>();
    }

    private static async Task<IResult> Handle(
        [FromServices] ISender mediator,
        [FromRoute] Guid id,
        [FromBody] ChangeTodoRequest request
    ) {
        var validator = new ChangeTodoRequestValidator();
        var validationResult = await validator.ValidateAsync(request);
        if (!validationResult.IsValid) return validationResult.ToValidationProblem();

        ErrorOr<Todo> result = await mediator.Send(MapToCommand(request, id));

        return result.MatchResponse(item => Results.Ok(item.MapToResponse()));
    }

    private static ChangeTodoCommand MapToCommand(ChangeTodoRequest request, Guid id) {
        return new ChangeTodoCommand {
            Id = id,
            Title = request.Title,
            Contexts = request.Contexts,
            Description = request.Description,
            DueDate = request.DueDate,
            EnergyLevel = request.EnergyLevel,
            Bucket = request.Bucket,
            IsUrgent = request.IsUrgent,
            IsDone = request.IsDone,
            EffortType = request.EffortType,
            EstimatedPomodoros = request.EstimatedPomodoros,
            Priority = request.Priority,
            WaitingForInfo = request.WaitingForInfo == null ? null : new WaitingForInfoNullObject {
                Value = new WaitingForInfo {
                    Description = NotEmptyString.Create(request.WaitingForInfo.Value.Description).Value,
                    ReviewAt = FutureDateTimeOffset._Restore(request.WaitingForInfo.Value.ReviewAt),
                }
            },
            Why = request.Why,
        };
    }

    private sealed record ChangeTodoRequest {
        public string? Title { get; init; }
        public StringNullObject? Why { get; init; }
        public StringNullObject? Description { get; init; }
        public bool? IsDone { get; init; }
        public ByteNullObject? EstimatedPomodoros { get; init; }
        public bool? IsUrgent { get; init; }
        public DateTimeOffsetNullObject? DueDate { get; init; }
        public List<string>? Contexts { get; init; }
        public TodoPriority? Priority { get; init; }
        public TodoEffortType? EffortType { get; init; }
        public EnergyLevel? EnergyLevel { get; init; }
        public TodoBucket? Bucket { get; init; }
        public WaitingForRequestNullObject? WaitingForInfo { get; init; }
    }

    private sealed record WaitingForRequestNullObject : NullObject<WaitingForRequest>;

    private sealed record WaitingForRequest {
        public required string Description { get; init; }
        public required DateTimeOffset ReviewAt { get; init; }
    }

    private sealed class ChangeTodoRequestValidator : AbstractValidator<ChangeTodoRequest>;
}
