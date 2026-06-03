using ErrorOr;
using FluentAssertions;

namespace Yorozu.Domain.Tests.Unit;

internal static class ErrorOrAssert
{
    public static void IsSuccess<T>(ErrorOr<T> result)
    {
        result.IsError.Should().BeFalse($"Expected success, but got errors: {string.Join(", ", result.Errors.Select(e => e.Description))}");
    }

    public static void IsError<T>(ErrorOr<T> result, string expectedCode)
    {
        result.IsError.Should().BeTrue("Expected an error, but got success.");
        result.Errors.Should().Contain(e => e.Code == expectedCode);
    }
}
