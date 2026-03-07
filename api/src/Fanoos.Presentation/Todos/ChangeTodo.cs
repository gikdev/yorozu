using ErrorOr;
using Fanoos.Application.Todos.ChangeTodo;
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
            Context = request.Context,
            Project = request.Project,
            Time = request.Time,
            Tag = request.Tag,
            EnergyLevel = request.EnergyLevel,
            Bucket = request.Bucket,
            IsImportant = request.IsImportant,
            IsUrgent = request.IsUrgent,
            IsDone = request.IsDone,
            IsArchived = request.IsArchived,
        };
    }

    private sealed record ChangeTodoRequest {
        public string? Title { get; init; }
        public ObjectValueOfNullableString? Context { get; init; }
        public ObjectValueOfNullableString? Project { get; init; }
        public ObjectValueOfNullableInt? Time { get; init; }
        public ObjectValueOfNullableString? Tag { get; init; }
        public EnergyLevel? EnergyLevel { get; init; }
        public TodoBucket? Bucket { get; init; }
        public bool? IsImportant { get; init; }
        public bool? IsUrgent { get; init; }
        public bool? IsDone { get; init; }
        public bool? IsArchived { get; init; }
    }

    private sealed class ChangeTodoRequestValidator : AbstractValidator<ChangeTodoRequest>;
}
