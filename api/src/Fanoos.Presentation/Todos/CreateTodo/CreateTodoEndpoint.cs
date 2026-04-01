using Fanoos.Application.Todos.CreateTodo;
using Fanoos.Common.Api;
using Fanoos.Common.Endpoints;
using Fanoos.Presentation.Todos.Common;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Fanoos.Presentation.Todos.CreateTodo;

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
}
