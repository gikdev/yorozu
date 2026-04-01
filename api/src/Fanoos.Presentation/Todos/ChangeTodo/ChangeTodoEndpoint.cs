using ErrorOr;
using Fanoos.Application.Todos.ChangeTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Domain;
using Fanoos.Common.Endpoints;
using Fanoos.Domain.Todos;
using Fanoos.Presentation.Todos.Common;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos.ChangeTodo;

internal sealed class ChangeTodoEndpoint : IEndpoint {
    public void MapEndpoint(IEndpointRouteBuilder app) {
        app
            .MapPut("todos/{id:guid}", Handle)
            .WithName(nameof(ChangeTodo))
            .WithSummary("Change todo")
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

        var commandResult = MapToCommand(request, id);
        if (commandResult.IsError) return ApiResults.Problem(commandResult.Errors);

        var command = commandResult.Value;
        var result = await mediator.Send(command);

        return result.MatchResponse(item => Results.Ok(item.MapToResponse()));
    }

    private static ErrorOr<ChangeTodoCommand> MapToCommand(ChangeTodoRequest request, Guid id) {
        WaitingForInfo? waitingForInfo = null;

        if (request.WaitingForInfo != null) {
            var descriptionResult = NotEmptyString.Create(request.WaitingForInfo.Description);
            if (descriptionResult.IsError) return descriptionResult.Errors;

            var reviewAtResult = FutureDateTimeOffset.Create(request.WaitingForInfo.ReviewAt, DateTimeOffset.UtcNow);
            if (reviewAtResult.IsError) return reviewAtResult.Errors;

            waitingForInfo = new() {
                Description = descriptionResult.Value,
                ReviewAt = reviewAtResult.Value,
            };
        }

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
            WaitingForInfo = request.WaitingForInfo == null ? null : waitingForInfo,
            Why = request.Why,
        };
    }
}
