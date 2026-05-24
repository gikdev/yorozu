using ErrorOr;
using Yorozu.Application.Todos.CreateTodo;
using Yorozu.Common.Api;
using Yorozu.Common.Domain;
using Yorozu.Common.Endpoints;
using Yorozu.Domain.Todos;
using Yorozu.Presentation.Todos.Common;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Yorozu.Presentation.Todos.CreateTodo;

internal sealed class CreateTodoEndpoint : IEndpoint {
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

        var commandResult = MapToCommand(request);
        if (commandResult.IsError) return ApiResults.Problem(commandResult.Errors);

        var command = commandResult.Value;
        var result = await mediator.Send(command);

        return result.MatchResponse(
            item => Results.Ok(item.MapToResponse())
        );
    }

    private static ErrorOr<CreateTodoCommand> MapToCommand(CreateTodoRequest request) {
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
            WaitingForInfo = waitingForInfo,
            Why = request.Why,
        };
    }
}
