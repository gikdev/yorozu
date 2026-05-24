#pragma warning disable CA1002 // Do not expose generic lists

using ErrorOr;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;

namespace Yorozu.Common.Api;

public static class ApiResults {
    public static IResult MatchResponse<TIn>(
        this ErrorOr<TIn> result,
        Func<TIn, IResult>? onSuccess = null,
        Func<IEnumerable<Error>, IResult>? onFailure = null
    ) {
        if (result.IsError) {
            return onFailure != null
                ? onFailure(result.Errors)
                : Problem(result.Errors);
        }

        return onSuccess != null
            ? onSuccess(result.Value)
            : Results.NoContent();
    }

    public static IResult Problem(List<Error> errors) {
        if (errors.Count == 0) {
            return Results.Problem();
        }

        bool areAllValidationErrors = errors.All(e => e.Type == ErrorType.Validation);

        return areAllValidationErrors
            ? ValidationProblem(errors)
            : Problem(errors[0]);
    }

    public static IResult Problem(Error error) {
        int statusCode = error.Type switch {
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            _ => StatusCodes.Status500InternalServerError
        };

        return Results.Problem(
            statusCode: statusCode,
            detail: error.Description,
            title: error.Code
        );
    }

    public static IResult ValidationProblem(List<Error> errors) {
        // Convert to the RFC 7807 validation dictionary format
        var errorDictionary = errors
            .GroupBy(e => e.Code)
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.Description).ToArray()
            );

        return Results.ValidationProblem(errorDictionary);
    }

    public static IResult ToValidationProblem(this ValidationResult result) {
        // Convert to the RFC 7807 validation dictionary format
        var errorDictionary = result.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.ErrorMessage).ToArray()
            );

        return Results.ValidationProblem(errorDictionary);
    }
}
