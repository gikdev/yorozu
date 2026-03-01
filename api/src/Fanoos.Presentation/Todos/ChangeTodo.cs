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
            RawTitle = request.RawTitle?.Value,
            IsArchived = request.IsArchived?.Value,
            IsDone = request.IsDone?.Value,
        };
    }

    internal sealed record ChangeTodoRequest {
        public ValueStringObject? RawTitle { get; init; }
        public ValueBooleanObject? IsDone { get; init; }
        public ValueBooleanObject? IsArchived { get; init; }
    }

    internal sealed record ValueStringObject {
        public required string Value { get; init; }
    }

    internal sealed record ValueBooleanObject {
        public required bool Value { get; init; }
    }

    private sealed class ChangeTodoRequestValidator : AbstractValidator<ChangeTodoRequest>;
}
