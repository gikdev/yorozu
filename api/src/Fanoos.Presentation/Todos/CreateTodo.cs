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
            NormalTodoPayload = request.NormalTodoPayload != null ? new() {
                Bucket = request.NormalTodoPayload.Bucket,
                Context = request.NormalTodoPayload.Context,
                EnergyLevel = request.NormalTodoPayload.EnergyLevel,
                IsDone = request.NormalTodoPayload.IsDone,
                IsImportant = request.NormalTodoPayload.IsImportant,
                IsUrgent = request.NormalTodoPayload.IsUrgent,
                Project = request.NormalTodoPayload.Project,
                Tag = request.NormalTodoPayload.Tag,
                Time = request.NormalTodoPayload.Time,
                Title = request.NormalTodoPayload.Title,
            } : null,
            RawTodoPayload = request.RawTodoPayload != null ? new() {
                RawInput = request.RawTodoPayload.RawInput,
            } : null,
        };
    }

    private sealed record CreateTodoRequest {
        public required RawTodoPayload? RawTodoPayload { get; init; }
        public required NormalTodoPayload? NormalTodoPayload { get; init; }
    }


    private sealed record RawTodoPayload {
        public required string RawInput { get; init; }
    }

    private sealed record NormalTodoPayload {
        public required string Title { get; init; }
        public string? Context { get; init; }
        public string? Project { get; init; }
        public int? Time { get; init; }
        public string? Tag { get; init; }
        public EnergyLevel? EnergyLevel { get; init; }
        public TodoBucket? Bucket { get; init; }
        public bool? IsImportant { get; init; }
        public bool? IsUrgent { get; init; }
        public bool? IsDone { get; init; }
    }

    private sealed class CreateTodoRequestValidator : AbstractValidator<CreateTodoRequest> {
        public CreateTodoRequestValidator() {
            RuleFor(x => x)
                .Must(x => x.RawTodoPayload is not null || x.NormalTodoPayload is not null)
                .WithMessage("A payload must be provided.");

            RuleFor(x => x)
                .Must(x => !(x.RawTodoPayload is not null && x.NormalTodoPayload is not null))
                .WithMessage("Provide either RawTodoPayload or NormalTodoPayload, not both.");

            When(x => x.RawTodoPayload is not null, () => {
                RuleFor(x => x.RawTodoPayload!.RawInput)
                    .NotEmpty();
            });

            When(x => x.NormalTodoPayload is not null, () => {
                RuleFor(x => x.NormalTodoPayload!.Title)
                    .NotEmpty();

                RuleFor(x => x.NormalTodoPayload!.Context)
                    .NotEmpty()
                    .When(x => x.NormalTodoPayload!.Context is not null);

                RuleFor(x => x.NormalTodoPayload!.Project)
                    .NotEmpty()
                    .When(x => x.NormalTodoPayload!.Project is not null);

                RuleFor(x => x.NormalTodoPayload!.Tag)
                    .NotEmpty()
                    .When(x => x.NormalTodoPayload!.Tag is not null);
            });
        }
    }
}
